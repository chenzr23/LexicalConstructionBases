'use strict';
(() => {
  const $ = selector => document.querySelector(selector);
  const main = $('#main');
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  let lang = 'zh';
  const messages = {
    brand:['定义依存超图','DEFINITION DEPENDENCY HYPERGRAPH'],tagline:['从定义出发，探索概念之间的联系','Explore the connections between concepts through definitions'],overview:['数据概览','Overview'],search:['搜索','Search'],explore:['EXPLORE THE LEXICON','EXPLORE THE LEXICON'],findSense:['查找一个义项','Find a sense'],searchLabel:['词形、义项 ID 或定义关键词','Lemma, sense ID, or definition keywords'],pos:['词性','Part of speech'],allPos:['全部词性','All POS'],range:['范围','Collection'],allEntries:['全部条目','All entries'],basisOnly:['91 个 basis','91 basis entries'],lexicalOnly:['其他 basis','Other basis entries'],operatorOnly:['结构算子 · AND / OR / NOT','Structural operators · AND / OR / NOT'],nonbasis:['非 basis 义项','Non-basis senses'],operator:['结构算子','Structural operator'],other:['其他','Other'],loadingIndex:['正在加载搜索索引…','Loading the search index…'],loadingData:['正在打开数据集…','Opening the dataset…'],reset:['重置','Reset'],basisConvention:['91 basis · AND / OR / NOT 结构算子','91 basis · AND / OR / NOT operators'],allCount:['个条目','entries'],results:['条结果','results'],prev:['上一页','Previous'],next:['下一页','Next'],page:['页','page'],noResults:['未找到匹配的义项','No matching senses'],trySearch:['尝试更短的词形、完整义项 ID，或调整筛选条件。','Try a shorter lemma, a complete sense ID, or different filters.'],indexError:['搜索索引加载失败','Search index could not be loaded'],retry:['重试','Retry'],heroTitle:['定义连接概念。<br>探索它们的依存结构。','Definitions connect concepts.<br>Explore their dependencies.'],heroText:['查看完整义项定义、定义分支、论元化语境和词义消歧结果。沿着双向依赖关系，了解一个概念如何由其他概念解释，以及它被哪些定义复用。','Read definitions, alternative definition parts, argumentation, and word sense disambiguation. Follow dependencies in both directions to see how a concept is explained and reused.'],browseBasis:['浏览 91 个 basis','Explore the 91 basis entries'],tryEvent:['从 event 开始','Start with event'],senses:['语义节点','sense nodes'],rules:['依赖 clauses','dependency clauses'],basisEntries:['basis','basis entries'],collectionEntries:['可浏览条目','browsable entries'],examples:['从这些条目开始','A few places to start'],examplesCaption:['每个词形都对应明确的义项','Each entry identifies a specific sense'],basisExplanation:['本网站统一采用 <strong>91 basis</strong> 口径，并将 <strong>AND</strong>、<strong>OR</strong>、<strong>NOT</strong> 归为结构算子。可在目录中查看它们的作用与对应记录。','This website uses the <strong>91-basis</strong> convention and classifies <strong>AND</strong>, <strong>OR</strong> and <strong>NOT</strong> as structural operators. Explore their roles and records in the catalog.'],howTitle:['如何阅读这张超图','Reading the hypergraph'],how1:['找到具体义项','Find the intended sense'],how1Text:['同一个词可能有多个含义。结合词性、释义与义项 ID，选择需要查看的概念。','A word can have several senses. Use the part of speech, definition, and sense ID to identify the intended meaning.'],how2:['阅读完整定义分支','Read complete alternatives'],how2Text:['每条 clause 的前提以 AND 共同满足；同一义项的多条 clauses 以 OR 提供不同解释路径。','Premises within a clause are required together (AND). Separate clauses provide alternative routes (OR) to the same head sense.'],how3:['沿两个方向探索','Explore both directions'],how3Text:['“它依赖的”展示该义项的解释前提；“依赖它的”展示在定义中引用该义项的其他节点。','“Depends on” shows premises used to explain the sense. “Used by” shows other senses whose definitions reference it.'],dataSource:['数据说明与来源','Data and sources'],sourceText:['定义与编译记录保留各自来源标签。部分历史来源没有记录 argumentation；这些位置会明确标注。不同来源的许可与引用要求分别适用。','Definitions and compilation records retain their source labels. Missing argumentation in historical records is identified explicitly. Licensing and attribution requirements apply separately to each source.'],graphFingerprint:['图版本 SHA-256','Graph SHA-256'],definition:['定义','Definition'],synonyms:['同义词形','Lemmas'],copyLink:['复制链接','Copy link'],download:['打开 / 复制 JSON','Open / copy JSON'],copied:['已复制义项链接','Sense link copied'],copyFailed:['无法自动复制，请复制浏览器地址栏。','Copy the URL from your browser address bar.'],compilation:['定义与解析','Definitions & analysis'],dependsOn:['它依赖的','Depends on'],usedBy:['依赖它的','Used by'],clauses:['clauses','clauses'],uniqueDeps:['不重复依赖','distinct dependencies'],referencingSenses:['引用它的义项','referencing senses'],sourceDefinitions:['来源定义与编译过程','Source definitions & compilation'],compileIntro:['每个 definition part 表示一个完整的可选定义分支。展开其原子片段，可查看 argumentation 与逐词 WSD；片段与完整分支分别呈现。','Each definition part is a complete alternative branch. Expand its fragments to inspect argumentation and token-level WSD. Fragments and complete alternatives are shown separately.'],sourceMissing:['来源记录没有提供该义项的 definition part、argumentation 或 WSD。图中已有的依赖 clauses 仍可在“它依赖的”查看。','The source records do not provide definition parts, argumentation, or WSD for this sense. Its graph clauses remain available under “Depends on”.'],argumentationMissing:['该片段的来源未提供 argumentation。','The source does not provide argumentation for this fragment.'],wsdMissing:['该片段的来源未提供 WSD 记录。','The source does not provide WSD records for this fragment.'],part:['Definition part','Definition part'],alternative:['完整可选分支','complete alternative'],fragment:['原子片段','Fragment'],fragments:['原子片段','fragments'],evidence:['查看 argumentation 与 WSD','View argumentation & WSD'],partDependencies:['该分支的完整依赖集合 · AND','Complete premises of this part · AND'],mappedClauses:['对应图规则','Mapped graph clauses'],noMapping:['未记录对应图规则','No graph clause mapping recorded'],activeLogic:['当前活跃分支的逻辑结构','Logic of active definition parts'],sourceLogic:['来源记录的逻辑结构','Logic recorded in the source'],scopeLogic:['此处显示来源保存的完整逻辑；当前网站只展示仍活跃的定义分支。','This is the full logic retained by the source; the website presents only active definition parts.'],args:['论元与绑定','Arguments & bindings'],targetSentence:['A · 目标语境','A · Target context'],definitionSentence:['B · 定义语境','B · Definition context'],rawArgumentation:['argumentation 公开字段记录','Argumentation published fields'],wsdHeading:['词义消歧 · WSD','Word sense disambiguation · WSD'],token:['词 / token','Token'],selectedSense:['所选义项','Selected sense'],projection:['投影状态','Projection'],rationale:['判断依据','Rationale'],projected:['计入该分支依赖','Included in this part’s premises'],scopeOnly:['语境 / 未计入此分支','Context / not a premise of this part'],scopeLabel:['未投影为此分支依赖','Not projected to this part'],notSelected:['未选择义项','No sense selected'],rawWsd:['WSD 公开字段记录','WSD published fields'],rawRecord:['查看完整条目 JSON','View complete entry JSON'],notes:['记录说明','Record notes'],depsIntro:['以下每张卡片是一条完整的依赖 clause。卡片内部的义项以 AND 共同构成前提，多张卡片以 OR 提供可选路径。点击任一义项可继续探索。','Each card is one complete dependency clause. The premises within it are required together (AND); separate cards are alternatives (OR). Select a sense to explore it.'],relationCaution:['单个依赖关系表示该义项出现在一个分支的前提中。完成该分支仍需满足其余所有前提。','A dependency means that a sense appears among a branch’s premises. The rest of that branch’s premises are also required.'],clause:['Clause','Clause'],premises:['个共同前提','joint premises'],noClauses:['没有词汇依赖 clauses','No lexical dependency clauses'],noDepsText:['该记录未包含需要展示的词汇依赖规则。','This record does not contain lexical dependency clauses.'],usedIntro:['这些义项至少有一个定义分支引用当前义项。展开“查看 clause”可检查该分支的其他共同前提。','At least one branch of each sense below uses the current sense. Expand “Show clause” to inspect the other premises required by that branch.'],filterDependents:['在引用它的义项中搜索…','Search within referencing senses…'],showClause:['查看 clause','Show clause'],hideClause:['收起 clause','Hide clause'],noDependents:['没有义项直接引用它','No directly referencing senses'],noDependentsText:['当前词汇规则中没有以该义项为前提的 clause。','No lexical clause in the current graph uses this sense as a premise.'],noDependentMatches:['没有符合筛选条件的引用义项','No referencing senses match this filter'],loadMore:['显示更多','Show more'],loading:['正在加载…','Loading…'],recordError:['暂时无法打开此义项','Could not open this sense'],recordErrorText:['数据请求未完成或此 ID 不在当前快照中。请重试，或从搜索结果重新选择。','The request did not complete, or this ID is absent from the snapshot. Retry or choose an entry from search results.'],operatorNA:['此条目用于说明 clause 的结构，没有单独的 argumentation 或 WSD 编译记录。','This entry explains clause structure and has no separate argumentation or WSD compilation record.'],operatorNote:['AND 表示合取，OR 表示选择，NOT 表示否定。三者均归入结构算子。','AND expresses conjunction, OR expresses alternatives, and NOT expresses negation. All three are classified as structural operators.'],operatorAnd:['AND 表示同一 clause 中的所有前提需要共同满足。','AND requires all premises within one clause to be available together.'],operatorOr:['OR 表示同一 head 的任一完整 clause 都可提供一条构造路径。','OR allows any complete clause for a head to provide a construction route.'],operatorNot:['NOT 表示否定。下方保留 not / non 义项的原始定义、编译记录和依赖关系。','NOT expresses negation. The original definition, compilation records and dependency relations of the not / non sense are retained below.'],operatorUsage:['结构上的使用','Structural usage'],operatorUsedText:['该算子的作用体现在所有适用的 clause 结构中。“依赖它的”列表仅统计词汇规则中的显式引用，因此此列表不会枚举整个图。','This operator acts through clause structure. The “Used by” list counts explicit references in lexical rules and does not enumerate the whole graph for structural operators.'],missingArgSummary:['部分来源缺少 argumentation；具体缺失位置已标注。','Some source records lack argumentation; missing fields are identified below.'],sourceKinds:{},entry:['义项','Sense'],back:['返回概览','Back to overview'],openSearch:['打开搜索','Open search'],noData:['暂无数据','No data']
  };
  const t = key => { const value = messages[key]; return Array.isArray(value) ? value[lang === 'en' ? 1 : 0] : key; };
  const fmt = number => Number(number || 0).toLocaleString(lang === 'en' ? 'en-US' : 'zh-CN');
  const icons = { copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M15 8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4"/></svg>',download:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></svg>' };
  const state = { manifest:null, searchEngine:null, ready:false, metadata:new Map(), current:null, tab:'compilation', searchPage:0, searchResult:null, searchEpoch:0, routeEpoch:0, dependentEpoch:0, dependentPage:0, dependentQuery:'', requestId:0, pending:new Map(), shardCache:new Map(), shardPromises:new Map() };
  let searchTimer, dependentTimer, toastTimer;
  function applyLanguage() {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.title = lang === 'en' ? 'Basis 91 · Definition Dependency Hypergraph' : 'Basis 91 · 定义依存超图';
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    $('#language').textContent = lang === 'en' ? '中文' : 'EN';
    $('#language').setAttribute('aria-label', lang === 'en' ? '切换到中文' : 'Switch to English');
    $('#query').placeholder = t('searchLabel');
  }
  function toast(message) { clearTimeout(toastTimer); $('#toast').textContent = message; $('#toast').classList.add('visible'); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 2600); }
  function remember(items) { for (const item of items) state.metadata.set(item.id, item); }
  function searchCall(type, payload) {
    const requestId = ++state.requestId;
    return new Promise((resolve,reject) => {
      const timer = setTimeout(() => { state.pending.delete(requestId); reject(new Error('Search request timed out.')); }, 90000);
      state.pending.set(requestId,{resolve,reject,timer});
      state.searchEngine.postMessage({type,requestId,...payload});
    });
  }
  async function getMetadata(ids) {
    const missing = [...new Set(ids)].filter(id => !state.metadata.has(id));
    if (missing.length) { const response = await searchCall('lookup',{ids:missing}); remember(response.entries); }
    return ids.map(id => state.metadata.get(id)).filter(Boolean);
  }
  function titleOf(record) { return record?.operatorSymbol || record?.lemmas?.[0] || record?.id || ''; }
  function structuralOnly(record) { return ['operator-and','operator-or'].includes(record.id); }
  function href(id) { return `#${encodeURIComponent(id)}`; }
  function badge(record) { return `<span class="badge">${escape(record.pos || '—')}</span>${record.basis ? `<span class="badge ${record.basisKind === 'operator' ? 'operator' : 'basis'}">${record.basisKind === 'operator' ? t('operator') : 'BASIS'}</span>` : ''}`; }
  function chip(id, currentId = '', withId = true) {
    const item = state.metadata.get(id); return `<a class="sense-chip ${item?.basis ? 'basis-chip' : ''} ${id === currentId ? 'current-chip' : ''}" href="${href(id)}" title="${escape(item?.definition || id)}"><span>${escape(item ? titleOf(item) : id)}</span>${withId && item ? `<small class="mono">${escape(id)}</small>` : ''}</a>`;
  }
  function chips(ids,currentId='',and=false) { return ids.map(id => chip(id,currentId)).join(and ? '<span class="chip-and" aria-label="AND">∧</span>' : ''); }
  function pagination(page,total,size,kind) {
    const pages = Math.ceil(total / size); if (pages <= 1) return total ? `<span>${fmt(total)} ${t('allCount')}</span>` : '';
    return `<button class="page-button" data-page-kind="${kind}" data-page="${page-1}" ${page===0?'disabled':''}>← ${t('prev')}</button><span>${fmt(page+1)} / ${fmt(pages)}</span><button class="page-button" data-page-kind="${kind}" data-page="${page+1}" ${page+1>=pages?'disabled':''}>${t('next')} →</button>`;
  }
  async function search(page=0) {
    if (!state.ready) return;
    const epoch = ++state.searchEpoch; state.searchPage = page;
    $('#result-count').textContent = t('loading');
    try {
      const result = await searchCall('search',{query:$('#query').value,pos:$('#pos-filter').value,basis:$('#basis-filter').value,page,pageSize:40});
      if (epoch !== state.searchEpoch) return;
      remember(result.entries); state.searchResult = result; state.searchPage = result.page; renderSearch();
    } catch (error) { if (epoch === state.searchEpoch) $('#result-count').textContent = `${t('indexError')}: ${error.message}`; }
  }
  function renderSearch() {
    const result = state.searchResult; if (!result) return;
    $('#result-count').textContent = `${fmt(result.total)} ${t('results')}`;
    $('#search-results').innerHTML = result.entries.length ? result.entries.map(item => `<a class="result-item ${state.current?.id === item.id ? 'active' : ''}" href="${href(item.id)}" ${state.current?.id === item.id ? 'aria-current="true"' : ''}><div class="result-top"><span class="result-lemma">${escape(item.lemmas.join(' / '))}</span><span class="result-pos">${escape(item.pos || '—')}</span></div><div class="result-id mono">${escape(item.id)}${item.basis?'<span class="result-basis">BASIS</span>':''}</div><div class="result-definition">${escape(item.definition)}</div></a>`).join('') : `<div class="empty-state"><span class="empty-symbol">⌕</span><h3>${t('noResults')}</h3><p>${t('trySearch')}</p></div>`;
    $('#search-pagination').innerHTML = pagination(result.page,result.total,result.pageSize,'search');
    $('#search-results').scrollTop = 0;
  }
  function shardFor(id) { let hash=2166136261; for(const byte of new TextEncoder().encode(id)) hash=Math.imul(hash^byte,16777619)>>>0; return (hash&255).toString(16).padStart(2,'0'); }
  async function getRecord(id) {
    const shard = shardFor(id); let data = state.shardCache.get(shard);
    if (data) { state.shardCache.delete(shard); state.shardCache.set(shard,data); }
    else {
      if (!state.shardPromises.has(shard)) state.shardPromises.set(shard,(async()=>{ const value=await window.Basis91Data.load(`record:${shard}`); state.shardCache.set(shard,value); if(state.shardCache.size>10) state.shardCache.delete(state.shardCache.keys().next().value); return value; })().finally(()=>state.shardPromises.delete(shard)));
      data=await state.shardPromises.get(shard);
    }
    if (!data[id]) throw new Error(`Unknown sense: ${id}`); return data[id];
  }
  function recordReferences(record) {
    const ids = new Set([record.id,...(record.dependencies||[])]);
    for(const doc of record.documents||[]) for(const fragment of doc.fragments||[]) {
      for(const token of fragment.wsd?.tokens||[]) { const selected=tokenIds(token); selected.forEach(id=>ids.add(id)); }
      for(const id of fragment.wsd?.sentence_synset_ids||[]) ids.add(id);
    }
    return [...ids];
  }
  async function route() {
    if (!state.ready) return;
    const epoch=++state.routeEpoch; state.dependentEpoch++; state.current=null; state.tab='compilation'; state.dependentPage=0; state.dependentQuery='';
    let id; try { id=decodeURIComponent(location.hash.slice(1)); } catch (_) { id=location.hash.slice(1); }
    $('#sidebar').classList.remove('mobile-open'); $('#mobile-search').setAttribute('aria-expanded','false');
    renderSearch(); window.scrollTo({top:0,behavior:'instant'});
    if (!id) { await renderOverview(epoch); return; }
    main.innerHTML=`<div class="loading-state"><span class="spinner"></span><p>${t('loadingData')}</p><code>${escape(id)}</code></div>`;
    try {
      const record=await getRecord(id); await getMetadata(recordReferences(record));
      if(epoch!==state.routeEpoch)return;
      state.current=record; renderDetail(); renderSearch();
      document.title=`${titleOf(record)} · Basis 91`;
    } catch(error) {
      if(epoch!==state.routeEpoch)return;
      main.innerHTML=`<div class="breadcrumb"><a href="#">${t('overview')}</a><span>/</span><span>${escape(id)}</span></div><div class="error-box"><h2>${t('recordError')}</h2><p>${t('recordErrorText')}</p><p class="mono">${escape(error.message)}</p><button class="secondary-button" data-action="retry-route">${t('retry')}</button></div>`;
    }
  }
  async function renderOverview(epoch=state.routeEpoch) {
    const manifest=state.manifest; const ids=[...new Set([...(manifest.examples||[]),'operator-and','operator-or','oewn-00024432-r'])].slice(0,6);
    await getMetadata(ids); if(epoch!==state.routeEpoch || state.current)return;
    main.innerHTML=`<div class="breadcrumb"><span>DATA EXPLORER</span><span>/</span><span>${t('overview')}</span></div><section class="overview-hero"><div class="section-overline">BASIS 91 · OPEN EXPLORER</div><h1>${t('heroTitle')}</h1><p>${t('heroText')}</p><div class="hero-actions"><button class="primary-button" data-action="browse-basis">${t('browseBasis')} <span aria-hidden="true">→</span></button><a class="secondary-button" href="#oewn-00029677-n">${t('tryEvent')}</a></div></section><div class="metrics"><div class="metric"><strong>${fmt(manifest.senseCount)}</strong><span>${t('senses')}</span></div><div class="metric"><strong>${fmt(manifest.ruleCount)}</strong><span>${t('rules')}</span></div><div class="metric accent"><strong>91</strong><span>${t('basisEntries')}</span></div><div class="metric"><strong>${fmt(manifest.entryCount)}</strong><span>${t('collectionEntries')}</span></div></div><div class="section-heading"><h2>${t('examples')}</h2><small>${t('examplesCaption')}</small></div><div class="example-grid">${ids.map(id=>{const item=state.metadata.get(id);return item?`<a href="${href(id)}" class="example-card"><div class="badges">${badge(item)}</div><h3>${escape(titleOf(item))}</h3><p>${escape(item.definition)}</p><code>${escape(id)}</code><span class="example-arrow">↗</span></a>`:'';}).join('')}</div><div class="basis-note"><span class="note-icon" aria-hidden="true">∴</span><p>${t('basisExplanation')}</p></div><div class="section-heading"><h2>${t('howTitle')}</h2></div><div class="how-grid">${[1,2,3].map(i=>`<div class="how-step"><span class="step-number">0${i}</span><h3>${t(`how${i}`)}</h3><p>${t(`how${i}Text`)}</p></div>`).join('')}</div>${dataFooter()}`;
  }
  function dataFooter() { return `<footer class="dataset-footer"><strong>${t('dataSource')}</strong><p>${t('sourceText')}</p><p><a href="https://en-word.net/" target="_blank" rel="noopener noreferrer">Open English WordNet</a> · <a href="https://en.wiktionary.org/" target="_blank" rel="noopener noreferrer">Wiktionary</a> · <a href="data/manifest.json" target="_blank" rel="noopener noreferrer">${lang==='en'?'Version manifest':'版本清单'}</a></p><span>${t('graphFingerprint')}: <code>${escape(state.manifest.graphSha256)}</code></span></footer>`; }
  function renderDetail() {
    const record=state.current; if(!record)return;
    const operator=record.basisKind==='operator';
    main.innerHTML=`<div class="breadcrumb"><a href="#">${t('overview')}</a><span>/</span><span>${operator?t('operator'):t('entry')}</span><span>/</span><span>${escape(titleOf(record))}</span></div><section class="sense-header"><div><div class="section-overline">${operator?'STRUCTURAL OPERATOR':'SENSE RECORD'}</div><h1>${escape(titleOf(record))}</h1><div class="sense-identity"><span class="sense-id mono">${escape(record.id)}</span><div class="badges">${badge(record)}</div></div></div><div class="sense-actions"><button class="icon-button" data-action="copy-link" title="${t('copyLink')}" aria-label="${t('copyLink')}">${icons.copy}<span class="action-text">${t('copyLink')}</span></button><button class="icon-button" data-action="open-json" title="${t('download')}" aria-label="${t('download')}">${icons.download}<span class="action-text">JSON</span></button></div></section>${record.lemmas?.length>1?`<div class="synonyms">${t('synonyms')} · <strong>${escape(record.lemmas.join(' / '))}</strong></div>`:''}<section class="definition-card"><div class="definition-main"><div class="field-label">${t('definition')}</div><p>${escape(record.definition || t('noData'))}</p></div><div class="detail-stats"><div><strong>${fmt(record.clauses?.length)}</strong><span>${t('clauses')}</span></div><div><strong>${fmt(record.dependencies?.length)}</strong><span>${t('uniqueDeps')}</span></div><div><strong>${fmt(record.dependents?.length)}</strong><span>${t('referencingSenses')}</span></div></div></section>${operator?`<div class="operator-explainer"><p>${t('operatorNote')}</p><div class="operator-diagram">${record.id==='oewn-00024432-r'?'<b>NOT</b><span>P</span><b>≡</b><span>¬P</span>':record.id==='operator-and'?'<span>A</span><b>AND</b><span>B</span><b>→</b><span>H</span>':'<span>A ∧ B</span><b>OR</b><span>C ∧ D</span><b>→</b><span>H</span>'}</div><p>${record.id==='oewn-00024432-r'?t('operatorNot'):record.id==='operator-and'?t('operatorAnd'):t('operatorOr')}</p></div>`:''}<div class="detail-tabs" role="tablist" aria-label="Sense details"><button id="tab-compilation" class="detail-tab ${state.tab==='compilation'?'active':''}" role="tab" aria-selected="${state.tab==='compilation'}" aria-controls="panel-compilation" data-tab="compilation">${t('compilation')}<span class="tab-count">${fmt(record.documents?.length)}</span></button><button id="tab-dependencies" class="detail-tab ${state.tab==='dependencies'?'active':''}" role="tab" aria-selected="${state.tab==='dependencies'}" aria-controls="panel-dependencies" data-tab="dependencies">${t('dependsOn')}<span class="tab-count">${fmt(record.dependencies?.length)}</span></button><button id="tab-dependents" class="detail-tab ${state.tab==='dependents'?'active':''}" role="tab" aria-selected="${state.tab==='dependents'}" aria-controls="panel-dependents" data-tab="dependents">${t('usedBy')}<span class="tab-count">${fmt(record.dependents?.length)}</span></button></div><section id="panel-compilation" class="tab-panel" role="tabpanel" aria-labelledby="tab-compilation" ${state.tab!=='compilation'?'hidden':''}>${renderCompilation(record)}</section><section id="panel-dependencies" class="tab-panel" role="tabpanel" aria-labelledby="tab-dependencies" ${state.tab!=='dependencies'?'hidden':''}>${renderDependencies(record)}</section><section id="panel-dependents" class="tab-panel" role="tabpanel" aria-labelledby="tab-dependents" ${state.tab!=='dependents'?'hidden':''}>${dependentsShell(record)}</section>${dataFooter()}`;
    const first=document.querySelector('.document'); if(first){first.open=true;hydrateDocument(first);}
    selectTab(state.tab);
  }
  function sourceName(doc) {
    const names={reviewed_definition_revision:['审查后的定义修订','Reviewed definition revision'],source_definition:['来源定义','Source definition'],source_archive:['来源编译记录','Source compilation record'],structural_operator:['结构算子','Structural operator']};
    return names[doc.sourceKind]?.[lang==='en'?1:0] || doc.label || doc.sourceKind || t('definition');
  }
  function renderCompilation(record) {
    if(structuralOnly(record))return `<div class="section-heading"><h2>${t('operatorUsage')}</h2></div><div class="operator-explainer"><p>${t('operatorNA')}</p><p>${t('operatorUsedText')}</p></div>${recordNotes(record)}${fullRecord(record)}`;
    const docs=record.documents||[];
    return `<div class="section-heading"><h2>${t('sourceDefinitions')}</h2><small>${fmt(docs.length)} ${lang==='en'?'source records':'份来源记录'}</small></div><p class="panel-description">${t('compileIntro')}</p>${!docs.length?`<div class="missing">${t('sourceMissing')}</div>`:docs.map((doc,index)=>`<details class="document" data-document="${index}"><summary><div class="document-title"><strong>${escape(sourceName(doc))}</strong><span>${fmt(doc.definitionParts?.length)} definition parts · ${fmt(doc.fragments?.length)} ${t('fragments')}</span></div><span class="badge">${String(index+1).padStart(2,'0')}</span></summary><div class="document-content"></div></details>`).join('')}${recordNotes(record)}${fullRecord(record)}`;
  }
  function recordNotes(record) { return record.notes?.length?`<details class="full-json"><summary>${t('notes')}</summary>${record.notes.map(note=>`<p class="record-note">${escape(note)}</p>`).join('')}</details>`:''; }
  function fullRecord(record) { return `<details class="full-json" data-raw-record><summary>${t('rawRecord')}</summary><div></div></details>`; }
  function hydrateDocument(element,limit=8) {
    if(!element?.open || element.dataset.hydrated && limit===8)return;
    const index=Number(element.dataset.document),doc=state.current?.documents?.[index];if(!doc)return;
    element.dataset.hydrated='true';
    const parts=doc.definitionParts||[];
    element.querySelector('.document-content').innerHTML=`<div class="source-definition">${escape(doc.definition)}</div>${doc.logicScope?`<p class="subtle-note">${lang==='en'?'The source definition is quoted in full. The definition parts and logic below retain only the branches active in this graph.':'来源定义保留完整文字。下方 definition parts 与逻辑结构仅呈现当前图中活跃的分支。'}</p>`:''}${(doc.activeLogic||doc.logic)?`<details class="logic-details"><summary>${t('activeLogic')}</summary><pre class="raw-json">${escape(JSON.stringify(doc.activeLogic||doc.logic,null,2))}</pre></details>`:''}${parts.slice(0,limit).map((part,partIndex)=>renderPart(doc,part,index,partIndex)).join('')}${parts.length>limit?`<button class="show-more" data-document-more="${index}" data-limit="${limit+8}">${t('loadMore')} · ${fmt(parts.length-limit)}</button>`:''}<div class="source-metadata">${escape(doc.label)}${doc.sourceKind?` · ${escape(doc.sourceKind)}`:''}</div>`;
  }
  function renderPart(doc,part,docIndex,partIndex) {
    const fragMap=new Map((doc.fragments||[]).map(f=>[f.id,f])); const fragments=(part.fragmentIds||[]).map(id=>fragMap.get(id)).filter(Boolean);
    return `<article class="definition-part"><div class="part-header"><span>${t('part')} ${partIndex+1} · ${t('alternative')}</span><span>${(part.clauseIndices||[]).map(i=>`C${i+1}`).join(', ')||'—'}</span></div><div class="part-text">${escape(part.text)}</div><div class="part-footer"><div class="field-label">${t('partDependencies')}</div><div class="chip-row">${chips(part.dependencies||[],'',true)||'—'}</div></div><details class="evidence" data-evidence-doc="${docIndex}" data-evidence-part="${partIndex}"><summary>${t('evidence')} <span>· ${fmt(fragments.length)} ${t('fragments')}</span></summary><div class="evidence-content"></div></details></article>`;
  }
  function hydrateEvidence(element) {
    if(!element.open||element.dataset.hydrated)return;
    const doc=state.current?.documents?.[Number(element.dataset.evidenceDoc)],part=doc?.definitionParts?.[Number(element.dataset.evidencePart)];if(!part)return;
    const map=new Map((doc.fragments||[]).map(f=>[f.id,f]));
    element.querySelector('.evidence-content').innerHTML=(part.fragmentIds||[]).map(id=>map.get(id)).filter(Boolean).map((fragment,index)=>renderFragment(fragment,part,index)).join('')||`<div class="missing">${t('sourceMissing')}</div>`;
    element.dataset.hydrated='true';
  }
  function renderFragment(fragment,part,index) {
    return `<section class="fragment"><div class="fragment-label"><span>${t('fragment')} ${index+1}</span><code>${escape(fragment.id)}</code></div><div class="fragment-quote">${escape(fragment.text)}</div>${renderArgumentation(fragment.argumentation)}<div class="minor-heading">${t('wsdHeading')}</div>${renderWsd(fragment.wsd,new Set(part.dependencies||[]))}</section>`;
  }
  function renderArgumentation(argumentation) {
    if(!argumentation)return `<div class="missing">${t('argumentationMissing')}</div>`;
    const a=argumentation.instantiated_phrase||argumentation.instantiated?.instantiated_phrase||argumentation.argumented_phrase||argumentation.phrase||'';
    const b=argumentation.instantiated_definition||argumentation.instantiated?.instantiated_definition||argumentation.argumented_definition||argumentation.definition||'';
    const args=argumentation.instantiated_args||argumentation.template_args||argumentation.context_placeholder_values||{};
    return `${a||b?`<div class="argumentation-pair">${a?`<div class="sentence-row"><span class="sentence-label">A</span><span class="sentence-text">${escape(a)}</span></div>`:''}${b?`<div class="sentence-row"><span class="sentence-label">B</span><span class="sentence-text">${escape(b)}</span></div>`:''}</div>`:''}${Object.keys(args).length?`<div class="field-label">${t('args')}</div><div class="args">${Object.entries(args).map(([key,value])=>`<span class="arg"><code>${escape(key)}</code> ${escape(typeof value==='string'?value:JSON.stringify(value))}</span>`).join('')}</div>`:''}<details class="full-json"><summary>${t('rawArgumentation')}</summary><pre class="raw-json">${escape(JSON.stringify(argumentation,null,2))}</pre></details>`;
  }
  function tokenIds(token) {
    const ids=token.canonical_synset_id||token.canonical_synset_ids||token.selected_synset_ids||token.selected_sense_ids||token.sense_ids||token.selected_synset_id||token.selected_sense_id||token.synset_id||token.sense_id;
    return Array.isArray(ids)?ids.filter(id=>typeof id==='string'):typeof ids==='string'?[ids]:[];
  }
  function renderWsd(wsd,dependencies) {
    if(!wsd)return `<div class="missing">${t('wsdMissing')}</div>`;
    const tokens=Array.isArray(wsd.tokens)?wsd.tokens:[];
    return `${wsd.sentence?`<p class="subtle-note">${escape(wsd.sentence)}</p>`:''}${tokens.length?`<div class="wsd-table-wrap"><table class="wsd-table"><thead><tr><th>${t('token')}</th><th>${t('selectedSense')}</th><th>${t('projection')}</th><th>${t('rationale')}</th></tr></thead><tbody>${tokens.map(token=>{
      const ids=tokenIds(token),outside=token.in_definition_scope===false;
      const status=String(token.projection_status||'');
      const projected=ids.length>0&&token.requires_definition_wsd===true&&token.in_graph===true&&ids.every(id=>dependencies.has(id));
      const scopeWarning=projected&&outside?`<span class="scope-label">${lang==='en'?'Source scope flag conflicts with the projected rule':'源记录 scope 标志冲突'}</span>`:'';
      const tokenChips=ids.map(id=>token.in_graph===false||!state.metadata.has(id)?`<span class="sense-chip mono" title="${lang==='en'?'Not a node in the current graph':'不属于当前图的节点'}">${escape(id)}</span>`:chip(id)).join('');
      return `<tr><td class="wsd-token">${escape(token.text||token.token||token.lemma||'—')}<small>${escape(token.spacy_pos||token.pos||token.wsd_role||'')}</small></td><td>${ids.length?`<div class="chip-row">${tokenChips}</div>${!projected?`<span class="scope-label">${t('scopeLabel')}</span>`:''}${scopeWarning}`:`<span class="subtle-note">${t('notSelected')}</span>`}</td><td class="wsd-status ${projected?'projected':ids.length?'scope':''}">${projected?t('projected'):ids.length?t('scopeOnly'):escape(token.decision||token.projection_status||'—')}<small class="subtle-note">${token.projection_status?`<br>${escape(token.projection_status)}`:''}</small></td><td class="wsd-rationale">${token.rationale?`<details><summary>${t('rationale')}</summary><p>${escape(token.rationale)}</p></details>`:'—'}</td></tr>`;
    }).join('')}</tbody></table></div>`:''}<details class="full-json"><summary>${t('rawWsd')}</summary><pre class="raw-json">${escape(JSON.stringify(wsd,null,2))}</pre></details>`;
  }
  function renderClause(clause,index,head,current='') {
    return `<div class="clause-card"><div class="clause-top"><strong>${t('clause')} ${index+1}</strong><span>${fmt(clause.length)} ${t('premises')}</span></div><div class="clause-expression"><div class="chip-row">${chips(clause,current,true)||'∅'}</div><span class="clause-arrow" aria-label="supports">→</span><div class="clause-head">${chip(head,current,false)}</div></div></div>`;
  }
  function renderDependencies(record,limit=12) {
    const clauses=record.clauses||[];
    return `<div class="section-heading"><h2>${t('dependsOn')}</h2><small>${fmt(clauses.length)} clauses</small></div><p class="panel-description">${t('depsIntro')}</p>${structuralOnly(record)?`<div class="operator-explainer">${t('operatorUsedText')}</div>`:''}${clauses.length?`<div class="relation-note">${t('relationCaution')}</div>${clauses.slice(0,limit).map((clause,index)=>`${index?'<div class="or-divider">OR</div>':''}${renderClause(clause,index,record.id)}`).join('')}${clauses.length>limit?`<button class="show-more" data-dependencies-more="${limit+12}">${t('loadMore')} · ${fmt(clauses.length-limit)}</button>`:''}`:`<div class="empty-state"><span class="empty-symbol">∅</span><h3>${t('noClauses')}</h3><p>${t('noDepsText')}</p></div>`}`;
  }
  function dependentsShell(record) {
    const count=record.dependents?.length||0;
    return `<div class="section-heading"><h2>${t('usedBy')}</h2><small>${fmt(count)} ${t('referencingSenses')}</small></div><p class="panel-description">${t('usedIntro')}</p>${structuralOnly(record)?`<div class="operator-explainer">${t('operatorUsedText')}</div>`:''}${count?`<div class="dependent-controls"><label class="sr-only" for="dependent-query">${t('filterDependents')}</label><input type="search" id="dependent-query" class="dependent-search" value="${escape(state.dependentQuery)}" placeholder="${t('filterDependents')}"><span class="dependent-count" id="dependent-count"></span></div><div id="dependent-results"></div><div id="dependent-pagination" class="relation-pagination"></div>`:`<div class="empty-state"><span class="empty-symbol">∅</span><h3>${t('noDependents')}</h3><p>${t('noDependentsText')}</p></div>`}`;
  }
  async function renderDependentPage(page=0) {
    const record=state.current;if(!record?.dependents?.length)return;
    const target=$('#dependent-results');if(!target)return;
    const epoch=++state.dependentEpoch;
    target.innerHTML=`<div class="inline-loading"><span class="spinner"></span>${t('loading')}</div>`;
    try {
      const result=await searchCall('dependents',{ids:record.dependents,query:state.dependentQuery,page});
      if(epoch!==state.dependentEpoch||state.current?.id!==record.id||!target.isConnected)return;
      remember(result.entries);state.dependentPage=result.page;
      $('#dependent-count').textContent=`${fmt(result.total)} ${t('results')}`;
      target.innerHTML=result.entries.length?`<div class="dependent-list">${result.entries.map(item=>`<article class="dependent-row" data-dependent-id="${escape(item.id)}"><div class="dependent-main"><a href="${href(item.id)}"><div class="dependent-name">${escape(item.lemmas.join(' / '))}<span class="result-pos">${escape(item.pos)}</span>${item.basis?'<span class="result-basis">BASIS</span>':''}</div><code>${escape(item.id)}</code><div class="dependent-definition">${escape(item.definition)}</div></a><button class="dependent-show" data-expand-dependent="${escape(item.id)}" aria-expanded="false">${t('showClause')}</button></div><div class="dependent-clauses" hidden></div></article>`).join('')}</div>`:`<div class="empty-state"><h3>${t('noDependentMatches')}</h3></div>`;
      $('#dependent-pagination').innerHTML=pagination(result.page,result.total,result.pageSize,'dependent');
    }catch(error){if(epoch===state.dependentEpoch&&target.isConnected)target.innerHTML=`<div class="error-box"><p>${escape(error.message)}</p><button data-action="retry-dependents" class="secondary-button">${t('retry')}</button></div>`;}
  }
  async function expandDependent(button,limit=12) {
    const row=button.closest('.dependent-row'),target=row.querySelector('.dependent-clauses'),id=button.dataset.expandDependent,current=state.current?.id;
    if(button.getAttribute('aria-expanded')==='true'&&limit===12){target.hidden=true;button.setAttribute('aria-expanded','false');button.textContent=t('showClause');return;}
    target.hidden=false;button.setAttribute('aria-expanded','true');button.textContent=t('hideClause');
    target.innerHTML=`<div class="inline-loading"><span class="spinner"></span>${t('loading')}</div>`;
    try{
      const record=await getRecord(id),clauses=(record.clauses||[]).map((clause,index)=>({clause,index})).filter(x=>x.clause.includes(current));
      await getMetadata([...new Set(clauses.slice(0,limit).flatMap(x=>x.clause))]);
      if(state.current?.id!==current||!target.isConnected)return;
      target.innerHTML=`<p class="subtle-note">${t('relationCaution')}</p>${clauses.slice(0,limit).map(({clause,index})=>renderClause(clause,index,id,current)).join('')}${clauses.length>limit?`<button class="show-more" data-dependent-more="${limit+12}">${t('loadMore')} · ${fmt(clauses.length-limit)}</button>`:''}`;
    }catch(error){if(target.isConnected)target.innerHTML=`<p class="missing">${escape(error.message)}</p>`;}
  }
  function selectTab(tab) {
    state.tab=tab;
    document.querySelectorAll('[data-tab]').forEach(button=>{const active=button.dataset.tab===tab;button.classList.toggle('active',active);button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
    document.querySelectorAll('.tab-panel').forEach(panel=>panel.hidden=panel.id!==`panel-${tab}`);
    if(tab==='dependents'&&!$('#dependent-results')?.children.length)renderDependentPage(state.dependentPage);
  }
  function openRecordJSON(){
    if(!state.current)return;
    const active=document.activeElement,dialog=document.createElement('dialog');
    dialog.className='json-dialog';
    const en=lang==='en';
    dialog.innerHTML=`<div class="json-dialog-header"><h2>${escape(state.current.id)} · JSON</h2><button type="button" class="secondary-button" data-json-close>${en?'Close':'关闭'}</button></div><p>${en?'This hosting environment may restrict direct downloads and clipboard access. View the complete JSON below, or select the text and use your browser’s Copy command.':'当前托管环境可能限制直接下载和自动复制。可以在下方查看完整 JSON，或选中文本后使用浏览器的复制功能。'}</p><div class="json-dialog-actions"><button type="button" class="secondary-button" data-json-select>${en?'Select all':'全选文本'}</button><button type="button" class="secondary-button" data-json-copy>${en?'Copy JSON':'复制 JSON'}</button><span role="status" data-json-status></span></div><textarea class="json-text" readonly spellcheck="false" wrap="off" aria-label="Complete sense JSON"></textarea>`;
    const area=dialog.querySelector('textarea');area.value=JSON.stringify(state.current,null,2);
    const select=()=>{area.focus();area.select();dialog.querySelector('[data-json-status]').textContent=en?'Text selected. Use Copy or Ctrl/Cmd+C.':'已选中，请使用复制或 Ctrl/Cmd+C。';};
    dialog.querySelector('[data-json-select]').addEventListener('click',select);
    dialog.querySelector('[data-json-copy]').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(area.value);dialog.querySelector('[data-json-status]').textContent=en?'JSON copied.':'已复制 JSON。';}catch(_){select();}});
    dialog.querySelector('[data-json-close]').addEventListener('click',()=>dialog.close());
    dialog.addEventListener('close',()=>{dialog.remove();if(active?.isConnected)active.focus();},{once:true});
    document.body.appendChild(dialog);dialog.showModal();
  }
  async function initialize() {
    applyLanguage();
    try {
      state.manifest=await window.Basis91Data.load('manifest');
      state.searchEngine=window.Basis91Search.create();
      await new Promise((resolve,reject)=>{
        state.searchEngine.onmessage=({data})=>{
          if(data.type==='ready'){state.ready=true;resolve();return;}
          if(data.type==='error'&&!data.requestId){reject(new Error(data.message));return;}
          const request=state.pending.get(data.requestId);if(!request)return;
          clearTimeout(request.timer);state.pending.delete(data.requestId);data.type==='error'?request.reject(new Error(data.message)):request.resolve(data);
        };
        state.searchEngine.onerror=event=>{reject(new Error(event.message||'Search engine failed.'));for(const request of state.pending.values()){clearTimeout(request.timer);request.reject(new Error('Search engine failed.'));}state.pending.clear();};
        state.searchEngine.postMessage({type:'init'});
      });
      ['#query','#pos-filter','#basis-filter'].forEach(selector=>$(selector).disabled=false);
      await Promise.all([search(),route()]);
    }catch(error){
      main.innerHTML=`<div class="error-box"><h2>${t('indexError')}</h2><p>${escape(error.message)}</p><button class="secondary-button" data-action="reload">${t('retry')}</button></div>`;
      $('#result-count').textContent=t('indexError');$('#search-results').innerHTML='';
    }
  }
  $('#search-form').addEventListener('submit',event=>{event.preventDefault();clearTimeout(searchTimer);search();});
  $('#query').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(()=>search(),160);});
  $('#pos-filter').addEventListener('change',()=>search());$('#basis-filter').addEventListener('change',()=>search());
  $('#reset-filters').addEventListener('click',()=>{$('#query').value='';$('#pos-filter').value='';$('#basis-filter').value='';search();});
  $('#language').addEventListener('click',()=>{lang=lang==='zh'?'en':'zh';applyLanguage();renderSearch();if(state.current)renderDetail();else if(state.ready)renderOverview();});
  $('#mobile-search').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('mobile-open');$('#mobile-search').setAttribute('aria-expanded',String(open));if(open)$('#query').focus();});
  document.addEventListener('input',event=>{if(event.target.id==='dependent-query'){state.dependentQuery=event.target.value;clearTimeout(dependentTimer);dependentTimer=setTimeout(()=>renderDependentPage(),160);}});
  document.addEventListener('toggle',event=>{const target=event.target;if(target.matches('.document'))hydrateDocument(target);else if(target.matches('.evidence'))hydrateEvidence(target);else if(target.matches('[data-raw-record]')&&target.open&&!target.dataset.hydrated){target.querySelector('div').innerHTML=`<pre class="raw-json">${escape(JSON.stringify(state.current,null,2))}</pre>`;target.dataset.hydrated='true';}},true);
  document.addEventListener('click',async event=>{
    if(event.target.closest('.skip-link')){event.preventDefault();main.focus();main.scrollIntoView({block:'start'});return;}
    const button=event.target.closest('button');if(!button)return;
    if(button.dataset.tab){selectTab(button.dataset.tab);return;}
    if(button.dataset.pageKind){const page=Number(button.dataset.page);button.dataset.pageKind==='search'?search(page):renderDependentPage(page);return;}
    if(button.dataset.documentMore!==undefined){hydrateDocument(button.closest('.document'),Number(button.dataset.limit));return;}
    if(button.dataset.dependenciesMore){$('#panel-dependencies').innerHTML=renderDependencies(state.current,Number(button.dataset.dependenciesMore));return;}
    if(button.dataset.expandDependent){expandDependent(button);return;}
    if(button.dataset.dependentMore){expandDependent(button.closest('.dependent-row').querySelector('[data-expand-dependent]'),Number(button.dataset.dependentMore));return;}
    if(button.dataset.action==='copy-link'){try{await navigator.clipboard.writeText(location.href);toast(t('copied'));}catch(_){toast(t('copyFailed'));}}
    if(button.dataset.action==='open-json')openRecordJSON();
    if(button.dataset.action==='retry-route')route();
    if(button.dataset.action==='retry-dependents')renderDependentPage(state.dependentPage);
    if(button.dataset.action==='reload')location.reload();
    if(button.dataset.action==='browse-basis'){$('#query').value='';$('#pos-filter').value='';$('#basis-filter').value='basis';search();if(matchMedia('(max-width:640px)').matches){$('#sidebar').classList.add('mobile-open');$('#mobile-search').setAttribute('aria-expanded','true');}$('#query').focus();}
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){event.preventDefault();if(matchMedia('(max-width:640px)').matches){$('#sidebar').classList.add('mobile-open');$('#mobile-search').setAttribute('aria-expanded','true');}$('#query').focus();}
    if(event.key==='Escape'){$('#sidebar').classList.remove('mobile-open');$('#mobile-search').setAttribute('aria-expanded','false');}
    if(event.target.matches('[data-tab]')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const tabs=[...document.querySelectorAll('[data-tab]')],index=tabs.indexOf(event.target),next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;selectTab(tabs[next].dataset.tab);tabs[next].focus();}
  });
  window.addEventListener('hashchange',route);
  initialize();
})();
