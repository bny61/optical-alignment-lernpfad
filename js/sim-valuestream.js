/* sim-valuestream.js — Wertstromabschnitt Optikmontage: Takt, Engpass, Nacharbeit, Durchlaufzeit */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  SIMS.valuestream = function (root) {
    var stationen = [
      { name: 'Reinigung / Bereitstellung', ct: 45,  verf: 0.95 },
      { name: 'Fassen & Vormontage',        ct: 90,  verf: 0.92 },
      { name: 'Justage (Alignment)',        ct: 150, verf: 0.88 },
      { name: 'Interferometrische Prüfung', ct: 70,  verf: 0.97 },
      { name: 'Verkleben & Aushärten',      ct: 60,  verf: 0.99 }
    ];
    var st = { bedarf: 3, schicht: 450, fpy: 0.82, wip: 6 };

    var chartBox = CH.el('div', { class: 'sim-canvas' });
    var rTakt = CH.readout('Kundentakt'), rEngpass = CH.readout('Engpass'),
        rDurchsatz = CH.readout('Durchsatz/Schicht'), rDlz = CH.readout('Durchlaufzeit');
    var hinweis = CH.el('div', { class: 'callout job', style: 'margin-top:.9rem;font-size:.86rem' });

    /** Belastung je Station in min/Stück, inkl. Verfügbarkeit und Nacharbeitsschleife. */
    function belastung() {
      var faktor = 1 / Math.max(0.3, st.fpy); // Justage+Prüfung werden je Nacharbeit wiederholt
      return stationen.map(function (s, i) {
        var wiederholung = (i === 2 || i === 3) ? faktor : 1;
        return { name: s.name, roh: s.ct, last: s.ct / s.verf * wiederholung, verf: s.verf, idx: i };
      });
    }

    function update() {
      var b = belastung();
      var takt = st.schicht / st.bedarf;
      var engpass = b.reduce(function (m, s) { return s.last > m.last ? s : m; }, b[0]);
      var durchsatz = Math.floor(st.schicht / engpass.last);
      var dlz = st.wip * engpass.last; // Little's Law: DLZ = WIP / Durchsatzrate

      rTakt.set(CH.fmt(takt, 0) + ' min');
      rEngpass.set(engpass.name.split(' ')[0] + ' · ' + CH.fmt(engpass.last, 0) + ' min',
        engpass.last <= takt ? 'ok' : 'bad');
      rDurchsatz.set(durchsatz + ' / ' + st.bedarf, durchsatz >= st.bedarf ? 'ok' : 'bad');
      rDlz.set(CH.fmt(dlz / 60, 1) + ' h');

      chartBox.innerHTML = '';
      chartBox.appendChild(yamazumi(b, takt));

      var luecke = engpass.last - takt;
      hinweis.innerHTML = luecke <= 0
        ? '<strong>Wertstrom taktfähig</strong>Der Engpass liegt unter dem Kundentakt. Nächster Hebel ist nicht mehr Kapazität, sondern Stabilität: Streuung der Zykluszeiten und ungeplante Stillstände.'
        : '<strong>Engpass: ' + engpass.name + ' (' + CH.fmt(luecke, 0) + ' min über Takt)</strong>' +
          'Reihenfolge der Hebel: (1) Nacharbeit senken — sie schlägt doppelt auf Justage und Prüfung durch, ' +
          '(2) Verfügbarkeit erhöhen (' + Math.round(engpass.verf * 100) + ' %), ' +
          '(3) erst danach Zykluszeit oder zusätzliche Kapazität. Kapazität an Nicht-Engpass-Stationen bringt nichts.';
    }

    function yamazumi(b, takt) {
      var maxV = Math.max(takt, b.reduce(function (m, s) { return Math.max(m, s.last); }, 0)) * 1.15;
      var w = 620, rowH = 44, h = b.length * rowH + 46, labelW = 190;
      var svg = CH.svgEl('svg', { viewBox: '0 0 ' + w + ' ' + h, role: 'img',
        'aria-label': 'Belastungsdiagramm der Stationen gegen den Kundentakt' });
      var x = CH.scale(0, maxV, labelW, w - 16);

      var taktX = x(takt);
      svg.appendChild(CH.svgEl('rect', { x: taktX, y: 16, width: Math.max(0, w - 16 - taktX), height: b.length * rowH,
        fill: 'var(--bad)', opacity: .07 }));
      svg.appendChild(CH.svgEl('line', { x1: taktX, x2: taktX, y1: 12, y2: b.length * rowH + 18,
        stroke: 'var(--bad)', 'stroke-width': 1.5, 'stroke-dasharray': '5 3' }));
      svg.appendChild(CH.svgEl('text', { x: taktX + 5, y: 11, 'font-size': 10.5, fill: 'var(--bad)',
        text: 'Kundentakt ' + takt.toFixed(0) + ' min' }));

      b.forEach(function (s, i) {
        var y = 22 + i * rowH;
        svg.appendChild(CH.svgEl('text', { x: labelW - 8, y: y + 17, 'text-anchor': 'end', 'font-size': 10.5,
          fill: 'var(--text)', text: s.name }));
        // Grundanteil (reine Zykluszeit)
        svg.appendChild(CH.svgEl('rect', { x: labelW, y: y, width: Math.max(1, x(s.roh) - labelW), height: 24,
          fill: 'var(--accent)', opacity: .85, rx: 2 }));
        // Zusatz durch Verfügbarkeit und Nacharbeit
        svg.appendChild(CH.svgEl('rect', { x: x(s.roh), y: y, width: Math.max(0, x(s.last) - x(s.roh)), height: 24,
          fill: 'var(--warn)', opacity: .8, rx: 2 }));
        svg.appendChild(CH.svgEl('text', { x: x(s.last) + 5, y: y + 16, 'font-size': 10,
          'font-family': 'var(--mono)', fill: s.last > takt ? 'var(--bad)' : 'var(--text-mute)',
          text: s.last.toFixed(0) }));
      });

      svg.appendChild(CH.svgEl('rect', { x: labelW, y: h - 30, width: 9, height: 9, fill: 'var(--accent)', opacity: .85 }));
      svg.appendChild(CH.svgEl('text', { x: labelW + 14, y: h - 22, 'font-size': 10, fill: 'var(--text-mute)', text: 'Zykluszeit' }));
      svg.appendChild(CH.svgEl('rect', { x: labelW + 78, y: h - 30, width: 9, height: 9, fill: 'var(--warn)', opacity: .8 }));
      svg.appendChild(CH.svgEl('text', { x: labelW + 92, y: h - 22, 'font-size': 10, fill: 'var(--text-mute)',
        text: 'Verluste (Verfügbarkeit + Nacharbeit)' }));
      return svg;
    }

    var controls = CH.el('div', { class: 'sim-controls' }, [
      CH.slider({ label: 'Kundenbedarf je Schicht', min: 1, max: 8, step: 1, value: st.bedarf, unit: 'Stk', digits: 0 },
        function (v) { st.bedarf = v; update(); }),
      CH.slider({ label: 'Nutzbare Schichtzeit', min: 300, max: 600, step: 10, value: st.schicht, unit: 'min', digits: 0 },
        function (v) { st.schicht = v; update(); }),
      CH.slider({ label: 'First Pass Yield Justage', min: .5, max: 1, step: .01, value: st.fpy, digits: 2,
        format: function (v) { return (v * 100).toFixed(0) + ' %'; },
        hint: 'Anteil ohne Nacharbeitsschleife' }, function (v) { st.fpy = v; update(); }),
      CH.slider({ label: 'Zykluszeit Justage', min: 60, max: 240, step: 5, value: stationen[2].ct, unit: 'min', digits: 0 },
        function (v) { stationen[2].ct = v; update(); }),
      CH.slider({ label: 'Verfügbarkeit Justage', min: .6, max: 1, step: .01, value: stationen[2].verf, digits: 2,
        format: function (v) { return (v * 100).toFixed(0) + ' %'; } },
        function (v) { stationen[2].verf = v; update(); }),
      CH.slider({ label: 'WIP im Abschnitt', min: 1, max: 20, step: 1, value: st.wip, unit: 'Stk', digits: 0,
        hint: 'Bestand zwischen den Stationen' }, function (v) { st.wip = v; update(); })
    ]);

    var out = CH.el('div', { class: 'sim-output' }, [
      chartBox,
      CH.el('div', { class: 'readouts' }, [rTakt, rEngpass, rDurchsatz, rDlz]),
      hinweis
    ]);

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'sim-grid' }, [controls, out]),
      CH.el('p', { class: 'note-sim', html:
        'Takt = nutzbare Schichtzeit / Bedarf. Stationslast = Zykluszeit / Verfügbarkeit, für Justage und Prüfung zusätzlich × 1/FPY ' +
        '(jede Nacharbeit durchläuft beide Stationen erneut). Durchlaufzeit nach Little: DLZ = WIP × Engpasstakt. ' +
        'Deterministisches Modell ohne Warteschlangenstreuung — reale Durchlaufzeiten liegen bei hoher Auslastung deutlich darüber.'
      })
    ]));

    update();
  };
})(window);
