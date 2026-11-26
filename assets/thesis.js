(function () {
  'use strict';
  var STEPS = [
    ['Status deficit', 'A state sees a gap between what it can do and the standing others give it. In the thesis this gap is the starting condition and the best account of motive, not something proved to cause behaviour.'],
    ['Reading the hierarchy', 'The state asks two questions of the existing regional order: is it open to our claims, and are its standards fair? Both are perceptions, coded from evidence dated before each outcome.'],
    ['Choosing a mechanism', 'The answers select the strategy. Open and legitimate favours expansive moves, open but illegitimate favours contraction, and closed but legitimate favours hedging.'],
    ['Using the instruments', 'Three tools carry out the strategy: geographic expansion redraws the boundary, normative rebranding changes the identity on offer, and institutional layering builds a parallel hierarchy.'],
    ['Bounded returns', 'The recognition gained is capped. Four conditions found in the cases do the capping, and the gap that remains keeps the investment going.']
  ];
  var CELLS = {
    c1: ['Open and legitimate: expansive', 'The hierarchy accepts the state and its standards are seen as fair, so the state works to widen the frame and join in.', 'Fits Nehru’s Asian project and the Look East Policy. The thesis qualifies the fit in both cases: the configuration closes after 1959 in the first, and the recognition ceiling limits the second.'],
    c3: ['Open but illegitimate: contractive', 'The door is open, but the rules are seen as unfair, so the state narrows its focus to a smaller frame it can shape.', 'Fits the move from SAARC to BIMSTEC after 2016. The limits of substituting one framework for another show up in the Bangladesh question.'],
    c2: ['Closed but legitimate: hedging', 'The order’s standards are accepted, but the top rank stays closed, so the state spreads its commitments across several groupings.', 'Fits the Indo-Pacific and QUAD strategy, tested by the Ukraine war and the 2025–26 stress test.'],
    c4: ['Closed and illegitimate: competitive', 'Both perceptions turn adverse. The prediction is that the state builds alternative institutions meant to displace the old ones, not reform them.', 'No case in the thesis reaches this cell. India’s closest approaches, such as the UN Security Council reform campaign and BRICS, are read as staying within the existing order.']
  };
  var HYP = [
    ['H1', 'A status deficit drives re-engineering', ['Direct support', 'Reconstructive support', 'Reconstructive support', 'Reconstructive support']],
    ['H2', 'Openness and legitimacy together predict the configuration', ['Qualified support', 'Direct support', 'Qualified support', 'Direct support']],
    ['H3', 'World-order context governs the timing and form of re-engineering', ['Qualified support', 'Consistent, case-generated (not an independent test)', 'Qualified support', 'Qualified support']],
    ['H4', 'New institutional frameworks show social-closure design', ['Reconstructive support', 'Direct support', 'Not within scope', 'Qualified support']],
    ['H5', 'Successful re-engineering contributes to the emerging order’s architecture', ['Limited support', 'Not within scope', 'Not within scope', 'Qualified support']]
  ];
  var CASES = ['Nehruvian', 'SAARC–BIMSTEC', 'Look East', 'Indo-Pacific'];
  var GLOSS = [
    ['Bounded returns', 'The finding that each mechanism yields only a limited gain in recognition, capped by specific conditions.'],
    ['Configuration', 'One of the four combinations of perceived openness and perceived legitimacy.'],
    ['Expansive, contractive and hedging', 'The three mechanisms: widen the frame, narrow it to a smaller group, or spread commitments across several.'],
    ['Geographic expansion', 'Redrawing the boundary of the region so that the state sits at its centre.'],
    ['Institutional layering', 'Building new institutions alongside existing ones, so that the state’s leadership is structurally favoured.'],
    ['Multiplex world order', 'An order with many centres of power and many overlapping institutions, with no single hegemon.'],
    ['Normative rebranding', 'Offering a new set of values or identity for the region, so that the state’s strengths count for more.'],
    ['Openness', 'How far the existing regional hierarchy is seen as willing to accept the rising power’s claims.'],
    ['Legitimacy', 'How far the criteria used to judge the rising power are seen as fair.'],
    ['Process tracing', 'A method that follows a causal chain through detailed, dated evidence inside a case.'],
    ['Reconstructive standard', 'The weaker test used when status motives are not stated openly: infer the motive from a pattern of behaviour that fits it better than other readings.'],
    ['Recognition ceiling', 'The upper limit on status gains from joining a framework, set by the material gap with the strongest rival in it.'],
    ['Region re-engineering', 'Deliberate reshaping of a region’s boundaries, values or institutions to change how a state’s standing is judged.'],
    ['Social closure', 'The process by which a group decides who belongs and on what terms, which a region does for its members.'],
    ['Status', 'Standing in the eyes of others, which depends on who is judging and by what standard.'],
    ['Status deficit', 'The gap between a state’s capabilities and the recognition it receives.']
  ];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var sp = $('#th-step-panel');
  function showStep(i) {
    $$('.th-step').forEach(function (b) { var on = +b.dataset.step === i; b.classList.toggle('is-active', on); b.setAttribute('aria-selected', String(on)); });
    sp.innerHTML = '<h4></h4><p></p>'; $('h4', sp).textContent = STEPS[i][0]; $('p', sp).textContent = STEPS[i][1];
  }
  $$('.th-step').forEach(function (b) { b.addEventListener('click', function () { showStep(+b.dataset.step); }); });
  showStep(0);

  var cp = $('#th-cell-panel');
  function showCell(k) {
    $$('.th-cell').forEach(function (b) { b.classList.toggle('is-active', b.dataset.cell === k); b.setAttribute('aria-pressed', String(b.dataset.cell === k)); });
    var c = CELLS[k]; cp.innerHTML = '<h4></h4><p></p><p class="th-case-fit"></p>';
    $('h4', cp).textContent = c[0]; $$('p', cp)[0].textContent = c[1]; $$('p', cp)[1].textContent = c[2];
  }
  $$('.th-cell').forEach(function (b) { b.addEventListener('click', function () { showCell(b.dataset.cell); }); });
  showCell('c1');

  var hy = $('#th-hyp');
  function showHyp(c) {
    hy.innerHTML = '';
    HYP.forEach(function (h) {
      var row = document.createElement('div'); row.className = 'th-hrow';
      var head = document.createElement('div'); head.className = 'th-hhead';
      head.innerHTML = '<b></b><span></span>'; $('b', head).textContent = h[0]; $('span', head).textContent = h[1]; row.appendChild(head);
      var list = document.createElement('ul');
      h[2].forEach(function (v, i) {
        if (c !== 'all' && +c !== i + 1) return;
        var li = document.createElement('li'); li.innerHTML = '<i></i><span></span>';
        $('i', li).textContent = CASES[i]; $('span', li).textContent = v;
        if (/Not within/.test(v)) li.className = 'is-out';
        list.appendChild(li);
      });
      row.appendChild(list); hy.appendChild(row);
    });
  }
  $$('.th-chip').forEach(function (b) { b.addEventListener('click', function () {
    $$('.th-chip').forEach(function (x) { x.classList.toggle('is-active', x === b); }); showHyp(b.dataset.case); }); });
  showHyp('all');

  var gl = $('#th-gloss'), gs = $('#th-gsearch');
  function showGloss(q) {
    gl.innerHTML = ''; q = (q || '').toLowerCase();
    GLOSS.filter(function (g) { return !q || (g[0] + ' ' + g[1]).toLowerCase().indexOf(q) > -1; }).forEach(function (g) {
      var dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = g[0]; dd.textContent = g[1]; gl.appendChild(dt); gl.appendChild(dd); });
    if (!gl.children.length) { var p = document.createElement('dd'); p.textContent = 'No matching terms.'; gl.appendChild(p); }
  }
  gs.addEventListener('input', function () { showGloss(gs.value); }); showGloss('');
})();
