/* sim-budget.js — Fehlerbudget eines mehrspiegligen EUV-Objektivs */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  var LAMBDA_PM = 13500; // 13,5 nm in Pikometern

  /* Empfindlichkeiten: wie viel Wellenfrontfehler ein Lagefehler je Spiegel erzeugt.
     Didaktisch gewählte Werte — im realen System hängen sie stark von der Position im Strahlengang ab. */
  var S_KIPP = 0.55;   // pm Wellenfront je nrad Verkippung
  var S_DEZ  = 1.60;   // pm Wellenfront je nm Dezentrierung

  SIMS.budget = function (root) {
    var st = { n: 6, form: 50, kipp: 60, dez: 25, therm: 60, budget: 250 };

    var chartBox = CH.el('div', { class: 'sim-canvas' });
    var rGes = CH.readout('System-Wellenfront'), rLambda = CH.readout('in Wellenlängen'),
        rStrehl = CH.readout('Strehl'), rProSpiegel = CH.readout('erlaubt je Spiegel');
    var hinweis = CH.el('div', { class: 'callout job', style: 'margin-top:.9rem;font-size:.86rem' });

    function rechne() {
      var kipp = st.kipp * S_KIPP;
      var dez = st.dez * S_DEZ;
      var jeSpiegel = Math.sqrt(st.form * st.form + kipp * kipp + dez * dez);
      var spiegelAnteil = jeSpiegel * Math.sqrt(st.n);   // n unabhängige Beiträge, RSS
      var gesamt = Math.sqrt(spiegelAnteil * spiegelAnteil + st.therm * st.therm);
      return {
        form: st.form * Math.sqrt(st.n), kipp: kipp * Math.sqrt(st.n), dez: dez * Math.sqrt(st.n),
        therm: st.therm, jeSpiegel: jeSpiegel, gesamt: gesamt,
        erlaubtJeSpiegel: Math.sqrt(Math.max(0, st.budget * st.budget - st.therm * st.therm) / st.n)
      };
    }

    function update() {
      var r = rechne();
      var lambdaAnteil = r.gesamt / LAMBDA_PM;
      var strehl = Math.exp(-Math.pow(2 * Math.PI * lambdaAnteil, 2));
      var auslastung = r.gesamt / st.budget;

      rGes.set(CH.fmt(r.gesamt, 0) + ' pm', auslastung <= 0.8 ? 'ok' : auslastung <= 1 ? 'warn' : 'bad');
      rLambda.set('λ/' + Math.round(1 / lambdaAnteil));
      rStrehl.set(CH.fmt(strehl, 4), strehl >= 0.98 ? 'ok' : strehl >= 0.95 ? 'warn' : 'bad');
      rProSpiegel.set(CH.fmt(r.erlaubtJeSpiegel, 0) + ' pm',
        r.jeSpiegel <= r.erlaubtJeSpiegel ? 'ok' : 'bad');

      chartBox.innerHTML = '';
      chartBox.appendChild(balken(r));

      hinweis.innerHTML = auslastung > 1
        ? '<strong>Budget überschritten</strong>Der größte Einzelbeitrag ist ' + groesster(r) +
          '. Weil die Beiträge quadratisch eingehen, bringt nur die Reduktion des größten etwas: ' +
          'Den kleinsten zu halbieren ändert das Ergebnis kaum. Das ist dieselbe Logik wie bei der Toleranzkette in Modul 7.'
        : '<strong>Innerhalb des Budgets, ' + Math.round(auslastung * 100) + ' % ausgeschöpft</strong>' +
          'Bei ' + st.n + ' Spiegeln darf jeder einzelne nur ' + CH.fmt(r.erlaubtJeSpiegel, 0) +
          ' pm beitragen — das ist das Systembudget geteilt durch √' + st.n + ', nicht durch ' + st.n + '. ' +
          'Genau deshalb wird ein zusätzlicher Spiegel im Design so teuer: Er verschärft die Anforderung an alle anderen mit.';
    }

    function groesster(r) {
      var kandidaten = [
        { n: 'die Flächenform der Spiegel', v: r.form },
        { n: 'die Verkippung', v: r.kipp },
        { n: 'die Dezentrierung', v: r.dez },
        { n: 'die thermische Drift', v: r.therm }
      ].sort(function (a, b) { return b.v - a.v; });
      return kandidaten[0].n + ' mit ' + CH.fmt(kandidaten[0].v, 0) + ' pm';
    }

    function balken(r) {
      var teile = [
        { n: 'Flächenform (' + st.n + ' Spiegel)', v: r.form, f: 'var(--accent)' },
        { n: 'Verkippung', v: r.kipp, f: 'var(--warn)' },
        { n: 'Dezentrierung', v: r.dez, f: 'var(--ok)' },
        { n: 'thermische Drift', v: r.therm, f: 'var(--bad)' }
      ];
      var maxV = Math.max(st.budget, r.gesamt) * 1.15;
      var w = 620, zeile = 30, h = teile.length * zeile + 96, labelW = 168;
      var svg = CH.svgEl('svg', { viewBox: '0 0 ' + w + ' ' + h, role: 'img',
        'aria-label': 'Beiträge zum Wellenfrontbudget des Systems' });
      var x = CH.scale(0, maxV, labelW, w - 20);

      svg.appendChild(CH.svgEl('text', { x: 12, y: 14, 'font-size': 10.5, fill: 'var(--text-mute)',
        text: 'Beiträge zur System-Wellenfront [pm RMS], quadratisch addiert' }));

      teile.forEach(function (t, i) {
        var y = 26 + i * zeile;
        svg.appendChild(CH.svgEl('text', { x: labelW - 8, y: y + 15, 'text-anchor': 'end',
          'font-size': 10, fill: 'var(--text-mute)', text: t.n }));
        svg.appendChild(CH.svgEl('rect', { x: labelW, y: y + 3, width: Math.max(1, x(t.v) - labelW),
          height: 17, rx: 2, fill: t.f, opacity: .85 }));
        svg.appendChild(CH.svgEl('text', { x: x(t.v) + 6, y: y + 16, 'font-size': 9.5,
          'font-family': 'var(--mono)', fill: 'var(--text-mute)', text: CH.fmt(t.v, 0) }));
      });

      // Summe und Budget
      var ys = 26 + teile.length * zeile + 12;
      svg.appendChild(CH.svgEl('line', { x1: labelW, y1: ys - 6, x2: w - 20, y2: ys - 6, stroke: 'var(--border)' }));
      svg.appendChild(CH.svgEl('text', { x: labelW - 8, y: ys + 17, 'text-anchor': 'end', 'font-size': 10.5,
        'font-weight': 600, fill: 'var(--text)', text: 'Summe (RSS)' }));
      svg.appendChild(CH.svgEl('rect', { x: labelW, y: ys + 4, width: Math.max(1, x(r.gesamt) - labelW),
        height: 19, rx: 2, fill: r.gesamt <= st.budget ? 'var(--ok)' : 'var(--bad)' }));
      svg.appendChild(CH.svgEl('text', { x: x(r.gesamt) + 6, y: ys + 18, 'font-size': 10,
        'font-family': 'var(--mono)', 'font-weight': 600,
        fill: r.gesamt <= st.budget ? 'var(--ok)' : 'var(--bad)', text: CH.fmt(r.gesamt, 0) + ' pm' }));

      svg.appendChild(CH.svgEl('line', { x1: x(st.budget), x2: x(st.budget), y1: 20, y2: ys + 30,
        stroke: 'var(--bad)', 'stroke-width': 1.6, 'stroke-dasharray': '5 3' }));
      svg.appendChild(CH.svgEl('text', { x: x(st.budget), y: h - 24, 'text-anchor': 'middle',
        'font-size': 9.5, fill: 'var(--bad)', text: 'Systembudget ' + st.budget + ' pm' }));
      svg.appendChild(CH.svgEl('text', { x: 12, y: h - 6, 'font-size': 9, fill: 'var(--text-mute)',
        text: 'Zum Vergleich: beugungsbegrenzt nach Maréchal wäre erst λ/14 ≈ 960 pm — Lithografie braucht ein Vielfaches davon.' }));
      return svg;
    }

    var controls = CH.el('div', { class: 'sim-controls' }, [
      CH.slider({ label: 'Anzahl Spiegel', min: 4, max: 8, step: 1, value: st.n, digits: 0,
        hint: 'jeder zusätzliche Spiegel verschärft alle anderen Anforderungen' },
        function (v) { st.n = v; update(); }),
      CH.slider({ label: 'Flächenform je Spiegel', min: 10, max: 120, step: 5, value: st.form, unit: 'pm', digits: 0,
        hint: 'Restfehler nach der Korrekturschleife' }, function (v) { st.form = v; update(); }),
      CH.slider({ label: 'Verkippung je Spiegel', min: 0, max: 200, step: 5, value: st.kipp, unit: 'nrad', digits: 0,
        hint: 'Justagerestfehler; wirkt über 2α doppelt' }, function (v) { st.kipp = v; update(); }),
      CH.slider({ label: 'Dezentrierung je Spiegel', min: 0, max: 80, step: 1, value: st.dez, unit: 'nm', digits: 0 },
        function (v) { st.dez = v; update(); }),
      CH.slider({ label: 'Thermische Drift (System)', min: 0, max: 200, step: 5, value: st.therm, unit: 'pm', digits: 0,
        hint: 'absorbierte Strahlung verformt die Spiegel' }, function (v) { st.therm = v; update(); }),
      CH.slider({ label: 'Systembudget', min: 100, max: 600, step: 10, value: st.budget, unit: 'pm', digits: 0 },
        function (v) { st.budget = v; update(); })
    ]);

    var out = CH.el('div', { class: 'sim-output' }, [
      chartBox,
      CH.el('div', { class: 'readouts' }, [rGes, rLambda, rStrehl, rProSpiegel]),
      hinweis
    ]);

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'sim-grid' }, [controls, out]),
      CH.el('p', { class: 'note-sim', html:
        'Alle Beiträge werden als unabhängig angenommen und quadratisch addiert (RSS, wie in Modul 7). ' +
        'Je Spiegel gilt √(Form² + (Kippung·' + S_KIPP + ')² + (Dezentrierung·' + S_DEZ + ')²), über ' +
        'n Spiegel mal √n. Die Empfindlichkeiten sind didaktisch gewählt — im realen System hängen sie stark davon ab, ' +
        'wo im Strahlengang der Spiegel sitzt. Strehl ≈ exp(−(2π·RMS/λ)²) mit λ = 13,5 nm.'
      })
    ]));

    update();
  };
})(window);
