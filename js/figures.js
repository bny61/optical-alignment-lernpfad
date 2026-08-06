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
      'aus Modul 4.'
    ].forEach(function (z, i) {
      if (z) svg.appendChild(txt(436, 220 + i * 12, z, { 'font-size': 9.5 }));
    });
    svg.appendChild(S('path', {
      d: 'M418 244 L336 244', fill: 'none', stroke: 'var(--ok)',
      'stroke-width': 1.4, 'marker-end': 'url(#fig-arrow)'
    }));

    // Kennzahlen rechts oben
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
})(window);
