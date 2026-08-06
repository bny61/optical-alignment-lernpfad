/* sim-tolerance.js — Toleranzkette im Montagestapel: Worst Case vs. RSS vs. Monte-Carlo */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  var N = 4000;

  SIMS.tolerance = function (root) {
    /* Beiträge zum resultierenden Zentrierfehler eines Objektivmoduls (µm).
       s = Empfindlichkeit (µm Zentrierfehler je µm Bauteilabweichung). */
    var beitraege = [
      { name: 'Linsenrand-Zentrierfehler', t: 4.0, s: 1.0 },
      { name: 'Fassungsbohrung',           t: 6.0, s: 0.8 },
      { name: 'Klebespaltschwankung',      t: 3.0, s: 1.4 },
      { name: 'Aufnahme / Vorrichtung',    t: 2.5, s: 1.0 }
    ];
    var st = { spez: 12, vert: 'normal', versatz: 0, seed: 5 };

    var chartBox = CH.el('div', { class: 'sim-canvas' });
    var rWc = CH.readout('Worst Case'), rRss = CH.readout('RSS (statistisch)'),
        rCpk = CH.readout('Cpk'), rPpm = CH.readout('außerhalb Spez.');
    var hinweis = CH.el('div', { class: 'callout job', style: 'margin-top:.9rem;font-size:.86rem' });

    function monteCarlo() {
      var rand = CH.rng(st.seed), out = [];
      for (var k = 0; k < N; k++) {
        var sum = st.versatz;
        for (var i = 0; i < beitraege.length; i++) {
          var b = beitraege[i], v;
          if (st.vert === 'normal') {
            // Toleranz t entspricht ±3σ
            v = CH.gauss(rand) * (b.t / 3);
          } else {
            v = (rand() * 2 - 1) * b.t;
          }
          sum += v * b.s;
        }
        out.push(sum);
      }
      return out;
    }

    function update() {
      var wc = beitraege.reduce(function (a, b) { return a + b.t * b.s; }, 0);
      var rss = Math.sqrt(beitraege.reduce(function (a, b) { return a + Math.pow(b.t * b.s, 2); }, 0));
      var data = monteCarlo();
      var mu = CH.mean(data), sd = CH.stdev(data);
      var cpk = Math.min(st.spez - mu, st.spez + mu) / (3 * sd);
      var ausser = data.filter(function (v) { return Math.abs(v) > st.spez; }).length;
      var ppm = ausser / N * 1e6;

      rWc.set('±' + CH.fmt(wc, 1) + ' µm', wc <= st.spez ? 'ok' : 'bad');
      rRss.set('±' + CH.fmt(rss, 1) + ' µm', rss <= st.spez ? 'ok' : 'bad');
      rCpk.set(CH.fmt(cpk, 2), cpk >= 1.33 ? 'ok' : cpk >= 1 ? 'warn' : 'bad');
      rPpm.set(ppm < 250 ? Math.round(ppm) + ' ppm' : (ppm / 1e4).toFixed(2) + ' %',
        ppm < 64 ? 'ok' : ppm < 2700 ? 'warn' : 'bad');

      chartBox.innerHTML = '';
      chartBox.appendChild(histogramm(data, wc, rss));

      hinweis.innerHTML = wc > st.spez && rss <= st.spez
        ? '<strong>Klassischer Ramp-up-Konflikt</strong>Die arithmetische Worst-Case-Kette verletzt die Spezifikation, die statistische (RSS) hält sie ein. ' +
          'RSS ist zulässig, wenn alle Beiträge zufällig, unabhängig und zentriert sind — genau das ist im Anlauf noch nicht gesichert. ' +
          'Deshalb im Ramp-up: 100 %-Prüfung, bis die Verteilungen belegt sind.'
        : wc <= st.spez
        ? '<strong>Worst Case innerhalb der Spezifikation</strong>Die Kette ist auch ohne statistische Annahmen sicher. Teuer erkauft — prüfen Sie, ob einzelne Einzeltoleranzen aufgeweitet und damit Kosten gesenkt werden können.'
        : '<strong>Auch statistisch nicht fähig</strong>Weder Worst Case noch RSS halten die Spezifikation. Hebel: den Beitrag mit dem größten <em>t·s</em> angreifen (Empfindlichkeit senken schlägt Toleranz verengen) oder eine Justage-Operation einführen, die den Stapelfehler aktiv kompensiert.';
    }

    function histogramm(data, wc, rss) {
      var span = Math.max(st.spez * 1.35, wc * 1.1);
      var bins = 45, counts = new Array(bins).fill(0);
      data.forEach(function (v) {
        var idx = Math.floor((v + span) / (2 * span) * bins);
        if (idx >= 0 && idx < bins) counts[idx]++;
      });
      var maxC = Math.max.apply(null, counts) || 1;

      var sc = CH.plot({
        w: 620, h: 280, x: [-span, span], y: [0, maxC * 1.12],
        xLabel: 'Resultierender Zentrierfehler [µm]', yLabel: 'Häufigkeit', yTicks: 4,
        yFmt: function (v) { return String(Math.round(v)); },
        label: 'Verteilung des resultierenden Zentrierfehlers'
      });

      var bw = (sc.w - sc.pad.l - sc.pad.r) / bins;
      counts.forEach(function (c, i) {
        var x0 = -span + (2 * span) * i / bins;
        var mitte = x0 + span / bins;
        sc.layer.appendChild(CH.svgEl('rect', {
          x: sc.x(x0), y: sc.y(c), width: Math.max(1, bw - 1), height: Math.max(0, sc.y(0) - sc.y(c)),
          fill: Math.abs(mitte) > st.spez ? 'var(--bad)' : 'var(--accent)', opacity: .8
        }));
      });

      [[st.spez, 'Spez. +'], [-st.spez, 'Spez. −']].forEach(function (p) {
        sc.layer.appendChild(CH.svgEl('line', {
          x1: sc.x(p[0]), x2: sc.x(p[0]), y1: sc.pad.t, y2: sc.y(0),
          stroke: 'var(--bad)', 'stroke-width': 1.5, 'stroke-dasharray': '5 3'
        }));
        sc.layer.appendChild(CH.svgEl('text', {
          x: sc.x(p[0]) + (p[0] > 0 ? 4 : -4), y: sc.pad.t + 11,
          'text-anchor': p[0] > 0 ? 'start' : 'end', 'font-size': 9.5, fill: 'var(--bad)', text: p[1]
        }));
      });
      [[wc, 'Worst Case', 'var(--warn)'], [rss, 'RSS', 'var(--ok)']].forEach(function (p) {
        if (p[0] > span) return;
        sc.layer.appendChild(CH.svgEl('line', {
          x1: sc.x(p[0]), x2: sc.x(p[0]), y1: sc.y(0) - 26, y2: sc.y(0),
          stroke: p[2], 'stroke-width': 2
        }));
        sc.layer.appendChild(CH.svgEl('text', {
          x: sc.x(p[0]), y: sc.y(0) - 30, 'text-anchor': 'middle', 'font-size': 9.5, fill: p[2], text: p[1]
        }));
      });
      return sc.svg;
    }

    var controls = CH.el('div', { class: 'sim-controls' });
    beitraege.forEach(function (b) {
      controls.appendChild(CH.slider({
        label: b.name, min: 0.5, max: 10, step: .5, value: b.t, unit: 'µm', digits: 1,
        hint: 'Einzeltoleranz ± · Empfindlichkeit ' + b.s
      }, function (v) { b.t = v; update(); }));
    });
    controls.appendChild(CH.slider({ label: 'Spezifikationsgrenze', min: 5, max: 30, step: 1, value: st.spez, unit: 'µm', digits: 0 },
      function (v) { st.spez = v; update(); }));
    controls.appendChild(CH.slider({ label: 'Systematischer Versatz', min: -8, max: 8, step: .5, value: st.versatz, unit: 'µm', digits: 1,
      hint: 'z. B. Vorrichtung nicht zentriert' }, function (v) { st.versatz = v; update(); }));
    controls.appendChild(CH.select({ label: 'Verteilung der Einzelbeiträge', value: st.vert, options: [
      { value: 'normal', label: 'Normal (Toleranz = ±3σ)' },
      { value: 'gleich', label: 'Gleichverteilt (100 %-Sortierung)' }
    ] }, function (v) { st.vert = v; update(); }));

    var out = CH.el('div', { class: 'sim-output' }, [
      chartBox,
      CH.el('div', { class: 'readouts' }, [rWc, rRss, rCpk, rPpm]),
      hinweis
    ]);

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'sim-grid' }, [controls, out]),
      CH.el('p', { class: 'note-sim', html:
        'Worst Case = Σ tᵢ·sᵢ, RSS = √Σ(tᵢ·sᵢ)². Monte-Carlo über ' + N + ' virtuelle Baugruppen mit festem Seed (reproduzierbar). ' +
        'Die Beiträge werden als unabhängig angenommen — bei gemeinsamer Ursache (z. B. eine Charge, ein Werkzeug) ist RSS zu optimistisch.'
      })
    ]));

    update();
  };
})(window);
