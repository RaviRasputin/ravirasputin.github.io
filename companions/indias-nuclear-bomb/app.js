(function () {
'use strict';
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const lerp = (a, b, p) => a + (b - a) * p;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = p => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
const seg = (p, a, b) => clamp((p - a) / (b - a), 0, 1);
function rnd(seed) { let a = seed; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function colors() { const s = getComputedStyle(document.documentElement), o = {}; ['paper', 'panel', 'ink', 'muted', 'rule', 'fissile', 'neutron', 'alert', 'ok', 'soft'].forEach(k => o[k] = s.getPropertyValue('--' + k).trim()); return o; }

/* ---------- canvas plumbing ---------- */
const figs = [];
function Canvas(host, H) {
  const wrap = el('div', 'fig-scroll'), cv = el('canvas'); wrap.appendChild(cv); host.appendChild(wrap);
  const g = { cv, ctx: cv.getContext('2d'), W: 720, H, draw: null, C: colors(), k: 1, fs: 1 };
  g.render = () => { g.C = colors(); g.ctx.setTransform(g.k, 0, 0, g.k, 0, 0); g.ctx.clearRect(0, 0, 720, H); g.ctx.globalAlpha = 1; if (g.draw) g.draw(g); };
  g.size = () => { const w = Math.max(wrap.clientWidth || 600, 560), d = window.devicePixelRatio || 1; cv.style.width = w + 'px'; cv.style.height = (w * H / 720) + 'px'; cv.width = Math.round(w * d); cv.height = Math.round(w * H / 720 * d); g.k = cv.width / 720; g.fs = clamp(700 / w, 1, 1.22); g.render(); };
  figs.push(g); return g;
}
let rsz; window.addEventListener('resize', () => { clearTimeout(rsz); rsz = setTimeout(() => figs.forEach(g => g.size()), 120); });
const rerenderAll = () => figs.forEach(g => g.render());
if (window.matchMedia) { const mq = matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', rerenderAll); }
new MutationObserver(rerenderAll).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(rerenderAll);

function T(g, s, x, y, o) {
  o = o || {}; const c = g.ctx, sz = (o.sz || 12) * g.fs;
  c.font = (o.b ? '600 ' : '') + sz + 'px ' + (o.mono ? '"IBM Plex Mono",ui-monospace,monospace' : '"Bricolage Grotesque",system-ui,sans-serif');
  c.fillStyle = o.col || g.C.ink; c.textAlign = o.al || 'left'; c.textBaseline = o.bl || 'middle';
  if (!o.w) { c.fillText(s, x, y); return y; }
  const words = String(s).split(' '); let ln = '', yy = y;
  words.forEach(w => { const t = ln ? ln + ' ' + w : w; if (c.measureText(t).width > o.w && ln) { c.fillText(ln, x, yy); ln = w; yy += sz * 1.32; } else ln = t; });
  c.fillText(ln, x, yy); return yy + sz * 1.32;
}
function circ(g, x, y, r, fill, stroke, lw) { const c = g.ctx; c.beginPath(); c.arc(x, y, Math.max(0, r), 0, 6.2832); if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw || 1.5; c.stroke(); } }
function line(g, x1, y1, x2, y2, col, lw, dash) { const c = g.ctx; c.beginPath(); c.setLineDash(dash || []); c.moveTo(x1, y1); c.lineTo(x2, y2); c.strokeStyle = col || g.C.ink; c.lineWidth = lw || 1.5; c.stroke(); c.setLineDash([]); }
function poly(g, pts, col, lw, dash) { const c = g.ctx; c.beginPath(); c.setLineDash(dash || []); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.strokeStyle = col; c.lineWidth = lw || 1.5; c.stroke(); c.setLineDash([]); }
function box(g, x, y, w, h, fill, stroke, r, lw) { const c = g.ctx; r = Math.min(r == null ? 6 : r, w / 2, h / 2); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw || 1.5; c.stroke(); } }
function arrow(g, x1, y1, x2, y2, col, lw) { line(g, x1, y1, x2, y2, col, lw); const a = Math.atan2(y2 - y1, x2 - x1), c = g.ctx; c.beginPath(); c.moveTo(x2, y2); c.lineTo(x2 - 8 * Math.cos(a - .42), y2 - 8 * Math.sin(a - .42)); c.lineTo(x2 - 8 * Math.cos(a + .42), y2 - 8 * Math.sin(a + .42)); c.closePath(); c.fillStyle = col || g.C.ink; c.fill(); }
function A(g, a, fn) { const c = g.ctx; c.save(); c.globalAlpha = clamp(a, 0, 1); fn(); c.restore(); }
function along(pts, f) { let L = 0; const d = []; for (let i = 1; i < pts.length; i++) { const s = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); d.push(s); L += s; } let t = clamp(f, 0, 1) * L; for (let i = 0; i < d.length; i++) { if (t <= d[i] || i === d.length - 1) { const q = d[i] ? clamp(t / d[i], 0, 1) : 0; return [lerp(pts[i][0], pts[i + 1][0], q), lerp(pts[i][1], pts[i + 1][1], q)]; } t -= d[i]; } return pts[0]; }

/* ---------- staged player ---------- */
function player(host, H, stages, draw, extra) {
  const g = Canvas(host, H), n = stages.length; let st = 0, p = 1, playing = false, t0 = 0, raf = 0, tm = 0;
  const bar = el('div', 'ctrl'), bPlay = el('button', 'btn pri', 'Play'), bPrev = el('button', 'btn', 'Back'), bNext = el('button', 'btn', 'Next'), dots = el('div', 'dots');
  bPlay.type = bPrev.type = bNext.type = 'button';
  stages.forEach((s, i) => { const d = el('button', 'dot', String(i + 1)); d.type = 'button'; d.setAttribute('aria-label', 'Step ' + (i + 1) + ': ' + s.n); d.onclick = () => { stop(); go(i, true); }; dots.appendChild(d); });
  bar.append(bPlay, bPrev, bNext, dots); if (extra) extra(bar, () => g.render());
  const cap = el('p', 'cap'); cap.setAttribute('aria-live', 'polite'); host.append(bar, cap);
  const setCap = () => { cap.innerHTML = '<b>' + (st + 1) + ' of ' + n + ' · ' + stages[st].n + '.</b> ' + stages[st].c; $$('.dot', dots).forEach((d, i) => d.classList.toggle('on', i === st)); bPlay.textContent = playing ? 'Pause' : 'Play'; };
  g.draw = () => draw(g, st, p);
  function stop() { playing = false; cancelAnimationFrame(raf); clearTimeout(tm); }
  function go(i, anim) {
    st = clamp(i, 0, n - 1); cancelAnimationFrame(raf); clearTimeout(tm); setCap();
    if (!anim || reduce) { p = 1; g.render(); if (playing) { if (st < n - 1) tm = setTimeout(() => go(st + 1, true), 2600); else { playing = false; setCap(); } } return; }
    p = 0; t0 = performance.now(); const dur = stages[st].ms || 3000;
    const f = now => { p = Math.min(1, (now - t0) / dur); g.render(); if (p < 1) raf = requestAnimationFrame(f); else if (playing) { if (st < n - 1) tm = setTimeout(() => { if (playing) go(st + 1, true); }, 1300); else { playing = false; setCap(); } } };
    raf = requestAnimationFrame(f);
  }
  bPlay.onclick = () => { if (playing) { stop(); p = 1; g.render(); setCap(); } else { playing = true; go(st >= n - 1 ? 0 : st, true); } };
  bPrev.onclick = () => { stop(); go(st - 1, false); }; bNext.onclick = () => { stop(); go(st + 1, true); };
  g.size(); setCap(); return g;
}

/* ---------- 1. chain reaction sandbox ---------- */
function chainFig(host) {
  const g = Canvas(host, 330), N = 170, cx = 360, cy = 165, r0 = rnd(11), unit = [];
  while (unit.length < N) { const x = r0() * 2 - 1, y = r0() * 2 - 1; if (x * x + y * y < 1) unit.push([x, y]); }
  let nuc, neu, fis, esc, comp = 0, raf = 0, running = false;
  const R = () => lerp(165, 58, comp);
  const bar = el('div', 'ctrl');
  bar.innerHTML = '<button type="button" class="btn pri" id="ch-fire">Fire one neutron</button><button type="button" class="btn" id="ch-reset">Reset</button><label class="rng" for="ch-comp">Squeeze the metal <input id="ch-comp" type="range" min="0" max="100" value="0"></label>';
  const out = el('p', 'cap'); out.setAttribute('aria-live', 'polite'); host.append(bar, out);
  function stats(done) { let v = ''; if (done) v = fis <= 4 ? ' The chain died out: <b>subcritical</b>. Too many neutrons escaped before finding another nucleus.' : fis > N * .45 ? ' Runaway: <b>supercritical</b>. Each fission caused more than one further fission.' : ' The chain sputtered and stopped: close to <b>critical</b>.'; out.innerHTML = '<b>Atoms split:</b> ' + fis + ' of ' + N + ' · <b>Neutrons escaped:</b> ' + esc + '.' + v; }
  function reset() { nuc = unit.map(u => ({ u, on: true, fl: 0 })); neu = []; fis = 0; esc = 0; stats(false); g.render(); }
  function fire() { const a = Math.random() * 6.283; neu.push({ x: cx + (Math.random() - .5) * 16, y: cy + (Math.random() - .5) * 16, vx: Math.cos(a) * 3.4, vy: Math.sin(a) * 3.4 }); if (!running) { running = true; raf = requestAnimationFrame(tick); } }
  function step() {
    const rr = R(), next = [];
    neu.forEach(q => {
      const nx = q.x + q.vx, ny = q.y + q.vy; let hit = null;
      for (let i = 0; i < N && !hit; i++) { const m = nuc[i]; if (!m.on) continue; const px = cx + m.u[0] * rr, py = cy + m.u[1] * rr, dx = nx - q.x, dy = ny - q.y, t = clamp(((px - q.x) * dx + (py - q.y) * dy) / (dx * dx + dy * dy), 0, 1); if (Math.hypot(q.x + t * dx - px, q.y + t * dy - py) < 0.75) hit = m; }
      if (hit) { hit.on = false; hit.fl = 1; fis++; const k = 2 + (Math.random() < .5 ? 1 : 0), px = cx + hit.u[0] * rr, py = cy + hit.u[1] * rr; for (let j = 0; j < k && next.length < 600; j++) { const a = Math.random() * 6.283; next.push({ x: px, y: py, vx: Math.cos(a) * 3.4, vy: Math.sin(a) * 3.4 }); } }
      else if (Math.hypot(nx - cx, ny - cy) > rr + 16) esc++;
      else { q.x = nx; q.y = ny; next.push(q); }
    });
    neu = next; nuc.forEach(m => { if (m.fl > 0) m.fl -= .06; });
  }
  function tick() { step(); stats(false); g.render(); if (neu.length || nuc.some(m => m.fl > 0)) raf = requestAnimationFrame(tick); else { running = false; stats(true); } }
  g.draw = () => {
    const C = g.C, rr = R();
    circ(g, cx, cy, rr + 8, C.soft, C.rule, 1.5);
    nuc.forEach(m => { const x = cx + m.u[0] * rr, y = cy + m.u[1] * rr; if (m.on) circ(g, x, y, 3.2, C.fissile); else { circ(g, x - 2, y - 1, 1.6, C.muted); circ(g, x + 2, y + 1, 1.6, C.muted); if (m.fl > 0) A(g, m.fl, () => circ(g, x, y, 4 + (1 - m.fl) * 12, null, C.alert, 2)); } });
    neu.forEach(q => { line(g, q.x - q.vx * 2, q.y - q.vy * 2, q.x, q.y, C.neutron, 1); circ(g, q.x, q.y, 1.9, C.neutron); });
    circ(g, 28, 24, 3.2, C.fissile); T(g, 'plutonium nucleus', 40, 24, { col: C.muted }); circ(g, 28, 44, 1.9, C.neutron); T(g, 'neutron', 40, 44, { col: C.muted });
    T(g, comp < .25 ? 'Loose: neutrons mostly escape' : comp < .6 ? 'Denser: more neutrons find a target' : 'Squeezed hard: the chain runs away', 700, 24, { al: 'right', b: 1 });
  };
  $('#ch-fire', bar).onclick = fire; $('#ch-reset', bar).onclick = () => { cancelAnimationFrame(raf); running = false; reset(); };
  $('#ch-comp', bar).oninput = e => { comp = e.target.value / 100; if (!running) g.render(); };
  reset(); g.size();
}

/* ---------- 2. two roads to a bomb ---------- */
function roadsFig(host) {
  const top = [[130, 150], [160, 68], [190, 68], [340, 68], [400, 68], [550, 68], [626, 150]], bot = [[130, 186], [150, 264], [160, 264], [280, 264], [310, 264], [420, 264], [450, 264], [570, 264], [628, 190]];
  const node = (g, x, y, w, h, a, t1, t2, col) => A(g, a, () => { box(g, x, y, w, h, g.C.panel, col || g.C.ink); T(g, t1, x + w / 2, y + (t2 ? h / 2 - 8 : h / 2), { al: 'center', b: 1, sz: 11.5 }); if (t2) T(g, t2, x + w / 2, y + h / 2 + 9, { al: 'center', sz: 10.5, col: g.C.muted }); });
  player(host, 330, [
    { n: 'One starting point', c: 'Both roads begin with natural uranium, which is almost all uranium-238. Only 0.7 per cent is the uranium-235 that fissions easily. That is too dilute for a bomb.', ms: 1800 },
    { n: 'The uranium road', c: 'Spin uranium gas in thousands of centrifuges until uranium-235 makes up about nine-tenths of it. This is the road Pakistan took at Kahuta, with centrifuge designs A. Q. Khan brought from Europe (p. 196).' },
    { n: 'The plutonium road', c: 'Burn natural uranium in a reactor. Some uranium-238 turns into plutonium. Dissolve the used fuel and pull the plutonium out. This is India’s road: the CIRUS reactor and the Phoenix plant (pp. 27–28).' },
    { n: 'Why both look peaceful', c: 'Each road also leads to electricity. Lightly enriched uranium fuels power stations such as Tarapur, and plutonium is the fuel of Bhabha’s planned breeders. This double use is why the option could be built without anyone deciding to build a bomb.' }
  ], (g, st, p) => {
    const C = g.C, tA = st === 1 || st === 3, bA = st === 2 || st === 3, pp = st === 0 ? 1 : p;
    poly(g, top, tA ? C.neutron : C.rule, tA ? 3 : 2); poly(g, bot, bA ? C.fissile : C.rule, bA ? 3 : 2);
    const dots = (pts, col) => { for (let i = 0; i < 7; i++) { const q = along(pts, (i / 7 + pp * .9) % 1); circ(g, q[0], q[1], 4, col); } };
    if (tA) dots(top, C.neutron); if (bA) dots(bot, C.fissile);
    node(g, 20, 140, 112, 56, 1, 'Natural uranium', '0.7% U-235');
    node(g, 190, 40, 150, 56, tA ? 1 : .45, 'Centrifuge cascade', 'enrichment', tA ? C.neutron : 0);
    node(g, 400, 40, 150, 56, tA ? 1 : .45, 'Highly enriched uranium', 'about 90% U-235', tA ? C.neutron : 0);
    node(g, 160, 236, 122, 56, bA ? 1 : .45, 'Heavy-water reactor', 'CIRUS, Dhruva', bA ? C.fissile : 0);
    node(g, 310, 236, 110, 56, bA ? 1 : .45, 'Used fuel', 'a little plutonium', bA ? C.fissile : 0);
    node(g, 450, 236, 122, 56, bA ? 1 : .45, 'Reprocessing', 'Phoenix plant', bA ? C.fissile : 0);
    circ(g, 650, 168, 30, C.panel, C.ink, 2); T(g, 'Bomb', 650, 161, { al: 'center', b: 1, sz: 11.5 }); T(g, 'core', 650, 176, { al: 'center', b: 1, sz: 11.5 });
    if (tA) T(g, 'Pakistan’s road', 265, 20, { al: 'center', b: 1, col: C.neutron, sz: 13 });
    if (bA) T(g, 'India’s road', 366, 312, { al: 'center', b: 1, col: C.fissile, sz: 13 });
    if (st === 3) A(g, ease(p), () => { arrow(g, 265, 96, 265, 128, C.muted, 1.5); T(g, 'stop at 3 to 5%: power station fuel', 265, 142, { al: 'center', sz: 11, col: C.muted }); arrow(g, 510, 236, 510, 204, C.muted, 1.5); T(g, 'or: fuel for breeder reactors', 510, 192, { al: 'center', sz: 11, col: C.muted }); });
  });
}

/* ---------- 3. inside the reactor ---------- */
function reactorFig(host) {
  const rods = [90, 160, 230, 300, 370], pu = [[90, 110], [160, 230], [230, 140], [300, 200], [370, 120], [300, 90], [160, 120], [90, 250], [230, 250]];
  const pathA = [[160, 150], [200, 112], [184, 186], [212, 232], [202, 168], [226, 176]], pathB = [[300, 120], [330, 96], [340, 150], [318, 184], [352, 214], [366, 200]];
  player(host, 340, [
    { n: 'The parts', c: 'CIRUS is a tank of heavy water with rods of natural uranium metal standing in it. Canada supplied the reactor and the United States the heavy water (pp. 27, 30).', ms: 1500 },
    { n: 'Slowing the neutrons', c: 'A fission throws out fast neutrons. Fast neutrons rarely split uranium-235. Bouncing off the deuterium in heavy water slows them down without swallowing them, which is why this reactor can run on unenriched uranium.', ms: 3600 },
    { n: 'Two fates', c: 'A slowed neutron that meets uranium-235 splits it: heat, and new neutrons to keep the chain going. One that meets uranium-238 is absorbed, and that atom becomes plutonium-239. Every uranium reactor makes plutonium as it runs.', ms: 3600 },
    { n: 'Pull the fuel out early', c: 'Leave fuel in for long and the plutonium-239 picks up more neutrons, becoming plutonium-240 and other isotopes that spoil it for weapons. CIRUS’s metal fuel had to come out after a short time, which gave weapon-grade plutonium (p. 28). The two percentages are the book’s (p. 428).', ms: 3200 }
  ], (g, st, p) => {
    const C = g.C, lift = st === 3 ? ease(seg(p, 0, .6)) * 46 : 0;
    box(g, 40, 50, 380, 250, C.soft, C.ink, 14, 2);
    A(g, .22, () => box(g, 46, 62, 368, 232, C.neutron, null, 10));
    rods.forEach((x, i) => { const dy = (st === 3 && i === 2) ? -lift : 0; box(g, x - 8, 70 + dy, 16, 210, C.muted, null, 4); });
    const nPu = st < 2 ? 0 : st === 2 ? (p > .82 ? 1 : 0) : pu.length;
    for (let i = 0; i < nPu; i++) { const q = st === 2 ? [370, 200] : pu[i]; circ(g, q[0], q[1] - ((st === 3 && q[0] === 230) ? lift : 0), 4, C.fissile, C.panel, 1); }
    T(g, 'heavy water', 60, 288, { col: C.muted, sz: 11 });
    if (st === 0) { arrow(g, 470, 90, 384, 90, C.muted, 1.2); T(g, 'natural uranium fuel rods', 476, 90, { sz: 12 }); arrow(g, 470, 150, 410, 150, C.muted, 1.2); T(g, 'heavy water: the moderator', 476, 150, { sz: 12 }); T(g, '40 megawatts of heat. Started 1960.', 476, 210, { sz: 12, col: C.muted, w: 220 }); }
    if (st === 1) { const q = along(pathA, ease(p)), f = ease(p); g.ctx.save(); poly(g, pathA.slice(0, 1).concat([q]), C.rule, 1); g.ctx.restore(); for (let i = 1; i <= 12; i++) { const a = along(pathA, f * i / 12); circ(g, a[0], a[1], 1.2, C.muted); } circ(g, q[0], q[1], 5, f < .5 ? C.alert : C.neutron); if (p < .2) A(g, 1 - p * 5, () => circ(g, 160, 150, 6 + p * 60, null, C.alert, 2)); T(g, f < .5 ? 'fast neutron' : 'slow neutron', q[0] + 10, q[1] - 12, { sz: 11, b: 1, col: f < .5 ? C.alert : C.neutron }); }
    if (st === 2) {
      const a = seg(p, 0, .4), b = seg(p, .4, .85);
      if (a < 1) { const q = along([[202, 168], [226, 176]], a); circ(g, q[0], q[1], 5, C.neutron); }
      else { A(g, 1 - seg(p, .4, .7), () => circ(g, 230, 176, 8 + seg(p, .4, .7) * 30, null, C.alert, 2.5)); [[-1, -.6], [1, -.8], [.3, 1]].forEach(d => { const t = seg(p, .4, 1); circ(g, 230 + d[0] * t * 46, 176 + d[1] * t * 46, 4, C.alert); }); T(g, 'fission: heat + new neutrons', 232, 44, { al: 'center', sz: 11, b: 1, col: C.alert }); }
      const q2 = along(pathB, ease(b)); if (b < 1) circ(g, q2[0], q2[1], 5, b < .4 ? C.alert : C.neutron);
      if (p > .82) T(g, 'absorbed: U-238 becomes Pu-239', 300, 312, { al: 'center', sz: 11, b: 1, col: C.fissile });
    }
    if (st >= 1 && st < 3) { let y = 80; [[C.alert, 'fast neutron'], [C.neutron, 'slow neutron'], [C.fissile, 'plutonium-239 atom'], [C.muted, 'uranium fuel rod']].forEach(k => { circ(g, 470, y, 5, k[0]); T(g, k[1], 484, y, { sz: 12 }); y += 26; }); }
    if (st === 3) {
      const q = ease(seg(p, .3, 1));
      T(g, 'Plutonium-239 share', 450, 62, { b: 1, sz: 12.5 });
      [['Fuel taken out early', 94, 'weapon-grade: over 93%'], ['Fuel left in a power reactor', 67, 'reactor-grade: 65 to 70%']].forEach((r, i) => { const y = 92 + i * 96; T(g, r[0], 450, y, { sz: 11.5 }); box(g, 450, y + 12, 240, 22, C.soft, C.rule, 4, 1); box(g, 450, y + 12, 240 * r[1] / 100 * q, 22, C.fissile, null, 4); T(g, r[2], 450, y + 50, { sz: 11, col: C.muted }); });
      line(g, 450 + 240 * .93, 96, 450 + 240 * .93, 232, C.ink, 1, [3, 3]); T(g, '93%', 450 + 240 * .93, 246, { al: 'center', sz: 10.5, mono: 1 });
    }
  });
}

/* ---------- 4. reprocessing ---------- */
function reprocFig(host) {
  const r = rnd(5), D = []; for (let i = 0; i < 44; i++) D.push({ k: i < 30 ? 'u' : i < 35 ? 'pu' : 'fp', a: r(), b: r() });
  const pos = (d, i, s) => {
    if (s === 0) return [34 + (i % 4) * 20, 96 + Math.floor(i / 4) * 11];
    if (s === 1) return [162 + d.a * 96, 118 + d.b * 96];
    if (s === 2) return d.k === 'fp' ? [322 + d.a * 96, 178 + d.b * 40] : [322 + d.a * 96, 112 + d.b * 40];
    if (s === 3) return d.k === 'fp' ? [322 + d.a * 96, 256 + d.b * 22] : d.k === 'pu' ? [482 + d.a * 30, 116 + d.b * 30] : [540 + d.a * 44, 150 + d.b * 60];
    return d.k === 'fp' ? [322 + d.a * 96, 256 + d.b * 22] : d.k === 'pu' ? [652 + (d.a - .5) * 16, 112 + (d.b - .5) * 16] : [612 + d.a * 80, 204 + d.b * 28];
  };
  player(host, 300, [
    { n: 'Used fuel', c: 'A rod that has been through the reactor is still mostly uranium (grey). It holds a little plutonium (orange) and intensely radioactive fission products (red).', ms: 1500 },
    { n: 'Chop and dissolve', c: 'The rods are cut up behind thick shielding and dissolved in acid. Everything is now in one liquid.' },
    { n: 'Add a solvent', c: 'An oily solvent is mixed in. Uranium and plutonium move into the solvent. The fission products stay in the acid and go to waste tanks. This is the Purex process, which the United States had published under Atoms for Peace (p. 28).' },
    { n: 'Split plutonium from uranium', c: 'A change in the chemistry makes plutonium let go of the solvent while uranium stays. The two streams part.' },
    { n: 'Plutonium metal', c: 'The plutonium is purified and turned into metal. Phoenix, begun in 1961 from an American firm’s blueprints, gave India its first weapon-grade plutonium in 1964 (p. 28). Note how little there is: a great deal of fuel yields a small button of metal.' }
  ], (g, st, p) => {
    const C = g.C, q = st === 0 ? 1 : ease(p), col = { u: C.muted, pu: C.fissile, fp: C.alert };
    box(g, 24, 86, 92, 132, C.soft, C.ink); T(g, 'Used fuel rods', 70, 70, { al: 'center', sz: 11.5, b: 1 });
    [['Dissolver', 150], ['Solvent step', 310], ['Partition', 470]].forEach((t, i) => { A(g, st > i ? 1 : .4, () => { box(g, t[1], 104, 120, 122, C.soft, C.ink); T(g, t[0], t[1] + 60, 88, { al: 'center', sz: 11.5, b: 1 }); }); });
    if (st >= 2) { A(g, .25, () => box(g, 312, 106, 116, 54, C.neutron, null, 4)); T(g, 'solvent', 432, 116, { sz: 10, col: C.muted, al: 'right' }); T(g, 'acid', 432, 214, { sz: 10, col: C.muted, al: 'right' }); line(g, 312, 162, 428, 162, C.rule, 1, [4, 3]); }
    A(g, st >= 3 ? 1 : .4, () => { box(g, 310, 246, 120, 40, C.soft, C.alert); T(g, 'Waste: fission products', 370, 238, { al: 'center', sz: 10.5, col: C.alert }); });
    A(g, st >= 4 ? 1 : .4, () => { circ(g, 652, 112, 20, C.soft, C.fissile, 2); T(g, 'Plutonium', 652, 78, { al: 'center', sz: 11.5, b: 1, col: C.fissile }); box(g, 604, 196, 96, 44, C.soft, C.ink); T(g, 'Uranium: recycled', 652, 252, { al: 'center', sz: 10.5, col: C.muted }); });
    [[116, 150], [270, 310], [430, 470]].forEach((a, i) => arrow(g, a[0] + 4, 152, a[1] - 4, 152, st > i ? C.ink : C.rule, 1.3));
    D.forEach((d, i) => { const a = pos(d, i, Math.max(0, st - 1)), b = pos(d, i, st); circ(g, lerp(a[0], b[0], q), lerp(a[1], b[1], q), 3.4, col[d.k]); });
  });
}

/* ---------- 5. three-stage plan ---------- */
function threeFig(host) {
  const X = [30, 260, 490];
  player(host, 330, [
    { n: 'The problem', c: 'India has little uranium and a great deal of thorium. Thorium cannot sustain a chain reaction by itself. Bhabha’s plan of November 1954 is a way round that (p. 26).', ms: 1500 },
    { n: 'Stage one', c: 'Reactors burning natural uranium make electricity and, as a by-product, plutonium.' },
    { n: 'Stage two', c: 'Reactors fuelled with that plutonium, wrapped in thorium, make electricity and turn thorium into uranium-233.' },
    { n: 'Stage three', c: 'Breeders running on uranium-233 and thorium make more uranium-233 than they burn. In theory, endless fuel from Indian sand.' },
    { n: 'Where it stood in 1998', c: 'Perkovich calls the plan quixotic (p. 26). Stage one reactors were small, late and often shut down. Stage two was a single test reactor. Stage three was a 30-kilowatt experiment. What the plan had delivered was plutonium and the plant to separate it.' }
  ], (g, st, p) => {
    const C = g.C, q = ease(p);
    box(g, 30, 272, 200, 30, C.soft, C.muted, 4); T(g, 'Natural uranium (scarce)', 130, 287, { al: 'center', sz: 11 });
    box(g, 260, 272, 430, 30, C.soft, C.ok, 4); T(g, 'Thorium (abundant in India)', 475, 287, { al: 'center', sz: 11 });
    [['Stage 1', 'Natural uranium reactors'], ['Stage 2', 'Plutonium + thorium reactors'], ['Stage 3', 'Uranium-233 + thorium breeders']].forEach((t, i) => {
      const on = st === 0 || st === 4 || st === i + 1;
      A(g, on ? 1 : .4, () => { box(g, X[i], 96, 200, 120, C.panel, on && st ? C.fissile : C.ink, 8, on && st ? 2.5 : 1.5); T(g, t[0], X[i] + 100, 122, { al: 'center', b: 1, sz: 14 }); T(g, t[1], X[i] + 100, 146, { al: 'center', sz: 11.5, col: C.muted }); });
    });
    const act = i => st === i + 1;
    [0, 1, 2].forEach(i => {
      const live = act(i), a = st === 0 || st === 4 ? 1 : live ? 1 : .35;
      A(g, a, () => { arrow(g, X[i] + 100, 96, X[i] + 100, 56, C.ink, 1.3); T(g, 'electricity', X[i] + 100, 42, { al: 'center', sz: 11 }); arrow(g, X[i] + 100, 272, X[i] + 100, 220, i ? C.ok : C.muted, 1.3); });
      if (live) { circ(g, X[i] + 100, lerp(272, 222, q), 5, i ? C.ok : C.muted); circ(g, X[i] + 100, lerp(96, 60, q), 4, C.ink); }
    });
    [[230, 260, 'plutonium', C.fissile, 0], [460, 490, 'uranium-233', C.neutron, 1]].forEach(a => { A(g, st === 0 || st === 4 || st === a[4] + 1 || st === a[4] + 2 ? 1 : .35, () => { arrow(g, a[0], 180, a[1], 180, a[3], 2); T(g, a[2], (a[0] + a[1]) / 2, 196 + (a[4] ? 0 : 0), { al: 'center', sz: 10, col: a[3], b: 1 }); }); if (st === a[4] + 1) circ(g, lerp(a[0] - 40, a[1] + 10, q), 180, 6, a[3]); });
    if (st === 3 || st === 0 || st === 4) { const c = g.ctx; c.beginPath(); c.arc(690, 156, 26, -1.9, 1.9); c.strokeStyle = C.neutron; c.lineWidth = 2; c.stroke(); T(g, 'more U-233', 700, 108, { al: 'right', sz: 10, col: C.neutron, b: 1 }); if (st === 3) { const a = lerp(1.9, -1.9, q); circ(g, 690 + 26 * Math.cos(a), 156 + 26 * Math.sin(a), 5, C.neutron); } }
    if (st === 4) A(g, q, () => { [['Running, far short', 'of its targets'], ['One 40 MW test', 'breeder (1985)'], ['One 30 kW', 'reactor (1996)']].forEach((t, i) => { box(g, X[i] + 22, 160, 156, 46, C.panel, C.alert, 4, 2); T(g, t[0], X[i] + 100, 175, { al: 'center', sz: 11.5, b: 1, col: C.alert }); T(g, t[1], X[i] + 100, 192, { al: 'center', sz: 11.5, b: 1, col: C.alert }); }); });
  });
}

/* ---------- 6. implosion ---------- */
function implosionFig(host) {
  let asym = false; const r = rnd(21), fl = []; for (let i = 0; i < 260; i++) fl.push([Math.sqrt(r()), r() * 6.283]);
  const cx = 205, cy = 195;
  const blob = (g, rad, k, fill, stroke, lw) => { const c = g.ctx; c.beginPath(); for (let i = 0; i <= 72; i++) { const a = i / 72 * 6.2832, rr = rad * (1 + k * Math.cos(2 * a + .7) + k * .5 * Math.cos(3 * a)); i ? c.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a)) : c.moveTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a)); } c.closePath(); if (fill) { c.fillStyle = fill; c.fill(); } if (stroke) { c.strokeStyle = stroke; c.lineWidth = lw || 1.5; c.stroke(); } };
  player(host, 390, [
    { n: 'At rest', c: 'A ball of plutonium metal sits inside a shell of chemical explosive. As it stands the ball is subcritical: too many neutrons would leak out of its surface for a chain reaction to grow (p. 140).', ms: 1500 },
    { n: 'The explosive is fired', c: 'Detonators around the outside go off together. The explosive is cast in shaped pieces so that the blast travels inwards as one smooth, shrinking sphere. Getting every point to fire at the same instant is the hardest engineering in the device.', ms: 3000 },
    { n: 'The core is crushed', c: 'The shock wave squeezes the metal to a much higher density. The atoms are now so close together that a neutron is far more likely to hit a nucleus than to escape. The same lump has become supercritical.', ms: 2800 },
    { n: 'The initiator fires', c: 'At the moment of greatest compression a tiny device at the centre releases a burst of neutrons. Too early or too late and the yield suffers (p. 173).', ms: 2200 },
    { n: 'Chain reaction', c: 'Each split nucleus releases neutrons that split more. The numbers double again and again. Perkovich: the energy is released in less than a microsecond (p. 140).', ms: 3000 },
    { n: 'It blows itself apart', c: 'The core turns to hot plasma and expands. Once the atoms are spread out the neutrons find no targets and the reaction stops. Only part of the plutonium has fissioned. How large that part is depends on how well the squeeze was done.', ms: 3000 }
  ], (g, st, p) => {
    const C = g.C, k = asym ? .2 : 0, e = ease(p);
    const s = st < 2 ? 1 : st === 2 ? lerp(1, .64, e) : .64, kk = st < 2 ? 0 : st === 2 ? k * e : k;
    if (st < 5) {
      circ(g, cx, cy, 150, C.soft, C.ink, 2);
      for (let i = 0; i < 12; i++) { const a = i / 12 * 6.2832; line(g, cx + 96 * Math.cos(a + .26), cy + 96 * Math.sin(a + .26), cx + 150 * Math.cos(a + .26), cy + 150 * Math.sin(a + .26), C.rule, 1); circ(g, cx + 153 * Math.cos(a), cy + 153 * Math.sin(a), 4, st === 1 && p < .25 ? C.alert : C.muted); }
      if (st >= 1) { const c = g.ctx, f = st === 1 ? e : 1; c.beginPath(); c.arc(cx, cy, 149, 0, 6.2832); for (let i = 72; i >= 0; i--) { const a = i / 72 * 6.2832, lag = asym ? 20 * Math.max(0, Math.sin(a * 1.5 + 1)) * (1 - f * .5) : 0, rr = Math.min(149, lerp(149, 96, f) + lag); c.lineTo(cx + rr * Math.cos(a), cy + rr * Math.sin(a)); } c.closePath(); c.fillStyle = C.panel; c.fill(); if (st === 1) { c.strokeStyle = C.alert; c.lineWidth = 3; c.stroke(); } }
      blob(g, 95 * (st >= 2 ? lerp(1, s, .75) : 1), kk * .5, C.rule, C.ink, 1.5);
      blob(g, 70 * s, kk * .8, C.panel, C.ink, 1);
      blob(g, 46 * s, kk, C.fissile, C.ink, 1.5);
      circ(g, cx, cy, 6 * (st >= 2 ? .8 : 1), C.neutron, C.ink, 1);
    }
    if (st === 3) { A(g, 1 - p, () => circ(g, cx, cy, 6 + p * 26, null, C.neutron, 3)); for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283 + .3; circ(g, cx + Math.cos(a) * p * 24, cy + Math.sin(a) * p * 24, 2.2, C.neutron); } }
    if (st === 4) { const n = Math.min(260, Math.floor(Math.pow(2, p * 8.1))); for (let i = 0; i < n; i++) { const q = fl[i]; circ(g, cx + q[0] * 27 * Math.cos(q[1]), cy + q[0] * 27 * Math.sin(q[1]), 2, i % 3 ? C.alert : C.paper); } }
    if (st === 5) { A(g, lerp(1, .25, e), () => { circ(g, cx, cy, lerp(30, 185, e), C.fissile); circ(g, cx, cy, lerp(18, 120, e), C.alert); circ(g, cx, cy, lerp(8, 60, e), C.paper); }); }
    if (st === 0) {
      [[150, 100, 'Chemical explosive', 'shaped charges, fired together'], [84, 160, 'Reflector shell', 'bounces neutrons back in (p. 271)'], [40, 220, 'Plutonium core', 'weapon-grade metal from CIRUS'], [4, 280, 'Initiator', 'neutron source at the centre']].forEach(l => { const a = -.35; line(g, cx + l[0] * Math.cos(a) * .92, cy + l[0] * Math.sin(a) * .92 + (l[1] - 160) * .0, 418, l[1], C.muted, 1); circ(g, cx + l[0] * Math.cos(a) * .92, cy + l[0] * Math.sin(a) * .92, 2.5, C.muted); T(g, l[2], 426, l[1] - 8, { b: 1, sz: 12.5 }); T(g, l[3], 426, l[1] + 9, { sz: 11, col: C.muted }); });
    } else {
      const tau = (st - 1 + p) / 5, gx = 430, gw = 262, den = t => t < .2 ? 0 : t < .4 ? (t - .2) / .2 : t < .8 ? 1 : Math.max(0, 1 - (t - .8) / .12), neu = t => t < .6 ? 0 : t < .8 ? Math.pow((t - .6) / .2, 4) : Math.max(0, 1 - (t - .8) / .1);
      [['Density of the core', den, 60, C.fissile], ['Neutrons in the core', neu, 180, C.neutron]].forEach(c => { T(g, c[0], gx, c[2] - 12, { sz: 11.5, b: 1 }); box(g, gx, c[2], gw, 72, C.soft, C.rule, 4, 1); const pts = []; for (let i = 0; i <= 80; i++) { const t = i / 80; if (t > tau) break; pts.push([gx + t * gw, c[2] + 66 - c[1](t) * (asym && c[1] === neu ? 34 : 58)]); } if (pts.length > 1) poly(g, pts, c[3], 2.5); line(g, gx + tau * gw, c[2], gx + tau * gw, c[2] + 72, C.ink, 1, [3, 3]); });
      T(g, 'time: a few millionths of a second in all', gx, 268, { sz: 10.5, col: C.muted });
      const y = (asym ? .38 : 1) * (st < 4 ? 0 : st === 4 ? p * .6 : .6 + p * .4);
      T(g, 'Energy released', gx, 300, { sz: 11.5, b: 1 }); box(g, gx, 312, gw, 20, C.soft, C.rule, 4, 1); box(g, gx, 312, gw * y, 20, C.alert, null, 4); line(g, gx + gw, 306, gx + gw, 338, C.ink, 1); T(g, 'design yield', gx + gw, 350, { al: 'right', sz: 10.5, col: C.muted });
      if (asym && st >= 4) T(g, 'uneven squeeze: lower yield', gx, 350, { sz: 10.5, col: C.alert, b: 1 });
    }
  }, (bar, redraw) => { const l = el('label', 'chk', '<input type="checkbox" id="imp-asym"> Fire the charges slightly out of step (the likely fault in 1974)'); bar.appendChild(l); $('input', l).onchange = e => { asym = e.target.checked; redraw(); }; });
}

