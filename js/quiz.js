/* quiz.js — Multiple-Choice-Quiz je Modul mit Auswertung */
(function (global) {
  'use strict';
  var CH = global.CH;

  /** Fisher-Yates auf einer Kopie — verhindert, dass die richtige Antwort immer an derselben Stelle steht. */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /**
   * Rendert ein Quiz.
   * fragen: [{frage, optionen:[string], richtig:index, erklaerung}]
   * onComplete(score, total) wird aufgerufen, sobald alle Fragen beantwortet sind.
   */
  function renderQuiz(fragen, onComplete) {
    var antworten = new Array(fragen.length).fill(null);
    var richtigIdx = new Array(fragen.length).fill(null); // nach dem Mischen
    var wrap = CH.el('div', { class: 'quiz' });
    var ergebnis = CH.el('div');

    fragen.forEach(function (f0, qi) {
      // Optionen mischen und den Index der richtigen Antwort mitführen
      var gemischt = shuffle(f0.optionen.map(function (text, i) {
        return { text: text, war: i };
      }));
      var f = {
        frage: f0.frage,
        optionen: gemischt.map(function (o) { return o.text; }),
        richtig: gemischt.findIndex(function (o) { return o.war === f0.richtig; }),
        erklaerung: f0.erklaerung
      };
      richtigIdx[qi] = f.richtig;

      var opts = CH.el('div', { class: 'q-opts' });
      var expl = CH.el('div');

      f.optionen.forEach(function (text, oi) {
        opts.appendChild(CH.el('button', {
          class: 'q-opt',
          onclick: function () { antwort(qi, oi, opts, expl, f); }
        }, [
          CH.el('span', { class: 'opt-key', text: String.fromCharCode(65 + oi) }),
          CH.el('span', { text: text })
        ]));
      });

      wrap.appendChild(CH.el('div', { class: 'q' }, [
        CH.el('div', { class: 'q-text', text: (qi + 1) + '. ' + f.frage }),
        opts, expl
      ]));
    });

    function antwort(qi, oi, opts, expl, f) {
      if (antworten[qi] !== null) return;
      antworten[qi] = oi;
      Array.prototype.forEach.call(opts.children, function (btn, j) {
        btn.disabled = true;
        if (j === f.richtig) btn.classList.add('correct');
        else if (j === oi) btn.classList.add('wrong');
      });
      expl.appendChild(CH.el('div', { class: 'q-expl', html:
        '<strong>' + (oi === f.richtig ? 'Richtig. ' : 'Falsch. ') + '</strong>' + f.erklaerung }));
      pruefeFertig();
    }

    function pruefeFertig() {
      if (antworten.some(function (a) { return a === null; })) return;
      var score = antworten.filter(function (a, i) { return a === richtigIdx[i]; }).length;
      var quote = score / fragen.length;
      ergebnis.innerHTML = '';
      ergebnis.appendChild(CH.el('div', { class: 'quiz-result' }, [
        CH.el('span', { class: 'quiz-score', text: score + ' / ' + fragen.length + ' richtig' }),
        CH.el('span', {
          class: 'badge ' + (quote >= .8 ? 'ok' : quote >= .5 ? 'warn' : 'bad'),
          text: quote >= .8 ? 'Modul sitzt' : quote >= .5 ? 'Grundlagen da — Abschnitte nochmal lesen' : 'Modul wiederholen'
        })
      ]));
      if (onComplete) onComplete(score, fragen.length);
    }

    wrap.appendChild(ergebnis);
    return wrap;
  }

  global.Quiz = { render: renderQuiz };
})(window);
