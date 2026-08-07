/* figures.js — statische Schemaskizzen als SVG. Registriert sich in window.FIGS. */
(function (global) {
  'use strict';
  var CH = global.CH;
  var FIGS = global.FIGS = global.FIGS || {};

  var S = CH.svgEl;

  /* ---------- gemeinsame Bausteine ---------- */

  function txt(x, y, t, opt) {
    return S('text', Object.assign({
      x: x, y: y, 'font-size': 10.5, fill: 'var(--text-mute)',
      'font-family': 'var(--sans)', text: t
    }, opt || {}));
  }

  function label(x, y, t, opt) {
    return txt(x, y, t, Object.assign({ fill: 'var(--text)', 'font-weight': 600, 'font-size': 11 }, opt || {}));
  }

  function box(x, y, w, h, opt) {
    return S('rect', Object.assign({
      x: x, y: y, width: w, height: h, rx: 4,
      fill: 'var(--surface-2)', stroke: 'var(--border)', 'stroke-width': 1.2
    }, opt || {}));
  }

  function arrow(x1, y1, x2, y2, opt) {
    return S('line', Object.assign({
      x1: x1, y1: y1, x2: x2, y2: y2, stroke: 'var(--text-mute)',
      'stroke-width': 1.4, 'marker-end': 'url(#fig-arrow)'
    }, opt || {}));
  }

  function defs() {
    return S('defs', {}, [
      S('marker', {
        id: 'fig-arrow', viewBox: '0 0 10 10', refX: 9, refY: 5,
        markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse'
      }, [S('path', { d: 'M0 0 L10 5 L0 10 z', fill: 'var(--text-mute)' })]),
      S('marker', {
        id: 'fig-arrow-accent', viewBox: '0 0 10 10', refX: 9, refY: 5,
        markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse'
      }, [S('path', { d: 'M0 0 L10 5 L0 10 z', fill: 'var(--accent)' })])
    ]);
  }

  /** Bikonvexe Linse im Schnitt, optional verkippt (Grad) und dezentriert (dy). */
  function linse(cx, cy, halbhoehe, dicke, opt) {
    opt = opt || {};
    var h = halbhoehe, d = dicke, r = (h * h + (d / 2) * (d / 2)) / d; // Kreisradius durch Scheitel und Rand
    var pfad = 'M ' + (cx) + ' ' + (cy - h) +
               ' A ' + r + ' ' + r + ' 0 0 1 ' + cx + ' ' + (cy + h) +
               ' A ' + r + ' ' + r + ' 0 0 1 ' + cx + ' ' + (cy - h) + ' Z';
    var g = S('g', opt.transform ? { transform: opt.transform } : {});
    g.appendChild(S('path', {
      d: pfad, fill: 'var(--accent-sf)', stroke: 'var(--accent)', 'stroke-width': 1.4
    }));
    return g;
  }

  function svgRoot(w, h, ariaLabel) {
    var svg = S('svg', {
      viewBox: '0 0 ' + w + ' ' + h, role: 'img', 'aria-label': ariaLabel,
      preserveAspectRatio: 'xMidYMid meet', style: 'width:100%;height:auto'
    });
    svg.appendChild(defs());
    return svg;
  }

  /* ═══════════ Figur 1: der reale Messplatz ═══════════ */

  FIGS.messplatz = function () {
    var svg = svgRoot(720, 400, 'Schematischer Aufbau einer interferometrischen Justagestation');

    // Umhausung
    svg.appendChild(S('rect', {
      x: 8, y: 8, width: 704, height: 384, rx: 10,
      fill: 'none', stroke: 'var(--text-mute)', 'stroke-width': 1, 'stroke-dasharray': '5 4', opacity: .7
    }));
    svg.appendChild(txt(20, 26, 'Justagezelle \u00b7 Reinraum \u00b7 temperiert \u00b10,1 K \u00b7 schwingungsisoliert'));

    // Auswerterechner
    svg.appendChild(box(578, 58, 120, 88, { fill: 'var(--surface)' }));
    svg.appendChild(S('circle', { cx: 612, cy: 98, r: 20, fill: 'var(--accent-sf)', stroke: 'var(--accent)' }));
    svg.appendChild(S('path', { d: 'M596 98 a16 16 0 0 1 32 0 a16 16 0 0 0 -32 0', fill: 'var(--accent)', opacity: .5 }));
    svg.appendChild(txt(640, 94, 'Zernike', { 'font-size': 9 }));
    svg.appendChild(txt(640, 106, 'RMS / Strehl', { 'font-size': 9 }));
    svg.appendChild(label(638, 164, 'Auswerterechner', { 'text-anchor': 'middle' }));

    // Datenfluss: Messdaten zum Rechner
    svg.appendChild(S('path', {
      d: 'M152 194 L152 96 L572 96', fill: 'none', stroke: 'var(--accent)',
      'stroke-width': 1.4, 'stroke-dasharray': '4 3', 'marker-end': 'url(#fig-arrow-accent)'
    }));
    svg.appendChild(txt(300, 90, 'Wellenfrontmessdaten', { fill: 'var(--accent)', 'font-size': 9.5 }));

    // Datenfluss: Korrektur zum Manipulator
    svg.appendChild(S('path', {
      d: 'M578 148 L232 148 L232 292 L254 292', fill: 'none', stroke: 'var(--ok)',
      'stroke-width': 1.4, 'stroke-dasharray': '4 3', 'marker-end': 'url(#fig-arrow)'
    }));
    svg.appendChild(txt(400, 142, 'berechnete Korrektur', { fill: 'var(--ok)', 'font-size': 9.5, 'text-anchor': 'middle' }));

    // Interferometer
    svg.appendChild(box(40, 196, 112, 84, { fill: 'var(--surface)' }));
    svg.appendChild(label(96, 222, 'Interferometer', { 'text-anchor': 'middle' }));
    svg.appendChild(txt(96, 236, '(Fizeau)', { 'text-anchor': 'middle' }));
    svg.appendChild(S('circle', { cx: 60, cy: 262, r: 5, fill: 'var(--bad)', opacity: .8 }));
    svg.appendChild(txt(70, 266, 'Laser', { 'font-size': 9 }));
    svg.appendChild(box(84, 280, 30, 20, { fill: 'var(--surface-2)' }));

    // Referenzfl\u00e4che
    svg.appendChild(txt(180, 186, 'Referenz-', { 'text-anchor': 'middle', 'font-size': 9.5 }));
    svg.appendChild(txt(180, 197, 'fl\u00e4che', { 'text-anchor': 'middle', 'font-size': 9.5 }));
    svg.appendChild(S('rect', {
      x: 176, y: 208, width: 9, height: 64, rx: 2,
      fill: 'var(--accent-sf)', stroke: 'var(--accent)', 'stroke-width': 1.4
    }));
    svg.appendChild(box(172, 280, 18, 20, { fill: 'var(--surface-2)' }));

    // Strahlengang mit Doppelpass
    [222, 258].forEach(function (y) {
      svg.appendChild(S('line', { x1: 152, y1: y, x2: 470, y2: y, stroke: 'var(--bad)', 'stroke-width': 1.6, opacity: .7 }));
    });
    svg.appendChild(arrow(200, 222, 238, 222, { stroke: 'var(--bad)' }));
    svg.appendChild(arrow(238, 258, 200, 258, { stroke: 'var(--bad)' }));

    // Pr\u00fcfling
    svg.appendChild(label(332, 170, 'Pr\u00fcfling: Objektivmodul', { 'text-anchor': 'middle' }));
    svg.appendChild(box(248, 200, 168, 80, { fill: 'none', stroke: 'var(--text)', 'stroke-width': 1.8 }));
    [278, 332, 386].forEach(function (x) { svg.appendChild(linse(x, 240, 30, 13)); });

    // Stellgr\u00f6\u00dfen \u00fcber dem Modul
    svg.appendChild(S('path', {
      d: 'M282 190 l30 0 M282 190 l5 -4 M282 190 l5 4 M312 190 l-5 -4 M312 190 l-5 4',
      stroke: 'var(--ok)', 'stroke-width': 1.4, fill: 'none'
    }));
    svg.appendChild(txt(318, 194, 'X / Y / Z', { 'font-size': 9, fill: 'var(--ok)' }));
    svg.appendChild(S('path', {
      d: 'M372 194 a16 16 0 0 1 24 -4', stroke: 'var(--ok)', 'stroke-width': 1.4,
      fill: 'none', 'marker-end': 'url(#fig-arrow)'
    }));
    svg.appendChild(txt(402, 194, 'Kippung', { 'font-size': 9, fill: 'var(--ok)' }));

    // Hexapod-Streben
    svg.appendChild(S('path', {
      d: 'M262 280 L280 300 M300 280 L282 300 M322 280 L340 300 M360 280 L342 300 M382 280 L400 300 M402 280 L384 300',
      stroke: 'var(--text-mute)', 'stroke-width': 1.6, fill: 'none'
    }));

    // Planspiegel
    svg.appendChild(S('rect', {
      x: 470, y: 200, width: 10, height: 80, rx: 2,
      fill: 'var(--border)', stroke: 'var(--text-mute)', 'stroke-width': 1.4
    }));
    svg.appendChild(txt(496, 234, 'Planspiegel', { 'font-size': 9.5 }));
    svg.appendChild(txt(496, 246, '(Autokollimation)', { 'font-size': 9.5 }));
    svg.appendChild(box(466, 280, 18, 20, { fill: 'var(--surface-2)' }));

    // Messtisch mit Isolatoren
    svg.appendChild(box(40, 300, 540, 18, { fill: 'var(--surface-2)' }));
    [90, 230, 390, 530].forEach(function (x) {
      svg.appendChild(S('path', {
        d: 'M' + x + ' 318 l0 8 m-7 0 l14 0 m-14 6 l14 0 m-14 6 l14 0',
        stroke: 'var(--text-mute)', 'stroke-width': 1.6, fill: 'none'
      }));
    });
    svg.appendChild(txt(310, 372, 'Manipulator (Hexapod) auf schwingungsisoliertem Messtisch',
      { 'text-anchor': 'middle' }));

    return svg;
  };

  /* ═══════════ Figur 2: Schnitt durch das Modul ═══════════ */

  FIGS.modulschnitt = function () {
    var svg = svgRoot(720, 330, 'Längsschnitt durch ein Objektivmodul mit Dezentrierung, Verkippung und Abstandsfehler');
    var cy = 170;

    // Fassung: obere und untere Wand
    svg.appendChild(S('rect', { x: 90, y: 54, width: 560, height: 18, fill: 'var(--surface-2)', stroke: 'var(--text)', 'stroke-width': 1.5 }));
    svg.appendChild(S('rect', { x: 90, y: 268, width: 560, height: 18, fill: 'var(--surface-2)', stroke: 'var(--text)', 'stroke-width': 1.5 }));
    svg.appendChild(label(370, 44, 'Fassung (Tubus)', { 'text-anchor': 'middle' }));

    // Sollachse
    svg.appendChild(S('line', {
      x1: 60, y1: cy, x2: 690, y2: cy, stroke: 'var(--text-mute)',
      'stroke-width': 1, 'stroke-dasharray': '8 4'
    }));
    svg.appendChild(txt(64, cy - 6, 'Systemachse (Soll)', { 'font-size': 9.5 }));

    // Linse 1: in Nennlage
    svg.appendChild(linse(180, cy, 82, 40));
    svg.appendChild(label(180, 308, 'L1 — in Nennlage', { 'text-anchor': 'middle', fill: 'var(--ok)' }));
    // Klebepunkte
    [72, 268].forEach(function (y) {
      [166, 194].forEach(function (x) {
        svg.appendChild(S('circle', { cx: x, cy: y === 72 ? 78 : 262, r: 3.5, fill: 'var(--warn)' }));
      });
    });
    svg.appendChild(S('line', { x1: 166, y1: 78, x2: 118, y2: 108, stroke: 'var(--warn)', 'stroke-width': .8 }));
    svg.appendChild(txt(114, 111, 'Klebestellen', { 'font-size': 9.5, fill: 'var(--warn)', 'text-anchor': 'end' }));

    // Linse 2: dezentriert
    var dy = 10;
    svg.appendChild(linse(370, cy + dy, 82, 40));
    svg.appendChild(S('line', {
      x1: 300, y1: cy + dy, x2: 440, y2: cy + dy, stroke: 'var(--bad)',
      'stroke-width': 1, 'stroke-dasharray': '5 3'
    }));
    svg.appendChild(S('path', {
      d: 'M336 ' + cy + ' L336 ' + (cy + dy),
      stroke: 'var(--bad)', 'stroke-width': 1.6, 'marker-start': 'url(#fig-arrow)', 'marker-end': 'url(#fig-arrow)'
    }));
    svg.appendChild(txt(330, cy + 12, 'Δy', { fill: 'var(--bad)', 'font-weight': 600, 'text-anchor': 'end' }));
    svg.appendChild(label(370, 308, 'L2 — dezentriert  →  Koma', { 'text-anchor': 'middle', fill: 'var(--bad)' }));

    // Linse 3: verkippt
    svg.appendChild(linse(560, cy, 82, 40, { transform: 'rotate(9 560 ' + cy + ')' }));
    svg.appendChild(S('line', {
      x1: 500, y1: cy, x2: 620, y2: cy, stroke: 'var(--text-mute)', 'stroke-width': .8, 'stroke-dasharray': '4 3'
    }));
    svg.appendChild(S('line', {
      x1: 500, y1: cy - 9.4, x2: 620, y2: cy + 9.4, stroke: 'var(--bad)', 'stroke-width': 1, 'stroke-dasharray': '5 3'
    }));
    svg.appendChild(S('path', {
      d: 'M614 ' + cy + ' A54 54 0 0 1 ' + 613.3 + ' ' + (cy + 8.5),
      fill: 'none', stroke: 'var(--bad)', 'stroke-width': 1.8
    }));
    svg.appendChild(txt(606, cy + 14, 'α', { fill: 'var(--bad)', 'font-weight': 600, 'font-size': 12 }));
    svg.appendChild(label(560, 308, 'L3 — verkippt  →  Koma + Astigmatismus', { 'text-anchor': 'middle', fill: 'var(--bad)' }));

    // Distanzring und Luftabstand
    svg.appendChild(S('rect', { x: 262, y: 72, width: 14, height: 40, fill: 'var(--text-mute)', opacity: .5 }));
    svg.appendChild(S('rect', { x: 262, y: 228, width: 14, height: 40, fill: 'var(--text-mute)', opacity: .5 }));
    svg.appendChild(S('line', { x1: 269, y1: 40, x2: 269, y2: 72, stroke: 'var(--text-mute)', 'stroke-width': .8 }));
    svg.appendChild(txt(269, 34, 'Distanzring', { 'text-anchor': 'middle', 'font-size': 9.5 }));

    svg.appendChild(S('path', {
      d: 'M383 118 L547 118', stroke: 'var(--warn)', 'stroke-width': 1.4,
      'marker-start': 'url(#fig-arrow)', 'marker-end': 'url(#fig-arrow)'
    }));
    svg.appendChild(txt(465, 112, 'Luftabstand d  →  Defokus', { 'text-anchor': 'middle', fill: 'var(--warn)', 'font-size': 10 }));

    return svg;
  };

  /* ═══════════ Figur 3: der Justagezyklus ═══════════ */

  FIGS.zyklus = function () {
    var svg = svgRoot(720, 300, 'Ablauf einer rechnergestützten Justage als Regelkreis');
    var schritte = [
      ['1 · Messen', 'Interferogramm,', 'über viele Frames gemittelt'],
      ['2 · Zerlegen', 'Wellenfront → Zernike-', 'Koeffizienten a'],
      ['3 · Rechnen', 'Korrektur x aus der', 'Empfindlichkeitsmatrix S'],
      ['4 · Stellen', 'Manipulator fährt,', 'System schwingt ein']
    ];

    schritte.forEach(function (s, i) {
      var x = 24 + i * 172;
      svg.appendChild(box(x, 40, 148, 66, { fill: 'var(--surface)' }));
      svg.appendChild(label(x + 74, 62, s[0], { 'text-anchor': 'middle' }));
      svg.appendChild(txt(x + 74, 78, s[1], { 'text-anchor': 'middle', 'font-size': 9.5 }));
      svg.appendChild(txt(x + 74, 91, s[2], { 'text-anchor': 'middle', 'font-size': 9.5 }));
      if (i < 3) svg.appendChild(arrow(x + 148, 73, x + 170, 73, { stroke: 'var(--accent)', 'marker-end': 'url(#fig-arrow-accent)' }));
    });

    // Rücklauf
    svg.appendChild(S('path', {
      d: 'M670 106 L670 134 L98 134 L98 108',
      fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1.4, 'marker-end': 'url(#fig-arrow-accent)'
    }));
    svg.appendChild(txt(116, 130, 'erneut messen — typisch 3 bis 8 Iterationen',
      { fill: 'var(--accent)', 'font-size': 9.5 }));

    // Entscheidung
    svg.appendChild(S('path', {
      d: 'M360 158 L444 190 L360 222 L276 190 Z',
      fill: 'var(--surface-2)', stroke: 'var(--border)', 'stroke-width': 1.2
    }));
    svg.appendChild(label(360, 188, 'RMS ≤ Spezifikation?', { 'text-anchor': 'middle', 'font-size': 10 }));
    svg.appendChild(txt(360, 202, 'und Fortschritt je Iteration?', { 'text-anchor': 'middle', 'font-size': 9 }));
    svg.appendChild(arrow(360, 134, 360, 156, {}));

    // Ausgänge
    svg.appendChild(S('rect', {
      x: 24, y: 244, width: 300, height: 42, rx: 4,
      fill: 'var(--ok-sf)', stroke: 'var(--ok)', 'stroke-width': 1.2
    }));
    svg.appendChild(txt(174, 262, 'ja  →  fixieren, verkleben, aushärten,', { 'text-anchor': 'middle', fill: 'var(--ok)', 'font-size': 10 }));
    svg.appendChild(txt(174, 275, 'Endprüfung nach dem Setzen', { 'text-anchor': 'middle', fill: 'var(--ok)', 'font-size': 10 }));
    svg.appendChild(S('path', { d: 'M276 190 L160 190 L160 242', fill: 'none', stroke: 'var(--ok)', 'stroke-width': 1.4, 'marker-end': 'url(#fig-arrow)' }));

    svg.appendChild(S('rect', {
      x: 396, y: 244, width: 300, height: 42, rx: 4,
      fill: 'var(--warn-sf)', stroke: 'var(--warn)', 'stroke-width': 1.2
    }));
    svg.appendChild(txt(546, 262, 'kein Fortschritt  →  Fehler liegt außerhalb', { 'text-anchor': 'middle', fill: 'var(--warn)', 'font-size': 10 }));
    svg.appendChild(txt(546, 275, 'des Stellbereichs: Bauteil, Fassung oder R&D', { 'text-anchor': 'middle', fill: 'var(--warn)', 'font-size': 10 }));
    svg.appendChild(S('path', { d: 'M444 190 L560 190 L560 242', fill: 'none', stroke: 'var(--warn)', 'stroke-width': 1.4, 'marker-end': 'url(#fig-arrow)' }));

    return svg;
  };

  /* ═══════════ Figur 4: der Strahlengang im Scanner ═══════════ */

  FIGS.scanner = function () {
    var svg = svgRoot(720, 470, 'Strahlengang eines Lithografiescanners von der Lichtquelle bis zum Wafer');
    var mitte = 250;

    // Lichtquelle
    svg.appendChild(box(28, 40, 118, 52, { fill: 'var(--surface)' }));
    svg.appendChild(label(87, 62, 'Lichtquelle', { 'text-anchor': 'middle' }));
    svg.appendChild(txt(87, 76, '193 nm oder 13,5 nm', { 'text-anchor': 'middle', 'font-size': 9 }));
    svg.appendChild(arrow(146, 66, 172, 66, { stroke: 'var(--bad)' }));

    // Beleuchtungsoptik
    svg.appendChild(box(174, 40, 152, 52, { fill: 'var(--surface)' }));
    svg.appendChild(label(mitte, 62, 'Beleuchtungsoptik', { 'text-anchor': 'middle' }));
    svg.appendChild(txt(mitte, 76, 'formt Winkelverteilung', { 'text-anchor': 'middle', 'font-size': 9 }));
    svg.appendChild(arrow(mitte, 92, mitte, 114, { stroke: 'var(--bad)' }));

    // Retikel
    svg.appendChild(S('rect', { x: 160, y: 118, width: 180, height: 14, fill: 'var(--surface-2)', stroke: 'var(--text)', 'stroke-width': 1.4 }));
    [176, 196, 216, 240, 268, 296, 320].forEach(function (x) {
      svg.appendChild(S('rect', { x: x, y: 121, width: 5, height: 8, fill: 'var(--text)', opacity: .55 }));
    });
    svg.appendChild(S('path', {
      d: 'M132 125 l22 0 M132 125 l5 -4 M132 125 l5 4 M154 125 l-5 -4 M154 125 l-5 4',
      stroke: 'var(--ok)', 'stroke-width': 1.3, fill: 'none'
    }));
    svg.appendChild(txt(128, 128, 'Retikelbühne', { 'font-size': 9, fill: 'var(--ok)', 'text-anchor': 'end' }));
    svg.appendChild(txt(352, 129, 'Retikel (Maske)', { 'font-size': 10 }));

    // Projektionsobjektiv
    svg.appendChild(S('path', {
      d: 'M166 156 L334 156 L306 340 L194 340 Z',
      fill: 'var(--accent-sf)', stroke: 'var(--accent)', 'stroke-width': 2
    }));
    [[190, 78], [228, 68], [266, 56], [304, 44]].forEach(function (p) {
      svg.appendChild(S('ellipse', { cx: mitte, cy: p[0], rx: p[1], ry: 7, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1.3, opacity: .85 }));
    });
    svg.appendChild(label(mitte, 148, 'Projektionsobjektiv', { 'text-anchor': 'middle' }));
    svg.appendChild(txt(mitte, 326, '4:1 Verkleinerung', { 'text-anchor': 'middle', 'font-size': 9.5, fill: 'var(--accent)' }));

    // Wafer
    svg.appendChild(arrow(mitte, 342, mitte, 358, { stroke: 'var(--bad)' }));
    svg.appendChild(S('rect', { x: 160, y: 362, width: 180, height: 12, rx: 2, fill: 'var(--surface-2)', stroke: 'var(--text)', 'stroke-width': 1.4 }));
    svg.appendChild(S('rect', { x: 236, y: 356, width: 28, height: 6, fill: 'var(--warn)', opacity: .8 }));
    svg.appendChild(txt(352, 368, 'Wafer, 300 mm', { 'font-size': 10 }));
    svg.appendChild(S('path', {
      d: 'M132 380 l22 0 M132 380 l5 -4 M132 380 l5 4 M154 380 l-5 -4 M154 380 l-5 4',
      stroke: 'var(--ok)', 'stroke-width': 1.3, fill: 'none'
    }));
    svg.appendChild(txt(128, 383, 'Waferbühne', { 'font-size': 9, fill: 'var(--ok)', 'text-anchor': 'end' }));
    svg.appendChild(txt(160, 400, 'Step & Scan: Retikel- und Waferbühne fahren gegenläufig,', { 'font-size': 9.5 }));
    svg.appendChild(txt(160, 413, 'der Wafer 4× langsamer — Feld für Feld über den Wafer.', { 'font-size': 9.5 }));

    // Hervorhebung: hier arbeitet die Rolle
    svg.appendChild(S('rect', {
      x: 420, y: 176, width: 274, height: 138, rx: 6,
      fill: 'var(--ok-sf)', stroke: 'var(--ok)', 'stroke-width': 1.6
    }));
    svg.appendChild(label(436, 200, 'Hier arbeiten Sie', { fill: 'var(--ok)' }));
    [
      'Das Projektionsobjektiv ist die Baugruppe, in der',
      'sich die Auflösung entscheidet. Es besteht aus',
      'mehreren Modulen: bei DUV aus 20 bis 30 Linsen,',
      'bei EUV aus rund sechs Spiegeln.',
      '',
      'Jedes Modul wird einzeln montiert, justiert und',
      'geprüft — genau das ist der Wertstromabschnitt',
      'aus Modul 5.'
    ].forEach(function (z, i) {
      if (z) svg.appendChild(txt(436, 220 + i * 12, z, { 'font-size': 9.5 }));
    });
    svg.appendChild(S('path', {
      d: 'M418 244 L336 244', fill: 'none', stroke: 'var(--ok)',
      'stroke-width': 1.4, 'marker-end': 'url(#fig-arrow)'
    }));

    // Kennzahlen rechts oben  (Marker: scanner-kennzahlen)
    svg.appendChild(box(448, 40, 246, 116, { fill: 'var(--surface)' }));
    svg.appendChild(label(464, 62, 'Größenordnungen'));
    [
      'Belichtungsfeld  26 × 33 mm',
      'Felder je Wafer  rund 100',
      'Durchsatz        über 150 Wafer je Stunde',
      'Overlay-Budget   wenige Nanometer',
      'Objektiv         Hunderte kg, Stückzahl klein'
    ].forEach(function (z, i) {
      svg.appendChild(txt(464, 82 + i * 14, z, { 'font-size': 9, 'font-family': 'var(--mono)' }));
    });

    return svg;
  };

  /* ═══════════ Figur 5: Fertigungskette eines EUV-Spiegels ═══════════ */

  FIGS.spiegelprozess = function () {
    var svg = svgRoot(720, 430, 'Fertigungskette eines EUV-Spiegels vom Rohling bis zur Justage');

    function schritt(x, y, w, h, titel, zeilen, opt) {
      opt = opt || {};
      svg.appendChild(box(x, y, w, h, { fill: opt.fill || 'var(--surface)', stroke: opt.stroke || 'var(--border)' }));
      svg.appendChild(label(x + w / 2, y + 22, titel, { 'text-anchor': 'middle', fill: opt.titelFarbe || 'var(--text)' }));
      zeilen.forEach(function (z, i) {
        svg.appendChild(txt(x + w / 2, y + 38 + i * 12, z, { 'text-anchor': 'middle', 'font-size': 9 }));
      });
    }

    /* obere Reihe */
    schritt(16, 30, 164, 66, 'Substrat', ['Glaskeramik mit nahezu', 'null Wärmeausdehnung']);
    schritt(206, 30, 164, 66, 'Schleifen & Fräsen', ['Grobform der Asphäre', 'oder Freifläche']);
    schritt(396, 30, 164, 66, 'Vorpolitur', ['Bearbeitungsspuren', 'entfernen']);
    svg.appendChild(arrow(180, 63, 202, 63, { stroke: 'var(--accent)', 'marker-end': 'url(#fig-arrow-accent)' }));
    svg.appendChild(arrow(370, 63, 392, 63, { stroke: 'var(--accent)', 'marker-end': 'url(#fig-arrow-accent)' }));
    svg.appendChild(S('path', {
      d: 'M478 96 L478 118 L226 118 L226 142', fill: 'none', stroke: 'var(--accent)',
      'stroke-width': 1.4, 'marker-end': 'url(#fig-arrow-accent)'
    }));

    /* Korrekturschleife */
    svg.appendChild(S('rect', {
      x: 116, y: 132, width: 430, height: 118, rx: 8,
      fill: 'none', stroke: 'var(--text-mute)', 'stroke-width': 1, 'stroke-dasharray': '5 4', opacity: .8
    }));
    schritt(136, 146, 180, 62, 'Messen', ['Interferometrie gegen', 'ein CGH-Normal']);
    schritt(346, 146, 180, 62, 'Korrigieren', ['Ionenstrahl oder MRF —', 'ortsaufgelöst abtragen']);
    svg.appendChild(arrow(316, 166, 342, 166, { stroke: 'var(--ok)', 'marker-end': 'url(#fig-arrow)' }));
    svg.appendChild(txt(329, 158, 'Fehlerkarte', { 'text-anchor': 'middle', 'font-size': 8.5, fill: 'var(--ok)' }));
    svg.appendChild(S('path', {
      d: 'M436 208 L436 226 L226 226 L226 210', fill: 'none', stroke: 'var(--ok)',
      'stroke-width': 1.4, 'marker-end': 'url(#fig-arrow)'
    }));
    svg.appendChild(txt(331, 240, 'erneut messen — viele Durchläufe, bis die Formabweichung im Pikometerbereich liegt',
      { 'text-anchor': 'middle', 'font-size': 9, fill: 'var(--ok)' }));

    /* Vielschichtstapel als Einschub */
    svg.appendChild(txt(636, 146, 'Mo/Si-Stapel', { 'text-anchor': 'middle', 'font-size': 9.5 }));
    for (var i = 0; i < 11; i++) {
      svg.appendChild(S('rect', {
        x: 588, y: 154 + i * 8, width: 96, height: 3.4,
        fill: 'var(--accent)', opacity: .85
      }));
      svg.appendChild(S('rect', {
        x: 588, y: 158 + i * 8, width: 96, height: 4.2,
        fill: 'var(--text-mute)', opacity: .45
      }));
    }
    svg.appendChild(S('rect', { x: 588, y: 242, width: 96, height: 12, fill: 'var(--surface-2)', stroke: 'var(--border)' }));
    svg.appendChild(txt(636, 251, 'Substrat', { 'text-anchor': 'middle', 'font-size': 8 }));
    svg.appendChild(txt(636, 270, 'rund 7 nm Periode,', { 'text-anchor': 'middle', 'font-size': 9 }));
    svg.appendChild(txt(636, 281, '40 bis 50 Doppellagen', { 'text-anchor': 'middle', 'font-size': 9 }));

    /* untere Reihe */
    svg.appendChild(S('path', {
      d: 'M331 252 L331 274 L106 274 L106 302', fill: 'none', stroke: 'var(--accent)',
      'stroke-width': 1.4, 'marker-end': 'url(#fig-arrow-accent)'
    }));
    schritt(16, 306, 180, 70, 'Beschichten', ['Mo/Si-Vielschicht,', 'Dicken auf Pikometer', 'genau geregelt']);
    schritt(226, 306, 180, 70, 'Endprüfung', ['Reflexionsgrad bei 13,5 nm,', 'Form nach dem Beschichten', '(die Schicht verändert sie)']);
    schritt(436, 306, 236, 70, 'Fassen & Justage', ['Ab hier beginnt Modul 1:', 'Montage, Justage und', 'Wellenfrontprüfung'],
      { fill: 'var(--ok-sf)', stroke: 'var(--ok)', titelFarbe: 'var(--ok)' });
    svg.appendChild(arrow(196, 341, 222, 341, { stroke: 'var(--accent)', 'marker-end': 'url(#fig-arrow-accent)' }));
    svg.appendChild(arrow(406, 341, 432, 341, { stroke: 'var(--ok)', 'marker-end': 'url(#fig-arrow)' }));

    svg.appendChild(txt(16, 404, 'Die Schleife in der Mitte ist derselbe Regelkreis wie bei der Justage: messen, gezielt korrigieren, erneut messen —',
      { 'font-size': 9.5 }));
    svg.appendChild(txt(16, 417, 'nur wird hier Material abgetragen statt eine Lage verstellt. Beides endet, wenn die Messung die Spezifikation bestätigt.',
      { 'font-size': 9.5 }));

    return svg;
  };

  /* ═══════════ Figur 6: die drei Ortsfrequenzbereiche ═══════════ */

  FIGS.ortsfrequenzen = function () {
    var svg = svgRoot(720, 330, 'Die drei Ortsfrequenzbereiche einer Spiegeloberfläche und ihre Wirkung');

    var panels = [
      { t: 'Figur', per: 150, amp: 17, skala: 'Skala größer 1 mm',
        wirk: 'Aberration', folge: 'Wellenfrontfehler,', folge2: 'also Bildfehler', farbe: 'var(--accent)' },
      { t: 'Welligkeit', per: 30, amp: 9, skala: 'Skala 1 µm bis 1 mm',
        wirk: 'Streulicht (Flare)', folge: 'Kontrastverlust im', folge2: 'Bild, diffuser Untergrund', farbe: 'var(--warn)' },
      { t: 'Rauheit', per: 7, amp: 5, skala: 'Skala kleiner 1 µm',
        wirk: 'Reflexionsverlust', folge: 'weniger Licht,', folge2: 'geringerer Durchsatz', farbe: 'var(--bad)' }
    ];

    panels.forEach(function (p, i) {
      var x = 16 + i * 234, w = 218;
      svg.appendChild(box(x, 28, w, 274, { fill: 'var(--surface)' }));
      svg.appendChild(label(x + w / 2, 52, p.t, { 'text-anchor': 'middle', fill: p.farbe }));
      svg.appendChild(txt(x + w / 2, 66, p.skala, { 'text-anchor': 'middle', 'font-size': 9 }));

      // Profilschnitt
      var y0 = 118, x0 = x + 16, breite = w - 32;
      svg.appendChild(S('line', { x1: x0, y1: y0, x2: x0 + breite, y2: y0, stroke: 'var(--text-mute)', 'stroke-width': .8, 'stroke-dasharray': '3 3' }));
      var d = '';
      for (var k = 0; k <= breite; k += 2) {
        var yy = y0 - p.amp * Math.sin(2 * Math.PI * k / p.per);
        d += (k ? 'L' : 'M') + (x0 + k).toFixed(1) + ' ' + yy.toFixed(1) + ' ';
      }
      svg.appendChild(S('path', { d: d, fill: 'none', stroke: p.farbe, 'stroke-width': 1.8 }));
      svg.appendChild(txt(x + w / 2, 156, 'Sollfläche gestrichelt', { 'text-anchor': 'middle', 'font-size': 8.5 }));

      // Wirkung
      svg.appendChild(S('line', { x1: x + 16, y1: 176, x2: x + w - 16, y2: 176, stroke: 'var(--border)' }));
      svg.appendChild(txt(x + w / 2, 196, 'wirkt als', { 'text-anchor': 'middle', 'font-size': 9 }));
      svg.appendChild(label(x + w / 2, 214, p.wirk, { 'text-anchor': 'middle', fill: p.farbe, 'font-size': 11.5 }));
      svg.appendChild(txt(x + w / 2, 234, p.folge, { 'text-anchor': 'middle', 'font-size': 9.5 }));
      svg.appendChild(txt(x + w / 2, 246, p.folge2, { 'text-anchor': 'middle', 'font-size': 9.5 }));

      svg.appendChild(S('line', { x1: x + 16, y1: 262, x2: x + w - 16, y2: 262, stroke: 'var(--border)' }));
      svg.appendChild(txt(x + w / 2, 280, 'korrigierbar durch', { 'text-anchor': 'middle', 'font-size': 9 }));
      svg.appendChild(txt(x + w / 2, 292, ['Ionenstrahl / MRF', 'feineres Polierwerkzeug', 'Politurchemie, Endpolitur'][i],
        { 'text-anchor': 'middle', 'font-size': 9.5, fill: 'var(--text)' }));
    });

    return svg;
  };

  /* ═══════════ Figur 7: DMAIC mit Werkzeugen je Phase ═══════════ */

  FIGS.dmaic = function () {
    var svg = svgRoot(720, 300, 'Der DMAIC-Zyklus mit den Werkzeugen der einzelnen Phasen');

    var phasen = [
      { k: 'D', n: 'Define', frage: 'Welches Problem, welcher Nutzen?', wz: ['Projektauftrag', 'SIPOC', 'CTQ-Baum'] },
      { k: 'M', n: 'Measure', frage: 'Wie gut ist der Prozess heute?', wz: ['Messsystemanalyse', 'Datenerhebungsplan', 'Ausgangsfähigkeit'] },
      { k: 'A', n: 'Analyze', frage: 'Welche Größen wirken wirklich?', wz: ['Stratifikation', 'Hypothesentest', 'Regression'] },
      { k: 'I', n: 'Improve', frage: 'Welche Einstellung ist die beste?', wz: ['Versuchsplan (DoE)', 'Wechselwirkungen', 'Bestätigungslauf'] },
      { k: 'C', n: 'Control', frage: 'Wie halten wir das Ergebnis?', wz: ['Regelkarte', 'Standardarbeit', 'Reaktionsplan'] }
    ];

    var breite = 132, luecke = 14;
    phasen.forEach(function (p, i) {
      var x = 12 + i * (breite + luecke);
      svg.appendChild(box(x, 44, breite, 210, { fill: 'var(--surface)' }));
      svg.appendChild(S('circle', { cx: x + breite / 2, cy: 74, r: 17, fill: 'var(--accent-sf)', stroke: 'var(--accent)', 'stroke-width': 1.6 }));
      svg.appendChild(S('text', {
        x: x + breite / 2, y: 80, 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 700,
        fill: 'var(--accent)', 'font-family': 'var(--sans)', text: p.k
      }));
      svg.appendChild(label(x + breite / 2, 108, p.n, { 'text-anchor': 'middle' }));
      svg.appendChild(txt(x + breite / 2, 126, p.frage.slice(0, 22), { 'text-anchor': 'middle', 'font-size': 8.5 }));
      if (p.frage.length > 22) {
        svg.appendChild(txt(x + breite / 2, 137, p.frage.slice(22), { 'text-anchor': 'middle', 'font-size': 8.5 }));
      }
      svg.appendChild(S('line', { x1: x + 14, y1: 150, x2: x + breite - 14, y2: 150, stroke: 'var(--border)' }));
      p.wz.forEach(function (w, j) {
        svg.appendChild(S('circle', { cx: x + 20, cy: 168 + j * 20, r: 2.5, fill: 'var(--text-mute)' }));
        svg.appendChild(txt(x + 28, 171 + j * 20, w, { 'font-size': 9 }));
      });
      if (i < phasen.length - 1) {
        svg.appendChild(arrow(x + breite + 1, 74, x + breite + luecke - 2, 74,
          { stroke: 'var(--accent)', 'marker-end': 'url(#fig-arrow-accent)' }));
      }
    });

    svg.appendChild(txt(12, 24, 'Ein Werkzeug je Phase entscheidet über den Erfolg — die Reihenfolge ist nicht verhandelbar', { 'font-size': 10 }));
    svg.appendChild(S('path', {
      d: 'M690 264 L690 280 L26 280 L26 266', fill: 'none', stroke: 'var(--text-mute)',
      'stroke-width': 1.2, 'stroke-dasharray': '4 3', 'marker-end': 'url(#fig-arrow)'
    }));
    svg.appendChild(txt(358, 293, 'Ergebnis bestätigt den Nutzen nicht — dann zurück in Analyze', { 'text-anchor': 'middle', 'font-size': 9 }));

    return svg;
  };

  /* ═══════════ Figur 8: Wertstromkarte mit Zeitlinie ═══════════ */

  FIGS.wertstromkarte = function () {
    var svg = svgRoot(720, 340, 'Wertstromkarte eines Montageabschnitts mit Zeitlinie und Flusseffizienz');

    var stationen = [
      { n: 'Reinigung', ct: 45, wip: 3 },
      { n: 'Vormontage', ct: 90, wip: 5 },
      { n: 'Justage', ct: 150, wip: 6 },
      { n: 'Prüfung', ct: 70, wip: 4 },
      { n: 'Verkleben', ct: 60, wip: 0 }
    ];

    var x0 = 20, breite = 108, luecke = 30;
    stationen.forEach(function (s, i) {
      var x = x0 + i * (breite + luecke);
      // Prozesskasten
      svg.appendChild(box(x, 40, breite, 34, { fill: 'var(--surface)' }));
      svg.appendChild(label(x + breite / 2, 62, s.n, { 'text-anchor': 'middle', 'font-size': 10.5 }));
      // Datenkasten
      svg.appendChild(box(x, 78, breite, 42, { fill: 'var(--surface-2)' }));
      svg.appendChild(txt(x + 8, 94, 'ZZ ' + s.ct + ' min', { 'font-size': 9, 'font-family': 'var(--mono)' }));
      svg.appendChild(txt(x + 8, 106, 'FPY ' + [98, 95, 82, 99, 97][i] + ' %', { 'font-size': 9, 'font-family': 'var(--mono)' }));
      svg.appendChild(txt(x + 8, 117, 'Verf ' + [95, 92, 88, 97, 99][i] + ' %', { 'font-size': 9, 'font-family': 'var(--mono)' }));
      // Bestandsdreieck
      if (s.wip) {
        var xd = x + breite + luecke / 2;
        svg.appendChild(S('path', { d: 'M' + xd + ' 44 L' + (xd + 13) + ' 66 L' + (xd - 13) + ' 66 Z',
          fill: 'var(--warn-sf)', stroke: 'var(--warn)', 'stroke-width': 1.3 }));
        svg.appendChild(S('text', { x: xd, y: 62, 'text-anchor': 'middle', 'font-size': 9,
          'font-family': 'var(--mono)', fill: 'var(--warn)', text: String(s.wip) }));
      }
    });

    // Zeitlinie: oben Liegezeit, unten Bearbeitungszeit
    var yOben = 170, yUnten = 200;
    var d = 'M' + x0 + ' ' + yOben;
    var gesamtBearb = 0, gesamtLiege = 0;
    stationen.forEach(function (s, i) {
      var x = x0 + i * (breite + luecke);
      d += ' L' + x + ' ' + yUnten + ' L' + (x + breite) + ' ' + yUnten + ' L' + (x + breite) + ' ' + yOben;
      gesamtBearb += s.ct;
      var liege = s.wip * 150; // Bestand mal Engpasstakt
      gesamtLiege += liege;
      if (i < stationen.length - 1) d += ' L' + (x + breite + luecke) + ' ' + yOben;
      // Beschriftungen
      svg.appendChild(txt(x + breite / 2, yUnten + 14, s.ct + ' min', { 'text-anchor': 'middle', 'font-size': 9,
        'font-family': 'var(--mono)', fill: 'var(--ok)' }));
      if (s.wip) {
        svg.appendChild(txt(x + breite + luecke / 2, yOben - 6, (liege / 60).toFixed(0) + ' h',
          { 'text-anchor': 'middle', 'font-size': 9, 'font-family': 'var(--mono)', fill: 'var(--warn)' }));
      }
    });
    svg.appendChild(S('path', { d: d, fill: 'none', stroke: 'var(--text-mute)', 'stroke-width': 1.6 }));
    svg.appendChild(txt(x0, yOben - 22, 'Liegezeit (bezahlt der Kunde nicht)', { 'font-size': 9.5, fill: 'var(--warn)' }));
    svg.appendChild(txt(x0, yUnten + 32, 'Bearbeitungszeit (wertschöpfend)', { 'font-size': 9.5, fill: 'var(--ok)' }));

    // Auswertung mit maßstäblichem Balken — die Zeitlinie oben ist wie bei echten
    // Wertstromkarten nicht proportional, deshalb hier die Verhältnisse als Balken
    var dlz = gesamtBearb + gesamtLiege;
    svg.appendChild(box(20, 240, 680, 76, { fill: 'var(--surface)' }));
    svg.appendChild(label(36, 260, 'Auswertung der Zeitlinie'));
    svg.appendChild(txt(300, 260, 'Bearbeitung ' + (gesamtBearb / 60).toFixed(1) + ' h   ·   Warten ' +
      (gesamtLiege / 60).toFixed(1) + ' h   ·   Durchlaufzeit ' + (dlz / 60).toFixed(1) + ' h', { 'font-size': 10 }));

    var balkenB = 648, xB = 36, anteil = gesamtBearb / dlz;
    svg.appendChild(S('rect', { x: xB, y: 270, width: Math.max(2, balkenB * anteil), height: 20,
      fill: 'var(--ok)', opacity: .9, rx: 2 }));
    svg.appendChild(S('rect', { x: xB + balkenB * anteil, y: 270, width: balkenB * (1 - anteil), height: 20,
      fill: 'var(--warn)', opacity: .55, rx: 2 }));
    svg.appendChild(S('text', { x: xB + balkenB * anteil + 8, y: 284, 'font-size': 10,
      fill: 'var(--text)', 'font-family': 'var(--sans)', text: 'Warten — ' + ((1 - anteil) * 100).toFixed(0) + ' % der Durchlaufzeit' }));
    svg.appendChild(txt(36, 308, 'Flusseffizienz = Bearbeitungszeit / Durchlaufzeit = ' +
      (anteil * 100).toFixed(0) + ' %  (maßstäblich dargestellt, anders als die Zeitlinie oben)',
      { 'font-size': 10, fill: 'var(--bad)' }));

    return svg;
  };

  /* ═══════════ Figur 9: gefalteter Strahlengang im EUV-Objektiv ═══════════ */

  FIGS.euvpfad = function () {
    var svg = svgRoot(720, 440, 'Gefalteter Strahlengang durch sechs Spiegel und die Verdopplung des Kippwinkels bei Reflexion');

    /* ---- linke Hälfte: die gefaltete Anordnung ---- */
    var links = 84, rechts = 372;
    var spiegel = [
      { n: 'M1', x: links,  y: 104, dreh: -28 },
      { n: 'M2', x: rechts, y: 158, dreh: 28 },
      { n: 'M3', x: links,  y: 216, dreh: -28 },
      { n: 'M4', x: rechts, y: 272, dreh: 28 },
      { n: 'M5', x: links,  y: 328, dreh: -28 },
      { n: 'M6', x: rechts, y: 380, dreh: 28 }
    ];

    // Retikel und Wafer
    svg.appendChild(S('rect', { x: 168, y: 40, width: 124, height: 11, fill: 'var(--surface-2)', stroke: 'var(--text)', 'stroke-width': 1.4 }));
    svg.appendChild(txt(230, 34, 'Retikel (reflektiv)', { 'text-anchor': 'middle', 'font-size': 9.5 }));
    svg.appendChild(S('rect', { x: 168, y: 410, width: 124, height: 11, rx: 2, fill: 'var(--surface-2)', stroke: 'var(--text)', 'stroke-width': 1.4 }));
    svg.appendChild(txt(230, 434, 'Wafer', { 'text-anchor': 'middle', 'font-size': 9.5 }));

    // Strahlengang
    var punkte = [[230, 51]].concat(spiegel.map(function (m) { return [m.x, m.y]; })).concat([[230, 410]]);
    var d = punkte.map(function (p, i) { return (i ? 'L' : 'M') + p[0] + ' ' + p[1]; }).join(' ');
    svg.appendChild(S('path', { d: d, fill: 'none', stroke: 'var(--bad)', 'stroke-width': 1.6, opacity: .75 }));

    // Spiegel als gekrümmte Segmente
    spiegel.forEach(function (m) {
      var g = S('g', { transform: 'rotate(' + m.dreh + ' ' + m.x + ' ' + m.y + ')' });
      g.appendChild(S('path', {
        d: 'M' + (m.x - 26) + ' ' + (m.y + 5) + ' Q' + m.x + ' ' + (m.y - 7) + ' ' + (m.x + 26) + ' ' + (m.y + 5),
        fill: 'none', stroke: 'var(--accent)', 'stroke-width': 4.5, 'stroke-linecap': 'round'
      }));
      svg.appendChild(g);
      svg.appendChild(label(m.x + (m.x === links ? -38 : 38), m.y + 4, m.n, { 'text-anchor': 'middle', 'font-size': 10.5 }));
    });

    svg.appendChild(S('rect', { x: 46, y: 60, width: 368, height: 344, rx: 8, fill: 'none',
      stroke: 'var(--text-mute)', 'stroke-width': 1, 'stroke-dasharray': '5 4', opacity: .55 }));
    svg.appendChild(txt(58, 368, 'Vakuum · außeraxiale Anordnung', { 'font-size': 9.5 }));
    svg.appendChild(txt(58, 381, '6 Spiegel × 6 Freiheitsgrade = 36 Stellgrößen', { 'font-size': 9.5 }));

    /* ---- rechte Hälfte: die 2α-Regel ---- */
    svg.appendChild(box(452, 40, 244, 202, { fill: 'var(--surface)' }));
    svg.appendChild(label(574, 62, 'Die Regel, die alles ändert', { 'text-anchor': 'middle' }));

    var mx = 574, my = 186;
    // Spiegel in Soll-Lage
    svg.appendChild(S('line', { x1: mx - 54, y1: my, x2: mx + 54, y2: my, stroke: 'var(--accent)', 'stroke-width': 4, 'stroke-linecap': 'round' }));
    // verkippter Spiegel
    svg.appendChild(S('line', {
      x1: mx - 54, y1: my + 9, x2: mx + 54, y2: my - 9,
      stroke: 'var(--bad)', 'stroke-width': 2.2, 'stroke-dasharray': '5 3', 'stroke-linecap': 'round'
    }));
    // einfallender Strahl
    svg.appendChild(S('line', { x1: mx - 52, y1: my - 62, x2: mx, y2: my, stroke: 'var(--text-mute)', 'stroke-width': 1.6, 'marker-end': 'url(#fig-arrow)' }));
    // Soll-Reflex
    svg.appendChild(S('line', { x1: mx, y1: my, x2: mx + 52, y2: my - 62, stroke: 'var(--text-mute)', 'stroke-width': 1.6 }));
    // abgelenkter Reflex
    svg.appendChild(S('line', { x1: mx, y1: my, x2: mx + 24, y2: my - 70, stroke: 'var(--bad)', 'stroke-width': 2 }));
    svg.appendChild(S('path', { d: 'M' + (mx + 37) + ' ' + (my - 44) + ' A60 60 0 0 0 ' + (mx + 18) + ' ' + (my - 52),
      fill: 'none', stroke: 'var(--bad)', 'stroke-width': 1.4 }));
    svg.appendChild(txt(mx + 44, my - 34, '2α', { fill: 'var(--bad)', 'font-weight': 600, 'font-size': 12 }));
    svg.appendChild(txt(mx - 42, my + 22, 'α', { fill: 'var(--bad)', 'font-weight': 600, 'font-size': 12 }));
    svg.appendChild(txt(574, 86, 'Spiegel um α gekippt', { 'text-anchor': 'middle', 'font-size': 9.5 }));
    svg.appendChild(txt(574, 98, '→ Strahl um 2α abgelenkt', { 'text-anchor': 'middle', 'font-size': 9.5, fill: 'var(--bad)' }));
    svg.appendChild(txt(574, 230, 'Bei einer Linse wirkt die Verkippung einfach.', { 'text-anchor': 'middle', 'font-size': 9 }));

    /* ---- rechte Hälfte unten: Folgen ---- */
    svg.appendChild(box(452, 256, 244, 148, { fill: 'var(--ok-sf)', stroke: 'var(--ok)' }));
    svg.appendChild(label(468, 278, 'Was daraus folgt', { fill: 'var(--ok)' }));
    [
      'Winkelempfindlichkeit doppelt so hoch',
      'wie bei refraktiven Elementen.',
      '',
      'Kein Luftabstand, keine Glasdaten —',
      'stattdessen Flächenform und Schicht.',
      '',
      'Toleranzen in Pikometern statt',
      'Nanometern: 1 mλ = 13,5 pm.'
    ].forEach(function (z, i) {
      if (z) svg.appendChild(txt(468, 297 + i * 13, z, { 'font-size': 9.5 }));
    });

    return svg;
  };

  /* ═══════════ Figur 10: Prüfkaskade Bauteil → Modul → System ═══════════ */

  FIGS.pruefkaskade = function () {
    var svg = svgRoot(720, 330, 'Prüfstufen vom Einzelbauteil über das Modul bis zur Integration beim Kunden');

    var stufen = [
      { n: 'Bauteil', wer: 'Fertigung der Optik',
        pruef: ['Flächenform', 'Rauheit', 'Radius, Dicke', 'Beschichtung'],
        kosten: '1×', farbe: 'var(--ok)' },
      { n: 'Modul', wer: 'Montage und Justage',
        pruef: ['Wellenfront über', 'das Feld', 'Transmission', 'Sauberkeit'],
        kosten: '10×', farbe: 'var(--warn)' },
      { n: 'System', wer: 'Integration beim Kunden',
        pruef: ['Wellenfront im', 'eingebauten Zustand', 'Abbildung auf', 'dem Wafer'],
        kosten: '100×', farbe: 'var(--bad)' }
    ];

    var breite = 200, luecke = 40;
    stufen.forEach(function (st, i) {
      var x = 24 + i * (breite + luecke);
      svg.appendChild(box(x, 44, breite, 178, { fill: 'var(--surface)', stroke: st.farbe }));
      svg.appendChild(S('rect', { x: x, y: 44, width: breite, height: 5, rx: 2, fill: st.farbe }));
      svg.appendChild(label(x + breite / 2, 74, st.n, { 'text-anchor': 'middle', 'font-size': 13 }));
      svg.appendChild(txt(x + breite / 2, 90, st.wer, { 'text-anchor': 'middle', 'font-size': 9.5 }));
      svg.appendChild(S('line', { x1: x + 18, y1: 104, x2: x + breite - 18, y2: 104, stroke: 'var(--border)' }));
      st.pruef.forEach(function (p, j) {
        svg.appendChild(txt(x + 22, 124 + j * 15, p, { 'font-size': 9.5 }));
      });
      svg.appendChild(S('rect', { x: x + 18, y: 188, width: breite - 36, height: 22, rx: 4,
        fill: st.farbe, opacity: .15 }));
      svg.appendChild(S('text', { x: x + breite / 2, y: 203, 'text-anchor': 'middle', 'font-size': 11,
        'font-weight': 600, fill: st.farbe, 'font-family': 'var(--sans)',
        text: 'Fehlerkosten ' + st.kosten }));
      if (i < 2) {
        svg.appendChild(arrow(x + breite + 4, 132, x + breite + luecke - 6, 132,
          { stroke: 'var(--accent)', 'marker-end': 'url(#fig-arrow-accent)' }));
      }
    });

    // Rückläufe
    svg.appendChild(S('path', {
      d: 'M504 232 L504 258 L124 258 L124 232', fill: 'none', stroke: 'var(--bad)',
      'stroke-width': 1.4, 'stroke-dasharray': '5 3', 'marker-end': 'url(#fig-arrow)'
    }));
    svg.appendChild(txt(314, 272, 'Was hier durchrutscht, kommt als Reklamation zurück — und kostet ein Vielfaches',
      { 'text-anchor': 'middle', 'font-size': 9.5, fill: 'var(--bad)' }));
    svg.appendChild(txt(24, 300, 'Die Zehnerregel ist eine Faustregel, keine Naturkonstante — die Größenordnung stimmt aber:',
      { 'font-size': 9.5 }));
    svg.appendChild(txt(24, 313, 'Ein Fehler, der erst beim Kunden auffällt, bindet Logistik, Analyse, Nacharbeit und Vertrauen.',
      { 'font-size': 9.5 }));

    return svg;
  };

  /* ═══════════ Figur 11: Phase, Amplitude, Untergrund ═══════════ */

  FIGS.pupille = function () {
    var svg = svgRoot(720, 384, 'Wellenfront, Pupillenapodisation und Streulicht als drei getrennte Wirkungen');

    /** Pupillenscheibe aus einer Funktion f(x,y) → Farbe rendern. */
    var clipZaehler = 0;
    function scheibe(cx, cy, r, zellen, farbe) {
      // Kreisförmiger Beschnitt, damit der Rand nicht als Treppe erscheint
      var id = 'pup-clip-' + (++clipZaehler);
      var g = S('g');
      g.appendChild(S('defs', {}, [
        S('clipPath', { id: id }, [S('circle', { cx: cx, cy: cy, r: r })])
      ]));
      var zellen_g = S('g', { 'clip-path': 'url(#' + id + ')' });
      g.appendChild(zellen_g);
      var schritt = (2 * r) / zellen;
      for (var i = 0; i < zellen; i++) {
        for (var j = 0; j < zellen; j++) {
          var x = (i + 0.5) / zellen * 2 - 1, y = (j + 0.5) / zellen * 2 - 1;
          if (x * x + y * y > 1.1) continue;
          zellen_g.appendChild(S('rect', {
            x: (cx - r + i * schritt).toFixed(1), y: (cy - r + j * schritt).toFixed(1),
            width: (schritt + 0.6).toFixed(1), height: (schritt + 0.6).toFixed(1),
            fill: farbe(x, y)
          }));
        }
      }
      g.appendChild(S('circle', { cx: cx, cy: cy, r: r, fill: 'none', stroke: 'var(--border)', 'stroke-width': 1 }));
      return g;
    }

    function mische(a, b, t) {
      t = Math.max(0, Math.min(1, t));
      return 'rgb(' + a.map(function (v, i) { return Math.round(v + (b[i] - v) * t); }).join(',') + ')';
    }

    var panelB = 224, y0 = 34;

    /* Panel 1: Phase — Wellenfrontfehler (Koma-artig) */
    svg.appendChild(box(14, y0, panelB, 250, { fill: 'var(--surface)' }));
    svg.appendChild(label(14 + panelB / 2, y0 + 22, 'Phase', { 'text-anchor': 'middle' }));
    svg.appendChild(txt(14 + panelB / 2, y0 + 36, 'Wellenfrontfehler', { 'text-anchor': 'middle', 'font-size': 9.5 }));
    svg.appendChild(scheibe(14 + panelB / 2, y0 + 108, 54, 34, function (x, y) {
      var r = Math.sqrt(x * x + y * y), th = Math.atan2(y, x);
      var w = (3 * r * r - 2) * r * Math.cos(th);
      return w < 0 ? mische([236, 238, 242], [41, 92, 160], -w) : mische([236, 238, 242], [199, 106, 33], w);
    }));
    svg.appendChild(txt(28, y0 + 190, 'Die Größe aus Modul 1: Zernike-', { 'font-size': 9.5 }));
    svg.appendChild(txt(28, y0 + 202, 'Zerlegung, RMS, Strehl.', { 'font-size': 9.5 }));
    svg.appendChild(S('rect', { x: 28, y: y0 + 214, width: panelB - 28, height: 22, rx: 4, fill: 'var(--ok-sf)' }));
    svg.appendChild(S('text', { x: 36, y: y0 + 229, 'font-size': 9.5, 'font-weight': 600, fill: 'var(--ok)',
      'font-family': 'var(--sans)', text: 'durch Justage korrigierbar' }));

    /* Panel 2: Amplitude — Apodisation */
    svg.appendChild(box(248, y0, panelB, 250, { fill: 'var(--surface)' }));
    svg.appendChild(label(248 + panelB / 2, y0 + 22, 'Amplitude', { 'text-anchor': 'middle' }));
    svg.appendChild(txt(248 + panelB / 2, y0 + 36, 'Pupillenapodisation', { 'text-anchor': 'middle', 'font-size': 9.5 }));
    svg.appendChild(scheibe(248 + panelB / 2, y0 + 108, 54, 34, function (x, y) {
      var r = Math.sqrt(x * x + y * y);
      var hell = 1 - 0.55 * r * r - 0.12 * x; // Reflexionsgrad sinkt zum Rand und asymmetrisch
      return mische([120, 120, 128], [252, 252, 254], hell);
    }));
    svg.appendChild(txt(262, y0 + 190, 'Der Reflexionsgrad der Vielschicht', { 'font-size': 9.5 }));
    svg.appendChild(txt(262, y0 + 202, 'hängt vom Einfallswinkel ab.', { 'font-size': 9.5 }));
    svg.appendChild(S('rect', { x: 262, y: y0 + 214, width: panelB - 28, height: 22, rx: 4, fill: 'var(--bad-sf)' }));
    svg.appendChild(S('text', { x: 270, y: y0 + 229, 'font-size': 9.5, 'font-weight': 600, fill: 'var(--bad)',
      'font-family': 'var(--sans)', text: 'nicht durch Justage korrigierbar' }));

    /* Panel 3: Untergrund — Streulicht */
    svg.appendChild(box(482, y0, panelB, 250, { fill: 'var(--surface)' }));
    svg.appendChild(label(482 + panelB / 2, y0 + 22, 'Untergrund', { 'text-anchor': 'middle' }));
    svg.appendChild(txt(482 + panelB / 2, y0 + 36, 'Streulicht (Flare)', { 'text-anchor': 'middle', 'font-size': 9.5 }));

    var px = 502, pb = 184, pyBasis = y0 + 160, ph = 96;
    svg.appendChild(S('line', { x1: px, y1: pyBasis, x2: px + pb, y2: pyBasis, stroke: 'var(--border)' }));
    function profil(sockel, farbe, breite, strich) {
      var d = '';
      for (var k = 0; k <= pb; k += 2) {
        var u = (k / pb) * 2 - 1;
        var v = Math.exp(-Math.pow(u / 0.22, 2)) * (1 - sockel) + sockel;
        d += (k ? 'L' : 'M') + (px + k).toFixed(1) + ' ' + (pyBasis - v * ph).toFixed(1) + ' ';
      }
      return S('path', { d: d, fill: 'none', stroke: farbe, 'stroke-width': breite, 'stroke-dasharray': strich || null });
    }
    svg.appendChild(profil(0, 'var(--text-mute)', 1.4, '4 3'));
    svg.appendChild(profil(0.28, 'var(--bad)', 2.2));
    svg.appendChild(S('line', { x1: px, y1: pyBasis - 0.28 * ph, x2: px + pb, y2: pyBasis - 0.28 * ph,
      stroke: 'var(--bad)', 'stroke-width': 1, 'stroke-dasharray': '3 3', opacity: .6 }));
    svg.appendChild(txt(px + pb + 2, pyBasis - 0.28 * ph + 3, 'Sockel', { 'font-size': 8.5, fill: 'var(--bad)' }));
    svg.appendChild(txt(px, y0 + 176, 'Intensitätsschnitt im Bild', { 'font-size': 8.5 }));

    svg.appendChild(txt(496, y0 + 190, 'Aus Welligkeit gestreutes Licht;', { 'font-size': 9.5 }));
    svg.appendChild(txt(496, y0 + 202, 'wächst stark mit kürzerer Wellenlänge.', { 'font-size': 9.5 }));
    svg.appendChild(S('rect', { x: 496, y: y0 + 214, width: panelB - 28, height: 22, rx: 4, fill: 'var(--bad-sf)' }));
    svg.appendChild(S('text', { x: 504, y: y0 + 229, 'font-size': 9.5, 'font-weight': 600, fill: 'var(--bad)',
      'font-family': 'var(--sans)', text: 'nicht durch Justage korrigierbar' }));

    /* Fußzeile: was außerhalb der Optik entsteht */
    svg.appendChild(S('rect', { x: 14, y: 300, width: 692, height: 64, rx: 6,
      fill: 'var(--warn-sf)', stroke: 'var(--warn)', 'stroke-width': 1.2 }));
    svg.appendChild(S('text', { x: 30, y: 320, 'font-size': 10.5, 'font-weight': 600, fill: 'var(--warn)',
      'font-family': 'var(--sans)', text: 'Und eine vierte Größe entsteht gar nicht in Ihrer Baugruppe: Maskeneffekte (Mask 3D)' }));
    svg.appendChild(txt(30, 336, 'Das reflektive Retikel wird schräg beleuchtet; der Absorber hat eine endliche Dicke und wirft dadurch Schatten,',
      { 'font-size': 9.5 }));
    svg.appendChild(txt(30, 350, 'zusätzlich verschiebt er die Phase. Die Wirkung hängt von der Struktur ab und ist durch keine Optikkorrektur behebbar.',
      { 'font-size': 9.5 }));

    svg.appendChild(txt(14, 22, 'Die Pupille trägt nicht nur Phase: bei EUV kommen Amplitude und Untergrund als eigene Fehlerarten hinzu.', { 'font-size': 10 }));

    return svg;
  };
})(window);
