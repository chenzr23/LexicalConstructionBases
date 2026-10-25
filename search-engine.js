'use strict';
(() => {
  const pause = () => new Promise(resolve => setTimeout(resolve, 0));
  const norm = value => String(value || '').normalize('NFKC').toLowerCase().replace(/_/g, ' ').trim();
  const collator = new Intl.Collator('en');
  function clean(item) { const { _lemmas, _text, ...value } = item; return value; }
  const alphabetical = (a, b) => collator.compare(a._lemmas[0] || a.id, b._lemmas[0] || b.id) || collator.compare(a.id, b.id);
  // A stable merge sort yields to rendering while ordering large result sets.
  async function sortAsync(items, compare) {
    let source = items, target = new Array(items.length), operations = 0;
    for (let width = 1; width < items.length; width *= 2) {
      for (let start = 0; start < items.length; start += 2 * width) {
        const middle = Math.min(start + width, items.length), end = Math.min(start + 2 * width, items.length);
        let left = start, right = middle;
        for (let index = start; index < end; index++) {
          target[index] = left < middle && (right >= end || compare(source[left], source[right]) <= 0) ? source[left++] : source[right++];
          if (++operations % 16384 === 0) await pause();
        }
      }
      [source, target] = [target, source];
    }
    return source;
  }
  function create() {
    let entries = [], byId = new Map();
    const engine = { onmessage: null, onerror: null, postMessage(data) { setTimeout(() => handle(data), 0); } };
    const emit = data => { if (engine.onmessage) engine.onmessage({ data }); };
    async function handle(data) {
      const { type, requestId } = data;
      try {
        if (type === 'init') {
          entries = await window.Basis91Data.load('index');
          for (let start = 0; start < entries.length; start += 1000) {
            for (const item of entries.slice(start, start + 1000)) {
              item._lemmas = (item.lemmas || []).map(norm);
              item._text = norm(`${item.id} ${item._lemmas.join(' ')} ${item.definition}`);
              byId.set(item.id, item);
            }
            await pause();
          }
          emit({ type: 'ready', count: entries.length });
        } else if (type === 'lookup') {
          emit({ type, requestId, entries: data.ids.map(id => byId.get(id)).filter(Boolean).map(clean) });
        } else if (type === 'dependents') {
          const terms = norm(data.query).split(/\s+/).filter(Boolean), matches = [];
          for (let start = 0; start < data.ids.length; start += 2000) {
            for (const id of data.ids.slice(start, start + 2000)) {
              const item = byId.get(id);
              if (item && terms.every(term => item._text.includes(term))) matches.push(item);
            }
            await pause();
          }
          const ordered = await sortAsync(matches, alphabetical);
          const pageSize = 20, page = Math.max(0, Math.min(data.page || 0, Math.ceil(ordered.length / pageSize) - 1));
          emit({ type, requestId, total: ordered.length, page, pageSize, entries: ordered.slice(page * pageSize, (page + 1) * pageSize).map(clean) });
        } else if (type === 'search') {
          const query = norm(data.query), terms = query.split(/\s+/).filter(Boolean), matches = [];
          for (let start = 0; start < entries.length; start += 2000) {
            for (const item of entries.slice(start, start + 2000)) {
              if (data.pos && !(data.pos === 'operator' ? item.basisKind === 'operator' : data.pos === 'a' ? ['a', 's'].includes(item.pos) : data.pos === 'other' ? !['n', 'v', 'a', 's', 'r', 'prep', 'operator'].includes(item.pos) : item.pos === data.pos)) continue;
              if (data.basis === 'basis' && !item.basis) continue;
              if (data.basis === 'lexical' && item.basisKind !== 'lexical') continue;
              if (data.basis === 'operator' && item.basisKind !== 'operator') continue;
              if (data.basis === 'nonbasis' && item.basis) continue;
              if (terms.some(term => !item._text.includes(term))) continue;
              let score = 0;
              if (!query) score = item.basis ? 2 : 0;
              else if (norm(item.id) === query) score = 100;
              else if (item._lemmas.includes(query)) score = 90;
              else if (item._lemmas.some(lemma => lemma.startsWith(query))) score = 70;
              else if (item._lemmas.some(lemma => lemma.includes(query))) score = 50;
              else if (terms.every(term => item._lemmas.some(lemma => lemma.includes(term)))) score = 40;
              matches.push({ item, score });
            }
            await pause();
          }
          const ordered = await sortAsync(matches, (a, b) => b.score - a.score || alphabetical(a.item, b.item));
          const pageSize = Math.max(1, Math.min(100, data.pageSize || 40));
          const page = Math.max(0, Math.min(data.page || 0, Math.ceil(ordered.length / pageSize) - 1));
          emit({ type, requestId, total: ordered.length, page, pageSize, entries: ordered.slice(page * pageSize, (page + 1) * pageSize).map(x => clean(x.item)) });
        }
      } catch (error) { emit({ type: 'error', requestId, message: error.message }); }
    }
    return engine;
  }
  window.Basis91Search = Object.freeze({ create });
})();