/* ---------- 7. polonium half-life ---------- */
function halfFig(host) {
  const g = Canvas(host, 150), r = rnd(3), th = []; for (let i = 0; i < 240; i++) th.push(r());
  let d = 0; const bar = el('div', 'ctrl', '<label class="rng wide" for="hl-d">Days since the polonium was made <input id="hl-d" type="range" min="0" max="552" value="0"></label>'), out = el('p', 'cap'); out.setAttribute('aria-live', 'polite'); host.append(bar, out);
  const upd = () => { const f = Math.pow(.5, d / 138); out.innerHTML = '<b>Day ' + d + ':</b> ' + Math.round(f * 100) + ' per cent of the polonium is left. ' + (d < 30 ? 'A fresh initiator.' : d < 138 ? 'Already weakening.' : d < 276 ? 'Past one half-life. The initiator needs replacing.' : 'Useless as a neutron source. New polonium must be bred in a reactor.'); g.render(); };
  g.draw = () => { const C = g.C, f = Math.pow(.5, d / 138); th.forEach((t, i) => circ(g, 34 + (i % 40) * 16.6, 26 + Math.floor(i / 40) * 18, 5.5, t < f ? C.fissile : C.rule)); circ(g, 34, 138, 5.5, C.fissile); T(g, 'polonium-210', 46, 138, { sz: 11, col: C.muted }); circ(g, 160, 138, 5.5, C.rule); T(g, 'decayed to lead', 172, 138, { sz: 11, col: C.muted }); T(g, 'half-life: 138 days (p. 173)', 686, 138, { sz: 11, al: 'right', mono: 1 }); };
  $('input', bar).oninput = e => { d = +e.target.value; upd(); }; g.size(); upd();
}

