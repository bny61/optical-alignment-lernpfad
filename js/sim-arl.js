/* sim-arl.js — Wie schnell schlägt eine Regelkarte an? Mittlere Lauflänge (ARL) */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  var LAEUFE = 600, MAX_PUNKTE = 1500;

  /** Prüft die Western-Electric-Regeln auf dem letzten Punkt der Folge z. */
  function signal(z, regeln) {
    var i = z.length - 1;
    if (Math.abs(z[i]) > 3) return true;
    if (regeln === 'we1') return false;

    if (i >= 2) {
      for (var s = -1; s <= 1; s += 2) {
        if (s * z[i] > 2) {
          var c = 0;
          for (var k = i - 2; k <= i; k++) if (s * z[k] > 2) c++;
          if (c >= 2) return true;
        }
      }
    }
    if (i >= 4) {
      for (var s2 = -1; s2 <= 1; s2 += 2) {
        if (s2 * z[i] > 1) {
          var c2 = 0;
          for (var k2 = i - 4; k2 <= i; k2++) if (s2 * z[k2] > 1) c2++;
          if (c2 >= 4) return true;
        }
      }
    }
    if (i >= 7) {
      var pos = 0, neg = 0;
      for (var k3 = i - 7; k3 <= i; k3++) { if (z[k3] > 0) pos++; else neg++; }
      if (pos === 8 || neg === 8) return true;
    }
    return false;
  }

  /** Mittlere Lauflänge bis zum ersten Signal, per Monte-Carlo mit festem Seed. */
  function arl(delta, n, regeln, seed) {
    var rand = CH.rng(seed);
    var verschiebung = delta * Math.sqrt(n); // Verschiebung des Untergruppenmittels in σ_x̄
    var summe = 0;
    for (var l = 0; l < LAEUFE; l++) {
      var z = [], t = 0;
      while (t < MAX_PUNKTE) {
        z.push(CH.gauss(rand) + verschiebung);
        t++;
        if (z.length > 12) z.shift();
        if (signal(z, regeln)) break;
      }
      summe += t;
    }
    return summe / LAEUFE;
  }

  SIMS.arl = function (root) {
    var st = { delta: 1.0, n: 4, regeln: 'we4', seed: 3 };

    var chartBox = CH.el('div', { class: 'sim-canvas' });
    var rArl = CH.readout('ARL bei Verschiebung'), rArl0 = CH.readout('ARL ohne Verschiebung'),
        rZeit = CH.readout('Entdeckung nach'), rFehl = CH.readout('Fehlalarme je 100');
    var hinweis = CH.el('div', { class: 'callout job', style: 'margin-top:.9rem;font-size:.86rem' });

    function update() {
      var punkte = [];
      for (var d = 0; d <= 3.01; d += 0.25) {
        punkte.push({ x: d, y: arl(d, st.n, st.regeln, st.seed + Math.round(d * 100)) });
      }
      var aktuell = arl(st.delta, st.n, st.regeln, st.seed + Math.round(st.delta * 100));
      var leer = punkte[0].y;

      rArl.set(CH.fmt(aktuell, 1), aktuell <= 3 ? 'ok' : aktuell <= 10 ? 'warn' : 'bad');
      rArl0.set(CH.fmt(leer, 0), leer >= 200 ? 'ok' : leer >= 90 ? 'warn' : 'bad');
      rZeit.set(Math.ceil(aktuell * st.n) + ' Teilen');
      rFehl.set(CH.fmt(100 / leer, 1));

      var maxY = Math.min(400, punkte[0].y * 1.15);
      var sc = CH.plot({
        w: 620, h: 280, x: [0, 3], y: [0, maxY],
        xLabel: 'Mittelwertverschiebung [σ der Einzelwerte]', yLabel: 'Stichproben bis zum Signal (ARL)',
        xFmt: function (v) { return v.toFixed(1); }, yFmt: function (v) { return String(Math.round(v)); },
        label: 'Mittlere Lauflänge in Abhängigkeit von der Verschiebung'
      });
      sc.layer.appendChild(CH.line(sc, punkte.map(function (p) { return { x: p.x, y: Math.min(p.y, maxY) }; })));
      punkte.forEach(function (p) {
        if (p.y <= maxY) sc.layer.appendChild(CH.dot(sc, p, { r: 2.5 }));
      });
      sc.layer.appendChild(CH.svgEl('line', {
        x1: sc.x(st.delta), x2: sc.x(st.delta), y1: sc.pad.t, y2: sc.h - sc.pad.b,
        stroke: 'var(--warn)', 'stroke-width': 1.4, 'stroke-dasharray': '4 3'
      }));
      sc.layer.appendChild(CH.dot(sc, { x: st.delta, y: Math.min(aktuell, maxY) }, { r: 5, fill: 'var(--warn)' }));

      chartBox.innerHTML = '';
      chartBox.appendChild(sc.svg);

      hinweis.innerHTML = st.delta < 0.6
        ? '<strong>Kleine Verschiebungen bleiben lange unsichtbar</strong>Bei weniger als etwa 0,5 σ braucht die Karte im Mittel Dutzende Stichproben. Genau deshalb entdeckt man langsame Drifts (Werkzeugverschleiß, Temperaturgang) nicht über die 3σ-Grenze, sondern über die Lauflängenregeln — und in der Kleinserie oft gar nicht rechtzeitig.'
        : st.delta > 1.8
        ? '<strong>Große Verschiebungen fallen sofort auf</strong>Ab etwa 2 σ signalisiert die Karte nahezu bei der ersten Stichprobe. Dieser Bereich ist unkritisch — die eigentliche Herausforderung liegt links im Diagramm.'
        : '<strong>Der kritische Bereich</strong>Zwischen 0,5 und 1,5 σ entscheidet die Auslegung: Untergruppengröße und Regelsatz bestimmen, ob Sie die Verschiebung nach 3 oder nach 30 Stichproben sehen. Bei einem Teilewert im sechsstelligen Bereich ist das der Unterschied zwischen einem Nacharbeitsfall und einer Serie davon.';
    }

    var controls = CH.el('div', { class: 'sim-controls' }, [
      CH.slider({ label: 'Mittelwertverschiebung', min: 0, max: 3, step: .25, value: st.delta, unit: 'σ', digits: 2,
        hint: 'wie stark der Prozess wegdriftet' }, function (v) { st.delta = v; update(); }),
      CH.slider({ label: 'Untergruppengröße n', min: 1, max: 8, step: 1, value: st.n, digits: 0,
        hint: 'größeres n entdeckt schneller, kostet aber mehr Prüfteile' }, function (v) { st.n = v; update(); }),
      CH.select({ label: 'Regelsatz', value: st.regeln, options: [
        { value: 'we1', label: 'nur Regel 1 (3σ-Grenze)' },
        { value: 'we4', label: 'Western Electric 1 bis 4' }
      ], hint: 'mehr Regeln entdecken früher, erzeugen aber mehr Fehlalarme' },
        function (v) { st.regeln = v; update(); }),
      CH.el('button', { class: 'btn btn-sm', text: 'Neue Zufallsreihe',
        onclick: function () { st.seed += 17; update(); } })
    ]);

    var out = CH.el('div', { class: 'sim-output' }, [
      chartBox,
      CH.el('div', { class: 'readouts' }, [rArl, rArl0, rZeit, rFehl]),
      hinweis
    ]);

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'sim-grid' }, [controls, out]),
      CH.el('p', { class: 'note-sim', html:
        'ARL (average run length) = mittlere Anzahl Stichproben bis zum ersten Signal. Monte-Carlo über ' + LAEUFE + ' Läufe je Punkt mit festem Seed. ' +
        'Zum Vergleich die Lehrbuchwerte ohne Verschiebung: nur Regel 1 ergibt ARL ≈ 370, der volle Western-Electric-Satz ≈ 90. ' +
        'Die Zeile „Entdeckung nach" rechnet die ARL in geprüfte Teile um (ARL × n) — das ist die Zahl, die in der Kleinserie zählt.'
      })
    ]));

    update();
  };
})(window);
