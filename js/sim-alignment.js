/* sim-alignment.js — Justage-Simulator: Stellgrößen → Wellenfrontfehler (Zernike) */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  /* Kopplungskoeffizienten: Stellgröße → Zernike-Koeffizient in Wellen (λ = 193 nm).
     Didaktisch gewählte, aber größenordnungsrichtige Werte für ein Linsenelement. */
  var K = {
    dez_koma:   0.0042,  // λ pro µm Dezentrierung
    dez_astig:  0.0011,  // λ pro µm (Restastigmatismus durch Fassungsspannung)
    tilt_koma:  0.0016,  // λ pro µrad Verkippung
    tilt_astig: 0.0009,  // λ pro µrad
    z_defokus:  0.0140,  // λ pro µm Luftabstandsfehler
    z_sphaer:   0.0022   // λ pro µm (Sphärische Aberration)
  };

  /* RMS-normierte Zernike-Polynome (Noll-Nummerierung) */
  function zern(n, r, th) {
    switch (n) {
      case 4:  return Math.sqrt(3) * (2 * r * r - 1);                       // Defokus
      case 5:  return Math.sqrt(6) * r * r * Math.sin(2 * th);              // Astigmatismus 45°
      case 6:  return Math.sqrt(6) * r * r * Math.cos(2 * th);              // Astigmatismus 0°
      case 7:  return Math.sqrt(8) * (3 * r * r * r - 2 * r) * Math.sin(th);// Koma y
      case 8:  return Math.sqrt(8) * (3 * r * r * r - 2 * r) * Math.cos(th);// Koma x
      case 11: return Math.sqrt(5) * (6 * Math.pow(r, 4) - 6 * r * r + 1);  // Sphärisch
      default: return 0;
    }
  }

  var TERMS = [
    { n: 4,  key: 'z4',  label: 'Z4 Defokus' },
    { n: 5,  key: 'z5',  label: 'Z5 Astig 45°' },
    { n: 6,  key: 'z6',  label: 'Z6 Astig 0°' },
    { n: 7,  key: 'z7',  label: 'Z7 Koma y' },
    { n: 8,  key: 'z8',  label: 'Z8 Koma x' },
    { n: 11, key: 'z11', label: 'Z11 Sphärisch' }
  ];

  /** Stellgrößen (inkl. verdecktem Bauteilfehler) → Zernike-Koeffizienten in λ. */
  function coefficients(s) {
    return {
      z4:  K.z_defokus * s.dz,
      z5:  K.dez_astig * s.dy + K.tilt_astig * s.ty,
      z6:  K.dez_astig * s.dx + K.tilt_astig * s.tx,
      z7:  K.dez_koma * s.dy + K.tilt_koma * s.ty,
      z8:  K.dez_koma * s.dx + K.tilt_koma * s.tx,
      z11: K.z_sphaer * s.dz
    };
  }

  function rmsOf(c) {
    return Math.sqrt(TERMS.reduce(function (a, t) { return a + c[t.key] * c[t.key]; }, 0));
  }

  /** Wellenfrontkarte als SVG-Rasterbild. */
  function wavefrontMap(c, size, cells) {
    var svg = CH.svgEl('svg', {
      viewBox: '0 0 ' + size + ' ' + size, role: 'img',
      'aria-label': 'Wellenfrontkarte der Restaberration über die Pupille'
    });
    // Kreisförmiger Beschnitt, damit der Pupillenrand nicht als Treppe erscheint
    var clipId = 'pupil-clip';
    var defs = CH.svgEl('defs', {}, [
      CH.svgEl('clipPath', { id: clipId }, [
        CH.svgEl('circle', { cx: size / 2, cy: size / 2, r: size / 2 })
      ])
    ]);
    svg.appendChild(defs);
    var cellLayer = CH.svgEl('g', { 'clip-path': 'url(#' + clipId + ')' });
    svg.appendChild(cellLayer);

    var step = size / cells, peak = 0, grid = [];

    for (var i = 0; i < cells; i++) {
      grid[i] = [];
      for (var j = 0; j < cells; j++) {
        var x = (i + 0.5) / cells * 2 - 1;
        var y = (j + 0.5) / cells * 2 - 1;
        var r = Math.sqrt(x * x + y * y);
        // Etwas über den Rand hinaus rastern; der clipPath schneidet sauber ab
        if (r > 1.08) { grid[i][j] = null; continue; }
        var th = Math.atan2(y, x), rr = Math.min(r, 1), w = 0;
        for (var t = 0; t < TERMS.length; t++) w += c[TERMS[t].key] * zern(TERMS[t].n, rr, th);
        grid[i][j] = w;
        if (Math.abs(w) > peak) peak = Math.abs(w);
      }
    }
    peak = Math.max(peak, 0.02); // Skala nicht auf null zusammenfallen lassen

    for (var a = 0; a < cells; a++) {
      for (var b = 0; b < cells; b++) {
        if (grid[a][b] === null) continue;
        cellLayer.appendChild(CH.svgEl('rect', {
          x: (a * step).toFixed(2), y: (b * step).toFixed(2),
          width: (step + 0.5).toFixed(2), height: (step + 0.5).toFixed(2),
          fill: divergingColor(grid[a][b] / peak)
        }));
      }
    }
    svg.appendChild(CH.svgEl('circle', {
      cx: size / 2, cy: size / 2, r: size / 2 - 0.5,
      fill: 'none', stroke: 'var(--border)', 'stroke-width': 1
    }));
    return { svg: svg, peak: peak };
  }

  /** Divergierende Farbskala blau (−) → neutral → orange (+), t in [−1,1]. */
  function divergingColor(t) {
    t = CH.clamp(t, -1, 1);
    var stops = t < 0
      ? [[41, 92, 160], [236, 238, 242]]
      : [[236, 238, 242], [199, 106, 33]];
    var f = Math.abs(t) > 0 ? (t < 0 ? 1 - Math.abs(t) : t) : 0;
    var c = stops[0].map(function (v, i) { return Math.round(v + (stops[1][i] - v) * f); });
    return 'rgb(' + c.join(',') + ')';
  }

  /** Balkendiagramm der Zernike-Koeffizienten. */
  function coeffChart(c) {
    var maxAbs = Math.max(0.02, TERMS.reduce(function (m, t) { return Math.max(m, Math.abs(c[t.key])); }, 0));
    var sc = CH.plot({
      w: 340, h: 190, pad: { t: 12, r: 10, b: 42, l: 58 },
      x: [0, TERMS.length], y: [-maxAbs * 1.15, maxAbs * 1.15],
      xTicks: 0, yTicks: 4, yFmt: function (v) { return v.toFixed(3); },
      yLabel: 'Koeffizient [λ]', label: 'Zernike-Koeffizienten'
    });
    // Tick-Beschriftung der x-Achse durch Term-Namen ersetzen
    TERMS.forEach(function (t, i) {
      var cx = sc.x(i + 0.5), v = c[t.key], y0 = sc.y(0), y1 = sc.y(v);
      sc.layer.appendChild(CH.svgEl('rect', {
        x: cx - 13, y: Math.min(y0, y1), width: 26, height: Math.max(1, Math.abs(y1 - y0)),
        fill: Math.abs(v) > 0.015 ? 'var(--warn)' : 'var(--accent)', opacity: .85, rx: 2
      }));
      sc.layer.appendChild(CH.svgEl('text', {
        x: cx, y: sc.h - 26, 'text-anchor': 'middle', 'font-size': 9,
        fill: 'var(--text-mute)', 'font-family': 'var(--mono)', text: t.label.split(' ')[0]
      }));
      sc.layer.appendChild(CH.svgEl('text', {
        x: cx, y: sc.h - 15, 'text-anchor': 'middle', 'font-size': 8.5,
        fill: 'var(--text-mute)', text: t.label.split(' ').slice(1).join(' ')
      }));
    });
    sc.layer.appendChild(CH.hline(sc, 0, null, { stroke: 'var(--text)', 'stroke-dasharray': null, opacity: .4 }));
    return sc.svg;
  }

  SIMS.alignment = function (root) {
    var seed = 7;
    var stell = { dx: 0, dy: 0, tx: 0, ty: 0, dz: 0 };  // Stellgrößen der Justage
    var fehler = { dx: 0, dy: 0, tx: 0, ty: 0, dz: 0 }; // verdeckter Bauteil-/Fassungsfehler
    var sliders = {};

    var mapBox = CH.el('div', { class: 'sim-canvas' });
    var barBox = CH.el('div', { class: 'sim-canvas' });
    var rRms = CH.readout('RMS Wellenfront'), rStrehl = CH.readout('Strehl'), rPv = CH.readout('Peak-to-Valley');

    function neuesBauteil() {
      var rand = CH.rng(seed++);
      fehler.dx = (CH.gauss(rand) * 8);
      fehler.dy = (CH.gauss(rand) * 8);
      fehler.tx = (CH.gauss(rand) * 12);
      fehler.ty = (CH.gauss(rand) * 12);
      fehler.dz = (CH.gauss(rand) * 1.2);
      Object.keys(stell).forEach(function (k) { stell[k] = 0; sliders[k].reset(0); });
      update();
    }

    function update() {
      var ist = {};
      Object.keys(stell).forEach(function (k) { ist[k] = stell[k] + fehler[k]; });
      var c = coefficients(ist);
      var rms = rmsOf(c);
      var strehl = Math.exp(-Math.pow(2 * Math.PI * rms, 2));

      var m = wavefrontMap(c, 220, 46);
      mapBox.innerHTML = '';
      mapBox.appendChild(m.svg);
      barBox.innerHTML = '';
      barBox.appendChild(coeffChart(c));

      // Maréchal: RMS ≤ λ/14 ≈ 0.071 λ entspricht Strehl ≈ 0.8
      rRms.set(CH.fmt(rms, 4) + ' λ', rms <= 0.03 ? 'ok' : rms <= 0.071 ? 'warn' : 'bad');
      rStrehl.set(CH.fmt(strehl, 3), strehl >= 0.95 ? 'ok' : strehl >= 0.8 ? 'warn' : 'bad');
      rPv.set(CH.fmt(2 * m.peak, 3) + ' λ');
    }

    function mk(key, cfg) {
      var s = CH.slider(cfg, function (v) { stell[key] = v; update(); });
      sliders[key] = s;
      return s;
    }

    var controls = CH.el('div', { class: 'sim-controls' }, [
      mk('dx', { label: 'Dezentrierung X', min: -40, max: 40, step: .5, value: 0, unit: 'µm', digits: 1 }),
      mk('dy', { label: 'Dezentrierung Y', min: -40, max: 40, step: .5, value: 0, unit: 'µm', digits: 1 }),
      mk('tx', { label: 'Verkippung um X', min: -60, max: 60, step: 1, value: 0, unit: 'µrad', digits: 0 }),
      mk('ty', { label: 'Verkippung um Y', min: -60, max: 60, step: 1, value: 0, unit: 'µrad', digits: 0 }),
      mk('dz', { label: 'Luftabstand ΔZ', min: -6, max: 6, step: .1, value: 0, unit: 'µm', digits: 1,
                 hint: 'Abweichung vom Solldesign-Abstand' }),
      CH.el('button', { class: 'btn btn-sm', text: 'Neues Bauteil einlegen', onclick: neuesBauteil })
    ]);

    var out = CH.el('div', { class: 'sim-output' }, [
      CH.el('div', { style: 'display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start' }, [
        CH.el('div', {}, [
          CH.el('div', { class: 'eyebrow', text: 'Wellenfront über der Pupille' }),
          mapBox
        ]),
        CH.el('div', { style: 'flex:1;min-width:260px' }, [
          CH.el('div', { class: 'eyebrow', text: 'Zernike-Anteile' }),
          barBox
        ])
      ]),
      CH.el('div', { class: 'readouts' }, [rRms, rStrehl, rPv])
    ]);

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'sim-grid' }, [controls, out]),
      CH.el('p', { class: 'note-sim', html:
        'Das eingelegte Bauteil bringt einen <em>verdeckten</em> Fertigungs- und Fassungsfehler mit. Ihre Aufgabe: ' +
        'die Stellgrößen so setzen, dass der RMS-Wellenfrontfehler unter 0,030 λ fällt. ' +
        'Modell: lineare Kopplung Stellgröße → Zernike-Koeffizient, ' +
        'RMS = √Σaᵢ², Strehl ≈ exp(−(2π·RMS)²), λ = 193 nm. Didaktisches Modell, keine Daten realer Systeme.'
      })
    ]));

    neuesBauteil();
  };
})(window);