/* ---------- 8. underground test ---------- */
function testFig(host) {
  const tr = []; const r = rnd(9); for (let i = 0; i < 110; i++) { const env = i < 22 ? .04 : Math.exp(-(i - 22) / 26); tr.push((r() - .5) * 2 * env); }
  player(host, 380, [
    { n: 'Lowered and sealed', c: 'In 1974 the device sat 107 metres down a shaft near Pokhran in the Rajasthan desert (p. 178). The shaft is packed solid so that the explosion stays underground. The prime minister had to approve three separate steps: lowering the device, sealing the shaft, and firing (pp. 365, 412).', ms: 2600 },
    { n: 'Detonation', c: 'In a fraction of a second the device and the rock around it become a ball of gas hotter than the Sun’s surface. It carves out a cavity.', ms: 2200 },
    { n: 'The ground heaves', c: 'A shock wave runs outwards through the rock. At the surface the desert lifts in a dome. Witnesses in 1974 saw the ground rise.', ms: 2600 },
    { n: 'Collapse and leak', c: 'The cavity roof falls in and the surface sags into a crater. If cracks reach the top, radioactive gas escapes. The 1974 test was announced as fully contained. Perkovich notes that it vented (p. 180).', ms: 2800 },
    { n: 'Heard around the world', c: 'The shock travels through the Earth as seismic waves, and distant stations record them. The size of the wiggle gives an estimate of the yield, but only if you know how the local rock carries the shock. This is the root of every argument about how big India’s tests were (p. 426).', ms: 3600 }
  ], (g, st, p) => {
    const C = g.C, c = g.ctx, gy = 110, e = ease(p), sx = 190, dy = 318;
    box(g, 0, gy, 720, 270, C.soft, null, 0); [170, 235, 300].forEach(y => line(g, 0, y, 720, y + 8, C.rule, 1, [10, 8]));
    const bump = st === 2 ? 16 * Math.sin(Math.PI * p) : 0, dip = st === 3 ? 9 * e : st > 3 ? 9 : 0;
    c.beginPath(); c.moveTo(0, gy); c.lineTo(sx - 70, gy); c.quadraticCurveTo(sx, gy - bump * 2 + dip * 2, sx + 70, gy); c.lineTo(720, gy); c.strokeStyle = C.ink; c.lineWidth = 2; c.stroke();
    if (bump) { c.beginPath(); c.moveTo(sx - 70, gy); c.quadraticCurveTo(sx, gy - bump * 2, sx + 70, gy); c.closePath(); c.fillStyle = C.soft; c.fill(); }
    if (dip) { c.beginPath(); c.moveTo(sx - 70, gy); c.quadraticCurveTo(sx, gy + dip * 2, sx + 70, gy); c.closePath(); c.fillStyle = C.paper; c.fill(); }
    box(g, sx - 6, gy, 12, dy - gy, C.paper, C.ink, 0, 1.2);
    const fill = st === 0 ? e : 1; box(g, sx - 5, lerp(dy, gy + 2, fill), 10, (dy - gy - 2) * fill, C.muted, null, 0);
    line(g, sx + 40, gy, sx + 40, dy, C.muted, 1); line(g, sx + 34, gy, sx + 46, gy, C.muted, 1); line(g, sx + 34, dy, sx + 46, dy, C.muted, 1); T(g, '107 m', sx + 48, (gy + dy) / 2, { sz: 11, mono: 1, col: C.muted });
    box(g, 40, gy - 22, 34, 22, C.panel, C.ink, 2, 1.2); T(g, 'control', 57, gy - 32, { al: 'center', sz: 10, col: C.muted }); line(g, 74, gy - 4, sx - 6, gy - 4, C.muted, 1, [2, 3]);
    box(g, 640, gy - 20, 26, 20, C.panel, C.ink, 2, 1.2); T(g, 'distant seismic station', 653, gy - 30, { al: 'center', sz: 10, col: C.muted });
    const cav = st === 0 ? 0 : st === 1 ? lerp(4, 34, e) : 34;
    if (st === 0) { circ(g, sx, dy + 4, 7, C.fissile, C.ink, 1.2); T(g, 'device', sx - 14, dy + 4, { al: 'right', sz: 11 }); }
    else { circ(g, sx, dy, cav, st === 1 ? C.fissile : C.panel, C.alert, 2); if (st === 1) circ(g, sx, dy, cav * .55, C.paper); if (st >= 3) { A(g, .5, () => box(g, sx - 14, lerp(dy - 30, gy + 30, st === 3 ? e : 1), 28, dy - 30 - lerp(dy - 30, gy + 30, st === 3 ? e : 1), C.muted, null, 4)); T(g, 'rubble', sx - 22, 220, { al: 'right', sz: 10.5, col: C.muted }); } }
    c.save(); c.beginPath(); c.rect(0, gy + 1, 720, 270); c.clip();
    if (st === 2) [0, .22, .44].forEach(o => { const q = p - o; if (q > 0) A(g, 1 - q, () => circ(g, sx, dy, 34 + q * 260, null, C.alert, 2.5)); });
    if (st === 4) [0, .12, .24].forEach(o => { const q = p - o; if (q > 0 && q < 1) A(g, .8 - q * .6, () => circ(g, sx, dy, 40 + q * 560, null, C.neutron, 2)); });
    c.restore();
    if (st === 3) for (let i = 0; i < 7; i++) { const q = (p * 1.4 - i * .09); if (q > 0 && q < 1) A(g, .7 * (1 - q), () => circ(g, sx + (i % 3 - 1) * 9 + q * 14, gy - q * 70, 6 + q * 12, C.alert)); }
    if (st === 3 && p > .3) T(g, 'radioactive gas vents', sx + 34, gy - 58, { sz: 11, b: 1, col: C.alert });
    box(g, 470, 14, 232, 58, C.panel, C.rule, 4, 1); T(g, 'seismograph', 478, 24, { sz: 10, col: C.muted });
    const n = st === 4 ? Math.floor(seg(p, .15, 1) * 110) : 0, pts = [[478, 50]]; for (let i = 0; i < 110; i++) pts.push([478 + i * 2, 50 + (i < n ? tr[i] * 20 * (i < 22 ? 0 : 1) : 0)]); poly(g, pts, st === 4 ? C.neutron : C.muted, 1.5);
  });
}

