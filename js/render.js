/* render.js — Seitenaufbau: Startseite, Modulseite, Glossar */
(function (global) {
  'use strict';
  var CH = global.CH;

  function abschnitt(a) {
    var box = CH.el('section');
    if (a.h) box.appendChild(CH.el('h2', { text: a.h }));
    (a.p || []).forEach(function (t) { box.appendChild(CH.el('p', { html: t })); });
    if (a.bullets) {
      box.appendChild(CH.el('ul', { class: 'bullets' }, a.bullets.map(function (b) {
        return CH.el('li', { html: b });
      })));
    }
    if (a.formel) box.appendChild(CH.el('div', { class: 'formula', html: a.formel }));
    if (a.grafik && global.FIGS[a.grafik]) {
      var fig = CH.el('figure', { class: 'figure' });
      var canvas = CH.el('div', { class: 'figure-canvas' });
      try {
        canvas.appendChild(global.FIGS[a.grafik]());
      } catch (e) {
        canvas.appendChild(CH.el('p', { class: 'note-sim', text: 'Skizze konnte nicht gezeichnet werden: ' + e.message }));
      }
      fig.appendChild(canvas);
      if (a.grafikText) fig.appendChild(CH.el('figcaption', { html: a.grafikText }));
      box.appendChild(fig);
    }
    if (a.tabelle) box.appendChild(tabelle(a.tabelle));
    if (a.sim && global.SIMS[a.sim]) {
      if (a.simTitel) box.appendChild(CH.el('h3', { text: a.simTitel }));
      if (a.simIntro) box.appendChild(CH.el('p', { html: a.simIntro }));
      var inline = CH.el('div');
      try {
        global.SIMS[a.sim](inline);
      } catch (e) {
        inline.appendChild(CH.el('div', { class: 'callout warn', text: 'Simulation konnte nicht geladen werden: ' + e.message }));
      }
      box.appendChild(inline);
    }
    if (a.callout) {
      box.appendChild(CH.el('div', { class: 'callout ' + (a.callout.typ || ''), html:
        (a.callout.titel ? '<strong>' + a.callout.titel + '</strong>' : '') + a.callout.text }));
    }
    if (a.karten) {
      a.karten.forEach(function (k) {
        box.appendChild(CH.el('div', { class: 'card' }, [
          CH.el('div', { class: 'card-title', text: k.titel }),
          CH.el('div', { style: 'font-size:.92rem', html: k.text })
        ]));
      });
    }
    return box;
  }

  function tabelle(t) {
    var tbl = CH.el('table', { class: 'data' });
    tbl.appendChild(CH.el('thead', {}, [
      CH.el('tr', {}, t.kopf.map(function (h) { return CH.el('th', { text: h }); }))
    ]));
    tbl.appendChild(CH.el('tbody', {}, t.zeilen.map(function (z) {
      return CH.el('tr', {}, z.map(function (c, i) {
        return CH.el('td', { class: (t.num && t.num.indexOf(i) >= 0) ? 'num' : '', html: String(c) });
      }));
    })));
    if (t.fuss) tbl.appendChild(CH.el('caption', { style: 'caption-side:bottom;text-align:left;font-size:.8rem;color:var(--text-mute);padding-top:.5rem', text: t.fuss }));
    return CH.el('div', { class: 'table-wrap' }, [tbl]);
  }

  /* ---------- Startseite ---------- */

  function home(ctx) {
    var module = ctx.module, fortschritt = ctx.fortschritt;
    var root = CH.el('div');

    root.appendChild(CH.el('div', { class: 'eyebrow', text: 'Lernpfad · Optikmontage und Justage' }));
    root.appendChild(CH.el('h1', { text: 'Prozessingenieur Optische Justage — die tägliche Arbeit verstehen' }));
    root.appendChild(CH.el('p', { class: 'lead', html:
      'Eine Einordnung in das Lithografiesystem und sieben Module entlang der täglichen Aufgaben dieser Rolle: von der Physik der Justage — refraktiv wie reflektiv — über Messtechnik und ' +
      'Prozessstabilität bis zu Wertstrom, Reklamationsbearbeitung und Serienanlauf. ' +
      'Jedes Modul hat einen Erklärteil, eine interaktive Simulation und ein Quiz.' }));

    root.appendChild(CH.el('div', { class: 'callout job', html:
      '<strong>Die Rolle in vier Sätzen</strong>' +
      'Fertigungsprozesse von High-End-Lithografieoptiken analysieren und Verbesserungen für Qualität, ' +
      'Prozessstabilität und Kosten durchsetzen. Technische Verantwortung für komplette Wertstromabschnitte in ' +
      'Objektiv-/Optikmontage und Justage. Anlauf neuer Produkte begleiten und Entwicklungsergebnisse mit R&amp;D abstimmen. ' +
      'Kundenreklamationen technisch bewerten und mit 8D bzw. Six Sigma abarbeiten.' }));

    root.appendChild(CH.el('h2', { text: 'Module' }));
    var cards = CH.el('div', { class: 'module-cards' });
    module.forEach(function (m) {
      var done = fortschritt[m.id];
      cards.appendChild(CH.el('a', { class: 'module-card', href: '#/modul/' + m.id }, [
        CH.el('div', { class: 'mc-head' }, [
          CH.el('span', { class: 'mc-num', text: m.nr === 0 ? 'Einordnung' : 'Modul ' + m.nr }),
          done ? CH.el('span', { class: 'badge ok', text: done.score + '/' + done.total }) : null
        ]),
        CH.el('h3', { text: m.titel }),
        CH.el('p', { text: m.kurz })
      ]));
    });
    root.appendChild(cards);

    root.appendChild(CH.el('h2', { text: 'Empfohlene Reihenfolge' }));
    root.appendChild(CH.el('p', { html:
      'Die Einordnung erklärt, wozu die Optik gebaut wird und warum die Toleranzen so eng sind — sie beantwortet das Warum hinter allem Folgenden. ' +
      'Modul 1 entwickelt die Justage am refraktiven Fall, Modul 2 überträgt sie auf das reflektive EUV-System; beide zusammen bilden die physikalische Basis. ' +
      'Modul 3 stellt sicher, dass die Messdaten tragen, ohne die Modul 4 nicht interpretierbar ist. ' +
      'Module 4 und 5 sind der Alltag der Rolle, Module 6 und 7 die beiden Ausnahmesituationen: Reklamation (rückwärts) und Anlauf (vorwärts). ' +
      'Rechnen Sie mit 30–45 Minuten je Modul, wenn Sie die Simulationen wirklich durchspielen.' }));

    root.appendChild(CH.el('div', { class: 'callout ok', html:
      '<strong>Wenig Zeit?</strong>' +
      'Die <a href="#/kompakt">Kompaktübersicht</a> fasst alles auf einer Seite zusammen: die zwölf tragenden Sätze, ' +
      'eine Diagnosetabelle von der Messung zur Ursache, alle Formeln, die Kennzahlen mit ihren Grenzwerten, ' +
      'die häufigsten Fehlschlüsse — und Fragen zum Selbsttest. Auch zum Ausdrucken geeignet.' }));

    root.appendChild(CH.el('div', { class: 'callout warn', html:
      '<strong>Was diese Seite nicht ist</strong>' +
      'Alle Zahlen, Fälle und Kopplungsfaktoren sind didaktisch konstruiert und größenordnungsplausibel gewählt. ' +
      'Sie stammen aus keinem realen Fertigungsbetrieb. Ziel ist, die Denkweise und Fachsprache der Rolle zu trainieren — ' +
      'nicht, ein konkretes System nachzurechnen.' }));

    return root;
  }

  /* ---------- Modulseite ---------- */

  function modul(m, ctx) {
    var root = CH.el('div');
    var idx = ctx.module.indexOf(m);

    root.appendChild(CH.el('div', { class: 'eyebrow', text: m.nr === 0
      ? 'Einordnung · Grundlage für alle Module'
      : 'Modul ' + m.nr + ' von ' + (ctx.module.length - 1) }));
    root.appendChild(CH.el('h1', { text: m.titel }));
    root.appendChild(CH.el('p', { class: 'lead', html: m.ziel }));
    root.appendChild(CH.el('div', { class: 'callout job', html:
      '<strong>Warum das in dieser Rolle zählt</strong>' + m.jobBezug }));

    m.abschnitte.forEach(function (a) { root.appendChild(abschnitt(a)); });

    if (m.sim && global.SIMS[m.sim]) {
      root.appendChild(CH.el('h2', { text: m.simTitel || 'Interaktive Übung' }));
      if (m.simIntro) root.appendChild(CH.el('p', { html: m.simIntro }));
      var simBox = CH.el('div');
      try {
        global.SIMS[m.sim](simBox);
      } catch (e) {
        simBox.appendChild(CH.el('div', { class: 'callout warn', text: 'Simulation konnte nicht geladen werden: ' + e.message }));
      }
      root.appendChild(simBox);
    }

    if (m.begriffe && m.begriffe.length) {
      root.appendChild(CH.el('h2', { text: 'Begriffe aus diesem Modul' }));
      var chips = CH.el('div', { class: 'chips' });
      m.begriffe.forEach(function (b) {
        chips.appendChild(CH.el('a', { class: 'chip', href: '#/glossar?t=' + encodeURIComponent(b), text: b }));
      });
      root.appendChild(chips);
    }

    if (m.quiz && m.quiz.length) {
      root.appendChild(CH.el('h2', { text: 'Selbsttest' }));
      root.appendChild(global.Quiz.render(m.quiz, function (score, total) {
        ctx.speichern(m.id, score, total);
      }));
      var alt = ctx.fortschritt[m.id];
      if (alt) {
        root.appendChild(CH.el('p', { style: 'font-size:.83rem;color:var(--text-mute);margin-top:.6rem',
          text: 'Letzter Versuch: ' + alt.score + ' / ' + alt.total }));
      }
    }

    var prev = ctx.module[idx - 1], next = ctx.module[idx + 1];
    root.appendChild(CH.el('div', { class: 'pager' }, [
      prev ? CH.el('a', { class: 'btn', href: '#/modul/' + prev.id, text: '← ' + prev.titel })
           : CH.el('a', { class: 'btn', href: '#/', text: '← Übersicht' }),
      next ? CH.el('a', { class: 'btn btn-primary', href: '#/modul/' + next.id, text: next.titel + ' →' })
           : CH.el('a', { class: 'btn btn-primary', href: '#/glossar', text: 'Glossar →' })
    ]));

    return root;
  }

  /* ---------- Glossar ---------- */

  function glossar(ctx, filter) {
    var root = CH.el('div');
    root.appendChild(CH.el('div', { class: 'eyebrow', text: 'Nachschlagen' }));
    root.appendChild(CH.el('h1', { text: 'Glossar' }));
    root.appendChild(CH.el('p', { class: 'lead', text:
      'Deutsche Fachbegriffe mit englischer Entsprechung — die Arbeitssprache der Rolle ist Deutsch, ' +
      'Dokumentation und Kundenkommunikation laufen häufig auf Englisch.' }));

    var liste = CH.el('div');
    var suche = CH.el('input', { class: 'glossary-search', type: 'search',
      placeholder: 'Begriff suchen (deutsch oder englisch) …', value: filter || '' });
    suche.addEventListener('input', function () { zeichne(suche.value); });

    function zeichne(q) {
      var s = (q || '').trim().toLowerCase();
      liste.innerHTML = '';
      var treffer = ctx.glossar.filter(function (g) {
        return !s || g.de.toLowerCase().indexOf(s) >= 0 || g.en.toLowerCase().indexOf(s) >= 0 ||
               g.def.toLowerCase().indexOf(s) >= 0;
      });
      if (!treffer.length) {
        liste.appendChild(CH.el('p', { style: 'margin-top:1rem;color:var(--text-mute)', text: 'Kein Treffer.' }));
        return;
      }
      treffer.forEach(function (g) {
        liste.appendChild(CH.el('div', { class: 'gl-entry' }, [
          CH.el('div', {}, [
            CH.el('span', { class: 'gl-term', text: g.de }),
            CH.el('span', { class: 'gl-en', text: g.en })
          ]),
          CH.el('div', { class: 'gl-def', html: g.def })
        ]));
      });
    }

    root.appendChild(suche);
    root.appendChild(liste);
    zeichne(filter);
    return root;
  }

  /* ---------- Kompaktübersicht ---------- */

  function kompakt(ctx) {
    var daten = ctx.kompakt;
    var root = CH.el('div', { class: 'kompakt' });
    root.appendChild(CH.el('div', { class: 'eyebrow', text: 'Referenz · zum Wiederholen und Ausdrucken' }));
    root.appendChild(CH.el('h1', { text: 'Kompaktübersicht Optical Alignment' }));
    if (!daten) {
      root.appendChild(CH.el('p', { class: 'lead', text: 'Inhalte konnten nicht geladen werden.' }));
      return root;
    }
    root.appendChild(CH.el('p', { class: 'lead', html: daten.lead }));
    root.appendChild(CH.el('button', {
      class: 'btn btn-sm no-print', style: 'margin-top:1rem',
      text: 'Diese Seite drucken', onclick: function () { global.print(); }
    }));
    daten.abschnitte.forEach(function (a) { root.appendChild(abschnitt(a)); });
    root.appendChild(CH.el('div', { class: 'pager no-print' }, [
      CH.el('a', { class: 'btn', href: '#/glossar', text: '← Glossar' }),
      CH.el('a', { class: 'btn btn-primary', href: '#/', text: 'Zur Übersicht →' })
    ]));
    return root;
  }

  global.Views = { home: home, modul: modul, glossar: glossar, kompakt: kompakt };
})(window);
