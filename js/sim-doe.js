/* sim-doe.js — Statistischer Versuchsplan (2³) für die Improve-Phase eines DMAIC-Projekts */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  var FAKTOREN = [
    { key: 'A', name: 'Aufspannkraft', minus: 'niedrig', plus: 'hoch' },
    { key: 'B', name: 'Einschwingzeit', minus: '5 min', plus: '30 min' },
    { key: 'C', name: 'Justagereihenfolge', minus: 'sequenziell', plus: 'iterativ' }
  ];

  /* Verdecktes „wahres" Prozessmodell in kodierten Einheiten (−1 / +1).
     Zielgröße: Rest-Wellenfrontfehler RMS in mλ — kleiner ist besser. */
  var WAHR = { basis: 6.0, A: 0.70, B: -0.45, C: -0.125, AB: 0.375 };

  function antwort(a, b, c, rand, sigma) {
    return WAHR.basis + WAHR.A * a + WAHR.B * b + WAHR.C * c + WAHR.AB * a * b + CH.gauss(rand) * sigma;
  }

  /** Standardreihenfolge des 2³-Plans. */
  var PLAN = [];
  [-1, 1].forEach(function (c) {
    [-1, 1].forEach(function (b) {
      [-1, 1].forEach(function (a) { PLAN.push({ a: a, b: b, c: c }); });
    });
  });
  PLAN.sort(function (x, y) { return (x.c - y.c) || (x.b - y.b) || (x.a - y.a); });

  SIMS.doe = function (root) {
    var st = { n: 2, sigma: 0.35, seed: 11, ofat: false };

    var effektBox = CH.el('div', { class: 'sim-canvas' });
    var wwBox = CH.el('div', { class: 'sim-canvas' });
    var tabBox = CH.el('div');
    var fazit = CH.el('div', { class: 'callout', style: 'margin-top:.9rem;font-size:.88rem' });
    var ofatBox = CH.el('div');

    function versuche() {
      var rand = CH.rng(st.seed);
      return PLAN.map(function (p) {
        var werte = [];
        for (var i = 0; i < st.n; i++) werte.push(antwort(p.a, p.b, p.c, rand, st.sigma));
        return { a: p.a, b: p.b, c: p.c, werte: werte, mittel: CH.mean(werte) };
      });
    }

    /** Effekt = Mittel bei +1 minus Mittel bei −1 über alle Beobachtungen. */
    function effekt(daten, vorzeichen) {
      var plus = [], minus = [];
      daten.forEach(function (d) {
        (vorzeichen(d) > 0 ? plus : minus).push.apply(vorzeichen(d) > 0 ? plus : minus, d.werte);
      });
      return CH.mean(plus) - CH.mean(minus);
    }

    function update() {
      var daten = versuche();
      var eff = [
        { name: 'A  Aufspannkraft', wert: effekt(daten, function (d) { return d.a; }) },
        { name: 'B  Einschwingzeit', wert: effekt(daten, function (d) { return d.b; }) },
        { name: 'C  Reihenfolge', wert: effekt(daten, function (d) { return d.c; }) },
        { name: 'A×B', wert: effekt(daten, function (d) { return d.a * d.b; }) },
        { name: 'A×C', wert: effekt(daten, function (d) { return d.a * d.c; }) },
        { name: 'B×C', wert: effekt(daten, function (d) { return d.b * d.c; }) },
        { name: 'A×B×C', wert: effekt(daten, function (d) { return d.a * d.b * d.c; }) }
      ];

      // Streuung aus den Wiederholungen schätzen (nur mit n ≥ 2 möglich)
      var grenze = null, sd = null;
      if (st.n >= 2) {
        var ss = 0, fg = 0;
        daten.forEach(function (d) {
          var m = d.mittel;
          d.werte.forEach(function (w) { ss += (w - m) * (w - m); });
          fg += st.n - 1;
        });
        sd = Math.sqrt(ss / fg);
        grenze = 2 * sd / Math.sqrt(2 * st.n); // ±2 Standardfehler eines Effekts
      }

      effektBox.innerHTML = '';
      effektBox.appendChild(effektChart(eff, grenze));
      wwBox.innerHTML = '';
      wwBox.appendChild(wwChart(daten));
      tabBox.innerHTML = '';
      tabBox.appendChild(planTabelle(daten));

      // Bestes Ergebnis aus dem Plan
      var best = daten.reduce(function (m, d) { return d.mittel < m.mittel ? d : m; }, daten[0]);
      var stufe = function (d) {
        return FAKTOREN.map(function (f, i) {
          var v = [d.a, d.b, d.c][i];
          return f.name + ' ' + (v > 0 ? f.plus : f.minus);
        }).join(', ');
      };

      var signifikant = eff.filter(function (e) { return grenze && Math.abs(e.wert) > grenze; })
                           .map(function (e) { return e.name.split('  ')[0]; });

      fazit.className = 'callout ' + (grenze ? 'ok' : 'warn');
      fazit.innerHTML = grenze
        ? '<strong>Beste Einstellung im Plan: ' + CH.fmt(best.mittel, 2) + ' mλ</strong>' + stufe(best) + '. ' +
          'Statistisch abgesichert (über ±2 Standardfehler = ' + CH.fmt(grenze, 2) + ' mλ): ' +
          (signifikant.length ? '<span style="font-weight:600">' + signifikant.join(', ') + '</span>' : 'kein Effekt') + '. ' +
          'Geschätzte Prozessstreuung aus den Wiederholungen: σ = ' + CH.fmt(sd, 2) + ' mλ.'
        : '<strong>Ohne Wiederholung keine Signifikanzgrenze</strong>Mit n = 1 lässt sich die Streuung nicht schätzen — jeder Balken könnte reines Rauschen sein. Das ist der häufigste Fehler in der Praxis: acht Versuche gefahren, aber keine Aussage darüber, welcher Unterschied echt ist. Erhöhen Sie die Wiederholungen.';

      zeichneOfat();
    }

    function zeichneOfat() {
      ofatBox.innerHTML = '';
      if (!st.ofat) return;
      var rand = CH.rng(st.seed + 999);
      function y(a, b, c) {
        var w = [];
        for (var i = 0; i < st.n; i++) w.push(antwort(a, b, c, rand, st.sigma));
        return CH.mean(w);
      }
      // Ausgangspunkt: heutiger Standard = hohe Kraft, kurze Einschwingzeit, sequenziell
      var start = y(1, -1, -1);
      var variiereA = y(-1, -1, -1);
      var variiereB = y(1, 1, -1);
      var variiereC = y(1, -1, 1);
      var ofatBest = y(variiereA < start ? -1 : 1, variiereB < start ? 1 : -1, variiereC < start ? 1 : -1);
      var planBest = y(-1, 1, 1);

      ofatBox.appendChild(CH.el('div', { class: 'table-wrap' }, [
        CH.el('table', { class: 'data' }, [
          CH.el('thead', {}, [CH.el('tr', {}, [
            CH.el('th', { text: 'Faktor-für-Faktor-Vorgehen' }),
            CH.el('th', { text: 'Einstellung' }),
            CH.el('th', { text: 'Ergebnis [mλ]' })
          ])]),
          CH.el('tbody', {}, [
            ['Ausgangszustand', 'A hoch, B 5 min, C sequenziell', start],
            ['nur A verändert', 'A niedrig', variiereA],
            ['nur B verändert', 'B 30 min', variiereB],
            ['nur C verändert', 'C iterativ', variiereC],
            ['daraus abgeleitetes Optimum', '—', ofatBest],
            ['Optimum aus dem Versuchsplan', 'A niedrig, B 30 min, C iterativ', planBest]
          ].map(function (r, i) {
            return CH.el('tr', {}, [
              CH.el('td', { html: i >= 4 ? '<strong>' + r[0] + '</strong>' : r[0] }),
              CH.el('td', { text: r[1] }),
              CH.el('td', { class: 'num', text: CH.fmt(r[2], 2) })
            ]);
          }))
        ])
      ]));
      ofatBox.appendChild(CH.el('div', { class: 'callout warn', style: 'margin-top:.7rem;font-size:.87rem', html:
        '<strong>Die Falle</strong>Bei hoher Aufspannkraft bringt eine längere Einschwingzeit fast nichts — die Fassungsspannung dominiert. ' +
        'Wer nur einen Faktor nach dem anderen verändert, misst genau das und schließt daraus: „Einschwingzeit ist irrelevant." ' +
        'Tatsächlich wirkt sie stark, aber nur bei niedriger Aufspannkraft. Diese Wechselwirkung ist im Faktor-für-Faktor-Versuch prinzipiell unsichtbar.'
      }));
    }

    function effektChart(eff, grenze) {
      var sortiert = eff.slice().sort(function (x, y) { return Math.abs(y.wert) - Math.abs(x.wert); });
      var maxAbs = Math.max(grenze || 0, sortiert[0] ? Math.abs(sortiert[0].wert) : 1) * 1.25;
      var w = 400, zeile = 26, h = sortiert.length * zeile + 40, labelW = 110;
      var svg = CH.svgEl('svg', { viewBox: '0 0 ' + w + ' ' + h, role: 'img',
        'aria-label': 'Größe der Faktoreffekte mit Signifikanzgrenze' });
      var x = CH.scale(0, maxAbs, labelW, w - 14);

      svg.appendChild(CH.svgEl('text', { x: 10, y: 14, 'font-size': 10.5, fill: 'var(--text-mute)',
        text: 'Betrag der Effekte auf den Rest-RMS [mλ]' }));

      if (grenze) {
        svg.appendChild(CH.svgEl('line', { x1: x(grenze), x2: x(grenze), y1: 22, y2: h - 22,
          stroke: 'var(--bad)', 'stroke-width': 1.4, 'stroke-dasharray': '4 3' }));
        svg.appendChild(CH.svgEl('text', { x: x(grenze) + 4, y: h - 10, 'font-size': 9, fill: 'var(--bad)',
          text: 'Signifikanzgrenze ±2 SE' }));
      }

      sortiert.forEach(function (e, i) {
        var y = 26 + i * zeile, betrag = Math.abs(e.wert);
        var wichtig = grenze && betrag > grenze;
        svg.appendChild(CH.svgEl('text', { x: labelW - 8, y: y + 12, 'text-anchor': 'end', 'font-size': 10,
          fill: wichtig ? 'var(--text)' : 'var(--text-mute)',
          'font-weight': wichtig ? 600 : 400, text: e.name }));
        svg.appendChild(CH.svgEl('rect', { x: labelW, y: y + 2, width: Math.max(1, x(betrag) - labelW), height: 15,
          rx: 2, fill: wichtig ? 'var(--accent)' : 'var(--text-mute)', opacity: wichtig ? .9 : .4 }));
        svg.appendChild(CH.svgEl('text', { x: x(betrag) + 5, y: y + 14, 'font-size': 9.5,
          'font-family': 'var(--mono)', fill: 'var(--text-mute)',
          text: (e.wert > 0 ? '+' : '−') + CH.fmt(betrag, 2) }));
      });
      return svg;
    }

    function wwChart(daten) {
      function mittel(bedingung) {
        var w = [];
        daten.filter(bedingung).forEach(function (d) { w.push.apply(w, d.werte); });
        return CH.mean(w);
      }
      var reihen = [
        { b: -1, farbe: 'var(--bad)', label: 'Einschwingzeit 5 min' },
        { b: 1, farbe: 'var(--ok)', label: 'Einschwingzeit 30 min' }
      ];
      var werte = [];
      reihen.forEach(function (r) {
        [-1, 1].forEach(function (a) {
          werte.push(mittel(function (d) { return d.a === a && d.b === r.b; }));
        });
      });
      var lo = Math.min.apply(null, werte), hi = Math.max.apply(null, werte), spanne = (hi - lo) || 1;

      var sc = CH.plot({
        w: 400, h: 230, pad: { t: 16, r: 16, b: 54, l: 46 },
        x: [-1.5, 1.5], y: [lo - spanne * .25, hi + spanne * .3], xTicks: 0, yTicks: 4,
        yFmt: function (v) { return v.toFixed(1); },
        yLabel: 'Rest-RMS [mλ]', label: 'Wechselwirkung zwischen Aufspannkraft und Einschwingzeit'
      });

      reihen.forEach(function (r, ri) {
        var pts = [-1, 1].map(function (a) {
          return { x: a, y: mittel(function (d) { return d.a === a && d.b === r.b; }) };
        });
        sc.layer.appendChild(CH.line(sc, pts, { stroke: r.farbe, 'stroke-width': 2.2 }));
        pts.forEach(function (p) { sc.layer.appendChild(CH.dot(sc, p, { r: 4, fill: r.farbe })); });
        sc.layer.appendChild(CH.svgEl('rect', { x: sc.pad.l + 8, y: sc.pad.t + 4 + ri * 14, width: 14, height: 3, fill: r.farbe }));
        sc.layer.appendChild(CH.svgEl('text', { x: sc.pad.l + 26, y: sc.pad.t + 10 + ri * 14,
          'font-size': 9.5, fill: 'var(--text-mute)', text: r.label }));
      });

      [[-1, 'Aufspannkraft niedrig'], [1, 'Aufspannkraft hoch']].forEach(function (p) {
        sc.layer.appendChild(CH.svgEl('text', { x: sc.x(p[0]), y: sc.h - 32, 'text-anchor': 'middle',
          'font-size': 10, fill: 'var(--text-mute)', text: p[1] }));
      });
      sc.layer.appendChild(CH.svgEl('text', { x: (sc.pad.l + sc.w - sc.pad.r) / 2, y: sc.h - 10,
        'text-anchor': 'middle', 'font-size': 9.5, fill: 'var(--text-mute)',
        text: 'nicht parallel = Wechselwirkung' }));
      return sc.svg;
    }

    function planTabelle(daten) {
      var tbl = CH.el('table', { class: 'data' });
      tbl.appendChild(CH.el('thead', {}, [CH.el('tr', {}, [
        CH.el('th', { text: 'Versuch' }), CH.el('th', { text: 'A Kraft' }),
        CH.el('th', { text: 'B Zeit' }), CH.el('th', { text: 'C Reihenfolge' }),
        CH.el('th', { text: 'Mittel [mλ]' })
      ])]));
      tbl.appendChild(CH.el('tbody', {}, daten.map(function (d, i) {
        var best = d.mittel === Math.min.apply(null, daten.map(function (x) { return x.mittel; }));
        return CH.el('tr', {}, [
          CH.el('td', { text: String(i + 1) }),
          CH.el('td', { text: d.a > 0 ? 'hoch' : 'niedrig' }),
          CH.el('td', { text: d.b > 0 ? '30 min' : '5 min' }),
          CH.el('td', { text: d.c > 0 ? 'iterativ' : 'sequenziell' }),
          CH.el('td', { class: 'num', html: best ? '<strong>' + CH.fmt(d.mittel, 2) + '</strong>' : CH.fmt(d.mittel, 2) })
        ]);
      })));
      return CH.el('div', { class: 'table-wrap' }, [tbl]);
    }

    var controls = CH.el('div', { class: 'sim-controls' }, [
      CH.slider({ label: 'Wiederholungen je Einstellung', min: 1, max: 5, step: 1, value: st.n, digits: 0,
        hint: 'ohne Wiederholung keine Streuungsschätzung' }, function (v) { st.n = v; update(); }),
      CH.slider({ label: 'Prozessrauschen σ', min: .1, max: 1.2, step: .05, value: st.sigma, unit: 'mλ', digits: 2,
        hint: 'je größer, desto mehr Versuche sind nötig' }, function (v) { st.sigma = v; update(); }),
      CH.el('button', { class: 'btn btn-sm', text: 'Versuchsreihe wiederholen',
        onclick: function () { st.seed += 5; update(); } }),
      CH.el('button', { class: 'btn btn-sm', text: 'Faktor für Faktor vergleichen',
        onclick: function () { st.ofat = !st.ofat; zeichneOfat(); } })
    ]);

    var out = CH.el('div', { class: 'sim-output' }, [
      CH.el('div', { style: 'display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start' }, [
        CH.el('div', { style: 'flex:1 1 300px;min-width:280px' }, [effektBox]),
        CH.el('div', { style: 'flex:1 1 300px;min-width:280px' }, [wwBox])
      ]),
      fazit
    ]);

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'sim-grid' }, [controls, out]),
      tabBox,
      ofatBox,
      CH.el('p', { class: 'note-sim', html:
        'Vollfaktorieller 2³-Plan: drei Faktoren auf je zwei Stufen, alle 8 Kombinationen. Effekt = Mittelwert bei „+" minus Mittelwert bei „−". ' +
        'Die Signifikanzgrenze ist ±2 Standardfehler mit SE = σ̂/√(2n), σ̂ gepoolt aus den Wiederholungen. ' +
        'Das verdeckte Modell enthält bewusst eine Wechselwirkung zwischen Aufspannkraft und Einschwingzeit — physikalisch plausibel, aber konstruiert.'
      })
    ]));

    update();
  };
})(window);
