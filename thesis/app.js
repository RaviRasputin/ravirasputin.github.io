(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, attrs, text, parent) {
    var e = document.createElement(tag);
    for (var k in (attrs || {})) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function sv(tag, attrs, text, parent) {
    var e = document.createElementNS(NS, tag);
    for (var k in (attrs || {})) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }
  function detail(box, title, paras, facts) {
    box.innerHTML = '';
    el('h4', {}, title, box);
    (paras || []).forEach(function (t) { el('p', {}, t, box); });
    if (facts && facts.length) {
      var dl = el('dl', { 'class': 'facts' }, null, box);
      facts.forEach(function (f) { el('dt', {}, f[0], dl); el('dd', {}, f[1], dl); });
    }
  }
  var INK = '#14213d', MUTED = '#5b6578', RULE = '#c9c5b6', SAF = '#c9650a', TEAL = '#0b7285', ALERT = '#b3261e', PLUM = '#6b4a9e', OK = '#2f7d4f', PANEL = '#fbfaf6';

  /* ---------- 1. Causal pathway ---------- */
  var PATH = [
    { t: 'Perceived status deficit', s: 'The gap between capability and recognition', p: ['A state sees a gap between what it can do and the standing others give it. This is the starting condition. In the thesis it is documented as present in every episode and is the best available account of motive, but the design cannot show that it caused the behaviour.'], f: [['Proposition', 'P1: status is relational'], ['Hypothesis', 'H1']] },
    { t: 'Read the hierarchy', s: 'Openness and legitimacy', p: ['The state asks two questions of the existing regional order. Is it open to our claims? Are the standards it applies fair? Both answers are perceptions. The thesis codes them from evidence dated before each outcome, so the result cannot be read back into the coding.'], f: [['Proposition', 'P3'], ['Hypothesis', 'H2'], ['Coding', 'Appendix A protocol']] },
    { t: 'Select a mechanism', s: 'Expansive, contractive or hedging', p: ['The two readings select the strategy. Open and legitimate favours expansion. Open but illegitimate favours contraction. Closed but legitimate favours hedging. The shifts track the configuration, not material capability.'], f: [['Proposition', 'P3 and P4'], ['Hypothesis', 'H2, H3']] },
    { t: 'Use the instruments', s: 'Expand, rebrand, layer', p: ['Three tools carry the strategy out. Geographic expansion redraws the boundary. Normative rebranding changes the identity the region offers. Institutional layering creates a parallel hierarchy in which the state’s leadership is structurally favoured.'], f: [['Proposition', 'P2: regions as social closure'], ['Hypothesis', 'H4']] },
    { t: 'Status returns, bounded', s: 'A residual deficit remains', p: ['The recognition gained is real and limited. Four conditions found in the four cases do the limiting: ideational overcommitment, material asymmetry, structural resistance and great-power polarisation. What is left of the deficit sustains the next round of investment.'], f: [['Proposition', 'P5 (qualified)'], ['Hypothesis', 'H5'], ['Limits', 'M2 to M5']] },
    { t: 'World-order context', s: 'Moderates the reading', p: ['World-order transitions change perceived openness and legitimacy at the same time. Three of the four episodes open inside such a window. The contractive episode does not: its turn answers to conditions inside the regional framework.'], f: [['Proposition', 'P4'], ['Hypothesis', 'H3a and H3b']] }
  ];
  var pathSvg = $('#pathsvg'), pathOut = $('#pathOut'), pathDots = $('#pathDots'), pathNodes = [], pathIdx = 0, pathTimer = null;
  (function () {
    var x = [10, 175, 340, 505, 670], y = 125, w = 140, h = 80;
    var defs = sv('defs', {}, null, pathSvg);
    var m = sv('marker', { id: 'ar', viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' }, null, defs);
    sv('path', { d: 'M0 0L10 5L0 10z', fill: MUTED }, null, m);
    function box(i, bx, by) {
      var g = sv('g', { tabindex: 0, role: 'button', 'aria-label': PATH[i].t, style: 'cursor:pointer' }, null, pathSvg);
      var r = sv('rect', { x: bx, y: by, width: w, height: h, rx: 6, fill: PANEL, stroke: INK, 'stroke-width': 1.5 }, null, g);
      var words = PATH[i].t.split(' '), mid = Math.ceil(words.length / 2);
      var l1 = words.slice(0, mid).join(' '), l2 = words.slice(mid).join(' ');
      sv('text', { x: bx + w / 2, y: by + 34, 'text-anchor': 'middle', 'font-family': 'Bricolage Grotesque,system-ui,sans-serif', 'font-weight': 700, 'font-size': 14, fill: INK }, l1, g);
      sv('text', { x: bx + w / 2, y: by + 52, 'text-anchor': 'middle', 'font-family': 'Bricolage Grotesque,system-ui,sans-serif', 'font-weight': 700, 'font-size': 14, fill: INK }, l2, g);
      sv('text', { x: bx + w / 2, y: by + 70, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono,monospace', 'font-size': 9, fill: MUTED }, 'step ' + (i < 5 ? i + 1 : 'ctx'), g);
      g.addEventListener('click', function () { stop(); showPath(i); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stop(); showPath(i); } });
      pathNodes[i] = r;
    }
    for (var i = 0; i < 5; i++) box(i, x[i], y);
    box(5, 340, 10);
    for (var j = 0; j < 4; j++) sv('line', { x1: x[j] + w + 2, y1: y + h / 2, x2: x[j + 1] - 3, y2: y + h / 2, stroke: MUTED, 'stroke-width': 1.5, 'marker-end': 'url(#ar)' }, null, pathSvg);
    sv('path', { d: 'M480 90 L480 118', stroke: MUTED, 'stroke-width': 1.5, fill: 'none', 'stroke-dasharray': '4 3', 'marker-end': 'url(#ar)' }, null, pathSvg);
    sv('path', { d: 'M740 207 L740 290 L80 290 L80 210', stroke: SAF, 'stroke-width': 1.8, fill: 'none', 'stroke-dasharray': '6 4', 'marker-end': 'url(#ar)' }, null, pathSvg);
    sv('text', { x: 410, y: 284, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono,monospace', 'font-size': 10, fill: SAF }, 'residual deficit sustains further investment', pathSvg);
    sv('text', { x: 742, y: 238, 'font-family': 'IBM Plex Mono,monospace', 'font-size': 9, fill: MUTED }, 'bounded by M2–M5', pathSvg);
  })();
  PATH.forEach(function (p, i) {
    var b = el('button', { 'class': 'dot', type: 'button', 'aria-label': p.t }, i < 5 ? String(i + 1) : 'ctx', pathDots);
    b.addEventListener('click', function () { stop(); showPath(i); });
  });
  function showPath(i) {
    pathIdx = i;
    pathNodes.forEach(function (r, k) { r.setAttribute('fill', k === i ? '#f6dcc0' : PANEL); r.setAttribute('stroke', k === i ? SAF : INK); r.setAttribute('stroke-width', k === i ? 2.5 : 1.5); });
    $$('.dot', pathDots).forEach(function (b, k) { b.classList.toggle('on', k === i); });
    detail(pathOut, PATH[i].t + ': ' + PATH[i].s, PATH[i].p, PATH[i].f);
  }
  function stop() { if (pathTimer) { clearInterval(pathTimer); pathTimer = null; $('#pathPlay').textContent = 'Play'; } }
  $('#pathPlay').addEventListener('click', function () {
    if (pathTimer) { stop(); return; }
    this.textContent = 'Pause'; showPath(0); var k = 0;
    pathTimer = setInterval(function () { k++; if (k > 4) { stop(); return; } showPath(k); }, 2600);
  });
  showPath(0);

  /* ---------- 2. Matrix ---------- */
  var CELL = {
    c1: { t: 'Configuration 1: open and legitimate', m: 'Expansive', p: ['The hierarchy is seen as open to the state’s claims and its standards as fair, so the state works to widen the frame and join in.'], f: [['Cases', 'Nehruvian 1945–59; Look East 1991–2005'], ['Qualified by', 'M2 in Case 1; M3 in Case 3']] },
    c2: { t: 'Configuration 2: closed but legitimate', m: 'Hedging', p: ['The standards are accepted but the top rank stays closed, so the state spreads its commitments across several groupings and keeps options open.'], f: [['Case', 'Indo-Pacific 2014–'], ['Limited by', 'M5: great-power polarisation']] },
    c3: { t: 'Configuration 3: open but illegitimate', m: 'Contractive', p: ['The door is open but the rules are seen as unfair, so the state narrows its focus to a smaller frame it can shape.'], f: [['Case', 'SAARC to BIMSTEC 1985–'], ['Limited by', 'M4: structural resistance']] },
    c4: { t: 'Configuration 4: closed and illegitimate', m: 'Competitive re-engineering', p: ['Both readings turn adverse. The prediction is that the state builds alternative institutions meant to displace the existing ones, not reform them.', 'No Indian case reaches this cell. The nearest approaches, the UN Security Council reform campaign and BRICS, are read as staying inside the existing order.'], f: [['Case', 'None: theoretically specified, not tested']] }
  };
  var mx = $('#mxsvg'), mxOut = $('#mxOut'), mxCells = {};
  (function () {
    var L = 110, T = 20, W = 330, H = 150, G = 10;
    var pos = { c2: [L, T], c1: [L + W + G, T], c4: [L, T + H + G], c3: [L + W + G, T + H + G] };
    var fill = { c1: '#d7e9ee', c2: '#e6dff0', c3: '#f0d6d2', c4: '#fbfaf6' };
    Object.keys(pos).forEach(function (k) {
      var g = sv('g', { tabindex: 0, role: 'button', 'aria-label': CELL[k].t, style: 'cursor:pointer' }, null, mx);
      var r = sv('rect', { x: pos[k][0], y: pos[k][1], width: W, height: H, rx: 8, fill: fill[k], stroke: INK, 'stroke-width': 1.5, 'stroke-dasharray': k === 'c4' ? '6 4' : '' }, null, g);
      sv('text', { x: pos[k][0] + 14, y: pos[k][1] + 24, 'font-family': 'IBM Plex Mono,monospace', 'font-size': 10, fill: MUTED }, 'CONFIGURATION ' + k.slice(1), g);
      sv('text', { x: pos[k][0] + 14, y: pos[k][1] + 56, 'font-family': 'Bricolage Grotesque,sans-serif', 'font-weight': 700, 'font-size': 22, fill: INK }, CELL[k].m, g);
      sv('text', { x: pos[k][0] + 14, y: pos[k][1] + 78, 'font-family': 'Source Serif 4,Georgia,serif', 'font-size': 13, fill: INK, 'font-style': 'italic' }, { c1: 'open + legitimate', c2: 'closed + legitimate', c3: 'open + illegitimate', c4: 'closed + illegitimate (not tested)' }[k], g);
      g.addEventListener('click', function () { showCell(k); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showCell(k); } });
      mxCells[k] = r;
    });
    function dot(k, label, dx, dy) {
      var x = pos[k][0] + dx, y = pos[k][1] + dy;
      sv('circle', { cx: x, cy: y, r: 6, fill: SAF, stroke: '#fff', 'stroke-width': 1.5, 'pointer-events': 'none' }, null, mx);
      sv('text', { x: x + 11, y: y + 4, 'font-family': 'Bricolage Grotesque,sans-serif', 'font-size': 12, 'font-weight': 600, fill: INK, 'pointer-events': 'none' }, label, mx);
    }
    dot('c1', 'Nehruvian 1945–59', 22, 108); dot('c1', 'Look East 1991–2005', 22, 132);
    dot('c2', 'Indo-Pacific 2014–', 22, 120); dot('c3', 'SAARC–BIMSTEC 1985–', 22, 120);
    sv('text', { x: 20, y: T + H, 'text-anchor': 'middle', transform: 'rotate(-90 20 ' + (T + H) + ')', 'font-family': 'IBM Plex Mono,monospace', 'font-size': 10, fill: MUTED }, 'PERCEIVED LEGITIMACY  (high ↑ / low ↓)', mx);
    sv('text', { x: L + W + G / 2, y: T + 2 * H + G + 34, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono,monospace', 'font-size': 10, fill: MUTED }, '← CLOSED      PERCEIVED OPENNESS      OPEN →', mx);
  })();
  function showCell(k) {
    Object.keys(mxCells).forEach(function (c) { mxCells[c].setAttribute('stroke', c === k ? SAF : INK); mxCells[c].setAttribute('stroke-width', c === k ? 3.5 : 1.5); });
    detail(mxOut, CELL[k].t + ' → ' + CELL[k].m, CELL[k].p, CELL[k].f);
  }
  showCell('c1');

  /* ---------- 3. Frames on the map ---------- */
  var FR = [
    { id: 'pan', n: 'Pan-Asian, 1947–62', c: '#14213d', r: [101, 31, 1016, 466], p: 'The frame of Nehru’s Asian project: the Asian Relations Conference of 1947, then Bandung and non-alignment. India sought standing as a leader of a continent, not as one member of the Commonwealth or the West’s order.' },
    { id: 'saarc', n: 'South Asian (SAARC), 1985–', c: '#c4161c', r: [355, 91, 322, 279], p: 'The frame India has taken as its natural neighbourhood. After 2016 India shifted weight away from it, because a framework in which one neighbour held a veto had become unworkable.' },
    { id: 'east', n: 'Look East (ASEAN), 1991–2005', c: '#6b4a9e', r: [482, 166, 558, 339], p: 'The frame set out in Rao’s 1994 Singapore lecture. India entered the ASEAN-centred architecture step by step and gained standing there, up to the ceiling set by its material gap with China.' },
    { id: 'indo', n: 'Indo-Pacific, 2014–', c: '#1789a5', r: [17, 73, 1185, 678], p: 'The widest frame, from the African coast to the western Pacific. It lets India sit among several powers at once, which is the hedging logic.' }
  ];
  var fsvg = $('#frameSvg'), fOut = $('#frameOut'), fChips = $('#frameChips');
  function showFrame(id) {
    fsvg.innerHTML = '';
    $$('.chip', fChips).forEach(function (b) { b.classList.toggle('on', b.dataset.id === id); });
    if (id === 'all') { detail(fOut, 'Four frames, four regions', ['The same state, within one lifetime, claimed four different regions. Select a frame to highlight it.']); return; }
    var f = FR.filter(function (x) { return x.id === id; })[0];
    sv('rect', { x: f.r[0], y: f.r[1], width: f.r[2], height: f.r[3], fill: f.c, 'fill-opacity': .16, stroke: f.c, 'stroke-width': 7 }, null, fsvg);
    detail(fOut, f.n, [f.p]);
  }
  [{ id: 'all', n: 'All four' }].concat(FR).forEach(function (f) {
    var b = el('button', { 'class': 'chip', type: 'button', 'data-id': f.id }, null, fChips);
    if (f.c) { var i = el('i', {}, null, b); i.style.background = f.c; }
    b.appendChild(document.createTextNode(f.n));
    b.addEventListener('click', function () { showFrame(f.id); });
  });
  showFrame('all');

  /* ---------- 4. Timeline ---------- */
  var tl = $('#tlsvg'), tlOut = $('#tlOut'), tlYear = $('#tlYear'), X0 = 40, X1 = 800, Y0 = 1945, Y1 = 2025;
  function X(y) { return X0 + (y - Y0) * (X1 - X0) / (Y1 - Y0); }
  var ERAS = [
    { n: 'Decolonisation', a: 1945, b: 1959, c: '#f3e3bf', tr: true, d: 'A transition window. The post-imperial hierarchy was open to new claims.' },
    { n: 'Cold War bipolarity', a: 1959, b: 1990, c: '#e4e1d6', tr: false, d: 'A stable bipolar order.' },
    { n: 'Post-Cold War', a: 1990, b: 1996, c: '#f3e3bf', tr: true, d: 'A transition window after the Soviet collapse.' },
    { n: 'Unipolar', a: 1996, b: 2012, c: '#e4e1d6', tr: false, d: 'A stable unipolar order.' },
    { n: 'Multiplex', a: 2012, b: 2025, c: '#f3e3bf', tr: true, d: 'An emerging multiplex order, a process more than an event.' }
  ];
  var CASEBARS = [
    { n: 'Case 1 Nehruvian (expansive)', a: 1945, b: 1962, c: TEAL, y: 30 },
    { n: 'Case 2 SAARC–BIMSTEC (contractive)', a: 1985, b: 2025, c: ALERT, y: 78 },
    { n: 'Case 3 Look East (expansive)', a: 1991, b: 2005, c: TEAL, y: 126 },
    { n: 'Case 4 Indo-Pacific (hedging)', a: 2014, b: 2025, c: PLUM, y: 174 }
  ];
  var cur;
  (function () {
    ERAS.forEach(function (e) {
      if (e.tr) sv('rect', { x: X(e.a), y: 14, width: X(e.b) - X(e.a), height: 196, fill: '#f3e3bf', 'fill-opacity': .55 }, null, tl);
      sv('rect', { x: X(e.a), y: 232, width: X(e.b) - X(e.a), height: 34, fill: e.c, stroke: RULE }, null, tl);
      var w = X(e.b) - X(e.a);
      sv('text', { x: X(e.a) + w / 2, y: 253, 'text-anchor': 'middle', 'font-family': 'Bricolage Grotesque,sans-serif', 'font-size': w < 60 ? 8 : 11, fill: INK }, w < 40 ? 'PCW' : e.n, tl);
    });
    for (var y = 1945; y <= 2025; y += 10) {
      sv('line', { x1: X(y), x2: X(y), y1: 212, y2: 218, stroke: MUTED }, null, tl);
      sv('text', { x: X(y), y: 228, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono,monospace', 'font-size': 9, fill: MUTED }, String(y), tl);
    }
    CASEBARS.forEach(function (c) {
      sv('rect', { x: X(c.a), y: c.y + 14, width: X(c.b) - X(c.a), height: 20, rx: 3, fill: c.c }, null, tl);
      sv('text', { x: Math.min(X(c.a), 560), y: c.y + 9, 'font-family': 'Bricolage Grotesque,sans-serif', 'font-size': 11, 'font-weight': 600, fill: INK }, c.n, tl);
    });
    sv('text', { x: 40, y: 288, 'font-family': 'IBM Plex Mono,monospace', 'font-size': 9, fill: MUTED }, 'Shaded bands are world-order transitions. Era boundaries are approximate.', tl);
    cur = sv('line', { y1: 8, y2: 212, stroke: ALERT, 'stroke-width': 2 }, null, tl);
  })();
  function showYear(y) {
    y = +y; cur.setAttribute('x1', X(y)); cur.setAttribute('x2', X(y));
    var era = ERAS.filter(function (e) { return y >= e.a && y <= e.b; });
    era = era.length ? era[era.length - 1] : ERAS[0];
    var act = CASEBARS.filter(function (c) { return y >= c.a && y <= c.b; }).map(function (c) { return c.n; });
    detail(tlOut, y + ': ' + era.n, [era.d + (era.tr ? ' Three of the four cases open in windows like this (hypothesis H3a).' : '')], [['Cases under way', act.length ? act.join('; ') : 'None'], ['Reading', era.tr ? 'Transition window' : 'Stable period']]);
  }
  tlYear.addEventListener('input', function () { showYear(tlYear.value); });
  showYear(1955);

  /* ---------- 5. Case files ---------- */
  var CASES = [
    { k: 'Case 1', n: 'Nehru’s Asia', y: '1945–1962', badge: ['Expansive', 'k-exp'], cfg: 'Configuration 1: open and legitimate', ctx: 'Decolonisation window', bound: 'M2: ideational overcommitment',
      p: ['India tried to widen the frame from the Commonwealth and the West to a whole continent. The Asian Relations Conference (1947) and Bandung (1955), then the non-aligned movement, were the vehicles.', 'The 1962 war marks where the theory meets a limit. The record of October and November 1962 shows a leader so attached to his own framework that it produced the failures a status-maximiser would have avoided. The thesis reads the configuration as closing after 1959.'],
      ev: 'Direct: Nehru’s speeches, letters and parliamentary statements state the status frame openly.', map: 'bandung' },
    { k: 'Case 2', n: 'SAARC to BIMSTEC', y: '1985–present', badge: ['Contractive', 'k-con'], cfg: 'Configuration 3: open but illegitimate', ctx: 'Internal to the regional framework', bound: 'M4: structural resistance',
      p: ['After the 2016 cancellation of the Islamabad summit and India’s UN General Assembly address that year, India moved weight to a Bay of Bengal grouping. The Goa outreach of October 2016 made the intent plain.', 'The substitution removes Pakistan, Afghanistan and the Maldives from the frame and adds Myanmar and Thailand. The Bangladesh question shows the limits of replacing one framework with another.'],
      ev: 'Reconstructive: the status frame is absent from official discourse and is inferred from behaviour.', map: 'saarc' },
    { k: 'Case 3', n: 'Look East', y: '1991–2005', badge: ['Expansive', 'k-exp'], cfg: 'Configuration 1: open and legitimate', ctx: 'Post-Cold War transition', bound: 'M3: material asymmetry',
      p: ['Rao’s September 1994 lecture in Singapore set the doctrine. India then climbed every rung ASEAN offered: sectoral partner in 1992, full dialogue partner in 1995, the ASEAN Regional Forum in 1996, summit-level partnership in 2002, the Treaty of Amity in 2003 and the East Asia Summit in 2005.', 'There was a three-year delay between the Soviet collapse and strategic consolidation. The economic crisis supplied feasibility, not motive. The ceiling shows in the trade and partnership data below.'],
      ev: 'Reconstructive, with a thinner primary record than the other cases.', map: null },
    { k: 'Case 4', n: 'Indo-Pacific and the QUAD', y: '2014–present', badge: ['Hedging', 'k-hed'], cfg: 'Configuration 2: closed but legitimate', ctx: 'Emerging multiplex order', bound: 'M5: great-power polarisation',
      p: ['The 2018 Shangri-La address set the doctrine. The “inclusive” qualifier and the emphasis on ASEAN centrality were anticipated in ASEAN’s own documents, entered the QUAD’s first leaders’ statement in 2021 and drew France’s endorsement of India’s Indo-Pacific Oceans Initiative.', 'The Ukraine war tested strategic autonomy, and the thesis also takes up a 2025–26 stress test. It credits India with identifiable contributions short of authorship of the Indo-Pacific concept.'],
      ev: 'Reconstructive: explicit status language is scrubbed from the discourse and is implicit in a multi-audience architecture.', map: null }
  ];
  var cTabs = $('#caseTabs'), cBody = $('#caseBody');
  function showCase(i) {
    $$('.tab', cTabs).forEach(function (b, k) { b.classList.toggle('on', k === i); });
    var c = CASES[i]; cBody.innerHTML = '';
    var head = el('div', {}, null, cBody);
    el('p', { 'class': 'fig-t' }, c.k + ' · ' + c.y, head);
    el('h4', {}, c.n, head).appendChild(document.createTextNode(' '));
    el('span', { 'class': 'badge ' + c.badge[1] }, c.badge[0], head.lastChild);
    c.p.forEach(function (t) { el('p', {}, t, cBody); });
    var dl = el('dl', { 'class': 'facts' }, null, cBody);
    [['Configuration', c.cfg], ['World-order context', c.ctx], ['What bounded the returns', c.bound], ['Evidence standard', c.ev]].forEach(function (f) { el('dt', {}, f[0], dl); el('dd', {}, f[1], dl); });
    if (c.map === 'bandung') {
      var f = el('div', { 'class': 'fig', style: 'margin-top:16px' }, null, cBody);
      el('p', { 'class': 'fig-t' }, 'Map 4.1 · Participants in the Bandung Conference, 1955', f);
      var im = el('img', { src: 'maps/map-4-1.jpg', alt: 'Map of Asia and Africa with the 1955 Bandung Conference participants shaded and India in orange', width: 1672, height: 748, loading: 'lazy' }, null, f);
      el('p', { 'class': 'cap' }, 'The map shows the community India was convening eight years after independence, and its distance from the European frame in which India’s standing had been judged. North and South Vietnam attended as separate delegations and are shown here as one polygon.', f);
    }
    if (c.map === 'saarc') {
      var f2 = el('div', { 'class': 'fig', style: 'margin-top:16px' }, null, cBody);
      el('p', { 'class': 'fig-t' }, 'Map 4.2 · SAARC and BIMSTEC membership compared', f2);
      var wrap = el('div', { style: 'display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:18px;align-items:start' }, null, f2);
      el('img', { src: 'maps/map-4-2.jpg', alt: 'Map of South Asia and Southeast Asia: Pakistan, Afghanistan and the Maldives in blue (SAARC only), Myanmar and Thailand in purple (BIMSTEC only), India and the rest in orange (both)', width: 961, height: 927, loading: 'lazy' }, null, wrap);
      var side = el('div', {}, null, wrap);
      [['Both', ['India', 'Bangladesh', 'Bhutan', 'Nepal', 'Sri Lanka'], SAF], ['SAARC only', ['Pakistan', 'Afghanistan', 'Maldives'], '#6fa1bf'], ['BIMSTEC only', ['Myanmar', 'Thailand'], PLUM]].forEach(function (g) {
        el('p', { 'class': 'fig-t', style: 'margin-top:8px' }, g[0], side);
        var row = el('div', { 'class': 'chips' }, null, side);
        g[1].forEach(function (n) { var s = el('span', { 'class': 'chip', style: 'cursor:default;color:#14213d' }, null, row); var i = el('i', {}, null, s); i.style.background = g[2]; s.appendChild(document.createTextNode(n)); });
      });
      el('p', { 'class': 'cap', style: 'margin-top:10px' }, 'The substitution drops the state whose veto made the original framework unworkable and adds two Southeast Asian members. That is the membership effect the thesis’s closure hypothesis (H4) predicts.', side);
      var mq = window.matchMedia('(max-width:640px)'); function lay() { wrap.style.gridTemplateColumns = mq.matches ? '1fr' : 'minmax(0,1.1fr) minmax(0,1fr)'; } lay(); if (mq.addEventListener) mq.addEventListener('change', lay);
    }
  }
  CASES.forEach(function (c, i) {
    var b = el('button', { 'class': 'tab', type: 'button', role: 'tab' }, null, cTabs);
    el('b', {}, c.k + ' · ' + c.n, b); el('span', {}, c.y, b);
    b.addEventListener('click', function () { showCase(i); });
  });
  showCase(0);

  /* ---------- 6. Status deficit ---------- */
  var DEF = [
    { y: 1950, g: null, ppp: 6, mil: null, nuc: 'None', unsc: 'No', g8: '— (G7 from 1975)', g20: '—', apec: '—', nsg: '—', asean: '—' },
    { y: 1995, g: 16, ppp: 5, mil: 13, nuc: 'Undeclared capability (1974 test)', unsc: 'No', g8: 'No', g20: '—', apec: 'No', nsg: 'No', asean: 'ASEAN full dialogue partner (1995)' },
    { y: 2005, g: 13, ppp: 4, mil: 11, nuc: 'Declared (1998); outside the NPT', unsc: 'No', g8: 'Outreach invitee (from 2003)', g20: 'Member (finance)', apec: 'No', nsg: 'No', asean: 'ARF (1996); EAS founding member (2005)' },
    { y: 2015, g: 7, ppp: 3, mil: 6, nuc: 'Declared; NSG waiver (2008)', unsc: 'No', g8: 'No', g20: 'Member (leaders)', apec: 'No', nsg: 'No', asean: 'ARF; EAS; QUAD dormant' },
    { y: 2024, g: 5, ppp: 3, mil: 5, nuc: 'Declared', unsc: 'No', g8: 'Invitee at each summit since 2019', g20: 'Member; presidency 2023', apec: 'No', nsg: 'No (bid blocked 2016)', asean: 'ARF; EAS; QUAD at leaders’ level from 2021' }
  ];
  var dChips = $('#defChips'), dBars = $('#defBars'), dTable = $('#defTable');
  (function () {
    var th = el('tr', {}, null, el('thead', {}, null, dTable));
    ['Year', 'GDP rank (market)', 'GDP rank (PPP)', 'Military spending rank', 'Nuclear status', 'UNSC permanent seat', 'G7/G8 outreach', 'G20', 'APEC', 'NSG', 'ASEAN-centred bodies; QUAD'].forEach(function (t) { el('th', {}, t, th); });
    var tb = el('tbody', {}, null, dTable);
    DEF.forEach(function (d) {
      var r = el('tr', { 'data-y': d.y }, null, tb);
      [d.y, d.g ? d.g + 'th' : '—', d.ppp + 'th', d.mil ? d.mil + 'th' : '—', d.nuc, d.unsc, d.g8, d.g20, d.apec, d.nsg, d.asean].forEach(function (v) { el('td', {}, String(v), r); });
    });
    DEF.forEach(function (d) {
      var b = el('button', { 'class': 'chip', type: 'button', 'data-y': d.y }, String(d.y), dChips);
      b.addEventListener('click', function () { showDef(d.y); });
    });
  })();
  function showDef(y) {
    var d = DEF.filter(function (x) { return x.y === y; })[0];
    $$('.chip', dChips).forEach(function (b) { b.classList.toggle('on', +b.dataset.y === y); });
    $$('#defTable tbody tr').forEach(function (r) { r.classList.toggle('on', +r.dataset.y === y); });
    dBars.innerHTML = '';
    var wrap = el('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:6px 0 14px' }, null, dBars);
    [['GDP rank, market rates', d.g], ['GDP rank, PPP', d.ppp], ['Military spending rank', d.mil]].forEach(function (m) {
      var box = el('div', {}, null, wrap);
      el('p', { 'class': 'fig-t', style: 'margin-bottom:4px' }, m[0], box);
      var big = el('div', { 'class': 'big' }, m[1] ? m[1] + 'th' : 'n/a', box);
      var track = el('div', { style: 'height:12px;background:#e4e1d6;border-radius:3px;margin-top:6px' }, null, box);
      el('div', { style: 'height:12px;border-radius:3px;background:' + SAF + ';width:' + (m[1] ? Math.round((21 - m[1]) / 20 * 100) : 0) + '%;transition:width .4s' }, null, track);
    });
    var rec = el('p', { 'class': 'cap' }, null, dBars);
    rec.innerHTML = '';
    rec.appendChild(document.createTextNode('Recognition in ' + y + ': permanent UN Security Council seat – ' + d.unsc + '; NSG – ' + d.nsg + '; APEC – ' + d.apec + '. ASEAN-centred bodies: ' + d.asean + '.'));
  }
  showDef(1995);

  /* ---------- 7. Recognition ceiling ---------- */
  (function () {
    var rows = [[2000, 10.0, 39.5, 25.3, 'Sectoral Dialogue Partner (1992); Full Dialogue Partner (1995); ARF member (1996)'], [2003, 12.1, 59.6, 20.3, 'Summit-level partnership (2002); Treaty of Amity and Cooperation; framework agreement on economic cooperation (2003)'], [2015, 58.5, 345.0, 17.0, 'Accession sequence complete: founding member of the East Asia Summit (2005); no further rung sought']];
    var box = $('#tradeChart');
    rows.forEach(function (r) {
      var row = el('div', { style: 'margin:0 0 16px' }, null, box);
      el('p', { 'class': 'fig-t', style: 'margin-bottom:4px' }, r[0] + ' · India’s trade is ' + r[3].toFixed(1) + '% of China’s', row);
      [['India', r[1], SAF], ['China', r[2], '#14213d']].forEach(function (s) {
        var line = el('div', { style: 'display:grid;grid-template-columns:48px 1fr 70px;gap:8px;align-items:center;margin:3px 0;font-family:var(--display);font-size:.84rem' }, null, row);
        el('span', {}, s[0], line);
        var tr = el('div', { style: 'height:14px;background:#e4e1d6;border-radius:3px' }, null, line);
        el('div', { style: 'height:14px;border-radius:3px;background:' + s[2] + ';width:' + Math.max(1.5, s[1] / 345 * 100) + '%' }, null, tr);
        el('span', { style: 'text-align:right' }, '$' + s[1].toFixed(1) + 'bn', line);
      });
      el('p', { 'class': 'cap', style: 'margin:4px 0 0;font-size:.88rem;color:' + MUTED }, 'Institutional position: ' + r[4], row);
    });
    var d = $('#dumbSvg');
    var ROWS = [['Full dialogue partnership', 1996, 1995], ['Trade-in-goods agreement in force', 2005, 2010], ['Strategic partnership', 2003, 2012], ['Comprehensive strategic partnership', 2021, 2022]];
    var A = 270, B = 780, Y0d = 1993, Y1d = 2024;
    function DX(y) { return A + (y - Y0d) * (B - A) / (Y1d - Y0d); }
    for (var y = 1995; y <= 2020; y += 5) { sv('line', { x1: DX(y), x2: DX(y), y1: 30, y2: 190, stroke: RULE, 'stroke-dasharray': '2 3' }, null, d); sv('text', { x: DX(y), y: 208, 'text-anchor': 'middle', 'font-family': 'IBM Plex Mono,monospace', 'font-size': 10, fill: MUTED }, String(y), d); }
    ROWS.forEach(function (r, i) {
      var yy = 50 + i * 40;
      sv('text', { x: 6, y: yy + 4, 'font-family': 'Bricolage Grotesque,sans-serif', 'font-size': 12, fill: INK }, r[0], d);
      sv('line', { x1: DX(r[1]), x2: DX(r[2]), y1: yy, y2: yy, stroke: MUTED, 'stroke-width': 3 }, null, d);
      sv('circle', { cx: DX(r[1]), cy: yy, r: 7, fill: '#14213d' }, null, d);
      sv('circle', { cx: DX(r[2]), cy: yy, r: 7, fill: SAF }, null, d);
      var ahead = r[2] < r[1] ? 'India ahead' : 'India behind';
      sv('text', { x: Math.max(DX(r[1]), DX(r[2])) + 14, y: yy + 4, 'font-family': 'IBM Plex Mono,monospace', 'font-size': 10, fill: MUTED }, ahead + ' by ' + Math.abs(r[2] - r[1]) + (Math.abs(r[2] - r[1]) === 1 ? ' year' : ' years'), d);
    });
    sv('circle', { cx: 290, cy: 232, r: 6, fill: '#14213d' }, null, d); sv('text', { x: 302, y: 236, 'font-family': 'Bricolage Grotesque,sans-serif', 'font-size': 12, fill: INK }, 'China', d);
    sv('circle', { cx: 370, cy: 232, r: 6, fill: SAF }, null, d); sv('text', { x: 382, y: 236, 'font-family': 'Bricolage Grotesque,sans-serif', 'font-size': 12, fill: INK }, 'India', d);
    var note = el('p', { 'class': 'cap' }, 'Two further rows are not dated. In the community-building bodies China sat in ASEAN Plus Three, the main vehicle, while India was in the East Asia Summit only, an outer tier. China signed the Regional Comprehensive Economic Partnership in 2020, and India withdrew in 2019.', null);
    d.parentNode.insertBefore(note, d.nextSibling);
  })();

  /* ---------- 8. Hypotheses ---------- */
  var VERD = { dir: ['Direct support', '#cfe6d8', 'Support from deliberative primary evidence.'], rec: ['Reconstructive support', '#d7e6ee', 'Support under the weaker standard of inferring from behaviour.'], qua: ['Qualified support', '#f3e3bf', 'Support subject to a stated modification.'], lim: ['Limited support', '#e8dfef', 'The case falls outside the hypothesis’s specified conditions.'], out: ['Not within scope', '#e4e1d6', 'The hypothesis’s conditions do not obtain, so there is no test either way.'], con: ['Consistent, case-generated', '#f0d6d2', 'Formulated to fit this case, so it carries no evidentiary weight.'], par: ['Partial disconfirmation', '#efc9c4', 'Conditions obtain and the evidence runs against the hypothesis. Not used in the final table.'] };
  var H = [
    ['H1 · A status deficit drives re-engineering', [['dir', 'Explicit status framing in the primary record.'], ['rec', 'Status framing absent from official discourse; inferred from behaviour.'], ['rec', 'Economic-civilisational framing in the record; the status logic is implicit.'], ['rec', 'Explicit status language scrubbed from discourse; implicit in the multi-audience architecture.']]],
    ['H2 · Openness and legitimacy predict the configuration', [['qua', 'Configuration 1 → expansive. The matrix and personal-ideational variables co-vary, and the configuration closes after 1959 (M2).'], ['dir', 'Configuration 3 → contractive. Institutional substitution is observed, with the structural-resistance qualification (M4).'], ['qua', 'Configuration 1 → expansive, with the recognition-ceiling qualification (M3).'], ['dir', 'Configuration 2 → hedging. Both dimensions are observed in the primary record.']]],
    ['H3 · World-order context governs timing and form', [['qua', 'The decolonisation window alters perceived openness; the window narrows after 1959.'], ['con', 'H3b was formulated in light of this case, so it is not an independent test. The case disconfirms the original single-part H3.'], ['qua', 'A three-year delay between the Soviet collapse and consolidation. The crisis supplied feasibility, not motivation.'], ['qua', 'The multiplex transition is continuous across the window and traceable in the shift from Look East to Act East.']]],
    ['H4 · New frameworks show social-closure design', [['rec', 'Bandung’s anti-colonial orientation operates as closure at the framework level.'], ['dir', 'The clearest case: all three closure signatures are present.'], ['out', 'India joined an existing framework instead of designing a new one.'], ['qua', 'Closure signatures are weak; India’s inclusive formulation disclaims a value-based boundary.']]],
    ['H5 · Successful re-engineering shapes the emerging order', [['lim', 'Pre-multiplex. The non-aligned movement left a durable normative legacy.'], ['out', 'No constitutive contribution to the wider order.'], ['out', 'Pre-multiplex.'], ['qua', 'An identifiable contribution to the “free, open and inclusive” framing, short of authorship of the Indo-Pacific concept.']]]
  ];
  var hg = $('#hgrid'), hOut = $('#hOut'), hCells = [];
  (function () {
    el('div', { 'class': 'hh' }, 'Hypothesis', hg);
    ['Nehruvian', 'SAARC–BIMSTEC', 'Look East', 'Indo-Pacific'].forEach(function (c) { el('div', { 'class': 'hh' }, c, hg); });
    H.forEach(function (row, ri) {
      el('div', { 'class': 'hl' }, row[0], hg);
      row[1].forEach(function (c, ci) {
        var b = el('button', { 'class': 'hc v-' + c[0], type: 'button', 'aria-label': VERD[c[0]][0] }, VERD[c[0]][0], hg);
        b.addEventListener('click', function () {
          hCells.forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on');
          detail(hOut, row[0].split(' · ')[0] + ' in ' + ['the Nehruvian case', 'the SAARC–BIMSTEC case', 'the Look East case', 'the Indo-Pacific case'][ci], [c[1]], [['Verdict category', VERD[c[0]][0]], ['What it means', VERD[c[0]][2]]]);
        });
        hCells.push(b);
      });
    });
    var lg = $('#hlegend');
    Object.keys(VERD).forEach(function (k) { var s = el('span', {}, VERD[k][0], lg); s.style.setProperty('--c', VERD[k][1]); });
    hCells[0].click();
  })();

  /* ---------- 9. Glossary ---------- */
  var GLOSS = [
    ['Bounded returns', 'The finding that each mechanism yields only a limited gain in recognition, capped by specific conditions.'],
    ['Configuration', 'One of the four combinations of perceived openness and perceived legitimacy.'],
    ['Expansive, contractive, hedging', 'The three mechanisms: widen the frame, narrow it to a smaller group, or spread commitments across several.'],
    ['Geographic expansion', 'Redrawing the boundary of a region so that the state sits at its centre.'],
    ['Ideational overcommitment', 'A limit that arises when a framework expresses a leader’s worldview and not a calculation of returns (M2).'],
    ['Institutional layering', 'Building new institutions alongside existing ones, so that the state’s leadership is structurally favoured.'],
    ['Legitimacy', 'How far the criteria used to judge the rising power are seen as fair.'],
    ['Material asymmetry', 'A gap in capability between the re-engineering state and its main competitor inside the same framework (M3).'],
    ['Multiplex world order', 'An order with many centres of power and many overlapping institutions, and no single hegemon.'],
    ['Normative rebranding', 'Offering a new set of values or an identity for the region, so that the state’s strengths count for more.'],
    ['Openness', 'How far the existing regional hierarchy is seen as willing to accept the rising power’s claims.'],
    ['Process tracing', 'A method that follows a causal chain through detailed, dated evidence inside a case.'],
    ['Reconstructive standard', 'The weaker test used when status motives are not stated openly: infer the motive from a pattern of behaviour that fits it better than other readings (M1).'],
    ['Recognition ceiling', 'The upper limit on status gains from joining a framework, set by the material gap with the strongest rival in it.'],
    ['Region re-engineering', 'Deliberate reshaping of a region’s boundaries, values or institutions to change how a state’s standing is judged.'],
    ['Social closure', 'The process by which a group decides who belongs and on what terms, which a region does for its members.'],
    ['Status', 'Standing in the eyes of others, which depends on who is judging and by what standard.'],
    ['Status deficit', 'The gap between a state’s capabilities and the recognition it receives.'],
    ['Structural resistance', 'Resistance by smaller states to the substitution of one framework for another (M4).']
  ];
  var gl = $('#gloss'), gs = $('#gsearch');
  function showGloss(q) {
    gl.innerHTML = ''; q = (q || '').toLowerCase();
    GLOSS.filter(function (g) { return !q || (g[0] + ' ' + g[1]).toLowerCase().indexOf(q) > -1; }).forEach(function (g) {
      var d = el('div', {}, null, gl); el('dt', {}, g[0], d); el('dd', {}, g[1], d);
    });
    if (!gl.children.length) el('div', {}, 'No matching terms.', gl);
  }
  gs.addEventListener('input', function () { showGloss(gs.value); }); showGloss('');

  /* ---------- rail highlight ---------- */
  if ('IntersectionObserver' in window) {
    var links = {};
    $$('nav.rail a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting && links[e.target.id]) { $$('nav.rail a.on').forEach(function (a) { a.classList.remove('on'); }); links[e.target.id].classList.add('on'); } });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(links).forEach(function (id) { var t = document.getElementById(id); if (t) io.observe(t); });
  }
})();
