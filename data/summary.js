/* summary.js — Kompaktübersicht. Nutzt dieselbe Abschnittsstruktur wie die Module. */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.kompakt = {
  lead: 'Alles Wesentliche aus den acht Modulen auf einer Seite — zum Wiederholen vor einem Gespräch, ' +
        'als Nachschlagewerk im Alltag oder zum Ausdrucken. Jeder Punkt verweist auf das Modul, in dem er hergeleitet wird.',

  abschnitte: [
    {
      h: 'Die dreizehn Sätze, die das Feld tragen',
      p: [
        'Wer diese dreizehn Aussagen erklären und begründen kann, hat das Fachgebiet verstanden. Alles andere ist Detail.'
      ],
      bullets: [
        '<strong>1. Justage ist Kompensation, nicht Positionierung.</strong> Optimiert wird die Wellenfront des Systems, nicht die geometrische Lage eines Elements. Deshalb steht ein Element am Ende oft messbar außerhalb seiner Nennlage. <em>(Modul 1)</em>',
        '<strong>2. Koma zeigt auf Lage, Astigmatismus auf Spannung.</strong> Sphärische Aberration und Trefoil zeigen auf Bauteil und Fassung. Diese drei Sätze ersetzen einen großen Teil der Ursachensuche. <em>(Modul 1)</em>',
        '<strong>3. Was außerhalb des Stellbereichs liegt, wird durch Weiterjustieren nur teurer.</strong> Das rechtzeitig zu erkennen und belegt zu übergeben, ist die eigentliche Leistung an der Station. <em>(Modul 1)</em>',
        '<strong>4. Bei Reflexion verdoppelt sich der Kippwinkel.</strong> Ein um α verkippter Spiegel lenkt den Strahl um 2α ab. Deshalb ist ein Spiegelsystem von vornherein doppelt so winkelempfindlich wie ein refraktives — die Diagnoselogik bleibt aber dieselbe. <em>(Modul 2)</em>',
        '<strong>5. Ohne fähiges Messsystem ist jede Prozessaussage wertlos.</strong> Erst %GRR, dann Analyse. Ein Verbesserungsprojekt auf Messrauschen liefert Scheinerfolge, die nach Monaten zusammenbrechen. <em>(Modul 3)</em>',
        '<strong>6. Eingriffsgrenzen und Spezifikationsgrenzen haben nichts miteinander zu tun.</strong> Die einen beschreiben, was der Prozess tut, die anderen, was der Kunde braucht. <em>(Modul 4)</em>',
        '<strong>7. Ohne Signal nicht eingreifen.</strong> Nachstellen auf zufällige Streuung erhöht die Streuung nachweislich. <em>(Modul 4)</em>',
        '<strong>8. Am Engpass zählt First Pass Yield mehr als Zykluszeit.</strong> Nacharbeit wirkt multiplikativ auf mehrere Stationen und kostet keine Investition, sie zu senken. <em>(Modul 5)</em>',
        '<strong>9. Bestand ist Durchlaufzeit, hohe Auslastung ist teuer.</strong> Little koppelt beides fest; Kingman macht die letzten zehn Prozent Auslastung unbezahlbar. <em>(Modul 5)</em>',
        '<strong>10. Grundursache heißt: Der Effekt lässt sich gezielt ein- und ausschalten.</strong> Alles andere ist eine Vermutung mit Aktenzeichen. <em>(Modul 6)</em>',
        '<strong>11. Beobachtung findet Zusammenhänge, nur der Versuch findet Ursachen.</strong> Vermengte Einflussgrößen lassen sich aus Beobachtungsdaten mit keiner Stichprobengröße trennen. <em>(Modul 6)</em>',
        '<strong>12. Eine Sofortmaßnahme ohne Enddatum wird zum heimlichen Dauerprozess.</strong> Der in der Praxis am häufigsten vergessene Schritt ist D8: das Containment wieder zurückzunehmen. <em>(Modul 6)</em>',
        '<strong>13. Im Anlauf ist die Sonderfreigabequote die ehrlichste Kennzahl.</strong> Sie muss sichtbar fallen. Wiederholte Sonderfreigaben für dasselbe Merkmal sind eine verdeckte Spezifikationsänderung. <em>(Modul 7)</em>'
      ]
    },

    {
      h: 'Diagnose: von der Messung zur Ursache',
      p: [
        'Der Weg vom Befund zur richtigen Zuständigkeit — die Tabelle, die im Alltag am häufigsten gebraucht wird.'
      ],
      tabelle: {
        kopf: ['Befund', 'Wahrscheinliche Ursache', 'Nächster Schritt'],
        zeilen: [
          ['Koma (Z7/Z8) erhöht, Rest unauffällig', 'Dezentrierung oder Verkippung eines Elements', 'Justieren — das ist die klassische Aufgabe'],
          ['Astigmatismus (Z5/Z6) ohne begleitende Koma', 'mechanische Spannung: Fassung, Verklebung, Aufspannkraft', 'Nicht justieren. Mechanik und Vorrichtung prüfen'],
          ['Sphärische Aberration (Z11)', 'Radius, Mittendicke oder Brechzahl des Glases', 'Übergabe an Bauteilfertigung oder R&amp;D'],
          ['Trefoil (Z9/Z10)', 'Dreipunkt-Auflage der Fassung', 'Fassungskonstruktion, nicht Justage'],
          ['Defokus (Z4) erhöht', 'axialer Luftabstand', 'Z-Stellgröße, Distanzring prüfen'],
          ['Fehler bildet sich über Stunden teilweise zurück', 'Setzverhalten nach dem Fügen oder Ausspannen', 'Prüfzeitpunkt und Spannkraft hinterfragen'],
          ['Streuung ohne erkennbares Muster', 'möglicherweise gar kein Prozessproblem', 'Zuerst Messsystem prüfen (%GRR), dann weitersuchen'],
          ['Fehler nur auf einer Vorrichtung, ab einem Datum', 'Änderung an dieser Ressource', 'Ist/Ist-nicht-Abgrenzung, dann gezielter Nachweis']
        ],
        fuss: 'Die rechte Spalte ist die entscheidende: Sie sagt, wer zuständig ist. Falsche Zuständigkeit kostet an der Justagestation die teuerste Kapazität im Abschnitt.'
      }
    },

    {
      h: 'Formeln auf einen Blick',
      formel: '<span class="fx-note">— Optik —</span>\nW(ρ,θ) = Σ aᵢ · Zᵢ(ρ,θ)        RMS = √(Σ aᵢ²)\nStrehl ≈ exp(−(2π·RMS)²)       beugungsbegrenzt: RMS ≤ λ/14 ≈ 0,071 λ\na = S · x + a₀                 Justage: min ‖S·x + a₀‖₂\n\n<span class="fx-note">— Lithografie —</span>\nCD  = k₁ · λ / NA              DOF = k₂ · λ / NA²\n\n<span class="fx-note">— Messtechnik —</span>\nσ²_beob = σ²_Prozess + σ²_Mess  σ_GRR = √(σ²_EV + σ²_AV)\n%GRR = 6·σ_GRR / Toleranz       ndc = 1,41 · σ_PV / σ_GRR\n\n<span class="fx-note">— Prozess —</span>\nOEG/UEG = x̿ ± 3σ/√n            Cp = (OSG−USG)/(6σ)\nCpk = min(OSG−µ, µ−USG)/(3σ)    ARL = 1 / P(Signal)\n\n<span class="fx-note">— Wertstrom —</span>\nTakt = Arbeitszeit / Bedarf     Last = ZZ / Verfügbarkeit · 1/FPY\nDLZ = WIP / Durchsatzrate       W_q ≈ (c_a²+c_e²)/2 · u/(1−u) · t_e\n\n<span class="fx-note">— Toleranzen —</span>\nWorst Case = Σ |tᵢ·sᵢ|          RSS = √(Σ (tᵢ·sᵢ)²)'
    },

    {
      h: 'Kennzahlen und ihre Grenzwerte',
      tabelle: {
        kopf: ['Kennzahl', 'Was sie misst', 'Richtwert', 'Modul'],
        zeilen: [
          ['RMS-Wellenfrontfehler', 'Abweichung von der Sollwellenfront', 'beugungsbegrenzt ab ≤ 0,071 λ; Lithografie im Milli-λ-Bereich', '1'],
          ['Strehl-Verhältnis', 'erreichte gegen ideale Spitzenintensität', '≥ 0,8 entspricht dem Maréchal-Kriterium', '1'],
          ['%GRR (Toleranz)', 'Anteil der Messstreuung an der Toleranz', '&lt; 10 % fähig · 10–30 % bedingt · &gt; 30 % nicht fähig', '3'],
          ['ndc', 'unterscheidbare Kategorien des Messsystems', '≥ 5', '3'],
          ['Cp', 'Streuung gegen Toleranzbreite', '≥ 1,33', '4'],
          ['Cpk', 'Streuung und Lage', '≥ 1,33; Cp ≫ Cpk heißt außermittig', '4'],
          ['ARL₀', 'Stichproben bis zum Fehlalarm', '≈ 370 bei Regel 1 · ≈ 90 mit Western Electric 1–4', '4'],
          ['First Pass Yield', 'Anteil ohne Nacharbeit', 'so hoch wie möglich — wirkt multiplikativ am Engpass', '5'],
          ['Flusseffizienz', 'Bearbeitungszeit / Durchlaufzeit', 'in der Montage oft einstellig — der Rest ist Warten', '5'],
          ['Auslastung am Engpass', 'Belegungsgrad', 'über 90 % explodiert die Wartezeit', '5'],
          ['Budget je Spiegel', 'zulässiger Beitrag bei n Elementen', 'Systembudget / √n — nicht / n', '2'],
          ['Sonderfreigabequote', 'Anteil befristet freigegebener Teile', 'muss über den Anlauf sichtbar fallen', '7']
        ]
      }
    },

    {
      h: 'Entscheidungsregeln',
      karten: [
        { titel: 'Eingreifen oder nicht?',
          text: '1. Ist die Messung in Ordnung? 2. Liegt überhaupt ein Signal vor? 3. Was hat sich geändert (Charge, Schicht, Vorrichtung, Umgebung)? 4. Erst dann eingreifen — und die Wirkung dokumentiert nachhalten. Ohne Signal ist die Abweichung zufällige Streuung, und Nachstellen macht sie größer.' },
        { titel: 'Justieren oder übergeben?',
          text: 'Verbessert sich der Fehler über mehrere Iterationen nicht mehr, liegt er außerhalb des Stellbereichs. Rotationssymmetrische Anteile lassen sich durch Lagejustage grundsätzlich nicht erzeugen und damit auch nicht kompensieren. Dann: belegt übergeben statt weiter iterieren.' },
        { titel: '8D, DMAIC oder PDCA?',
          text: 'Kundenreklamation mit Nachweispflicht → 8D (Wochen). Ursache unbekannt, viele Einflussgrößen, Daten vorhanden → DMAIC (Monate). Kleine Verbesserung mit im Wesentlichen klarer Ursache → PDCA (Tage). Risiko vor dem Auftreten bewerten → FMEA.' },
        { titel: 'Worst Case oder RSS?',
          text: 'Worst Case ist immer sicher, aber oft unnötig teuer. RSS setzt unabhängige, zufällige, zentrierte Beiträge voraus — im Anlauf meist noch nicht belegt, weil alles aus einer Vorserienfertigung stammt. Angreifen sollte man ohnehin den Beitrag mit dem größten t·s, und Empfindlichkeit senken schlägt Toleranz verengen.' },
        { titel: 'Freigeben an der Toleranzgrenze?',
          text: 'Liegt der Messwert im Unsicherheitsband, ist weder Konformität noch Nichtkonformität belegt. „Innerhalb der Unsicherheit, also gut" ist genauso falsch wie „drüber, also Ausschuss". Der saubere Weg ist Absicherung oder eine bewusste, dokumentierte Sonderfreigabe.' },
        { titel: 'Refraktiv oder reflektiv?',
          text: 'Die Methodik ist identisch, die Physik nicht. Reflektiv gilt: Kippwinkel wirkt doppelt (2α), keine gemeinsame Achse und keine Rotationssymmetrie, Toleranzen in Pikometern statt Nanometern, Vakuum und Kontamination als zusätzliche Störgrößen. Was gleich bleibt: Spannung erzeugt Astigmatismus, Lagefehler erzeugen Koma, rotationssymmetrische Fehler sind durch Lagejustage nicht korrigierbar.' },
        { titel: 'Wo ansetzen im Wertstrom?',
          text: 'Nur der Engpass bestimmt den Durchsatz. Reihenfolge der Hebel: Nacharbeit senken, Verfügbarkeit erhöhen, Zykluszeit reduzieren, zuletzt Kapazität zukaufen. Verbesserung außerhalb des Engpasses erzeugt nur Bestand — und damit längere Durchlaufzeiten.' }
      ]
    },

    {
      h: 'Die häufigsten Fehlschlüsse',
      tabelle: {
        kopf: ['Fehlschluss', 'Warum er falsch ist', 'Richtig'],
        zeilen: [
          ['„Der Wert ist auffällig, also stelle ich nach."', 'Ohne Regelverletzung ist es zufällige Streuung; der Eingriff erhöht sie', 'Erst Signal prüfen, dann Ursache suchen'],
          ['„Die Streuung ist groß, der Prozess ist schlecht."', 'Ein großer Teil kann Messrauschen sein', 'Zuerst %GRR bestimmen'],
          ['„Cpk ist gut, also ist alles in Ordnung."', 'Fähigkeit ohne Stabilität beschreibt eine Verteilung, die es nicht gibt', 'Karte und Fähigkeit immer zusammen betrachten'],
          ['„Die Korrelation ist eindeutig, das ist die Ursache."', 'Vermengte Einflussgrößen sind aus Beobachtungsdaten nicht trennbar', 'Effekt gezielt ein- und ausschalten oder Versuchsplan'],
          ['„Ich teste einen Faktor nach dem anderen."', 'Wechselwirkungen bleiben prinzipiell unsichtbar', 'Vollfaktorieller Plan, mindestens zwei Wiederholungen'],
          ['„Mehr Personal löst die Überlastung."', 'Wenn Nacharbeit die Ursache ist, verdoppelt man nur die Nacharbeitskapazität', 'Erst FPY, dann Kapazität'],
          ['„Höhere Auslastung ist effizienter."', 'Über 90 % wächst die Wartezeit fast senkrecht', 'Reserve am Engpass ist der Preis für kurze Durchlaufzeiten'],
          ['„Eine zusätzliche Prüfung schadet nie."', 'Sie kostet Kapazität am Engpass und senkt die Aufmerksamkeit für die tragende Prüfung', 'Ursache abstellen statt Entdeckung ausbauen'],
          ['„Cpk = 1,45 aus acht Vorserienteilen ist gut."', 'Das Vertrauensintervall reicht von deutlich unter 1 bis über 2', 'Im Anlauf Verläufe zeigen statt Punktschätzer'],
          ['„Wir haben alle Maßnahmen umgesetzt."', 'Umsetzung ist nicht Wirksamkeit', 'An der Kenngröße aus D2 nachweisen, ab Seriennummer']
        ]
      }
    },

    {
      h: 'Fragen, die man beantworten können sollte',
      p: [
        'Zum Selbsttest — jede Frage lässt sich aus den Modulen vollständig beantworten.'
      ],
      bullets: [
        'Warum steht ein justiertes Element oft außerhalb seiner Nennlage?',
        'Ein Modul zeigt erhöhten Astigmatismus, aber keine Koma. Wo suchen Sie und warum <em>nicht</em> in der Dezentrierung?',
        'Warum ist sphärische Aberration durch Justage prinzipiell nicht korrigierbar?',
        'Was bedeutet %GRR = 45 % für ein laufendes Verbesserungsprojekt?',
        'Warum darf man Spezifikationsgrenzen nicht in die Regelkarte eintragen?',
        'Ein Prozess ist beherrscht, aber Cpk = 0,8. Was folgt daraus?',
        'Warum entdeckt eine Regelkarte in der Kleinserie eine Drift von 0,5 σ praktisch nie rechtzeitig?',
        'Zehn Prozentpunkte FPY oder zehn Prozent kürzere Zykluszeit — was bringt am Engpass mehr?',
        'Warum verlängert eine schnellere Nicht-Engpass-Station die Durchlaufzeit?',
        'Wie belegen Sie eine Grundursache, statt sie zu plausibilisieren?',
        'Warum findet ein Faktor-für-Faktor-Versuch die beste Einstellung nicht?',
        'Wann ist die RSS-Toleranzrechnung unzulässig?',
        'Ein Merkmal bekommt zum fünften Mal eine Sonderfreigabe. Was tun Sie?',
        'Warum ist Overlay-Fehler die typische Folge von Koma?'
      ],
      callout: {
        typ: 'job',
        titel: 'Der eine Satz, wenn Sie nur einen haben',
        text: 'Diese Rolle steht zwischen der Physik und der Wirtschaftlichkeit: Sie übersetzt, warum eine Toleranz so eng ist, was ihre Einhaltung in der Fertigung kostet und welche der beiden Größen sich ändern lässt. Alles Übrige — Wellenfront, Regelkarte, Wertstrom, 8D — sind die Werkzeuge, mit denen man diese Übersetzung belegen kann.'
      }
    }
  ]
};