/* ---------- 9. boosting and the hydrogen bomb ---------- */
function boostFig(host) {
  const r = rnd(4), ns = []; for (let i = 0; i < 46; i++) ns.push([r() * 6.283, .4 + r() * .6]);
  const capsule = (g, cx, cy, s, prim, glow, sec) => { const C = g.C; box(g, cx - 170 * s, cy - 70 * s, 340 * s, 140 * s, C.soft, C.ink, 70 * s, 2); if (glow > 0) A(g, glow * .55, () => box(g, cx - 166 * s, cy - 66 * s, 332 * s, 132 * s, C.fissile, null, 66 * s)); circ(g, cx - 100 * s, cy, 38 * s, prim > 0 ? C.alert : C.fissile, C.ink, 1.5); if (prim > 0) circ(g, cx - 100 * s, cy, 20 * s * prim, C.paper); const c = g.ctx, rx = lerp(62, 40, Math.max(0, sec)) * s, ry = lerp(40, 26, Math.max(0, sec)) * s; c.beginPath(); c.ellipse(cx + 70 * s, cy, rx, ry, 0, 0, 6.2832); c.fillStyle = sec > .6 ? C.paper : sec < 0 ? C.rule : C.neutron; c.fill(); c.strokeStyle = sec > .6 ? C.neutron : C.ink; c.lineWidth = sec > .6 ? 5 * s : 1.5; c.stroke(); };
  player(host, 340, [
    { n: 'A plain fission core', c: 'The design of 1974: explosive presses directly on a solid plutonium ball with a polonium–beryllium initiator inside. It works, but it is big, about a tonne (p. 242), and wasteful. Most of the plutonium never fissions.', ms: 1500 },
    { n: 'Levitation', c: 'Leave an air gap between the core and the shell that drives it. The shell gathers speed across the gap and strikes the core like a swung hammer where before it could only push. More squeeze from the same explosive means more yield for the weight. Indian designers were working on this in the 1980s (p. 272).', ms: 2800 },
    { n: 'Boosting', c: 'Put a little deuterium and tritium gas at the centre. The heat of the first fissions fuses the gas, and the fusion throws a flood of extra neutrons into the plutonium. Far more of the metal fissions. The same gas mixture also makes a better initiator than short-lived polonium (pp. 272, 431).', ms: 3200 },
    { n: 'Two stages', c: 'A hydrogen bomb is two devices in one case. A fission “primary” goes off first. Its energy floods the case and crushes the “secondary”, a package of fusion fuel (lithium-6 deuteride, p. 427), which then ignites.', ms: 4200 },
    { n: 'What happened on 11 May 1998?', c: 'Chidambaram said India had fired a true two-stage device of 43 kilotons, kept small on purpose (p. 425). US intelligence concluded that the second stage failed to ignite as planned (p. 428), and Perkovich’s own tentative verdict is that the thermonuclear experiment did not succeed (p. 433). Only analysis of the debris could settle it, and that has not been published.', ms: 2400 }
  ], (g, st, p) => {
    const C = g.C, e = ease(p), cx = 200, cy = 170;
    if (st < 3) {
      const gap = st === 1 ? lerp(22, 0, e) : 0, core = st === 0 ? 62 : st === 1 ? 44 : lerp(50, 44, e), sin = st === 0 ? 62 : st === 1 ? 44 + gap : core;
      circ(g, cx, cy, 120, C.soft, C.ink, 2); circ(g, cx, cy, sin + 18, C.rule, C.ink, 1.5); circ(g, cx, cy, sin, C.paper, null); circ(g, cx, cy, core, C.fissile, C.ink, 1.5);
      if (st === 2) { circ(g, cx, cy, 14, p > .35 ? C.paper : C.neutron, C.ink, 1); if (p > .35) ns.forEach(n => { const q = seg(p, .35, 1) * n[1]; circ(g, cx + Math.cos(n[0]) * (14 + q * 34), cy + Math.sin(n[0]) * (14 + q * 34), 2.2, C.neutron); }); T(g, 'deuterium–tritium gas', cx, cy + 142, { al: 'center', sz: 11.5, col: C.neutron, b: 1 }); }
      else circ(g, cx, cy, 5, C.neutron, C.ink, 1);
      if (st === 1) { T(g, 'air gap', cx, cy + 142, { al: 'center', sz: 11.5, b: 1 }); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; if (p < 1) arrow(g, cx + Math.cos(a) * (sin + 34), cy + Math.sin(a) * (sin + 34), cx + Math.cos(a) * (sin + 20), cy + Math.sin(a) * (sin + 20), C.alert, 1.5); } }
      T(g, 'Share of the plutonium that fissions', 400, 96, { sz: 12, b: 1 }); T(g, '(illustrative, not to scale)', 400, 114, { sz: 10.5, col: C.muted });
      [['Plain core', .22], ['Levitated', .4], ['Boosted', .85]].forEach((b, i) => { const y = 140 + i * 46, on = i <= st; T(g, b[0], 400, y, { sz: 11.5, col: on ? C.ink : C.muted }); box(g, 400, y + 10, 290, 16, C.soft, C.rule, 4, 1); if (on) box(g, 400, y + 10, 290 * b[1] * (i === st && st ? e : 1), 16, C.fissile, null, 4); });
    } else if (st === 3) {
      capsule(g, 300, 150, 1, p < .08 ? 0 : seg(p, .08, .3), seg(p, .25, .55), p < .55 ? 0 : seg(p, .55, 1));
      T(g, 'Primary: a fission bomb', 200, 250, { al: 'center', sz: 11.5, b: 1 }); T(g, 'Secondary: fusion fuel', 370, 250, { al: 'center', sz: 11.5, b: 1 });
      T(g, p < .25 ? 'The primary fires' : p < .55 ? 'Its energy fills the case' : p < .85 ? 'The secondary is crushed' : 'Fusion ignites', 300, 290, { al: 'center', sz: 13, b: 1, col: C.alert });
      T(g, 'Schematic only', 560, 150, { sz: 10.5, col: C.muted });
    } else {
      capsule(g, 200, 90, .55, 1, 1, e); capsule(g, 200, 240, .55, 1, 1, -1);
      T(g, 'India’s account', 330, 76, { sz: 13, b: 1 }); T(g, 'The secondary ignited. 43 kilotons, held low to protect nearby villages.', 330, 98, { sz: 11.5, col: C.muted, w: 350 });
      T(g, 'US intelligence’s reading', 330, 226, { sz: 13, b: 1 }); T(g, 'A two-stage design was tried. The second stage did not ignite as planned.', 330, 248, { sz: 11.5, col: C.muted, w: 350 });
    }
  });
}

