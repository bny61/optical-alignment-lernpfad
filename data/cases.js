/* cases.js — Fallbeispiele für den geführten 8D-Durchlauf */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.cases = {
  koma: {
    titel: 'Reklamation R-2417 — erhöhter Koma-Anteil an Objektivmodul OM-320',
    meldung:
      'Der Kunde meldet, dass bei der Systemintegration an vier von elf gelieferten Modulen der Baureihe OM-320 ' +
      'der Koma-Anteil (Z7/Z8) über der zulässigen Grenze von 8 mλ liegt. Die Module tragen unser Endprüfprotokoll ' +
      'mit Werten zwischen 3 und 6 mλ. Der Kunde stoppt die Integration und fordert eine Stellungnahme innerhalb von 48 Stunden.',

    schritte: [
      {
        id: 'D1', name: 'Team',
        ziel: 'Ein arbeitsfähiges Team mit der richtigen Kompetenz zusammenstellen',
        lage:
          'Sie sind Frontline-Prozessingenieur für den Wertstromabschnitt Justage. Die Meldung landet Freitagmittag ' +
          'bei Ihnen. Der Fertigungsleiter drängt darauf, „schnell etwas an den Kunden zu schicken".',
        frage: 'Wie stellen Sie das 8D-Team auf?',
        optionen: [
          { text: 'Fertigungsleiter, Qualitätsingenieur und Vertrieb — die Entscheider, damit die Antwort schnell freigegeben ist.',
            ok: false,
            feedback: 'Ein Team aus Entscheidern ohne Prozesskenntnis produziert eine schnelle, aber unbelegte Antwort. Der 8D-Prozess braucht in D4 Leute, die den Prozess tatsächlich ausführen.' },
          { text: 'Justage-Werker der betroffenen Schichten, Messtechniker der Endprüfung, Konstrukteur der Fassung, Qualitätsingenieur — moderiert von Ihnen, mit benanntem Champion.',
            ok: true,
            feedback: 'Cross-funktional, prozessnah, mit klarer Moderation und einem Champion, der Ressourcen freigibt. Die Werker der betroffenen Schichten sind die einzigen, die Abweichungen im Ablauf berichten können.' },
          { text: 'Sie bearbeiten den Fall zunächst allein und ziehen andere hinzu, sobald Sie eine Hypothese haben.',
            ok: false,
            feedback: 'Verlockend, weil schnell — aber die Hypothese wird dann durch Ihre Perspektive begrenzt. Die entscheidenden Hinweise (geänderte Aufspannung, neue Charge, andere Schicht) kommen typischerweise aus der Fertigung selbst.' }
        ],
        merksatz: 'D1 entscheidet die Qualität von D4. Wer in D1 nur Entscheider einlädt, findet in D4 nur Symptome.'
      },

      {
        id: 'D2', name: 'Problembeschreibung',
        ziel: 'Das Problem faktenbasiert und abgegrenzt beschreiben',
        lage:
          'Sie ziehen die Endprüfdaten der Baureihe aus den letzten sechs Wochen und vergleichen sie mit den ' +
          'Kundenmessungen der reklamierten Module.',
        tabelle: {
          kopf: ['Modul', 'KW', 'Koma intern [mλ]', 'Koma Kunde [mλ]', 'Δ'],
          zeilen: [
            ['OM-320-041', '17', '4.1', '4.4', '+0.3'],
            ['OM-320-042', '17', '3.6', '4.0', '+0.4'],
            ['OM-320-046', '19', '5.2', '9.8', '+4.6'],
            ['OM-320-047', '19', '4.8', '11.2', '+6.4'],
            ['OM-320-049', '20', '6.0', '10.5', '+4.5'],
            ['OM-320-051', '21', '5.5', '9.1', '+3.6'],
            ['OM-320-052', '21', '4.2', '4.6', '+0.4']
          ]
        },
        frage: 'Welche Problembeschreibung ist tragfähig?',
        optionen: [
          { text: '„Die Koma-Werte der Baureihe OM-320 sind zu hoch."',
            ok: false,
            feedback: 'Zu unscharf. Die internen Werte liegen bei allen Modulen in der Spezifikation — das Problem ist nicht das Niveau, sondern die Abweichung zwischen unserer und der Kundenmessung.' },
          { text: '„Ab KW 19 zeigen einzelne OM-320-Module beim Kunden 3,6–6,4 mλ mehr Koma als in unserer Endprüfung; Module aus KW 17 und Modul 052 sind unauffällig."',
            ok: true,
            feedback: 'Was, wo, wann, wie viel — und ausdrücklich, wo das Problem <em>nicht</em> auftritt. Diese Ist/Ist-nicht-Abgrenzung (KW 17 unauffällig, KW 19–21 teils betroffen) ist der wertvollste Teil von D2, weil sie in D4 die Hypothesen halbiert.' },
          { text: '„Die Endprüfung misst falsch."',
            ok: false,
            feedback: 'Das ist eine Hypothese, keine Problembeschreibung — und sie legt D4 vorzeitig fest. Möglich wäre auch: Transportbelastung, Setzverhalten der Verklebung, unterschiedliche Aufspannung beim Kunden.' }
        ],
        merksatz: 'D2 beschreibt, D4 erklärt. Wer in D2 schon eine Ursache nennt, hat sich die Analyse gespart.'
      },

      {
        id: 'D3', name: 'Sofortmaßnahmen',
        ziel: 'Den Kunden schützen, bevor die Ursache bekannt ist',
        lage:
          'Sieben weitere Module der Baureihe stehen versandbereit, drei sind in Arbeit. Die Ursache ist offen. ' +
          'Der Kunde braucht Liefermengen für seinen eigenen Anlauf.',
        frage: 'Welche Sofortmaßnahme ist angemessen?',
        optionen: [
          { text: 'Auslieferung stoppen, bis die Grundursache gefunden ist.',
            ok: false,
            feedback: 'Sicher, aber unnötig teuer und beim Kunden nicht durchsetzbar. Sofortmaßnahmen sollen den Kunden schützen — nicht die Lieferkette anhalten, wenn eine Prüfung den gleichen Schutz erreicht.' },
          { text: 'Versandbereite Module gesperrt; vor Freigabe zusätzlich in kundenähnlicher Aufspannung nachmessen; nur Module unter 6 mλ ausliefern; Kunde erhält die Nachmessprotokolle. Maßnahme befristet und im 8D dokumentiert.',
            ok: true,
            feedback: 'Sofort wirksam, kundenseitig überprüfbar, ausdrücklich befristet — und die Nachmessung in kundenähnlicher Aufspannung liefert nebenbei Daten für D4. Genau so soll eine Containment-Maßnahme aufgebaut sein.' },
          { text: 'Die interne Spezifikationsgrenze von 8 auf 5 mλ verschärfen.',
            ok: false,
            feedback: 'Behandelt das Symptom mit einem engeren Fenster, ohne die Abweichung zwischen den Messungen zu adressieren — und erzeugt dauerhaft Ausschuss. Grenzwerte zu verschärfen ist keine Sofortmaßnahme, sondern eine verdeckte Ursachenvermeidung.' }
        ],
        merksatz: 'Eine Sofortmaßnahme ohne Wirksamkeitsnachweis und ohne Enddatum ist keine Sofortmaßnahme, sondern ein neuer Prozess.'
      },

      {
        id: 'D4', name: 'Grundursache',
        ziel: 'Die Ursache belegen, nicht plausibilisieren',
        lage:
          'Das Team sammelt am Ishikawa Hypothesen. Die Ist/Ist-nicht-Abgrenzung aus D2 zeigt: betroffen sind ' +
          'ausschließlich Module, deren Justage auf Vorrichtung V2 lief; Modul 052 lief auf V1. Ab KW 19 wurde V2 ' +
          'nach einer Reparatur wieder in Betrieb genommen. Der Koma-Anteil steigt beim Kunden, sinkt aber wieder, ' +
          'wenn ein betroffenes Modul intern in kundenähnlicher Aufspannung 24 h ruht.',
        frage: 'Wie sichern Sie die Grundursache ab?',
        optionen: [
          { text: 'Die Korrelation „betroffen = Vorrichtung V2" ist eindeutig genug — V2 wird als Ursache in den 8D geschrieben.',
            ok: false,
            feedback: 'Korrelation ist ein starker Hinweis, aber kein Nachweis. Und sie erklärt den zweiten Befund nicht: warum sich der Fehler nach 24 h Ruhe teilweise zurückbildet. Ein 8D, der hier abbricht, produziert später einen Wiederholfall.' },
          { text: 'Gezielter Versuch: dieselben Bauteile nacheinander auf V1 und V2 justieren, Wellenfront direkt nach Justage und nach 24 h messen; parallel V2 auf Planlauf und Spannkraft vermessen.',
            ok: true,
            feedback: 'Der Effekt muss sich durch Wechsel der vermuteten Ursache gezielt ein- und ausschalten lassen. Der zeitabhängige Anteil weist zusätzlich auf Setzverhalten hin — erhöhte Spannkraft der reparierten V2 bringt Fassungsspannung ein, die sich nach dem Ausspannen langsam abbaut. Beide Befunde zusammen ergeben eine belegte Ursachenkette.' },
          { text: '5-Why bis zur Antwort „Die Reparatur von V2 wurde nicht freigegeben" und dort abschließen.',
            ok: false,
            feedback: 'Das ist die <em>Systemursache</em> (fehlende Freigabe nach Instandsetzung) — wichtig für D5 und D7. Aber die <em>technische</em> Ursachenkette (Spannkraft → Fassungsspannung → Astigmatismus/Koma → Setzverhalten) fehlt noch. Ein guter 8D belegt beide.' }
        ],
        merksatz: 'Grundursache heißt: Der Effekt lässt sich gezielt ein- und wieder ausschalten. Alles andere ist eine Vermutung mit Aktenzeichen.'
      },

      {
        id: 'D5', name: 'Geplante Abstellmaßnahmen',
        ziel: 'Maßnahmen wählen, die die Ursache treffen — und ihre Nebenwirkungen prüfen',
        lage:
          'Nachgewiesen: Die reparierte Vorrichtung V2 spannt mit rund 40 % höherer Kraft. Die Fassungsspannung ' +
          'erzeugt einen Wellenfrontanteil, der sich nach dem Ausspannen über Stunden teilweise zurückbildet — ' +
          'unsere Endprüfung misst direkt nach der Justage, der Kunde Tage später.',
        frage: 'Welches Maßnahmenpaket ist geplant zu wählen?',
        optionen: [
          { text: 'Spannkraft von V2 auf den Sollwert einstellen und regelmäßig prüfen — damit ist die Ursache beseitigt.',
            ok: false,
            feedback: 'Notwendig, aber nicht ausreichend. Die zweite, unabhängige Schwachstelle bleibt: Unsere Endprüfung erfasst das Setzverhalten grundsätzlich nicht — bei jeder künftigen Spannkraftabweichung entsteht dasselbe Problem unentdeckt.' },
          { text: 'Spannkraft einstellen und dokumentiert überwachen; Freigabeprüfung nach Instandsetzung von Vorrichtungen verbindlich einführen; Endprüfung um eine Wartezeit bzw. eine Referenzmessung nach Entspannen ergänzen.',
            ok: true,
            feedback: 'Die Maßnahmen treffen die technische Ursache (Spannkraft), die Systemursache (fehlende Freigabe nach Reparatur) und die Entdeckungslücke (Prüfzeitpunkt). Erst dieses Tripel verhindert Wiederholung <em>und</em> Durchschlupf.' },
          { text: 'Die Endprüfung um eine 24-Stunden-Wartezeit für alle Module ergänzen.',
            ok: false,
            feedback: 'Löst die Entdeckung, nicht die Entstehung — und verlängert die Durchlaufzeit jedes Moduls dauerhaft. Prüfen statt abstellen ist die teuerste Form der Fehlervermeidung.' }
        ],
        merksatz: 'Gute D5-Pakete adressieren drei Ebenen: Entstehung, Entdeckung, System. Fehlt eine, kommt der Fall wieder.'
      },

      {
        id: 'D6', name: 'Umsetzung & Wirksamkeitsnachweis',
        ziel: 'Belegen, dass die Maßnahmen wirken — mit Daten',
        lage:
          'Die Maßnahmen sind eingeführt. Ab KW 24 laufen Module mit korrigierter V2 und ergänzter Endprüfung. ' +
          'Der Kunde fragt, ab wann er sich auf die Lieferungen verlassen kann.',
        frage: 'Womit weisen Sie die Wirksamkeit nach?',
        optionen: [
          { text: 'Mit der Bestätigung des Fertigungsleiters, dass die Maßnahmen umgesetzt sind, und dem Protokoll der Spannkraftmessung.',
            ok: false,
            feedback: 'Das belegt die <em>Umsetzung</em>, nicht die <em>Wirksamkeit</em>. D6 verlangt den Nachweis am Ergebnis: Der Fehler tritt unter denselben Bedingungen nicht mehr auf.' },
          { text: 'Vergleich der Delta-Werte (Kunde minus intern) vor und nach der Maßnahme über mindestens 10 Module, plus die Zusage des Kunden, dass keine weiteren Abweichungen auftreten — mit Angabe der ersten betroffenen Seriennummer.',
            ok: true,
            feedback: 'Wirksamkeit wird an derselben Messgröße nachgewiesen, mit der das Problem in D2 beschrieben wurde. Die Seriennummer-Angabe („wirksam ab OM-320-058") macht die Änderung rückverfolgbar — der Kunde weiß, welche Module noch aus der alten Fertigung stammen.' },
          { text: 'Ein Nachweis erübrigt sich, da die Grundursache in D4 eindeutig belegt wurde.',
            ok: false,
            feedback: 'Eine belegte Ursache garantiert nicht, dass die gewählte Maßnahme sie vollständig beseitigt — Spannkraft könnte driften, die neue Prüfung könnte zu kurz greifen. D6 ist der Punkt, an dem die meisten 8D-Reports in der Praxis schwach sind.' }
        ],
        merksatz: 'Wirksamkeit misst man an der Kenngröße aus D2 — nicht an der Zahl umgesetzter Maßnahmen.'
      },

      {
        id: 'D7', name: 'Vorbeugung',
        ziel: 'Den Fall auf vergleichbare Prozesse und Produkte übertragen',
        lage:
          'Der Fall ist geschlossen. Es gibt vier weitere Vorrichtungstypen in der Optikmontage und drei ' +
          'Baureihen mit vergleichbarem Fassungskonzept.',
        frage: 'Welche vorbeugende Maßnahme hat die größte Reichweite?',
        optionen: [
          { text: 'Die Werker an V2 unterweisen und die Unterweisung dokumentieren.',
            ok: false,
            feedback: 'Unterweisung wirkt nur dort, wo der Fehler schon aufgetreten ist, und nur solange die Personen bleiben. D7 fragt nach struktureller Übertragung, nicht nach lokaler Sensibilisierung.' },
          { text: 'Freigabeprüfung nach Instandsetzung als verbindlichen Standard für alle Vorrichtungen der Optikmontage einführen und die FMEA der betroffenen Baureihen um die Fehlerart „Fassungsspannung durch abweichende Spannkraft" ergänzen.',
            ok: true,
            feedback: 'Der Standard schließt die Lücke bei allen Vorrichtungen, die FMEA-Ergänzung sorgt dafür, dass die Fehlerart bei künftigen Anläufen bewertet wird statt neu entdeckt zu werden. Genau hier zahlt der 8D auf die Prozesslandschaft ein.' },
          { text: 'Die Spezifikationsgrenze aller vergleichbaren Baureihen auf 6 mλ absenken.',
            ok: false,
            feedback: 'Erzeugt Ausschuss in Prozessen, die kein Problem haben, und verhindert die Fehlerart nicht. Engere Grenzen sind kein Ersatz für einen fehlenden Standard.' }
        ],
        merksatz: 'D7 fragt: Wo kann derselbe Mechanismus noch wirken? Antworten in D7 sind immer Standards, FMEAs oder Konstruktionsregeln — selten Schulungen.'
      },

      {
        id: 'D8', name: 'Abschluss & Würdigung',
        ziel: 'Den Fall sauber schließen und das Gelernte sichern',
        lage:
          'Alle Maßnahmen sind wirksam nachgewiesen, der Kunde hat den Report akzeptiert. ' +
          'Die Sofortmaßnahme aus D3 (Nachmessung in kundenähnlicher Aufspannung) läuft noch.',
        frage: 'Was gehört zum sauberen Abschluss?',
        optionen: [
          { text: 'Report an den Kunden senden und den Vorgang schließen.',
            ok: false,
            feedback: 'Dabei bleibt die Sofortmaßnahme aus D3 unbefristet im Prozess. Genau so entstehen die zusätzlichen 100 %-Prüfungen, deren Ursprung nach zwei Jahren niemand mehr kennt — und die niemand mehr zu streichen wagt.' },
          { text: 'Sofortmaßnahme aus D3 dokumentiert zurücknehmen, geänderte Dokumente (Arbeitsanweisung, Prüfplan, FMEA) freigeben, Wirksamkeit ab Seriennummer festhalten und das Team würdigen.',
            ok: true,
            feedback: 'D8 räumt auf. Das Zurücknehmen der Containment-Maßnahme ist der Schritt, der in der Praxis am häufigsten vergessen wird — und der über die Zeit die Prozesskosten am stärksten belastet.' },
          { text: 'Die Sofortmaßnahme dauerhaft beibehalten, weil doppelte Prüfung nie schadet.',
            ok: false,
            feedback: '„Schadet nie" stimmt nicht: Jede zusätzliche Prüfung kostet Kapazität an einer bereits knappen Station, verlängert die Durchlaufzeit und senkt langfristig die Aufmerksamkeit für die Prüfung, die wirklich trägt.' }
        ],
        merksatz: 'Ein 8D ist erst geschlossen, wenn die Sofortmaßnahme wieder draußen ist.'
      }
    ]
  }
};
