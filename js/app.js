/* app.js — Bootstrap: Navigation, Fortschritt (localStorage), Routing */
(function (global) {
  'use strict';
  var CH = global.CH;
  var KEY = 'oa-progress';

  var module = (global.APP_DATA && global.APP_DATA.module) || [];
  var glossarDaten = (global.APP_DATA && global.APP_DATA.glossar) || [];

  var ctx = {
    module: module,
    glossar: glossarDaten,
    kompakt: (global.APP_DATA && global.APP_DATA.kompakt) || null,
    fortschritt: laden(),
    speichern: speichern
  };

  function laden() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }

  function speichern(id, score, total) {
    ctx.fortschritt[id] = { score: score, total: total, ts: Date.now() };
    try { localStorage.setItem(KEY, JSON.stringify(ctx.fortschritt)); } catch (e) { /* z. B. Privatmodus */ }
    zeichneNav();
    zeichneFortschritt();
  }

  /* ---------- Navigation ---------- */

  var navList = document.getElementById('nav-list');
  var content = document.getElementById('content');

  function zeichneNav() {
    var route = global.Router.parse(location.hash);
    navList.innerHTML = '';

    navList.appendChild(CH.el('li', {}, [
      CH.el('a', { href: '#/', class: route.view === 'home' ? 'active' : '' }, [
        CH.el('span', { class: 'nav-num', text: '◆' }),
        CH.el('span', { text: 'Übersicht' })
      ])
    ]));

    navList.appendChild(CH.el('li', { class: 'nav-sep', text: 'Module' }));
    module.forEach(function (m) {
      var aktiv = route.view === 'modul' && route.id === m.id;
      var done = ctx.fortschritt[m.id];
      navList.appendChild(CH.el('li', {}, [
        CH.el('a', { href: '#/modul/' + m.id, class: aktiv ? 'active' : '' }, [
          CH.el('span', { class: 'nav-num', text: m.nr === 0 ? '·' : String(m.nr) }),
          CH.el('span', { text: m.titel }),
          done ? CH.el('span', { class: 'nav-done', text: '✓' }) : null
        ])
      ]));
    });

    navList.appendChild(CH.el('li', { class: 'nav-sep', text: 'Referenz' }));
    navList.appendChild(CH.el('li', {}, [
      CH.el('a', { href: '#/kompakt', class: route.view === 'kompakt' ? 'active' : '' }, [
        CH.el('span', { class: 'nav-num', text: '★' }),
        CH.el('span', { text: 'Kompaktübersicht' })
      ])
    ]));
    navList.appendChild(CH.el('li', {}, [
      CH.el('a', { href: '#/glossar', class: route.view === 'glossar' ? 'active' : '' }, [
        CH.el('span', { class: 'nav-num', text: '§' }),
        CH.el('span', { text: 'Glossar' })
      ])
    ]));
  }

  function zeichneFortschritt() {
    var fertig = module.filter(function (m) { return ctx.fortschritt[m.id]; }).length;
    var pct = module.length ? Math.round(fertig / module.length * 100) : 0;
    document.getElementById('progress-label').textContent = fertig + ' / ' + module.length;
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-bar-outer').setAttribute('aria-valuenow', String(pct));
  }

  /* ---------- Routing ---------- */

  function route(r) {
    content.innerHTML = '';
    var view;
    if (r.view === 'modul') {
      var m = module.filter(function (x) { return x.id === r.id; })[0];
      view = m ? global.Views.modul(m, ctx) : CH.el('div', {}, [
        CH.el('h1', { text: 'Modul nicht gefunden' }),
        CH.el('p', {}, [CH.el('a', { href: '#/', text: 'Zurück zur Übersicht' })])
      ]);
      document.title = (m ? m.titel : 'Nicht gefunden') + ' — Optical Alignment';
    } else if (r.view === 'kompakt') {
      view = global.Views.kompakt(ctx);
      document.title = 'Kompaktübersicht — Optical Alignment';
    } else if (r.view === 'glossar') {
      view = global.Views.glossar(ctx, r.query.t || '');
      document.title = 'Glossar — Optical Alignment';
    } else {
      view = global.Views.home(ctx);
      document.title = 'Optical Alignment — Lernpfad Prozessingenieur Justage';
    }
    content.appendChild(view);
    content.scrollTop = 0;
    global.scrollTo(0, 0);
    document.body.classList.remove('nav-open');
    zeichneNav();
  }

  /* ---------- Start ---------- */

  document.getElementById('nav-toggle').addEventListener('click', function () {
    var offen = document.body.classList.toggle('nav-open');
    this.setAttribute('aria-expanded', String(offen));
  });

  document.getElementById('reset-progress').addEventListener('click', function () {
    ctx.fortschritt = {};
    try { localStorage.removeItem(KEY); } catch (e) { /* ignorieren */ }
    zeichneNav();
    zeichneFortschritt();
    route(global.Router.parse(location.hash));
  });

  if (!module.length) {
    content.appendChild(CH.el('div', { class: 'callout warn', html:
      '<strong>Keine Inhalte geladen</strong>Die Datei <code>data/modules.js</code> konnte nicht ausgewertet werden. ' +
      'Prüfen Sie die Browser-Konsole.' }));
  } else {
    zeichneFortschritt();
    global.Router.start(route);
  }
})(window);