/* ---------- 10. centrifuge ---------- */
function centFig(host) {
  const r = rnd(8), ds = []; for (let i = 0; i < 70; i++) ds.push({ a: r() * 6.283, h: r() < .78, q: r() });
  const vals = [.7, 1.2, 2, 3.5, 5, 10, 20, 40, 70, 90], Y = v => 262 - (Math.log10(v) - Math.log10(.5)) / (2 - Math.log10(.5)) * 216;
  player(host, 310, [
    { n: 'One machine', c: 'Uranium is turned into a gas and spun in a tall tube at enormous speed. Molecules holding the heavier uranium-238 drift towards the wall. Gas near the centre ends up very slightly richer in uranium-235. One machine barely changes the mix.', ms: 3600 },
    { n: 'A cascade', c: 'So thousands are joined in a chain, each feeding slightly richer gas to the next. Stop early and you have power station fuel. Keep going and you have bomb material. The same plant does both, which is why enrichment is so hard to police.', ms: 4200 },
    { n: 'In the book', c: 'A. Q. Khan worked for a subcontractor of the European enrichment firm URENCO and returned to Pakistan with its centrifuge designs (p. 196). Kahuta was being commissioned by 1979 (p. 217). In 1989 Pakistan told Washington it would not enrich above 5 per cent (p. 303). Early in 1996 Washington had reports that China had supplied 5,000 ring magnets for Kahuta’s centrifuges (p. 373). India built small centrifuge plants at Trombay and near Mysore (p. 325).', ms: 2500 }
  ], (g, st, p) => {
    const C = g.C, cx = 130, cy = 150, rot = (st === 0 ? p : 1) * 9;
    circ(g, cx, cy, 96, C.soft, C.ink, 2.5); circ(g, cx, cy, 6, C.ink);
    ds.forEach(d => { const settle = st === 0 ? ease(seg(p, 0, .7)) : 1, rr = d.h ? lerp(20 + d.q * 70, 62 + d.q * 28, settle) : lerp(20 + d.q * 70, 14 + d.q * 34, settle), a = d.a + rot; circ(g, cx + rr * Math.cos(a), cy + rr * Math.sin(a), 3, d.h ? C.muted : C.fissile); });
    const c = g.ctx; c.beginPath(); c.arc(cx, cy, 108, -.5 + rot * .2, .9 + rot * .2); c.strokeStyle = C.muted; c.lineWidth = 1.5; c.stroke();
    circ(g, 30, 276, 3.5, C.fissile); T(g, 'uranium-235 (lighter)', 40, 276, { sz: 11, col: C.muted }); circ(g, 30, 294, 3.5, C.muted); T(g, 'uranium-238 (heavier)', 40, 294, { sz: 11, col: C.muted });
    A(g, st === 0 ? .35 : 1, () => {
      T(g, 'Uranium-235 share at each step of the chain', 280, 22, { sz: 11.5, b: 1 });
      line(g, 280, 262, 700, 262, C.ink, 1.2);
      vals.forEach((v, i) => { const x = 290 + i * 41, show = st === 0 ? 1 : st === 1 ? seg(p, i * .09, i * .09 + .12) : 1; if (show > 0) { box(g, x, lerp(262, Y(v), show), 30, 262 - lerp(262, Y(v), show), v >= 90 ? C.alert : C.fissile, null, 3); if (show === 1) T(g, v + '%', x + 15, Y(v) - 9, { al: 'center', sz: 10, mono: 1 }); } });
      [[5, 'about 5%: reactor fuel'], [90, 'about 90%: weapon-grade']].forEach(l => { line(g, 280, Y(l[0]), 700, Y(l[0]), C.muted, 1, [5, 4]); T(g, l[1], 284, Y(l[0]) - 9, { sz: 10.5, col: C.muted }); });
      T(g, 'schematic: a real cascade has thousands of machines', 700, 280, { al: 'right', sz: 10, col: C.muted });
    });
    if (st === 2) A(g, ease(p), () => { T(g, '1989 “freeze” line', 696, Y(5) + 12, { al: 'right', sz: 11, b: 1, col: C.neutron }); });
  });
}

