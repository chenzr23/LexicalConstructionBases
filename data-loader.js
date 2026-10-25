'use strict';
(() => {
  const pending = new Map();
  async function decode(payload) {
    if (!payload || payload.encoding !== 'gzip-base64') return payload;
    if (typeof DecompressionStream === 'undefined') {
      throw new Error('Please use a current browser with gzip decompression support.');
    }
    const binary = atob(payload.data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    return JSON.parse(await new Response(stream).text());
  }
  function pathFor(key) {
    if (key === 'manifest') return 'data/manifest.js';
    if (key === 'index') return 'data/index.js';
    if (/^record:[0-9a-f]{2}$/.test(key)) return `data/records/${key.slice(7)}.js`;
    throw new Error('Unknown dataset resource.');
  }
  function load(key) {
    if (pending.has(key)) return pending.get(key).promise;
    const path = pathFor(key);
    const script = document.createElement('script');
    let resolve, reject;
    const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
    const task = { promise, resolve, reject, script, received: false, timer: null };
    const finish = () => { clearTimeout(task.timer); pending.delete(key); script.remove(); };
    task.finish = finish;
    task.timer = setTimeout(() => { finish(); reject(new Error('Dataset resource loading timed out.')); }, 120000);
    pending.set(key, task);
    script.async = true;
    script.src = path;
    script.onerror = () => { finish(); reject(new Error(`Could not load ${path}.`)); };
    script.onload = () => {
      if (!task.received) { finish(); reject(new Error(`Invalid dataset resource: ${path}.`)); }
    };
    document.head.appendChild(script);
    return promise;
  }
  async function receive(key, payload) {
    const task = pending.get(key);
    if (!task || task.received) return;
    task.received = true;
    try { task.resolve(await decode(payload)); }
    catch (error) { task.reject(error); }
    finally { task.finish(); }
  }
  window.Basis91Data = Object.freeze({ load, receive });
})();
