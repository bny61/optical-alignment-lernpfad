/* sim-msa.js — Messsystemanalyse: Gage R&R gegen Toleranz und Teilestreuung */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  SIMS.msa = function (root) {
    var st = { ev: 1.2, av: 0.8, pv: 6.0, tol: 20 }; // alles in nm

    var chartBox = CH.el('div', { class: 'sim-canvas' });
    var rGrr = CH.readout('%GRR (Toleranz)');
    var rTv = CH.readout('%GRR (Streuung)');
    var rNdc = CH.readout('ndc');
    var verdict = CH.el('div', { class: 'callout', style: 'margin-top:.9rem' });

    function update() {
      var grr = Math.sqrt(st.ev * st.ev + st.av * st.av);
      var tv = Math.sqrt(grr * grr + st.pv * st.pv);
      var pTol = 6 * grr / st.tol * 100;          // 6σ-Streubreite gegen Toleranzbreite
      var pTv = grr / tv * 100;                    // Anteil an der Gesamtstreuung
      var ndc = Math.floor(1.41 * st.pv / grr);    // number of distinct categories

      rGrr.set(CH.fmt(pTol, 1) + ' %', klasse(pTol));
      rTv.set(CH.fmt(pTv, 1) + ' %', klasse(pTv));
      rNdc.set(String(ndc), ndc >= 5 ? 'ok' : 'bad');

      var k = klasse(pTol);
      verdict.className = 'callout ' + (k === 'ok' ? 'ok' : k === 'warn' ? 'warn' : '');
      verdict.style.borderColor = k === 'bad' ? 'var(--bad)' : '';
      verdict.innerHTML = k === 'ok'
        ? '<strong>Messsystem fähig (&lt; 10 %)</strong>Streuung in der Messreihe darf als Prozessstreuung interpretiert werden.'
        : k === 'warn'
        ? '<strong>Bedingt fähig (10–30 %)</strong>Nutzbar, wenn die Toleranz unkritisch ist oder die Messung wirtschaftlich nicht verbesserbar ist. Reaktionsgrenzen entsprechend weiter fassen.'
        : '<strong>Nicht fähig (&gt; 30 %)</strong>Ein großer Teil der beobachteten „Prozessstreuung" ist Messrauschen. Prozessverbesserungen auf dieser Datenbasis sind nicht bewertbar — zuerst das Messsystem verbessern.';

      chartBox.innerHTML = '';
      chartBox.appendChild(varianzChart(st.ev, st.av, st.pv));
    }

    function klasse(p) { return p < 10 ? 'ok' : p <= 30 ? 'warn' : 'bad'; }

    function varianzChart(ev, av, pv) {
      var parts = [
        { label: 'Wiederholbarkeit (EV)', v: ev * ev, color: 'var(--bad)' },
        { label: 'Vergleichbarkeit (AV)', v: av * av, color: 'var(--warn)' },
        { label: 'Teilestreuung (PV)',    v: pv * pv, color: 'var(--ok)' }
      ];
      var sum = parts.reduce(function (a, p) { return a + p.v; }, 0) || 1;
      var w = 420, h = 132, barY = 30, barH = 34, x = 10;
      var svg = CH.svgEl('svg', { viewBox: '0 0 ' + w + ' ' + h, role: 'img',
        'aria-label': 'Aufteilung der Gesamtvarianz auf Mess- und Teilestreuung' });
      svg.appendChild(CH.svgEl('text', { x: 10, y: 16, 'font-size': 11, fill: 'var(--text-mute)',
        text: 'Anteile an der Gesamtvarianz σ²ᵍₑₛ' }));

      parts.forEach(function (p, i) {
        var bw = p.v / sum * (w - 20);
        svg.appendChild(CH.svgEl('rect', { x: x, y: barY, width: Math.max(0, bw), height: barH,
          fill: p.color, opacity: .85 }));
        if (bw > 34) {
          svg.appendChild(CH.svgEl('text', { x: x + bw / 2, y: barY + barH / 2 + 4, 'text-anchor': 'middle',
            'font-size': 10, 'font-family': 'var(--mono)', fill: '#fff',
            text: (p.v / sum * 100).toFixed(0) + '%' }));
        }
        svg.appendChild(CH.svgEl('circle', { cx: 14, cy: 84 + i * 15, r: 4, fill: p.color, opacity: .85 }));
        svg.appendChild(CH.svgEl('text', { x: 24, y: 88 + i * 15, 'font-size': 10.5, fill: 'var(--text-mute)',
          text: p.label + ' — σ = ' + Math.sqrt(p.v).toFixed(2) + ' nm' }));
        x += bw;
      });
      return svg;
    }

    var controls = CH.el('div', { class: 'sim-controls' }, [
      CH.slider({ label: 'Wiederholbarkeit σ_EV', min: .1, max: 6, step: .1, value: st.ev, unit: 'nm', digits: 1,
        hint: 'Gerät, gleiches Teil, gleicher Prüfer' }, function (v) { st.ev = v; update(); }),
      CH.slider({ label: 'Vergleichbarkeit σ_AV', min: 0, max: 6, step: .1, value: st.av, unit: 'nm', digits: 1,
        hint: 'Unterschiede zwischen Prüfern / Aufspannungen' }, function (v) { st.av = v; update(); }),
      CH.slider({ label: 'Teilestreuung σ_PV', min: .5, max: 15, step: .1, value: st.pv, unit: 'nm', digits: 1 },
        function (v) { st.pv = v; update(); }),
      CH.slider({ label: 'Toleranzbreite', min: 5, max: 80, step: 1, value: st.tol, unit: 'nm', digits: 0,
        hint: 'OSG − USG der Merkmalsspezifikation' }, function (v) { st.tol = v; update(); })
    ]);

    var out = CH.el('div', { class: 'sim-output' }, [
      chartBox,
      CH.el('div', { class: 'readouts' }, [rGrr, rTv, rNdc]),
      verdict
    ]);

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'sim-grid' }, [controls, out]),
      CH.el('p', { class: 'note-sim', html:
        '%GRR(Toleranz) = 6·σ_GRR / Toleranzbreite · 100, σ_GRR = √(σ²_EV + σ²_AV). ' +
        'ndc = 1,41 · σ_PV / σ_GRR (gefordert: ≥ 5). Bewertungsgrenzen nach AIAG MSA: &lt; 10 % fähig, 10–30 % bedingt, &gt; 30 % nicht fähig. ' +
        'Das Modell rechnet direkt mit Standardabweichungen statt aus einer Messreihe (ANOVA).'
      })
    ]));

    update();
  };
})(window);