/* ---------- 11. delivery ---------- */
function deliveryFig(host) {
  const AP = u => u < .4 ? [lerp(40, 300, u / .4), 250] : u < .7 ? (q => [lerp(300, 420, q), 250 - 130 * q * q])((u - .4) / .3) : (q => [420 - 300 * q * q + 40 * Math.sin(q * 3.14), lerp(120, 78, Math.sin(q * 1.57))])((u - .7) / .3);
  const plane = (g, u) => { const a = AP(u), b = AP(Math.min(1, u + .01)), ang = Math.atan2(b[1] - a[1], b[0] - a[0]), c = g.ctx; c.save(); c.translate(a[0], a[1]); c.rotate(u >= .99 ? Math.PI : ang); c.beginPath(); c.moveTo(16, 0); c.lineTo(-12, -7); c.lineTo(-7, 0); c.lineTo(-12, 7); c.closePath(); c.fillStyle = g.C.ink; c.fill(); c.restore(); };
  const arc = (x0, x1, h, n) => { const pts = []; for (let i = 0; i <= n; i++) { const q = i / n; pts.push([lerp(x0, x1, q), 290 - h * 4 * q * (1 - q)]); } return pts; };
  player(host, 340, [
    { n: 'Aircraft: the low approach', c: 'Until missiles were ready, any Indian weapon would have gone by air: Jaguar, Mirage 2000 or MiG-27 (p. 295). The pilot comes in low to stay under radar.', ms: 2400 },
    { n: 'Pull up and release', c: 'Short of the target the pilot pulls into a steep climb and lets the bomb go on the way up. The bomb is thrown forward like a ball.', ms: 2200 },
    { n: 'Toss-bombing', c: 'The bomb flies on alone while the aircraft rolls away from the blast. Air force officers told Perkovich they practised this in the late 1980s as a normal skill (p. 295). It is also how a fighter delivers a nuclear weapon and survives.', ms: 3000 },
    { n: 'Prithvi', c: 'First flown on 18 February 1988 (p. 295). Range 150 kilometres. Its liquid-fuel engine was developed from the Soviet SAM-2 anti-aircraft missile (p. 247). Liquid fuel was quicker to develop but awkward for an army in the field. India said it carried conventional warheads only.', ms: 2600 },
    { n: 'Agni', c: 'First flown on 22 May 1989. Its first stage is the solid motor of the SLV-3 satellite launcher and its second stage is liquid-fuelled (p. 248). Its real job was to prove a re-entry vehicle: a warhead casing that survives the heat of coming back down through the air at great speed. Officials called it a “technology demonstrator”. Foreign intelligence put this first flight at only about 800 kilometres (p. 301).', ms: 4200 }
  ], (g, st, p) => {
    const C = g.C, e = ease(p);
    if (st < 3) {
      line(g, 0, 282, 720, 282, C.ink, 2); A(g, .5, () => box(g, 0, 283, 720, 57, C.soft, null, 0));
      box(g, 632, 252, 22, 30, C.muted, null, 2); T(g, 'target', 643, 300, { al: 'center', sz: 11, col: C.muted });
      const u = st === 0 ? .4 * e : st === 1 ? lerp(.4, .7, e) : lerp(.7, 1, e), tr = []; for (let i = 0; i <= 60; i++) { const q = i / 60 * u; tr.push(AP(q)); } poly(g, tr, C.muted, 1.2, [5, 4]); plane(g, u);
      if (st === 2) { const bp = []; for (let i = 0; i <= 40; i++) { const q = i / 40 * e; bp.push([lerp(420, 640, q), 120 - 150 * q + 310 * q * q]); } poly(g, bp, C.alert, 1.5, [3, 3]); const b = bp[bp.length - 1]; circ(g, b[0], b[1], 4.5, C.alert); if (p > .97) circ(g, 640, 276, 16, null, C.alert, 3); T(g, 'bomb', b[0] + 8, b[1] - 10, { sz: 11, b: 1, col: C.alert }); }
      if (st === 1 && p > .85) { circ(g, 420, 120, 4.5, C.alert); T(g, 'release', 430, 108, { sz: 11, b: 1, col: C.alert }); }
      T(g, st === 0 ? 'low and fast, under radar' : st === 1 ? 'steep climb' : 'aircraft turns away', 60, 40, { sz: 12.5, b: 1 });
    } else {
      A(g, .16, () => box(g, 0, 170, 720, 120, C.neutron, null, 0)); T(g, 'atmosphere', 706, 180, { al: 'right', sz: 10.5, col: C.muted }); T(g, 'space', 706, 30, { al: 'right', sz: 10.5, col: C.muted });
      line(g, 0, 290, 720, 290, C.ink, 2); box(g, 52, 278, 36, 12, C.ink, null, 2);
      const pr = arc(70, 200, 60, 40), ag = arc(70, 660, 250, 80);
      poly(g, st === 3 ? pr.slice(0, Math.floor(40 * e) + 1) : pr, st === 3 ? C.fissile : C.rule, 2, st === 3 ? [] : [4, 4]);
      if (st === 3) { const q = pr[Math.floor(40 * e)]; circ(g, q[0], q[1], 5, C.fissile); T(g, 'Prithvi: 150 km', 210, 250, { sz: 12.5, b: 1, col: C.fissile }); T(g, 'never leaves the atmosphere', 210, 268, { sz: 11, col: C.muted }); }
      else { const i = Math.floor(80 * e), q = ag[i]; poly(g, ag.slice(0, i + 1), C.fissile, 2); const re = e > .76; circ(g, q[0], q[1], re ? 6 : 5, re ? C.alert : C.fissile); if (re) A(g, .5, () => circ(g, q[0], q[1], 12, C.alert)); if (e < .2) T(g, 'stage 1: solid fuel', 110, 200, { sz: 11, col: C.muted }); else if (e < .45) T(g, 'stage 2: liquid fuel', 190, 90, { sz: 11, col: C.muted }); if (re) T(g, 're-entry: thousands of degrees', q[0] - 14, q[1] - 6, { al: 'right', sz: 11.5, b: 1, col: C.alert }); T(g, 'Agni: reputed 2,500 km', 360, 28, { al: 'center', sz: 12.5, b: 1, col: C.fissile }); T(g, 'Prithvi', 205, 262, { sz: 10.5, col: C.muted }); }
    }
  });
}

