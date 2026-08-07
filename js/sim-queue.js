/* sim-queue.js — Warum hohe Auslastung teuer wird: Wartezeit nach Kingman */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  /**
   * Kingman-Näherung für die mittlere Wartezeit vor einer Station:
   *   Wq ≈ (ca² + ce²)/2 · u/(1−u) · te
   * ca = Variationskoeffizient der Ankünfte, ce = der Bearbeitungszeit,
   * u = Auslastung, te = mittlere Bearbeitungszeit.
   */
  function wartezeit(ca, ce, u, te) {
    if (u >= 0.999) return Infinity;
    return (ca * ca + ce * ce) / 2 * (u / (1 - u)) * te;
  }

  SIMS.queue = function (root) {
    var st = { u: 0.85, cv: 0.75, te: 150 };

    var chartBox = CH.el('div', { class: 'sim-canvas' });
    var rWq = CH.readout('Wartezeit vor der Station'), rDlz = CH.readout('Durchlaufzeit'),
        rWip = CH.readout('Bestand davor'), rFluss = CH.readout('Flusseffizienz');
    var hinweis = CH.el('div', { class: 'callout job', style: 'margin-top:.9rem;font-size:.86rem' });

    function update() {
      var wq = wartezeit(st.cv, st.cv, st.u, st.te);
      var dlz = wq + st.te;
      var rate = st.u / st.te;          // Stück je Minute
      var wip = rate * dlz;             // Little
      var fluss = st.te / dlz * 100;

      rWq.set(CH.fmt(wq / 60, 1) + ' h', wq <= st.te ? 'ok' : wq <= 3 * st.te ? 'warn' : 'bad');
      rDlz.set(CH.fmt(dlz / 60, 1) + ' h');
      rWip.set(CH.fmt(wip, 1) + ' Stk', wip <= 3 ? 'ok' : wip <= 8 ? 'warn' : 'bad');
      rFluss.set(CH.fmt(fluss, 0) + ' %', fluss >= 50 ? 'ok' : fluss >= 25 ? 'warn' : 'bad');

      var maxY = Math.max(6, Math.min(24, wartezeit(st.cv, st.cv, 0.95, st.te) / st.te * 1.1));
      var kurven = [
        { cv: 0.25, farbe: 'var(--ok)', label: 'sehr gleichmäßig (cv 0,25)' },
        { cv: 0.75, farbe: 'var(--warn)', label: 'typisch (cv 0,75)' },
        { cv: 1.25, farbe: 'var(--bad)', label: 'stark schwankend (cv 1,25)' }
      ];

      var sc = CH.plot({
        w: 620, h: 300, x: [0.4, 0.98], y: [0, maxY],
        xLabel: 'Auslastung der Station', yLabel: 'Wartezeit in Vielfachen der Bearbeitungszeit',
        xFmt: function (v) { return Math.round(v * 100) + '%'; },
        yFmt: function (v) { return v.toFixed(0) + '×'; },
        label: 'Wartezeit in Abhängigkeit von Auslastung und Schwankung'
      });

      kurven.forEach(function (k) {
        // Punkte oberhalb des Achsenbereichs weglassen statt zu klemmen —
        // sonst entsteht optisch ein Plateau, wo die Kurve tatsächlich steil weiterläuft
        var pts = [];
        for (var u = 0.4; u <= 0.981; u += 0.005) {
          var y = wartezeit(k.cv, k.cv, u, st.te) / st.te;
          if (y > maxY) break;
          pts.push({ x: u, y: y });
        }
        if (pts.length < 2) return;
        sc.layer.appendChild(CH.line(sc, pts, {
          stroke: k.farbe, 'stroke-width': Math.abs(k.cv - st.cv) < 0.26 ? 2.6 : 1.3,
          opacity: Math.abs(k.cv - st.cv) < 0.26 ? 1 : .45
        }));
      });

      sc.layer.appendChild(CH.svgEl('line', {
        x1: sc.x(st.u), x2: sc.x(st.u), y1: sc.pad.t, y2: sc.h - sc.pad.b,
        stroke: 'var(--text-mute)', 'stroke-width': 1.2, 'stroke-dasharray': '4 3'
      }));
      if (wq / st.te <= maxY) sc.layer.appendChild(CH.dot(sc, { x: st.u, y: wq / st.te }, { r: 5, fill: 'var(--accent)' }));

      kurven.forEach(function (k, i) {
        sc.layer.appendChild(CH.svgEl('rect', { x: sc.pad.l + 8, y: sc.pad.t + 6 + i * 15, width: 16, height: 3, fill: k.farbe }));
        sc.layer.appendChild(CH.svgEl('text', {
          x: sc.pad.l + 30, y: sc.pad.t + 12 + i * 15, 'font-size': 10, fill: 'var(--text-mute)', text: k.label
        }));
      });

      chartBox.innerHTML = '';
      chartBox.appendChild(sc.svg);

      var bei90 = wartezeit(st.cv, st.cv, 0.90, st.te) / st.te;
      var bei80 = wartezeit(st.cv, st.cv, 0.80, st.te) / st.te;
      hinweis.innerHTML = st.u >= 0.92
        ? '<strong>Im steilen Ast</strong>Oberhalb von etwa 90 % Auslastung wächst die Wartezeit fast senkrecht. Jede zusätzliche Störung, jede Nacharbeit und jeder Eilauftrag schlägt hier überproportional durch. Eine Station, die „endlich gut ausgelastet" ist, produziert genau deshalb lange Durchlaufzeiten.'
        : '<strong>Der Preis der letzten zehn Prozent</strong>Von 80 % auf 90 % Auslastung steigt die Wartezeit von etwa ' + bei80.toFixed(1) + '× auf ' + bei90.toFixed(1) + '× der Bearbeitungszeit — bei gleicher Kapazität. Deshalb ist eine bewusst freigehaltene Reserve am Engpass keine Verschwendung, sondern der Preis für kurze Durchlaufzeiten.';
    }

    var controls = CH.el('div', { class: 'sim-controls' }, [
      CH.slider({ label: 'Auslastung der Station', min: .4, max: .97, step: .01, value: st.u, digits: 2,
        format: function (v) { return (v * 100).toFixed(0) + ' %'; } }, function (v) { st.u = v; update(); }),
      CH.slider({ label: 'Schwankung (cv)', min: .2, max: 1.5, step: .05, value: st.cv, digits: 2,
        hint: 'Streuung von Ankünften und Bearbeitungszeit; Nacharbeit erhöht sie stark' },
        function (v) { st.cv = v; update(); }),
      CH.slider({ label: 'Bearbeitungszeit', min: 30, max: 300, step: 10, value: st.te, unit: 'min', digits: 0 },
        function (v) { st.te = v; update(); })
    ]);

    var out = CH.el('div', { class: 'sim-output' }, [
      chartBox,
      CH.el('div', { class: 'readouts' }, [rWq, rDlz, rWip, rFluss]),
      hinweis
    ]);

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'sim-grid' }, [controls, out]),
      CH.el('p', { class: 'note-sim', html:
        'Kingman-Näherung: W<sub>q</sub> ≈ (c<sub>a</sub>² + c<sub>e</sub>²)/2 · u/(1−u) · t<sub>e</sub>. ' +
        'Sie gilt asymptotisch für eine Einzelstation und ist hier mit gleichen Variationskoeffizienten für Ankunft und Bearbeitung gerechnet. ' +
        'Flusseffizienz = Bearbeitungszeit / Durchlaufzeit — in der Praxis liegt sie in vielen Montagebereichen im einstelligen Prozentbereich.'
      })
    ]));

    update();
  };
})(window);
