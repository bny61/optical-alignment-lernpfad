/* charts.js — minimale SVG- und Mathe-Helfer. Keine externen Bibliotheken. */
(function (global) {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  /* ---------- DOM ---------- */

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    apply(node, attrs, children);
    return node;
  }

  function svgEl(tag, attrs, children) {
    var node = document.createElementNS(SVG_NS, tag);
    apply(node, attrs, children);
    return node;
  }

  function apply(node, attrs, children) {
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'text') { node.textContent = v; }
      else if (k === 'html') { node.innerHTML = v; }
      else if (k === 'class') { node.setAttribute('class', v); }
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') {
        node.addEventListener(k.slice(2).toLowerCase(), v);
      } else { node.setAttribute(k, v); }
    });
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
  }

  /* ---------- Zahlen ---------- */

  function clamp(x, lo, hi) { return x < lo ? lo : (x > hi ? hi : x); }

  function fmt(x, digits) {
    if (!isFinite(x)) return '—';
    var d = digits === undefined ? 2 : digits;
    return x.toFixed(d);
  }

  /** Lineare Skala von [d0,d1] nach [r0,r1]. */
  function scale(d0, d1, r0, r1) {
    var span = (d1 - d0) || 1;
    var f = function (v) { return r0 + (v - d0) / span * (r1 - r0); };
    f.invert = function (p) { return d0 + (p - r0) / ((r1 - r0) || 1) * span; };
    f.domain = [d0, d1];
    f.range = [r0, r1];
    return f;
  }

  /** Deterministischer PRNG (mulberry32) — reproduzierbare Simulationen. */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /** Standardnormalverteilte Zufallszahl (Box-Muller) aus einem PRNG. */
  function gauss(rand) {
    var u = 1 - rand(), v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function mean(xs) {
    if (!xs.length) return NaN;
    return xs.reduce(function (a, b) { return a + b; }, 0) / xs.length;
  }

  /** Standardabweichung; sample=true → n-1 im Nenner. */
  function stdev(xs, sample) {
    if (xs.length < 2) return 0;
    var m = mean(xs);
    var ss = xs.reduce(function (a, b) { return a + (b - m) * (b - m); }, 0);
    return Math.sqrt(ss / (sample === false ? xs.length : xs.length - 1));
  }

  /** Standardnormale Verteilungsfunktion (Abramowitz–Stegun 7.1.26 über erf). */
  function normCdf(z) {
    var s = z < 0 ? -1 : 1, x = Math.abs(z) / Math.SQRT2;
    var t = 1 / (1 + 0.3275911 * x);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return 0.5 * (1 + s * y);
  }

  /* ---------- Plot-Gerüst ---------- */

  /**
   * Erzeugt ein SVG mit Achsen und liefert Skalen sowie das Wurzelelement zurück.
   * opt: {w,h,pad:{t,r,b,l}, x:[min,max], y:[min,max], xLabel, yLabel, xTicks, yTicks, yFmt}
   */
  function plot(opt) {
    var w = opt.w || 560, h = opt.h || 300;
    var pad = Object.assign({ t: 16, r: 16, b: 38, l: 52 }, opt.pad || {});
    var x = scale(opt.x[0], opt.x[1], pad.l, w - pad.r);
    var y = scale(opt.y[0], opt.y[1], h - pad.b, pad.t);

    var root = svgEl('svg', {
      viewBox: '0 0 ' + w + ' ' + h,
      role: 'img',
      'aria-label': opt.label || 'Diagramm',
      preserveAspectRatio: 'xMidYMid meet'
    });

    var gGrid = svgEl('g', { class: 'grid' });
    var gAxis = svgEl('g', { class: 'axis' });
    root.appendChild(gGrid);
    root.appendChild(gAxis);

    var gridColor = 'var(--border)', textColor = 'var(--text-mute)';

    (opt.xTicks === 0 ? [] : ticks(opt.x[0], opt.x[1], opt.xTicks || 6)).forEach(function (t) {
      var px = x(t);
      gGrid.appendChild(svgEl('line', { x1: px, x2: px, y1: pad.t, y2: h - pad.b, stroke: gridColor, 'stroke-width': 1, opacity: .55 }));
      gAxis.appendChild(svgEl('text', {
        x: px, y: h - pad.b + 15, fill: textColor, 'font-size': 10,
        'text-anchor': 'middle', 'font-family': 'var(--mono)', text: (opt.xFmt || defaultFmt)(t)
      }));
    });

    (opt.yTicks === 0 ? [] : ticks(opt.y[0], opt.y[1], opt.yTicks || 5)).forEach(function (t) {
      var py = y(t);
      gGrid.appendChild(svgEl('line', { x1: pad.l, x2: w - pad.r, y1: py, y2: py, stroke: gridColor, 'stroke-width': 1, opacity: .55 }));
      gAxis.appendChild(svgEl('text', {
        x: pad.l - 7, y: py + 3.5, fill: textColor, 'font-size': 10,
        'text-anchor': 'end', 'font-family': 'var(--mono)', text: (opt.yFmt || defaultFmt)(t)
      }));
    });

    if (opt.xLabel) {
      gAxis.appendChild(svgEl('text', {
        x: (pad.l + w - pad.r) / 2, y: h - 4, fill: textColor, 'font-size': 11,
        'text-anchor': 'middle', text: opt.xLabel
      }));
    }
    if (opt.yLabel) {
      gAxis.appendChild(svgEl('text', {
        x: 12, y: (pad.t + h - pad.b) / 2, fill: textColor, 'font-size': 11, 'text-anchor': 'middle',
        transform: 'rotate(-90 12 ' + ((pad.t + h - pad.b) / 2) + ')', text: opt.yLabel
      }));
    }

    var layer = svgEl('g', { class: 'series' });
    root.appendChild(layer);
    return { svg: root, x: x, y: y, layer: layer, w: w, h: h, pad: pad };
  }

  function defaultFmt(t) {
    var a = Math.abs(t);
    if (a >= 1000) return String(Math.round(t));
    if (a >= 10) return t.toFixed(0);
    if (a >= 1) return t.toFixed(1);
    return t.toFixed(2);
  }

  /** „Schöne" Tick-Werte im Intervall [lo,hi]. */
  function ticks(lo, hi, count) {
    var span = hi - lo;
    if (span <= 0) return [lo];
    var raw = span / Math.max(1, count);
    var mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10));
    var norm = raw / mag;
    var step = (norm >= 5 ? 10 : norm >= 2 ? 5 : norm >= 1 ? 2 : 1) * mag;
    var out = [], t = Math.ceil(lo / step) * step;
    for (; t <= hi + step * 1e-9; t += step) out.push(Math.abs(t) < step * 1e-9 ? 0 : t);
    return out;
  }

  /** Linienzug aus Datenpunkten [{x,y}]. */
  function line(sc, pts, attrs) {
    var d = pts.map(function (p, i) {
      return (i ? 'L' : 'M') + sc.x(p.x).toFixed(2) + ' ' + sc.y(p.y).toFixed(2);
    }).join(' ');
    return svgEl('path', Object.assign({
      d: d, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1.8,
      'stroke-linejoin': 'round', 'stroke-linecap': 'round'
    }, attrs || {}));
  }

  /** Horizontale Referenzlinie mit Beschriftung. */
  function hline(sc, yVal, label, attrs) {
    var g = svgEl('g');
    var py = sc.y(yVal);
    g.appendChild(svgEl('line', Object.assign({
      x1: sc.pad.l, x2: sc.w - sc.pad.r, y1: py, y2: py,
      stroke: 'var(--text-mute)', 'stroke-width': 1, 'stroke-dasharray': '4 3'
    }, attrs || {})));
    if (label) {
      g.appendChild(svgEl('text', {
        x: sc.w - sc.pad.r - 2, y: py - 4, 'text-anchor': 'end', 'font-size': 10,
        'font-family': 'var(--mono)', fill: (attrs && attrs.stroke) || 'var(--text-mute)', text: label
      }));
    }
    return g;
  }

  function dot(sc, p, attrs) {
    return svgEl('circle', Object.assign({
      cx: sc.x(p.x), cy: sc.y(p.y), r: 3, fill: 'var(--accent)'
    }, attrs || {}));
  }

  /* ---------- UI-Bausteine für Simulatoren ---------- */

  /**
   * Slider mit Live-Wertanzeige.
   * cfg: {label, min, max, step, value, unit, hint, format(v)->string}
   */
  function slider(cfg, onChange) {
    var val = el('span', { class: 'ctrl-val' });
    var input = el('input', {
      type: 'range', min: cfg.min, max: cfg.max, step: cfg.step,
      value: cfg.value, 'aria-label': cfg.label
    });
    var format = cfg.format || function (v) { return fmt(v, cfg.digits === undefined ? 2 : cfg.digits) + (cfg.unit ? ' ' + cfg.unit : ''); };
    function sync() { val.textContent = format(parseFloat(input.value)); }
    input.addEventListener('input', function () { sync(); onChange(parseFloat(input.value)); });
    sync();
    var wrap = el('div', { class: 'ctrl' }, [
      el('label', {}, [el('span', { text: cfg.label }), val]),
      input,
      cfg.hint ? el('div', { class: 'ctrl-hint', text: cfg.hint }) : null
    ]);
    wrap.reset = function (v) { input.value = v; sync(); };
    return wrap;
  }

  /** Auswahlfeld. options: [{value,label}] */
  function select(cfg, onChange) {
    var sel = el('select', { 'aria-label': cfg.label });
    cfg.options.forEach(function (o) {
      sel.appendChild(el('option', { value: o.value, text: o.label, selected: o.value === cfg.value }));
    });
    sel.addEventListener('change', function () { onChange(sel.value); });
    return el('div', { class: 'ctrl' }, [
      el('label', {}, [el('span', { text: cfg.label })]),
      sel,
      cfg.hint ? el('div', { class: 'ctrl-hint', text: cfg.hint }) : null
    ]);
  }

  /** Kennzahlen-Kachel; setValue(text, status) aktualisiert sie. */
  function readout(label) {
    var v = el('div', { class: 'r-value', text: '—' });
    var box = el('div', { class: 'readout' }, [el('div', { class: 'r-label', text: label }), v]);
    box.set = function (text, status) {
      v.textContent = text;
      box.className = 'readout' + (status ? ' ' + status : '');
    };
    return box;
  }

  global.CH = {
    el: el, svgEl: svgEl, clamp: clamp, fmt: fmt, scale: scale, rng: rng, gauss: gauss,
    mean: mean, stdev: stdev, normCdf: normCdf, plot: plot, ticks: ticks,
    line: line, hline: hline, dot: dot, slider: slider, select: select, readout: readout
  };
})(window);
