/* sim-spc.js — Regelkarte (x̄) mit Drift, Sprung, Western-Electric-Regeln und Cp/Cpk */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  var N_GROUPS = 40;

  SIMS.spc = function (root) {
    var st = { sigma: 1.0, drift: 0.0, sprung: 0.0, n: 4, tol: 6, seed: 21 };

    var chartBox = CH.el('div', { class: 'sim-canvas' });
    var rCp = CH.readout('Cp'), rCpk = CH.readout('Cpk'), rViol = CH.readout('Regelverletzungen'), rPpm = CH.readout('erwarteter Ausschuss');
    var log = CH.el('div', { class: 'callout job', style: 'margin-top:.9rem;font-size:.86rem' });

    function simulate() {
      var rand = CH.rng(st.seed);
      var groups = [];
      for (var g = 0; g < N_GROUPS; g++) {
        // Mittelwertverschiebung: linearer Drift ab Gruppe 0, Sprung ab Gruppe 20
        var shift = st.drift * g + (g >= 20 ? st.sprung : 0);
        var vals = [];
        for (var i = 0; i < st.n; i++) vals.push(shift + CH.gauss(rand) * st.sigma);
        groups.push({ i: g, xbar: CH.mean(vals), vals: vals });
      }
      return groups;
    }

    /** Western-Electric-Regeln 1–4 auf standardisierten Werten z = (x̄ − CL)/σ_x̄. */
    function weRules(z) {
      var hits = {};
      function mark(i, rule) { (hits[i] = hits[i] || []).push(rule); }
      for (var i = 0; i < z.length; i++) {
        if (Math.abs(z[i]) > 3) mark(i, 'Regel 1: Punkt außerhalb 3σ');
        if (i >= 2) {
          for (var s = -1; s <= 1; s += 2) {
            var c = [z[i], z[i - 1], z[i - 2]].filter(function (v) { return s * v > 2; }).length;
            if (c >= 2 && s * z[i] > 2) mark(i, 'Regel 2: 2 von 3 jenseits 2σ');
          }
        }
        if (i >= 4) {
          for (var s2 = -1; s2 <= 1; s2 += 2) {
            var c2 = z.slice(i - 4, i + 1).filter(function (v) { return s2 * v > 1; }).length;
            if (c2 >= 4 && s2 * z[i] > 1) mark(i, 'Regel 3: 4 von 5 jenseits 1σ');
          }
        }
        if (i >= 7) {
          var run = z.slice(i - 7, i + 1);
          if (run.every(function (v) { return v > 0; }) || run.every(function (v) { return v < 0; })) {
            mark(i, 'Regel 4: 8 Punkte auf einer Seite');
          }
        }
      }
      return hits;
    }

    function update() {
      var groups = simulate();
      var sigmaXbar = st.sigma / Math.sqrt(st.n);
      var CL = 0, UCL = 3 * sigmaXbar, LCL = -3 * sigmaXbar;
      var z = groups.map(function (g) { return (g.xbar - CL) / sigmaXbar; });
      var hits = weRules(z);
      var nViol = Object.keys(hits).length;

      // Prozessfähigkeit über alle Einzelwerte
      var alle = groups.reduce(function (a, g) { return a.concat(g.vals); }, []);
      var mu = CH.mean(alle), sd = CH.stdev(alle);
      var USG = -st.tol / 2, OSG = st.tol / 2;
      var cp = (OSG - USG) / (6 * sd);
      var cpk = Math.min(OSG - mu, mu - USG) / (3 * sd);
      var ppm = (CH.normCdf((USG - mu) / sd) + (1 - CH.normCdf((OSG - mu) / sd))) * 1e6;

      rCp.set(CH.fmt(cp, 2), cp >= 1.33 ? 'ok' : cp >= 1 ? 'warn' : 'bad');
      rCpk.set(CH.fmt(cpk, 2), cpk >= 1.33 ? 'ok' : cpk >= 1 ? 'warn' : 'bad');
      rViol.set(String(nViol), nViol === 0 ? 'ok' : nViol <= 3 ? 'warn' : 'bad');
      rPpm.set(ppm < 1 ? '< 1 ppm' : Math.round(ppm) + ' ppm', ppm < 64 ? 'ok' : ppm < 2700 ? 'warn' : 'bad');

      var span = Math.max(st.tol / 2 * 1.1, Math.abs(UCL) * 1.6,
        groups.reduce(function (m, g) { return Math.max(m, Math.abs(g.xbar)); }, 0) * 1.2);
      var sc = CH.plot({
        w: 620, h: 300, x: [0, N_GROUPS - 1], y: [-span, span],
        xLabel: 'Stichprobe (Untergruppe)', yLabel: 'x̄ [Einheiten]',
        xFmt: function (v) { return String(Math.round(v)); },
        label: 'Regelkarte für Untergruppenmittelwerte'
      });

      sc.layer.appendChild(CH.hline(sc, UCL, 'OEG (3σ)', { stroke: 'var(--bad)' }));
      sc.layer.appendChild(CH.hline(sc, LCL, 'UEG (3σ)', { stroke: 'var(--bad)' }));
      sc.layer.appendChild(CH.hline(sc, 2 * sigmaXbar, '2σ', { stroke: 'var(--warn)', opacity: .6 }));
      sc.layer.appendChild(CH.hline(sc, -2 * sigmaXbar, null, { stroke: 'var(--warn)', opacity: .6 }));
      sc.layer.appendChild(CH.hline(sc, CL, 'Mittellinie', { stroke: 'var(--text-mute)', 'stroke-dasharray': null }));
      sc.layer.appendChild(CH.hline(sc, OSG, 'OSG (Spez.)', { stroke: 'var(--accent)', 'stroke-dasharray': '2 4' }));
      sc.layer.appendChild(CH.hline(sc, USG, 'USG (Spez.)', { stroke: 'var(--accent)', 'stroke-dasharray': '2 4' }));

      if (st.sprung !== 0) {
        sc.layer.appendChild(CH.svgEl('line', {
          x1: sc.x(20), x2: sc.x(20), y1: sc.pad.t, y2: sc.h - sc.pad.b,
          stroke: 'var(--text-mute)', 'stroke-width': 1, 'stroke-dasharray': '2 3'
        }));
        sc.layer.appendChild(CH.svgEl('text', {
          x: sc.x(20) + 4, y: sc.pad.t + 11, 'font-size': 9.5, fill: 'var(--text-mute)',
          text: 'Ereignis (z. B. Werkzeugwechsel)'
        }));
      }

      sc.layer.appendChild(CH.line(sc, groups.map(function (g) { return { x: g.i, y: g.xbar }; })));
      groups.forEach(function (g) {
        var bad = hits[g.i];
        sc.layer.appendChild(CH.dot(sc, { x: g.i, y: g.xbar }, {
          r: bad ? 4.5 : 2.8,
          fill: bad ? 'var(--bad)' : 'var(--accent)'
        }));
      });

      chartBox.innerHTML = '';
      chartBox.appendChild(sc.svg);

      var erste = Object.keys(hits).map(Number).sort(function (a, b) { return a - b; })[0];
      log.innerHTML = nViol === 0
        ? '<strong>Prozess beherrscht</strong>Keine Regelverletzung. Jetzt gilt: <em>nicht nachstellen</em>. Eingriffe in einen beherrschten Prozess erhöhen die Streuung (Overcontrol / Tampering).'
        : '<strong>' + nViol + ' Signal(e), erstes bei Untergruppe ' + erste + '</strong>' +
          hits[erste].join(' · ') + '. Ein Signal heißt: es wirkt eine <em>besondere</em> Ursache. ' +
          'Nach Ursache suchen (Werkzeug, Charge, Schicht, Umgebung) — nicht am Sollwert drehen.';
    }

    var controls = CH.el('div', { class: 'sim-controls' }, [
      CH.slider({ label: 'Prozessstreuung σ', min: .2, max: 3, step: .05, value: st.sigma, digits: 2 },
        function (v) { st.sigma = v; update(); }),
      CH.slider({ label: 'Drift je Untergruppe', min: 0, max: .15, step: .005, value: st.drift, digits: 3,
        hint: 'z. B. Werkzeugverschleiß, Temperaturgang' }, function (v) { st.drift = v; update(); }),
      CH.slider({ label: 'Sprung ab Untergruppe 20', min: -3, max: 3, step: .1, value: st.sprung, digits: 1,
        hint: 'z. B. Chargenwechsel, neue Vorrichtung' }, function (v) { st.sprung = v; update(); }),
      CH.slider({ label: 'Untergruppengröße n', min: 1, max: 10, step: 1, value: st.n, digits: 0,
        hint: 'größeres n → engere Eingriffsgrenzen' }, function (v) { st.n = v; update(); }),
      CH.slider({ label: 'Toleranzbreite (OSG−USG)', min: 2, max: 20, step: .5, value: st.tol, digits: 1 },
        function (v) { st.tol = v; update(); }),
      CH.el('button', { class: 'btn btn-sm', text: 'Neue Stichprobenreihe',
        onclick: function () { st.seed++; update(); } })
    ]);

    var out = CH.el('div', { class: 'sim-output' }, [
      chartBox,
      CH.el('div', { class: 'readouts' }, [rCp, rCpk, rViol, rPpm]),
      log
    ]);

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'sim-grid' }, [controls, out]),
      CH.el('p', { class: 'note-sim', html:
        'Eingriffsgrenzen = ±3·σ/√n um die Mittellinie (aus σ berechnet, nicht aus den Daten geschätzt). ' +
        'Regelverletzungen nach Western Electric 1–4. Cp/Cpk aus allen Einzelwerten, Ausschuss über die Normalverteilung. ' +
        'Werte sind einheitenlos zu lesen — in der Justage z. B. Zentrierfehler in µm oder Wellenfront-RMS in mλ.'
      })
    ]));

    update();
  };
})(window);
