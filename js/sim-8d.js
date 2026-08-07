/* sim-8d.js — geführter 8D-Durchlauf über einen Reklamationsfall aus data/cases.js */
(function (global) {
  'use strict';
  var CH = global.CH;
  var SIMS = global.SIMS = global.SIMS || {};

  SIMS.achtd = function (root) {
    var fall = (global.APP_DATA && global.APP_DATA.cases && global.APP_DATA.cases.koma) || null;
    if (!fall) {
      root.appendChild(CH.el('p', { class: 'note-sim', text: 'Fallbeispiel konnte nicht geladen werden.' }));
      return;
    }

    var aktiv = 0;
    var status = fall.schritte.map(function () { return null; }); // null | 'ok' | 'fehler'

    // Optionen einmal je Sitzung mischen, damit die richtige Antwort nicht immer an derselben Stelle steht
    var optionen = fall.schritte.map(function (s) {
      var a = s.optionen.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    });

    var tabs = CH.el('div', { class: 'steps' });
    var body = CH.el('div', { class: 'step-body' });

    function renderTabs() {
      tabs.innerHTML = '';
      fall.schritte.forEach(function (s, i) {
        tabs.appendChild(CH.el('button', {
          class: 'step-tab' + (i === aktiv ? ' active' : '') + (status[i] === 'ok' ? ' done' : ''),
          text: s.id + (status[i] === 'ok' ? ' ✓' : ''),
          title: s.name,
          onclick: function () { aktiv = i; render(); }
        }));
      });
    }

    function render() {
      renderTabs();
      var s = fall.schritte[aktiv];
      var opt = optionen[aktiv];
      body.innerHTML = '';

      body.appendChild(CH.el('div', { class: 'eyebrow', text: s.id + ' · ' + s.name }));
      body.appendChild(CH.el('h3', { text: s.ziel, style: 'margin-top:.2rem' }));
      body.appendChild(CH.el('p', { html: s.lage }));

      if (s.tabelle) body.appendChild(tabelle(s.tabelle));

      body.appendChild(CH.el('div', { class: 'q', style: 'margin-top:1.4rem' }, [
        CH.el('div', { class: 'q-text', text: s.frage })
      ]));

      var opts = CH.el('div', { class: 'q-opts' });
      var expl = CH.el('div');
      var beantwortet = status[aktiv] !== null;

      opt.forEach(function (o, i) {
        var btn = CH.el('button', { class: 'q-opt', onclick: function () { waehle(i); } }, [
          CH.el('span', { class: 'opt-key', text: String.fromCharCode(65 + i) }),
          CH.el('span', { text: o.text })
        ]);
        opts.appendChild(btn);
      });
      body.appendChild(opts);
      body.appendChild(expl);

      function waehle(i) {
        var o = opt[i];
        status[aktiv] = o.ok ? 'ok' : 'fehler';
        Array.prototype.forEach.call(opts.children, function (btn, j) {
          btn.disabled = true;
          if (j === i) btn.classList.add(opt[j].ok ? 'correct' : 'wrong');
          else if (opt[j].ok) btn.classList.add('correct');
        });
        expl.innerHTML = '';
        expl.appendChild(CH.el('div', { class: 'q-expl', html:
          '<strong>' + (o.ok ? 'Richtig. ' : 'Nicht optimal. ') + '</strong>' + o.feedback }));
        if (s.merksatz) {
          expl.appendChild(CH.el('div', { class: 'callout', style: 'margin-top:.7rem', html:
            '<strong>Merksatz</strong>' + s.merksatz }));
        }
        renderTabs();
        nav();
      }

      if (beantwortet) {
        // Beim Zurückblättern die bereits gegebene Antwort wieder anzeigen
        var richtige = opt.findIndex(function (o) { return o.ok; });
        Array.prototype.forEach.call(opts.children, function (btn, j) {
          btn.disabled = true;
          if (opt[j].ok) btn.classList.add('correct');
        });
        expl.appendChild(CH.el('div', { class: 'q-expl', html: opt[richtige].feedback }));
        if (s.merksatz) {
          expl.appendChild(CH.el('div', { class: 'callout', style: 'margin-top:.7rem', html:
            '<strong>Merksatz</strong>' + s.merksatz }));
        }
      }

      nav();

      function nav() {
        var alt = body.querySelector('.step-nav');
        if (alt) alt.remove();
        var offen = status.filter(function (x) { return x === 'ok'; }).length;
        body.appendChild(CH.el('div', { class: 'step-nav' }, [
          CH.el('button', { class: 'btn btn-sm', text: '← ' + (aktiv > 0 ? fall.schritte[aktiv - 1].id : 'Anfang'),
            disabled: aktiv === 0, onclick: function () { aktiv = Math.max(0, aktiv - 1); render(); } }),
          CH.el('button', { class: 'btn btn-sm btn-primary',
            text: aktiv < fall.schritte.length - 1 ? fall.schritte[aktiv + 1].id + ' →' : 'Abgeschlossen',
            disabled: aktiv === fall.schritte.length - 1,
            onclick: function () { aktiv = Math.min(fall.schritte.length - 1, aktiv + 1); render(); } }),
          CH.el('span', { class: 'badge' + (offen === fall.schritte.length ? ' ok' : ''),
            style: 'align-self:center;margin-left:auto',
            text: offen + ' / ' + fall.schritte.length + ' Schritte korrekt' })
        ]));
      }
    }

    function tabelle(t) {
      var wrap = CH.el('div', { class: 'table-wrap' });
      var tbl = CH.el('table', { class: 'data' });
      var thead = CH.el('thead');
      thead.appendChild(CH.el('tr', {}, t.kopf.map(function (h) { return CH.el('th', { text: h }); })));
      var tbody = CH.el('tbody');
      t.zeilen.forEach(function (z) {
        tbody.appendChild(CH.el('tr', {}, z.map(function (c, i) {
          return CH.el('td', { class: i > 0 ? 'num' : '', text: String(c) });
        })));
      });
      tbl.appendChild(thead); tbl.appendChild(tbody);
      wrap.appendChild(tbl);
      return wrap;
    }

    root.appendChild(CH.el('div', { class: 'sim' }, [
      CH.el('div', { class: 'card' }, [
        CH.el('div', { class: 'card-title', text: fall.titel }),
        CH.el('p', { style: 'margin-top:.3rem;font-size:.9rem', html: fall.meldung })
      ]),
      tabs,
      body,
      CH.el('p', { class: 'note-sim', html:
        'Der Fall ist konstruiert, orientiert sich aber an typischen Reklamationsmustern in der Optikmontage. ' +
        'Entscheidend ist nicht die Formulierung, sondern die Reihenfolge: erst absichern, dann verstehen, dann abstellen, dann nachweisen.'
      })
    ]));

    render();
  };
})(window);