/* ---------- HTML builders ---------- */
function bars(host, rows, max, unit, cls) {
  const w = el('div', 'rbars');
  rows.forEach(r => { const a = (r.a != null ? r.a : 0) / max * 100, b = (r.b != null ? r.b : r.km) / max * 100, row = el('div', 'rbar'); row.innerHTML = '<div class="rl">' + r.l + ' <span class="src">' + r.p + '</span></div><div class="rt"><span class="rv k-' + r.k + '" style="left:' + a + '%;width:' + Math.max(b - a, .8) + '%"></span><span class="rn" style="left:' + Math.min(b + 1.5, 88) + '%">' + (r.km ? r.km.toLocaleString('en-GB') + ' km' : (r.a === r.b ? r.a : (r.a ? r.a + '–' : 'under ') + r.b) + ' ' + unit) + '</span></div>'; w.appendChild(row); });
  host.appendChild(w);
}

function timeline(host) {
  const PX = 56, Y0 = 1947, Y1 = 1999, X = y => (y - Y0) * PX, W = (Y1 - Y0) * PX;
  const cats = { prog: 'India’s programme', pol: 'Indian politics and wars', pak: 'Pakistan and China', world: 'Treaties and US policy' };
  const ctrl = el('div', 'ctrl'); ctrl.innerHTML = '<button type="button" class="btn pri" id="tl-play">Play the half-century</button><button type="button" class="btn" id="tl-prev">Previous event</button><button type="button" class="btn" id="tl-next">Next event</button><label class="rng wide" for="tl-rng">Year <input id="tl-rng" type="range" min="1947" max="1998.6" step="0.01" value="1947"></label>';
  const chips = el('div', 'chips'); Object.keys(cats).forEach(k => { const b = el('button', 'chip on c-' + k, cats[k]); b.type = 'button'; b.dataset.k = k; b.setAttribute('aria-pressed', 'true'); chips.appendChild(b); });
  const sc = el('div', 'tl-scroll'), tl = el('div', 'tl'); tl.style.width = W + 'px'; sc.appendChild(tl);
  let h = '<div class="tl-axis">'; for (let y = Y0; y < Y1; y++) h += '<span class="tick' + (y % 5 ? '' : ' maj') + '" style="left:' + X(y) + 'px">' + (y % 5 ? '' : y) + '</span>'; h += '</div>';
  const lane = (lab, arr, cls) => { let s = '<div class="lane"><span class="lane-l">' + lab + '</span>'; arr.forEach((b, i) => { s += '<div class="bar ' + cls + (i % 2 ? ' alt' : '') + '" style="left:' + X(b.a) + 'px;width:' + Math.max(2, X(b.b) - X(b.a) - 1) + 'px" title="' + b.n + '"><span>' + b.n + '</span></div>'; }); return s + '</div>'; };
  h += lane('Prime minister', DATA.pms, 'b-pm') + lane('AEC chairman', DATA.aec, 'b-aec') + lane('Defence science chief', DATA.drdo, 'b-drdo') + lane('Pakistan’s leader', DATA.pak, 'b-pak') + lane('US president', DATA.us, 'b-us');
  h += '<div class="lane evl"><span class="lane-l">Events</span>'; const rows = { prog: 0, pol: 1, pak: 2, world: 3 }, last = {};
  DATA.events.forEach((e, i) => { const x = X(e.y), k = e.c, st = last[k] != null && x - last[k].x < 15 ? (last[k].s + 1) % 3 : 0; last[k] = { x, s: st }; h += '<button type="button" class="ev c-' + k + '" data-i="' + i + '" style="left:' + (x - 7) + 'px;top:' + (6 + rows[k] * 30 + st * 7) + 'px" aria-label="' + Math.floor(e.y) + ': ' + e.t.replace(/"/g, '') + '"></button>'; });
  h += '</div><div class="tl-cur"></div>'; tl.innerHTML = h;
  const now = el('div', 'tl-now'); now.setAttribute('aria-live', 'polite');
  host.append(ctrl, chips, sc, now);
  const cur = $('.tl-cur', tl), rng = $('#tl-rng', ctrl), bPlay = $('#tl-play', ctrl); let y = 1947, playing = false, raf = 0, lastT = 0, hold = 0, shown = -1; const off = {};
  const who = (arr, yy) => { const f = arr.find(b => yy >= b.a && yy < b.b); return f ? f.n : 'none in post'; };
  const vis = () => DATA.events.map((e, i) => i).filter(i => !off[DATA.events[i].c]);
  function show(follow) {
    cur.style.left = X(y) + 'px'; rng.value = y; let idx = -1; vis().forEach(i => { if (DATA.events[i].y <= y + .001) idx = i; });
    $$('.ev', tl).forEach(b => { const i = +b.dataset.i; b.classList.toggle('past', DATA.events[i].y <= y + .001); b.classList.toggle('cur', i === idx); b.hidden = !!off[DATA.events[i].c]; });
    const e = idx >= 0 ? DATA.events[idx] : null;
    now.innerHTML = '<div class="now-y">' + Math.floor(y) + '</div><dl class="now-w"><div><dt>Prime minister</dt><dd>' + who(DATA.pms, y) + '</dd></div><div><dt>AEC chairman</dt><dd>' + who(DATA.aec, y) + '</dd></div><div><dt>Defence science</dt><dd>' + who(DATA.drdo, y) + '</dd></div><div><dt>Pakistan</dt><dd>' + who(DATA.pak, y) + '</dd></div><div><dt>US president</dt><dd>' + who(DATA.us, y) + '</dd></div></dl>' + (e ? '<div class="now-e c-' + e.c + '"><span class="tag">' + cats[e.c] + ' · ' + Math.floor(e.y) + ' · chapter ' + e.ch + '</span><h4>' + e.t + '</h4><p>' + e.d + ' <span class="src">' + e.p + '</span></p></div>' : '<div class="now-e"><h4>August 1947</h4><p>Independence. Press Play, drag the year, or tap any dot.</p></div>');
    if (follow) sc.scrollLeft = X(y) - sc.clientWidth * .45; shown = idx;
  }
  function tick(t) { if (!playing) return; const dt = Math.min(60, t - lastT); lastT = t; if (hold > 0) hold -= dt; else { const before = shown; y += dt / 1000 * 1.15; if (y >= 1998.6) { y = 1998.6; playing = false; bPlay.textContent = 'Play again'; } show(true); if (shown !== before) hold = 2300; } if (playing) raf = requestAnimationFrame(tick); }
  bPlay.onclick = () => { if (playing) { playing = false; bPlay.textContent = 'Resume'; return; } if (y >= 1998.5) y = 1947; playing = true; bPlay.textContent = 'Pause'; lastT = performance.now(); hold = 0; if (reduce) { playing = false; bPlay.textContent = 'Play the half-century'; step(1); return; } raf = requestAnimationFrame(tick); };
  function step(d) { playing = false; bPlay.textContent = 'Play the half-century'; const v = vis(); let t = null; if (d > 0) t = v.find(i => DATA.events[i].y > y + .001); else { v.forEach(i => { if (DATA.events[i].y < y - .001) t = i; }); } if (t != null) { y = DATA.events[t].y; show(true); } }
  $('#tl-next', ctrl).onclick = () => step(1); $('#tl-prev', ctrl).onclick = () => step(-1);
  rng.oninput = () => { playing = false; bPlay.textContent = 'Play the half-century'; y = +rng.value; show(true); };
  tl.addEventListener('click', e => { const b = e.target.closest('.ev'); if (!b) return; playing = false; bPlay.textContent = 'Play the half-century'; y = DATA.events[+b.dataset.i].y; show(false); });
  chips.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; off[b.dataset.k] = !off[b.dataset.k]; b.classList.toggle('on', !off[b.dataset.k]); b.setAttribute('aria-pressed', String(!off[b.dataset.k])); show(false); });
  show(false);
}

function decisions(host) {
  const tabs = el('div', 'tabs'), pane = el('div', 'dec'); host.append(tabs, pane); let tm = [];
  const out = { go: ['Tested', 'k-go'], stop: ['Did not test', 'k-stop'], hold: ['Kept the option open', 'k-hold'] };
  function open(i, anim) {
    tm.forEach(clearTimeout); tm = []; const d = DATA.decisions[i]; $$('.tab', tabs).forEach((t, j) => { t.classList.toggle('on', i === j); t.setAttribute('aria-selected', String(i === j)); });
    pane.innerHTML = '<div class="dec-h"><h4>' + d.title + '</h4><span class="badge ' + out[d.out][1] + '">' + out[d.out][0] + '</span></div><p class="dec-pm">Prime minister: <b>' + d.pm + '</b></p><ol class="steps">' + d.steps.map(s => '<li><span class="who">' + s.who + '</span><span class="what">' + s.t + '</span></li>').join('') + '</ol><div class="dec-r"><b>What came of it.</b> ' + d.result + '</div><button type="button" class="btn" id="dec-re">Replay the sequence</button>';
    const li = $$('.steps li, .dec-r', pane); $('#dec-re', pane).onclick = () => open(i, true);
    if (anim && !reduce) { li.forEach(x => x.classList.add('wait')); li.forEach((x, j) => tm.push(setTimeout(() => x.classList.remove('wait'), 350 + j * 1100))); }
  }
  DATA.decisions.forEach((d, i) => { const b = el('button', 'tab', '<b>' + d.yr + '</b><span>' + d.pm + '</span>'); b.type = 'button'; b.setAttribute('role', 'tab'); b.onclick = () => open(i, true); tabs.appendChild(b); });
  open(1, false);
}

function ladder(host) {
  const ctrl = el('div', 'ctrl', '<button type="button" class="btn pri" id="ld-play">Climb year by year</button><label class="rng wide" for="ld-y">Year <input id="ld-y" type="range" min="1950" max="1998" value="1998"></label><output id="ld-o" class="bigyr">1998</output>'), cols = el('div', 'ladder');
  const col = (name, arr, k) => '<div class="lcol"><h4>' + name + '</h4><ol>' + arr.map(r => '<li data-y="' + r.y + '" class="' + k + '"><span class="ly">' + r.y + '</span><span class="lt"><b>' + r.t + '</b> ' + r.d + ' <span class="src">' + r.p + '</span></span></li>').join('') + '</ol></div>';
  cols.innerHTML = col('India', DATA.ladder.india, 'ind') + col('Pakistan', DATA.ladder.pak, 'pak'); host.append(ctrl, cols);
  const rng = $('#ld-y', ctrl), o = $('#ld-o', ctrl); let tm = 0; const set = y => { rng.value = y; o.textContent = y; $$('li', cols).forEach(li => li.classList.toggle('lit', +li.dataset.y <= y)); };
  rng.oninput = () => { clearInterval(tm); set(+rng.value); };
  $('#ld-play', ctrl).onclick = () => { clearInterval(tm); let y = 1950; set(y); tm = setInterval(() => { y++; set(y); if (y >= 1998) clearInterval(tm); }, reduce ? 60 : 230); };
  set(1998);
}

function road74(host) {
  const b = el('button', 'btn pri', 'Play the build-up'); b.type = 'button'; const ol = el('ol', 'road'); ol.innerHTML = DATA.road74.map(r => '<li><span class="ry">' + r.y + '</span><span class="rt2">' + r.t + ' <span class="src">' + r.p + '</span></span></li>').join(''); const c = el('div', 'ctrl'); c.appendChild(b); host.append(c, ol); let tm = [];
  b.onclick = () => { tm.forEach(clearTimeout); tm = []; const li = $$('li', ol); li.forEach(x => x.classList.add('wait')); li.forEach((x, j) => tm.push(setTimeout(() => x.classList.remove('wait'), reduce ? 0 : 300 + j * 650))); };
}

function facilities(host) {
  const lab = { y: 'Under IAEA safeguards', n: 'No safeguards', c: 'Safeguarded only when safeguarded fuel is inside' }; let h = '<div class="legend"><span class="sw s-y"></span>' + lab.y + '<span class="sw s-n"></span>' + lab.n + '<span class="sw s-c"></span>Conditional</div>', gcur = '';
  DATA.facilities.forEach(f => { if (f.g !== gcur) { if (gcur) h += '</div>'; gcur = f.g; h += '<h4 class="fg">' + f.g + '</h4><div class="fac">'; } h += '<div class="ft s-' + f.s + '"><b>' + f.n + '</b><span>' + f.d + '</span><em>' + lab[f.s] + '</em></div>'; });
  host.innerHTML = h + '</div>';
}

function simpleLists() {
  const rg = $('#regime-list'); if (rg) rg.innerHTML = DATA.regime.map(r => '<li><span class="ry">' + r.y + '</span><span class="rt2"><b>' + r.t + '.</b> ' + r.d + '</span></li>').join('');
  const names = {}; $$('[data-tech]').forEach(s => names[s.id] = s.dataset.tech);
  const ch = $('#chapter-list'); if (ch) ch.innerHTML = DATA.chapters.map((c, i) => '<details class="chap"' + (i === 1 ? ' open' : '') + '><summary><span class="cn">' + c.n + '</span><span class="ct">' + c.t + '</span><span class="cy">' + [c.yrs, c.pm].filter(Boolean).join(' · ') + '</span></summary><div class="cb"><p class="cq">' + c.q + '</p><ul>' + c.s.map(s => '<li>' + s + '</li>').join('') + '</ul><p class="ck"><b>The point.</b> ' + c.k + '</p>' + (c.tech.length ? '<p class="cl">Technology to know first: ' + c.tech.filter(t => names[t]).map(t => '<a href="#' + t + '">' + names[t] + '</a>').join('') + '</p>' : '') + '</div></details>').join('');
  const pm = $('#pm-cards'); if (pm) { const v = { build: 'Built capability', go: 'Tested', hold: 'Held the line', stop: 'Restrained' }; pm.innerHTML = DATA.pmcards.map(c => '<article class="pmc v-' + c.v + '"><header><span class="pmy">' + c.y + '</span><span class="badge k-' + c.v + '">' + v[c.v] + '</span></header><h4>' + c.n + '</h4><p class="pmh">' + c.h + '</p><p>' + c.d + '</p><p class="pms">Scientists at the table: ' + c.sci + '</p></article>').join(''); }
  const pp = $('#people-list'); if (pp) { let g = '', h = ''; DATA.people.forEach(p => { if (p.g !== g) { if (g) h += '</div>'; g = p.g; h += '<h4 class="fg">' + g + '</h4><div class="ppl">'; } h += '<div class="pp"><b>' + p.n + '</b><em>' + p.r + '</em><span>' + p.d + '</span></div>'; }); pp.innerHTML = h + '</div>'; }
  const gl = $('#glossary-list'), gs = $('#gl-search'); if (gl) { const draw = q => { q = (q || '').toLowerCase(); const m = DATA.glossary.filter(t => !q || (t[0] + ' ' + t[1]).toLowerCase().indexOf(q) >= 0); gl.innerHTML = m.length ? m.map(t => '<div><dt>' + t[0] + '</dt><dd>' + t[1] + '</dd></div>').join('') : '<p class="cap">No term matches. Try a shorter word.</p>'; }; draw(''); if (gs) gs.oninput = () => draw(gs.value); }
}

/* ---------- boot ---------- */
const reg = { chain: chainFig, roads: roadsFig, reactor: reactorFig, reproc: reprocFig, three: threeFig, implosion: implosionFig, half: halfFig, test: testFig, boost: boostFig, cent: centFig, delivery: deliveryFig, timeline, decisions, ladder, road74, facilities,
  yield74: h => bars(h, DATA.yield74, 65, 'kt'), yield98: h => bars(h, DATA.yield98, 65, 'kt'), ranges: h => bars(h, DATA.ranges, 2600, 'km') };
function boot() { simpleLists(); $$('[data-fig]').forEach(h => { const f = reg[h.dataset.fig]; if (!f) return; try { f(h); } catch (err) { h.appendChild(el('p', 'cap', 'This figure could not be drawn in your browser.')); if (window.console) console.error(h.dataset.fig, err); } }); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
