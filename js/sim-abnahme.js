/* sim-abnahme.js — Freigabeentscheidung an der Toleranzgrenze: Pseudoausschuss gegen Durchschlupf */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  var N = 20000;

  SIMS.abnahme = function (root) {
    // Alle Größen in mλ; geprüft wird gegen eine obere Grenze
    var st = { mu: 5.6, sigma: 1.1, unsicherheit: 0.6, grenze: 8.0, abstand: 0.0, seed: 31 };

    var chartBox = CH.el('div', { class: 'sim-canvas' });
    var kurveBox = CH.el('div', { class: 'sim-canvas' });
    var rPseudo = CH.readout('Pseudoausschuss'), rDurch = CH.readout('Durchschlupf'),
        rAbgelehnt = CH.readout('abgelehnt gesamt'), rEcht = CH.readout('tatsächlich schlecht');
    var hinweis = CH.el('div', { class: 'callout job', style: 'margin-top:.9rem;font-size:.86rem' });

    /** Simuliert Teile: wahrer Wert aus dem Prozess, Messwert = wahr + Messrauschen. */
    function stichprobe(abstand) {
      var rand = CH.rng(st.seed);
      var annahme = st.grenze - abstand;
      var pseudo = 0, durch = 0, abgelehnt = 0, schlecht = 0, werte = [];
      for (var i = 0; i < N; i++) {
        var wahr = st.mu + CH.gauss(rand) * st.sigma;
        var gemessen = wahr + CH.gauss(rand) * st.unsicherheit;
        var istSchlecht = wahr > st.grenze;
        var wirdAbgelehnt = gemessen > annahme;
        if (istSchlecht) schlecht++;
        if (wirdAbgelehnt) abgelehnt++;
        if (!istSchlecht && wirdAbgelehnt) pseudo++;
        if (istSchlecht && !wirdAbgelehnt) durch++;
        if (i < 4000) werte.push({ wahr: wahr, gemessen: gemessen, schlecht: istSchlecht, abgelehnt: wirdAbgelehnt });
      }
      return {
        pseudo: pseudo / N, durch: durch / N, abgelehnt: abgelehnt / N, schlecht: schlecht / N,
        werte: werte, annahme: annahme
      };
    }

    function proz(x) { return x < 0.001 ? (x * 1e6).toFixed(0) + ' ppm' : (x * 100).toFixed(2) + ' %'; }

    function update() {
      var r = stichprobe(st.abstand);

      rPseudo.set(proz(r.pseudo), r.pseudo < 0.02 ? 'ok' : r.pseudo < 0.08 ? 'warn' : 'bad');
      rDurch.set(proz(r.durch), r.durch < 0.001 ? 'ok' : r.durch < 0.005 ? 'warn' : 'bad');
      rAbgelehnt.set(proz(r.abgelehnt));
      rEcht.set(proz(r.schlecht));

      chartBox.innerHTML = '';
      chartBox.appendChild(streubild(r));
      kurveBox.innerHTML = '';
      kurveBox.appendChild(abwaegung());

      hinweis.innerHTML = st.abstand === 0
        ? '<strong>Ohne Sicherheitsabstand entscheidet der Messwert allein</strong>Teile knapp unter der Grenze werden freigegeben, obwohl ihr wahrer Wert darüber liegen kann — das ist der Durchschlupf von ' + proz(r.durch) + '. ' +
          'Nach ISO 14253-1 ist Konformität in diesem Band gar nicht belegt. Wer so freigibt, verlagert das Risiko zum Kunden.'
        : st.abstand >= 2 * st.unsicherheit
        ? '<strong>Konservative Annahmegrenze</strong>Der Sicherheitsabstand von ' + CH.fmt(st.abstand, 1) + ' mλ deckt die erweiterte Messunsicherheit ab. Der Durchschlupf ist praktisch null — bezahlt wird das mit ' + proz(r.pseudo) + ' Pseudoausschuss: gute Teile, die in die Nacharbeit gehen. In dieser Fertigung heißt das Kapazität am Engpass (Modul 5).'
        : '<strong>Zwischenbereich</strong>Der Abstand von ' + CH.fmt(st.abstand, 1) + ' mλ liegt unter der erweiterten Unsicherheit von ' + CH.fmt(2 * st.unsicherheit, 1) + ' mλ. Konformität ist damit nicht vollständig belegt, aber das Risiko ist begrenzt. Diese Wahl muss man begründen können — sie ist eine Geschäftsentscheidung, keine messtechnische.';
    }

    /** Streubild: wahrer Wert gegen Messwert, mit den vier Quadranten. */
    function streubild(r) {
      var lo = st.mu - 4 * st.sigma, hi = Math.max(st.grenze + 2 * st.sigma, st.mu + 4 * st.sigma);
      var sc = CH.plot({
        w: 420, h: 320, pad: { t: 16, r: 16, b: 44, l: 52 },
        x: [lo, hi], y: [lo, hi], xTicks: 5, yTicks: 5,
        xLabel: 'wahrer Wert [mλ]', yLabel: 'Messwert [mλ]',
        xFmt: function (v) { return v.toFixed(0); }, yFmt: function (v) { return v.toFixed(0); },
        label: 'Wahrer Wert gegen Messwert mit Spezifikations- und Annahmegrenze'
      });

      r.werte.forEach(function (w, i) {
        if (i % 4) return; // ausdünnen
        var farbe = (!w.schlecht && w.abgelehnt) ? 'var(--warn)'
                  : (w.schlecht && !w.abgelehnt) ? 'var(--bad)'
                  : 'var(--text-mute)';
        var wichtig = farbe !== 'var(--text-mute)';
        sc.layer.appendChild(CH.svgEl('circle', {
          cx: sc.x(w.wahr), cy: sc.y(w.gemessen), r: wichtig ? 2.2 : 1.3,
          fill: farbe, opacity: wichtig ? .95 : .25
        }));
      });

      // Spezifikationsgrenze (senkrecht, wahrer Wert) und Annahmegrenze (waagerecht, Messwert)
      sc.layer.appendChild(CH.svgEl('line', { x1: sc.x(st.grenze), x2: sc.x(st.grenze), y1: sc.pad.t, y2: sc.y(lo),
        stroke: 'var(--bad)', 'stroke-width': 1.6 }));
      sc.layer.appendChild(CH.svgEl('text', { x: sc.x(st.grenze) - 4, y: sc.pad.t + 11, 'text-anchor': 'end',
        'font-size': 9.5, fill: 'var(--bad)', text: 'Spezifikation' }));
      sc.layer.appendChild(CH.svgEl('line', { x1: sc.pad.l, x2: sc.w - sc.pad.r, y1: sc.y(r.annahme), y2: sc.y(r.annahme),
        stroke: 'var(--accent)', 'stroke-width': 1.6, 'stroke-dasharray': '5 3' }));
      sc.layer.appendChild(CH.svgEl('text', { x: sc.pad.l + 6, y: sc.y(r.annahme) - 5,
        'font-size': 9.5, fill: 'var(--accent)', text: 'Annahmegrenze' }));

      // Legende
      // oben links: dort liegen kaum Datenpunkte (kleiner wahrer Wert, großer Messwert)
      [['var(--bad)', 'schlecht, aber freigegeben'], ['var(--warn)', 'gut, aber abgelehnt']].forEach(function (l, i) {
        sc.layer.appendChild(CH.svgEl('circle', { cx: sc.pad.l + 12, cy: sc.pad.t + 26 + i * 14, r: 3.2, fill: l[0] }));
        sc.layer.appendChild(CH.svgEl('text', { x: sc.pad.l + 22, y: sc.pad.t + 29 + i * 14,
          'font-size': 9, fill: 'var(--text-mute)', text: l[1] }));
      });
      return sc.svg;
    }

    /** Abwägungskurve über den Sicherheitsabstand. */
    function abwaegung() {
      var maxA = Math.max(2.5, 3 * st.unsicherheit);
      var pseudo = [], durch = [];
      for (var a = 0; a <= maxA + 0.001; a += maxA / 14) {
        var r = stichprobe(a);
        pseudo.push({ x: a, y: r.pseudo * 100 });
        durch.push({ x: a, y: r.durch * 100 });
      }
      var maxY = Math.max(1, pseudo[pseudo.length - 1].y * 1.15);
      var sc = CH.plot({
        w: 420, h: 320, pad: { t: 16, r: 16, b: 44, l: 52 },
        x: [0, maxA], y: [0, maxY], yTicks: 5,
        xLabel: 'Sicherheitsabstand zur Grenze [mλ]', yLabel: 'Anteil der Teile [%]',
        xFmt: function (v) { return v.toFixed(1); }, yFmt: function (v) { return v.toFixed(1); },
        label: 'Abwägung zwischen Pseudoausschuss und Durchschlupf'
      });
      sc.layer.appendChild(CH.line(sc, pseudo, { stroke: 'var(--warn)', 'stroke-width': 2.4 }));
      sc.layer.appendChild(CH.line(sc, durch, { stroke: 'var(--bad)', 'stroke-width': 2.4 }));
      sc.layer.appendChild(CH.svgEl('line', {
        x1: sc.x(2 * st.unsicherheit), x2: sc.x(2 * st.unsicherheit), y1: sc.pad.t, y2: sc.y(0),
        stroke: 'var(--text-mute)', 'stroke-width': 1.2, 'stroke-dasharray': '4 3'
      }));
      sc.layer.appendChild(CH.svgEl('text', { x: sc.x(2 * st.unsicherheit) + 4, y: sc.pad.t + 22,
        'font-size': 9, fill: 'var(--text-mute)', text: 'erweiterte' }));
      sc.layer.appendChild(CH.svgEl('text', { x: sc.x(2 * st.unsicherheit) + 4, y: sc.pad.t + 33,
        'font-size': 9, fill: 'var(--text-mute)', text: 'Unsicherheit 2u' }));
      sc.layer.appendChild(CH.svgEl('line', { x1: sc.x(st.abstand), x2: sc.x(st.abstand), y1: sc.pad.t, y2: sc.y(0),
        stroke: 'var(--accent)', 'stroke-width': 1.6 }));

      [['var(--warn)', 'Pseudoausschuss'], ['var(--bad)', 'Durchschlupf']].forEach(function (l, i) {
        sc.layer.appendChild(CH.svgEl('rect', { x: sc.w - sc.pad.r - 130, y: sc.pad.t + 6 + i * 15, width: 14, height: 3, fill: l[0] }));
        sc.layer.appendChild(CH.svgEl('text', { x: sc.w - sc.pad.r - 112, y: sc.pad.t + 12 + i * 15,
          'font-size': 9.5, fill: 'var(--text-mute)', text: l[1] }));
      });
      return sc.svg;
    }

    var controls = CH.el('div', { class: 'sim-controls' }, [
      CH.slider({ label: 'Sicherheitsabstand', min: 0, max: 3, step: .1, value: st.abstand, unit: 'mλ', digits: 1,
        hint: 'Annahmegrenze = Spezifikation minus Abstand' }, function (v) { st.abstand = v; update(); }),
      CH.slider({ label: 'Messunsicherheit u', min: .1, max: 2, step: .05, value: st.unsicherheit, unit: 'mλ', digits: 2,
        hint: 'aus der Messsystemanalyse' }, function (v) { st.unsicherheit = v; update(); }),
      CH.slider({ label: 'Prozessmittelwert', min: 3, max: 9, step: .1, value: st.mu, unit: 'mλ', digits: 1 },
        function (v) { st.mu = v; update(); }),
      CH.slider({ label: 'Prozessstreuung σ', min: .3, max: 2.5, step: .05, value: st.sigma, unit: 'mλ', digits: 2 },
        function (v) { st.sigma = v; update(); }),
      CH.slider({ label: 'Spezifikationsgrenze', min: 5, max: 12, step: .5, value: st.grenze, unit: 'mλ', digits: 1 },
        function (v) { st.grenze = v; update(); })
    ]);

    var out = CH.el('div', { class: 'sim-output' }, [
      CH.el('div', { style: 'display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start' }, [
        CH.el('div', { style: 'flex:1 1 320px;min-width:300px' }, [chartBox]),
        CH.el('div', { style: 'flex:1 1 320px;min-width:300px' }, [kurveBox])
      ]),
      CH.el('div', { class: 'readouts' }, [rPseudo, rDurch, rAbgelehnt, rEcht]),
      hinweis
    ]);

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'sim-grid' }, [controls, out]),
      CH.el('p', { class: 'note-sim', html:
        'Monte-Carlo über ' + N + ' Teile mit festem Seed: wahrer Wert normalverteilt aus dem Prozess, Messwert = wahrer Wert plus normalverteiltes Messrauschen. ' +
        'Freigegeben wird, wenn der <em>Messwert</em> die Annahmegrenze einhält — die Entscheidung fällt also nie über den wahren Wert. ' +
        'ISO 14253-1 verlangt, die Annahmegrenze um die erweiterte Messunsicherheit (hier 2u) nach innen zu versetzen, damit Konformität belegt ist.'
      })
    ]));

    update();
  };
})(window);
