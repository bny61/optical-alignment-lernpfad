/* modules.js — Lerninhalte. Reine Datenzuweisung (kein fetch/JSON), damit die Seite auch per file:// lädt. */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.module = [

/* ═══════════════════════ EINORDNUNG (Modul 0) ═══════════════════════ */
{
  id: 'system',
  nr: 0,
  titel: 'Einordnung: das Lithografiesystem',
  kurz: 'Wozu die Optik gebaut wird, die Sie justieren — Auflösungsgrenze, Wellenlängengenerationen und warum Wellenfrontfehler im Pikometerbereich landen.',
  ziel: 'Sie können erklären, warum ein Objektivmodul so extrem eng spezifiziert ist — nämlich weil sein Wellenfrontfehler direkt in die Strukturtreue auf dem Wafer übersetzt — und wo Ihre Baugruppe im Gesamtsystem sitzt.',
  jobBezug: 'Die Rolle verlangt Systemverständnis im Umgang mit komplexen technischen Systemen. Praktisch heißt das: Sie müssen begründen können, warum eine Toleranz so eng ist, bevor Sie über ihre Aufweitung verhandeln — und warum ein scheinbar winziger Restfehler beim Kunden zum Ausfall der Integration führt.',
  begriffe: ['Wellenfront', 'Strehl-Verhältnis', 'Maréchal-Kriterium', 'Numerische Apertur', 'Vielschichtspiegel', 'Ortsfrequenz', 'Streulicht'],

  abschnitte: [
    {
      h: 'Was die Maschine tut',
      p: [
        'Ein Lithografiescanner überträgt die Struktur einer Maske — des <em>Retikels</em> — auf einen mit Fotolack beschichteten Siliziumwafer. Das Projektionsobjektiv bildet dabei verkleinert ab, üblicherweise im Verhältnis 4:1: Was auf dem Retikel 4 µm groß ist, wird auf dem Wafer 1 µm.',
        'Belichtet wird nicht der ganze Wafer auf einmal, sondern Feld für Feld. Innerhalb eines Feldes fahren Retikel- und Waferbühne gegenläufig durch einen Beleuchtungsspalt — daher <em>Step &amp; Scan</em>. Auf einen 300-mm-Wafer passen so um die 100 Felder, und ein Wafer durchläuft im Lauf seiner Fertigung Dutzende solcher Belichtungen, deren Strukturen auf wenige Nanometer genau übereinanderliegen müssen.'
      ],
      grafik: 'scanner',
      grafikText: '<strong>Abb. 1 — Strahlengang im Scanner.</strong> Alle Zahlen sind öffentlich bekannte Größenordnungen, keine Herstellerdaten. Entscheidend für diese Seite ist die grün markierte Stelle: Das Projektionsobjektiv wird aus einzeln montierten und justierten Modulen aufgebaut — dort spielt sich der gesamte Rest dieses Lernpfads ab.'
    },

    {
      h: 'Die Gleichung, die die ganze Branche antreibt',
      p: [
        'Wie klein eine Struktur werden kann, beschreibt die Rayleigh-Gleichung. Sie hat nur drei Stellschrauben — und erklärt fast die gesamte Entwicklungsgeschichte der Halbleiterfertigung:'
      ],
      formel: 'CD  = k₁ · λ / NA          <span class="fx-note">kleinste auflösbare Strukturbreite</span>\n\nDOF = k₂ · λ / NA²         <span class="fx-note">Schärfentiefe — sinkt quadratisch mit NA</span>',
      bullets: [
        '<strong>λ verkleinern</strong> — der wirksamste Hebel, aber jeder Schritt erzwingt eine komplett neue Optikgeneration',
        '<strong>NA vergrößern</strong> — mehr Licht aus größeren Winkeln; kostet Bauraum, Gewicht und Schärfentiefe',
        '<strong>k₁ senken</strong> — über Beleuchtungstricks, Phasenmasken und Auflösungsverstärkung; physikalisch bei etwa 0,25 am Ende'
      ],
      callout: {
        typ: 'warn',
        titel: 'Der unbequeme zweite Teil',
        text: 'Die Schärfentiefe DOF fällt mit dem <em>Quadrat</em> der numerischen Apertur. Jede Auflösungssteigerung über NA verkleinert also das Fenster, in dem der Wafer scharf abgebildet wird — bei heutigen Systemen sind das einige zehn Nanometer. Deshalb ist der Defokusanteil der Wellenfront (Z4 in Modul 1) keine akademische Größe, sondern eine der kritischsten überhaupt.'
      }
    },

    {
      h: 'Die Generationen',
      tabelle: {
        kopf: ['Generation', 'Wellenlänge', 'NA (typ.)', 'Optik', 'Auflösung, Größenordnung'],
        zeilen: [
          ['i-Line', '365 nm', '0,5–0,6', 'Linsen (Quarzglas)', 'einige hundert nm'],
          ['KrF', '248 nm', '0,7–0,8', 'Linsen', 'rund 100 nm'],
          ['ArF trocken', '193 nm', 'bis 0,93', 'Linsen (Quarz, CaF₂)', 'rund 65 nm'],
          ['ArF Immersion', '193 nm', 'bis 1,35', 'Linsen + Wasserspalt', 'rund 38 nm (einfach belichtet)'],
          ['EUV', '13,5 nm', '0,33', 'nur Spiegel, Vakuum', 'rund 13 nm'],
          ['High-NA EUV', '13,5 nm', '0,55', 'Spiegel, anamorphotisch', 'unter 10 nm']
        ],
        fuss: 'Öffentlich bekannte Größenordnungen. Die Auflösungsangaben gelten für Einfachbelichtung; mit Mehrfachstrukturierung liegen die tatsächlich gefertigten Strukturen darunter.'
      },
      p: [
        'Der Sprung von 193 nm auf 13,5 nm ist kein Zwischenschritt, sondern ein Bruch: Bei 13,5 nm gibt es kein Material mehr, das ausreichend transparent wäre. Linsen sind damit unmöglich — die gesamte Optik besteht aus Spiegeln, und weil EUV-Strahlung schon in Luft absorbiert wird, arbeitet die Maschine im Vakuum. Selbst die Maske wird nicht durchleuchtet, sondern reflektiv betrieben.'
      ],
      callout: {
        typ: '',
        titel: 'Warum EUV-Spiegel so schwierig sind',
        text: 'Ein einzelner Spiegel reflektiert bei 13,5 nm nur über einen Mo/Si-Vielschichtstapel, und selbst dann liegt der Reflexionsgrad bei etwa 70 %. Bei sechs Spiegeln im Projektionsobjektiv bleibt davon rund 0,7⁶ ≈ 12 % übrig, vor der Beleuchtungsoptik gerechnet. Jedes Zehntelprozent Reflexionsverlust und jeder Nanometer Formfehler kostet also unmittelbar Durchsatz oder Auflösung.'
      }
    },

    {
      h: 'Von der Wellenfront zum Chip',
      p: [
        'Hier schließt sich der Kreis zu Modul 1. Ein Wellenfrontfehler bleibt nicht abstrakt — er wirkt sich in drei konkreten Größen aus, die der Kunde misst:'
      ],
      tabelle: {
        kopf: ['Aberration', 'Wirkung auf dem Wafer', 'Konsequenz'],
        zeilen: [
          ['Defokus (Z4)', 'Strukturen unscharf, Kanten verwaschen', 'Strukturbreite driftet, Prozessfenster schrumpft'],
          ['Koma (Z7/Z8)', 'Struktur wird seitlich versetzt abgebildet', 'Überlagerungsfehler zwischen Lagen (Overlay)'],
          ['Astigmatismus (Z5/Z6)', 'horizontale und vertikale Linien unterschiedlich scharf', 'richtungsabhängige Strukturbreiten'],
          ['Sphärisch (Z11)', 'Fokuslage hängt von der Strukturdichte ab', 'dichte und isolierte Strukturen driften auseinander']
        ],
        fuss: 'Deshalb wird nicht nur der RMS-Wert spezifiziert, sondern die Zernike-Koeffizienten einzeln — jeder hat eine eigene Wirkung im Bild.'
      },
      callout: {
        typ: 'bad',
        titel: 'Die Größenordnung, um die es geht',
        text: 'Bei 193 nm entspricht ein RMS-Fehler von 1 mλ knapp 0,2 nm. Bei EUV mit 13,5 nm sind 1 mλ nur noch rund 13 <em>Pikometer</em> — ein Zehntel eines Atomdurchmessers. Die Formtreue der Spiegelflächen liegt in derselben Größenordnung. Der oft zitierte Vergleich: Wäre ein solcher Spiegel so groß wie Deutschland, dürfte die höchste Unebenheit keinen Bruchteil eines Millimeters überschreiten.'
      }
    },

    {
      h: 'Wie ein EUV-Spiegel entsteht',
      p: [
        'Bei DUV ist der Ausgangspunkt eine Linse aus Quarzglas oder Kalziumfluorid. Bei EUV gibt es keine Linsen — jedes optische Element ist ein Spiegel, und seine Herstellung ist ein eigener, monatelanger Prozess, der dem Justageablauf verblüffend ähnelt.'
      ],
      grafik: 'spiegelprozess',
      grafikText: '<strong>Abb. 5 — Fertigungskette eines EUV-Spiegels.</strong> Der Kern ist dieselbe Regelschleife wie bei der Justage — messen, gezielt korrigieren, erneut messen. Nur wird hier Material abgetragen statt eine Lage verstellt, und ein Durchlauf dauert Stunden bis Tage statt Minuten.',
      bullets: [
        '<strong>Substrat.</strong> Eine Glaskeramik mit nahezu verschwindender Wärmeausdehnung. Nötig, weil sich der Spiegel im Betrieb durch die absorbierte Strahlung erwärmt — ein normales Glas würde sich dabei um ein Vielfaches der Toleranz verformen.',
        '<strong>Grobform.</strong> Schleifen und Fräsen bringen die Asphäre oder Freiform auf wenige Mikrometer an die Sollform. Freiformflächen ohne jede Symmetrieachse sind bei EUV der Normalfall, weil die Strahlengänge sonst nicht faltbar wären.',
        '<strong>Deterministische Korrektur.</strong> Der eigentliche Kern: Die Fläche wird interferometrisch gegen ein CGH-Normal vermessen, aus der Abweichungskarte berechnet die Software eine Abtragsverteilung, und ein Ionenstrahl oder ein magnetorheologisches Werkzeug trägt genau dort ab, wo Material zu viel ist. Das wiederholt sich, bis die Restabweichung im Pikometerbereich liegt.',
        '<strong>Beschichten.</strong> Auf die fertige Fläche kommen 40 bis 50 Doppellagen aus Molybdän und Silizium mit rund 7 nm Periode. Die Schichtdicken müssen auf Bruchteile eines Atomdurchmessers stimmen, sonst interferieren die Teilreflexe nicht mehr konstruktiv — und weil der Einfallswinkel über die Fläche variiert, wird die Periode gezielt lateral abgestuft.',
        '<strong>Endprüfung.</strong> Gemessen wird der Reflexionsgrad bei der Betriebswellenlänge und die Form <em>nach</em> dem Beschichten — denn der Schichtstapel bringt Eigenspannung ein und verändert die mühsam erzeugte Fläche.'
      ],
      callout: {
        typ: 'job',
        titel: 'Warum Sie das wissen sollten, obwohl Sie es nicht selbst tun',
        text: 'Der Spiegel kommt als vorgelagertes Bauteil in Ihren Wertstrom. Wenn ein Modul die Wellenfrontspezifikation verfehlt und der Fehler rotationssymmetrisch oder nicht durch Lagejustage erzeugbar ist (Modul 1), landet er genau hier — und Ihre Aufgabe ist dann, das belegt zu übergeben, statt weiter zu justieren. Ein Bauteil zurück in die Korrekturschleife zu schicken, kostet Wochen.'
      }
    },

    {
      h: 'Die drei Ortsfrequenzbereiche',
      p: [
        'Hier liegt der Unterschied zwischen EUV-Optik und aller anderen Optikfertigung. Bei sichtbarem Licht genügt es, die Formabweichung zu spezifizieren. Bei 13,5 nm wirkt jede Abweichung — nur je nach ihrer räumlichen Größe völlig unterschiedlich. Deshalb wird eine EUV-Fläche in drei getrennten Ortsfrequenzbändern spezifiziert und auch getrennt gemessen.'
      ],
      grafik: 'ortsfrequenzen',
      grafikText: '<strong>Abb. 6 — Dieselbe Fläche, drei Bewertungsmaßstäbe.</strong> Alle drei Bänder liegen als Restabweichung im Bereich von Pikometern bis zu einem Zehntel Nanometer. Ein Spiegel kann in einem Band die Spezifikation halten und in einem anderen versagen — deshalb genügt eine einzelne Kennzahl nicht.',
      tabelle: {
        kopf: ['Band', 'Räumliche Skala', 'Wirkung', 'Messverfahren'],
        zeilen: [
          ['Figur', 'größer als etwa 1 mm', 'Aberrationen — der Wellenfrontfehler aus Modul 1', 'Interferometrie mit CGH'],
          ['Welligkeit (MSFR)', 'etwa 1 µm bis 1 mm', 'Streulicht, das den Bildkontrast flächig absenkt', 'Weißlichtinterferometrie'],
          ['Rauheit (HSFR)', 'kleiner als etwa 1 µm', 'Reflexionsverlust — direkt weniger Durchsatz', 'Rasterkraftmikroskopie']
        ],
        fuss: 'MSFR = mid spatial frequency roughness, HSFR = high spatial frequency roughness. Die Grenzen sind Konvention, nicht Physik — sie orientieren sich daran, welches Messverfahren welchen Bereich erfasst.'
      },
      callout: {
        typ: 'ok',
        titel: 'Die Analogie zur Prozessarbeit',
        text: 'Das ist derselbe Gedanke wie die Trennung von Lage und Streuung bei Cp und Cpk (Modul 3): Eine einzelne Kennzahl kann gut aussehen und trotzdem das falsche Problem verdecken. Wer nur den RMS-Wert der Figur betrachtet, sieht ein Streulichtproblem erst beim Kunden.'
      }
    },

    {
      h: 'Was das für die Fertigung bedeutet',
      p: [
        'Aus dem Systemkontext folgen unmittelbar die Randbedingungen, unter denen die restlichen sechs Module stehen:'
      ],
      bullets: [
        '<strong>Kleinserie mit extremem Stückwert.</strong> Von diesen Systemen werden weltweit einige Dutzend pro Jahr gebaut. Ausschuss ist praktisch keine Option, Nacharbeit ist der Normalfall — die Kapazitätsrechnung in Modul 4 folgt direkt daraus.',
        '<strong>Statistik ist knapp.</strong> Prozessfähigkeit nach klassischem Cpk lässt sich mit einstelligen Stückzahlen kaum belegen. Das ist die Kernschwierigkeit im Anlauf (Modul 6).',
        '<strong>Der Kunde ist ein Systemintegrator.</strong> Das Modul wird nicht an einen Chiphersteller geliefert, sondern an den Scanner-Hersteller, der es in seine Maschine integriert. Er misst unter <em>seinen</em> Bedingungen — Aufspannung, Lage, Zeitpunkt — und genau daraus entsteht der Reklamationsfall in Modul 5.',
        '<strong>Die Messtechnik ist selbst Hochtechnologie.</strong> Wer Pikometer spezifiziert, muss zuerst beweisen, dass er sie messen kann. Deshalb steht die Messsystemanalyse in Modul 2 vor jeder Prozessbewertung.',
        '<strong>Jede Störgröße zählt.</strong> Temperaturgradienten, Vibration, Kontamination und sogar die Schwerkraftdurchbiegung der Fassung liegen in derselben Größenordnung wie die Toleranz — daher der Aufwand für Umgebung und Handhabung aus Modul 1.'
      ],
      callout: {
        typ: 'job',
        titel: 'Der Satz, der die Rolle zusammenfasst',
        text: 'Zwischen der Physik oben in diesem Modul und den Kennzahlen in den folgenden Modulen steht genau eine Person: diejenige, die übersetzt, warum eine Toleranz so eng ist, was sie in der Fertigung kostet und welche der beiden Größen sich ändern lässt.'
      }
    }
  ],

  quiz: [
    {
      frage: 'Ein Hersteller verdoppelt die numerische Apertur bei gleicher Wellenlänge. Was passiert mit der Schärfentiefe?',
      optionen: [
        'Sie halbiert sich.',
        'Sie sinkt auf ein Viertel, weil DOF mit 1/NA² geht.',
        'Sie bleibt unverändert, DOF hängt nur von λ ab.',
        'Sie verdoppelt sich.'
      ],
      richtig: 1,
      erklaerung: 'DOF = k₂ · λ / NA². Bei doppelter NA bleibt ein Viertel der Schärfentiefe. Deshalb ist jede Auflösungssteigerung über die Apertur mit einem drastisch engeren Fokusfenster erkauft — und deshalb ist der Defokusanteil der Wellenfront so kritisch.'
    },
    {
      frage: 'Warum besteht die Optik eines EUV-Systems ausschließlich aus Spiegeln?',
      optionen: [
        'Weil Spiegel billiger zu fertigen sind als Linsen dieser Größe.',
        'Weil bei 13,5 nm kein Material ausreichend transparent ist — Linsen sind physikalisch ausgeschlossen.',
        'Weil Spiegel keine chromatische Aberration zeigen.',
        'Weil sich Spiegel leichter justieren lassen als Linsen.'
      ],
      richtig: 1,
      erklaerung: 'Bei 13,5 nm absorbiert praktisch jedes Material, auch Luft — daher Vakuum, Reflexionsoptik und Mo/Si-Vielschichtspiegel. Spiegel sind hier keine Designwahl, sondern die einzige Möglichkeit. Fertigungstechnisch sind sie ungleich aufwendiger, nicht billiger.'
    },
    {
      frage: 'Ein Modul zeigt erhöhte Koma. Welche Auswirkung meldet der Kunde am wahrscheinlichsten?',
      optionen: [
        'Unschärfe über das ganze Bildfeld.',
        'Einen seitlichen Versatz der abgebildeten Struktur, also einen Overlay-Fehler zwischen den Lagen.',
        'Unterschiedliche Schärfe für horizontale und vertikale Linien.',
        'Einen Durchsatzverlust der Maschine.'
      ],
      richtig: 1,
      erklaerung: 'Koma bildet die Struktur asymmetrisch und dadurch seitlich versetzt ab — das schlägt direkt auf das Overlay durch, also die Lagegenauigkeit zwischen aufeinanderfolgenden Belichtungsebenen. Richtungsabhängige Schärfe wäre Astigmatismus, feldweite Unschärfe Defokus.'
    },
    {
      frage: 'Was bedeutet ein RMS-Wellenfrontfehler von 1 mλ physikalisch bei EUV (λ = 13,5 nm)?',
      optionen: [
        'Etwa 13 Nanometer.',
        'Etwa 13 Pikometer — Bruchteile eines Atomdurchmessers.',
        'Etwa 1,35 Nanometer.',
        'Das lässt sich ohne Angabe der NA nicht umrechnen.'
      ],
      richtig: 1,
      erklaerung: '1 mλ = λ/1000 = 13,5 nm / 1000 ≈ 13,5 pm. Zum Vergleich: Ein Siliziumatom hat einen Durchmesser von rund 200 pm. Genau diese Größenordnung erklärt den gesamten Aufwand für Messtechnik, Umgebungskonditionierung und Handhabung in den folgenden Modulen.'
    },
    {
      frage: 'Ein EUV-Spiegel hält die Figurspezifikation ein, der gemessene Bildkontrast ist trotzdem zu niedrig. Wo suchen Sie?',
      optionen: [
        'Bei der Figur — die Messung muss fehlerhaft sein.',
        'Im mittleren Ortsfrequenzband: Welligkeit erzeugt Streulicht, das den Kontrast flächig absenkt, ohne die Figur zu verletzen.',
        'Bei der Justage des Moduls, da Kontrastverlust immer aus Dezentrierung folgt.',
        'Beim Reflexionsgrad der Beschichtung.'
      ],
      richtig: 1,
      erklaerung: 'Figur, Welligkeit und Rauheit werden getrennt spezifiziert, weil sie unterschiedlich wirken. Welligkeit im Bereich von Mikrometern bis Millimetern streut Licht in den Bildbereich und senkt den Kontrast, ohne dass der Figurwert auffällig wäre. Ein Reflexionsproblem würde sich als Durchsatzverlust zeigen, nicht als Kontrastverlust.'
    },
    {
      frage: 'Warum wird die Form eines EUV-Spiegels nach dem Beschichten erneut gemessen?',
      optionen: [
        'Weil die Beschichtung Eigenspannung einbringt und die Fläche dadurch verformt.',
        'Weil erst nach dem Beschichten überhaupt interferometrisch gemessen werden kann.',
        'Als reine Dokumentationspflicht ohne technischen Grund.',
        'Weil sich die Schichtdicke im Betrieb noch verändert.'
      ],
      richtig: 0,
      erklaerung: 'Ein Stapel aus 40 bis 50 Doppellagen bringt Eigenspannung ein und verändert die zuvor mühsam korrigierte Fläche. Deshalb ist der Zustand nach dem Beschichten der maßgebliche — dasselbe Muster wie beim Setzverhalten nach dem Verkleben in der Montage (Modul 1 und Modul 5).'
    },
    {
      frage: 'Warum ist die klassische Prozessfähigkeitsrechnung in dieser Fertigung schwierig?',
      optionen: [
        'Weil die Toleranzen zu eng für die verfügbaren Messmittel sind.',
        'Weil bei einigen Dutzend Systemen pro Jahr die Stückzahlen für belastbare Statistik nicht ausreichen.',
        'Weil Cpk für optische Merkmale nicht definiert ist.',
        'Weil die Merkmale nicht normalverteilt sind.'
      ],
      richtig: 1,
      erklaerung: 'Cpk ist eine statistische Kenngröße und braucht Stückzahlen. Bei einer Fertigung im zweistelligen Jahresbereich ist das Vertrauensintervall so breit, dass die Punktschätzung wenig aussagt — die zentrale Schwierigkeit im Anlauf, die Modul 6 behandelt.'
    }
  ]
},

/* ═══════════════════════════ MODUL 1 ═══════════════════════════ */
{
  id: 'grundlagen',
  nr: 1,
  titel: 'Grundlagen der Justage',
  kurz: 'Was ein Wellenfrontfehler ist, welche Aberration welche Ursache verrät und warum Justage ein Optimierungsproblem mit gekoppelten Stellgrößen ist.',
  ziel: 'Sie können aus einem Wellenfrontergebnis ablesen, <em>welche</em> mechanische Ursache dahintersteckt — und begründen, warum manche Fehler durch Justage korrigierbar sind und andere prinzipiell nicht.',
  jobBezug: 'Ohne diese Grundlage ist der Rest der Rolle nicht ausführbar: Wer Fertigungsprozesse der Optikmontage bewerten und mit R&amp;D über Ergebnisse diskutieren soll, muss die Sprache der Wellenfront beherrschen. Genau das meint die Anforderung nach Systemverständnis im Umgang mit komplexen technischen Systemen.',
  sim: 'alignment',
  simTitel: 'Simulation: Stellgrößen → Wellenfrontfehler',
  simIntro: 'Jedes eingelegte Bauteil bringt einen unbekannten Fertigungs- und Fassungsfehler mit. Ihre Aufgabe ist die reale Aufgabe an der Justagestation: die Stellgrößen so einstellen, dass der RMS-Wellenfrontfehler unter 0,030 λ fällt. Achten Sie darauf, wie sich das Muster der Wellenfrontkarte ändert — es sagt Ihnen, welche Stellgröße noch danebenliegt.',
  begriffe: ['Wellenfront', 'Zernike-Polynome', 'Koma', 'Astigmatismus', 'Strehl-Verhältnis', 'Dezentrierung'],

  abschnitte: [
    {
      h: 'Was in der Justage eigentlich eingestellt wird',
      p: [
        'Ein Objektiv für die Lithografie besteht aus vielen optischen Elementen, die jedes für sich schon extrem genau gefertigt sind. Trotzdem entsteht beim Zusammenbau ein Systemfehler — denn jedes Element hat sechs Freiheitsgrade, und jede Abweichung davon wirkt sich auf die durchlaufende Wellenfront aus.',
        'Justage ist die gezielte Kompensation: Man verschiebt und verkippt Elemente nicht, um sie „richtig" hinzustellen, sondern um die <em>Summe</em> aller Fehler zu minimieren. Ein Element steht am Ende der Justage oft messbar außerhalb seiner Nennlage — weil es dort den Fehler eines anderen Elements aufhebt.'
      ],
      bullets: [
        '<strong>Dezentrierung (X, Y)</strong> — lateraler Versatz der Elementachse, in µm',
        '<strong>Verkippung (um X, um Y)</strong> — Winkelfehler der Elementachse, in µrad',
        '<strong>Axialer Abstand (Z)</strong> — Luftabstand zum Nachbarelement, in µm',
        '<strong>Rotation um Z</strong> — nur relevant bei nicht rotationssymmetrischen Elementen (Asphären, Freiformen)'
      ],
      callout: {
        typ: 'job',
        titel: 'Warum das für die Rolle zählt',
        text: 'Die Justage ist in der Regel der Engpass des Wertstromabschnitts (Modul 4) und der Ort, an dem Prozessstreuung entsteht (Modul 3). Wer die physikalische Kopplung nicht versteht, optimiert an der falschen Station.'
      }
    },

    {
      h: 'Wie das in der Fertigung tatsächlich aussieht',
      p: [
        'Eine Justagestation ist kein Arbeitsplatz mit Stellschrauben, an denen jemand nach Augenmaß dreht. Sie ist ein Messplatz: Das Objektivmodul steht auf einem Manipulator, ein Interferometer misst die Wellenfront, ein Rechner berechnet daraus die Korrektur, der Manipulator fährt sie an — und dann wird erneut gemessen.'
      ],
      grafik: 'messplatz',
      grafikText: '<strong>Abb. 1 — Der Messplatz.</strong> Der Laserstrahl läuft durch die Referenzfläche, durch das Modul auf den Planspiegel und denselben Weg zurück (Doppelpass). Die Interferenz zwischen Referenz- und Prüfwelle ergibt das Interferogramm. Alles steht auf einem luftgelagerten Tisch in temperierter Umgebung — bei Messgrößen im Nanometerbereich sind Trittschall, ein Temperaturgradient über dem Tisch oder eine offene Tür bereits Störgrößen.',
      bullets: [
        '<strong>Eine Messung dauert.</strong> Es wird über viele Interferogramme gemittelt, um Luftturbulenz herauszurechnen. Dazu kommt die Einschwingzeit nach jeder Verstellung. Ein Justagedurchlauf ist eine Sache von Minuten bis Stunden, nicht von Sekunden — deshalb ist die Justage im Wertstrom typischerweise der Engpass (Modul 4).',
        '<strong>Der Mensch bedient, der Rechner entscheidet die Richtung.</strong> Aus der gemessenen Zernike-Zerlegung berechnet die Software über die Empfindlichkeitsmatrix, welche Stellgröße wie weit fahren muss. Ohne diese Rechnung würde man in einem gekoppelten System endlos im Kreis justieren.',
        '<strong>Am Ende wird fixiert — und das verändert das Ergebnis.</strong> Verkleben, Verschrauben oder Verspannen bringt Kräfte in die Fassung ein. Deshalb wird nach dem Aushärten erneut gemessen; genau dieses Setzverhalten ist die Ursache im Reklamationsfall in Modul 5.',
        '<strong>Handhabung ist Risiko.</strong> Jedes Umspannen und jeder zusätzliche Prüfschritt bedeutet Kontaminations- und Beschädigungsrisiko an Bauteilen mit hohem Wert. „Nochmal messen" ist nie kostenlos.'
      ]
    },

    {
      h: 'Was Sie am Bauteil einstellen',
      p: [
        'Der folgende Längsschnitt zeigt dieselben Stellgrößen wie die Simulation weiter unten, nur physisch: drei Linsen in einer gemeinsamen Fassung, gehalten von Distanzringen und Klebestellen.'
      ],
      grafik: 'modulschnitt',
      grafikText: '<strong>Abb. 2 — Schnitt durch ein Objektivmodul.</strong> Die Abweichungen sind stark überhöht gezeichnet. Real geht es um Dezentrierungen von wenigen Mikrometern bei Fassungsdurchmessern im Bereich von 100 bis 300 mm — das Verhältnis entspricht etwa der Dicke eines Haares zur Breite einer Zimmertür. Genau deshalb ist die Wellenfrontmessung nötig: Mit dem Auge oder einer gewöhnlichen Längenmessung ist dieser Bereich nicht zugänglich.',
      callout: {
        typ: '',
        titel: 'Die Verbindung zur Simulation',
        text: 'Die Schieberegler im Simulator weiter unten sind genau diese drei Größen: Δy (Dezentrierung), α (Verkippung) und d (Luftabstand). Die Farbkarte zeigt, was daraus in der Wellenfront wird.'
      }
    },

    {
      h: 'Der Justagezyklus',
      p: [
        'Justage ist ein Regelkreis mit Abbruchkriterium — und mit einem zweiten, ebenso wichtigen Ausgang:'
      ],
      grafik: 'zyklus',
      grafikText: '<strong>Abb. 3 — Der Ablauf.</strong> Der rechte Ausgang ist der fachlich anspruchsvolle. Wenn sich der Fehler über mehrere Iterationen nicht mehr verbessert, ist er nicht durch Lagekorrektur erreichbar — die Ursache liegt im Bauteil, in der Fassung oder im Design. Das rechtzeitig zu erkennen und belegt zu übergeben, statt weiter zu iterieren, ist die eigentliche Leistung an dieser Station.'
    },

    {
      h: 'Die Wellenfront als gemeinsame Sprache',
      p: [
        'Statt jedes Element einzeln zu bewerten, misst man das Ergebnis: die Wellenfront, die das System verlässt. Ideal wäre eine perfekte Kugelwelle; die Abweichung davon ist der Wellenfrontfehler W(ρ, θ), angegeben in Wellenlängen λ.',
        'Diese Abweichungsfläche wird nach <strong>Zernike-Polynomen</strong> zerlegt — einem orthogonalen Funktionssatz auf der Kreisscheibe. Der Nutzen ist praktisch, nicht mathematisch: Jeder Koeffizient entspricht einem benannten Fehlertyp mit einer typischen mechanischen Ursache.'
      ],
      formel: 'W(ρ, θ) = Σ aᵢ · Zᵢ(ρ, θ)          <span class="fx-note">ρ = normierter Pupillenradius, θ = Azimut</span>\n\nRMS = √( Σ aᵢ² )                <span class="fx-note">bei RMS-normierten Zernikes, ohne Kolben/Kipp</span>\n\nStrehl ≈ exp( −(2π · RMS)² )    <span class="fx-note">RMS in Wellenlängen λ</span>',
      tabelle: {
        kopf: ['Zernike', 'Aberration', 'Typische Ursache in der Montage', 'Durch Justage korrigierbar?'],
        zeilen: [
          ['Z4', 'Defokus', 'Abweichung im axialen Luftabstand', 'ja — über Z-Stellgröße'],
          ['Z5 / Z6', 'Astigmatismus 45° / 0°', 'Fassungsspannung, ungleichmäßige Verklebung, Schwerkraftdurchbiegung', 'teilweise — Ursache ist meist mechanisch'],
          ['Z7 / Z8', 'Koma y / x', 'Dezentrierung und Verkippung von Elementen', 'ja — die klassische Justageaufgabe'],
          ['Z9 / Z10', 'Dreiwelligkeit (Trefoil)', 'Dreipunkt-Auflage der Fassung', 'nein — Fassungskonstruktion'],
          ['Z11', 'Sphärische Aberration', 'Radien-, Dicken- oder Brechzahlabweichung des Glases', 'nein — Bauteil- oder Designthema']
        ],
        fuss: 'Noll-Nummerierung. Die rechte Spalte ist die eigentlich wichtige: Sie entscheidet, ob ein Befund an die Justage, an die Fassungskonstruktion oder an die Fertigung des Bauteils geht.'
      },
      callout: {
        typ: 'ok',
        titel: 'Die diagnostische Kernregel',
        text: 'Koma zeigt auf Lagefehler. Astigmatismus zeigt auf Spannung. Sphärische Aberration und Trefoil zeigen auf Bauteil bzw. Fassung — dort ist Nachjustieren verlorene Zeit. Diese drei Sätze ersetzen im Alltag einen großen Teil der Ursachensuche.'
      }
    },

    {
      h: 'Warum Justage ein gekoppeltes Optimierungsproblem ist',
      p: [
        'Keine Stellgröße wirkt isoliert. Eine Dezentrierung erzeugt hauptsächlich Koma, aber über die Fassung auch etwas Astigmatismus. Eine Verkippung erzeugt Koma <em>und</em> Astigmatismus in anderem Verhältnis. Deshalb lässt sich Justage nicht als Folge unabhängiger Einstellschritte abarbeiten.',
        'Formal beschreibt man das über eine Empfindlichkeitsmatrix S: Sie bildet den Vektor der Stellgrößen auf den Vektor der Zernike-Koeffizienten ab. Die Justage sucht dann die Stellgrößen, die den resultierenden RMS minimieren — in der Praxis über ein rechnergestütztes Verfahren, das aus der Messung die Korrektur berechnet.'
      ],
      formel: 'a = S · x + a₀        <span class="fx-note">a = Zernike-Koeffizienten, x = Stellgrößen, a₀ = Bauteilfehler</span>\n\nmin ‖ S · x + a₀ ‖₂    <span class="fx-note">gesucht: x, das den RMS minimiert</span>',
      callout: {
        typ: 'warn',
        titel: 'Die Grenze der Justage',
        text: 'Ist ein Fehleranteil nicht im Bild der Matrix S enthalten — er lässt sich durch keine Kombination der Stellgrößen erzeugen —, dann ist er durch Justage prinzipiell nicht korrigierbar. Genau das ist der Moment, in dem der Prozessingenieur an R&amp;D oder an die Bauteilfertigung übergeben muss statt weiterzujustieren. Das zu erkennen und zu belegen ist Kernaufgabe der Rolle.'
      }
    },

    {
      h: 'Wann ist gut genug?',
      p: [
        'Zwei Kennzahlen dominieren die Bewertung. Der <strong>RMS-Wellenfrontfehler</strong> ist die quadratisch gemittelte Abweichung — er reagiert robust und ist die übliche Spezifikationsgröße. Das <strong>Strehl-Verhältnis</strong> übersetzt ihn in die Abbildungsleistung: das Verhältnis der erreichten zur idealen Spitzenintensität.',
        'Als beugungsbegrenzt gilt nach dem Maréchal-Kriterium ein System mit RMS ≤ λ/14 ≈ 0,071 λ, was Strehl ≈ 0,8 entspricht. In der Lithografie liegen die tatsächlichen Anforderungen deutlich darunter — dort geht es um wenige Milli-λ, weil sich der Wellenfrontfehler direkt in Strukturtreue auf dem Wafer übersetzt.'
      ],
      callout: {
        typ: '',
        titel: 'Peak-to-Valley ist die schlechtere Kennzahl',
        text: 'PV ist die Differenz zwischen höchstem und tiefstem Punkt der Wellenfront. Ein einziger Ausreißer — auch ein Messartefakt — bestimmt den Wert. Deshalb wird spezifiziert über RMS und allenfalls ergänzend über PV berichtet.'
      }
    }
  ],

  quiz: [
    {
      frage: 'Die Endprüfung eines Moduls zeigt erhöhten Astigmatismus (Z5/Z6), Koma und Defokus sind unauffällig. Wo suchen Sie zuerst?',
      optionen: [
        'Bei der Dezentrierung der Elemente — sie ist die häufigste Justageabweichung.',
        'Bei mechanischer Spannung: Fassung, Verklebung, Aufspannkraft.',
        'Bei den Radien der Linsen aus der Bauteilfertigung.',
        'Beim axialen Luftabstand zwischen den Elementen.'
      ],
      richtig: 1,
      erklaerung: 'Astigmatismus ohne begleitende Koma ist die Signatur mechanischer Spannung — Fassungsspannung, ungleichmäßige Verklebung, zu hohe Spannkraft der Vorrichtung. Dezentrierung würde vor allem Koma erzeugen, Abstandsfehler Defokus, Radienabweichungen sphärische Aberration.'
    },
    {
      frage: 'Ein Modul zeigt erhöhte sphärische Aberration (Z11). Der Werker justiert nach und bekommt sie nicht weg. Was ist der richtige nächste Schritt?',
      optionen: [
        'Systematisch alle Stellgrößen kombiniert durchfahren, bis das Optimum gefunden ist.',
        'Die Toleranz für Z11 anheben, da der Wert offensichtlich prozessbedingt ist.',
        'Übergabe an Bauteilfertigung oder R&D — Z11 ist rotationssymmetrisch und durch Lagejustage nicht erzeugbar.',
        'Die Verklebung erneuern, da Spannung die wahrscheinlichste Ursache ist.'
      ],
      richtig: 2,
      erklaerung: 'Sphärische Aberration ist rotationssymmetrisch. Dezentrierung und Verkippung erzeugen richtungsabhängige Fehler und können sie deshalb nicht kompensieren — der Fehler liegt außerhalb des Stellbereichs der Justage. Weiterjustieren verbrennt Kapazität an der teuersten Station. Ursache sind typischerweise Radius, Mittendicke oder Brechzahl des Glases.'
    },
    {
      frage: 'Warum steht ein Element nach erfolgreicher Justage häufig messbar außerhalb seiner Nennlage?',
      optionen: [
        'Weil die Justagevorrichtung eine Restungenauigkeit hat, die man in Kauf nimmt.',
        'Weil die Justage die Summe aller Fehler minimiert und ein Element bewusst den Fehler eines anderen kompensiert.',
        'Weil die Nennlage aus dem Design für die Fertigung nur eine Näherung ist.',
        'Weil sich die Elemente nach dem Verkleben setzen.'
      ],
      richtig: 1,
      erklaerung: 'Justage ist Kompensation, nicht Positionierung. Optimiert wird die resultierende Wellenfront des Systems, nicht die geometrische Lage des Einzelelements. Deshalb ist eine Lagemessung allein kein Qualitätsnachweis — der Nachweis läuft immer über die Wellenfront.'
    },
    {
      frage: 'Ein System hat einen RMS-Wellenfrontfehler von 0,071 λ. Was folgt daraus?',
      optionen: [
        'Es ist fehlerfrei im Sinne der Beugungsbegrenzung, Strehl ≈ 1,0.',
        'Es liegt genau an der Maréchal-Grenze, Strehl ≈ 0,8 — für Lithografieoptik weit außerhalb der Spezifikation.',
        'Es ist unbrauchbar, da RMS über 0,05 λ liegt.',
        'Ohne Angabe des PV-Werts ist keine Aussage möglich.'
      ],
      richtig: 1,
      erklaerung: 'λ/14 ≈ 0,071 λ ist genau das Maréchal-Kriterium, Strehl ≈ 0,8 — die klassische Grenze für „beugungsbegrenzt". Für Lithografieobjektive ist das dennoch um Größenordnungen zu schlecht: Dort wird im Bereich weniger Milli-λ spezifiziert, weil sich der Wellenfrontfehler direkt in die Strukturtreue auf dem Wafer übersetzt.'
    },
    {
      frage: 'Warum wird in der Spezifikation RMS statt Peak-to-Valley verwendet?',
      optionen: [
        'RMS ist einfacher zu messen als PV.',
        'PV lässt sich nicht in Wellenlängen angeben.',
        'PV wird von einzelnen Ausreißern oder Messartefakten bestimmt, RMS bewertet die gesamte Fläche.',
        'RMS und PV sind gleichwertig; die Wahl ist historisch bedingt.'
      ],
      richtig: 2,
      erklaerung: 'PV ist die Differenz zwischen Extremwerten und damit von einem einzigen Punkt abhängig — auch von einem Staubkorn oder einem Messartefakt. RMS mittelt über die Pupille und korreliert deshalb wesentlich besser mit der tatsächlichen Abbildungsleistung.'
    }
  ]
},

/* ═══════════════════════════ MODUL 2 ═══════════════════════════ */
{
  id: 'messtechnik',
  nr: 2,
  titel: 'Messtechnik & Messsystemanalyse',
  kurz: 'Wie in der Optikmontage gemessen wird — und wie man beweist, dass die Messung überhaupt taugt, bevor man Prozessentscheidungen darauf stützt.',
  ziel: 'Sie können beurteilen, ob ein Messsystem für eine gegebene Toleranz geeignet ist, und erkennen, wann eine vermeintliche Prozessstreuung in Wahrheit Messrauschen ist.',
  jobBezug: 'Von der Rolle wird Erfahrung in der Bewertung und Analyse von Fertigungsprozessen erwartet — in der Halbleiterfertigung oder in Messtechnik und Optik. Jede Prozessbewertung steht und fällt mit der Messdatenqualität: Ein Verbesserungsprojekt auf Basis eines nicht fähigen Messsystems ist verlorene Zeit — und wird in der Regel erst nach Monaten als solches erkannt.',
  sim: 'msa',
  simTitel: 'Simulation: Gage R&R',
  simIntro: 'Verschieben Sie die Streuungsanteile und beobachten Sie, wie sich %GRR und die Anzahl unterscheidbarer Kategorien verändern. Interessant ist besonders der Fall, bei dem die Teilestreuung groß und das Messsystem trotzdem nicht fähig ist — dann sieht der Prozess in der Regelkarte instabil aus, obwohl er es nicht ist.',
  begriffe: ['Interferometrie', 'Computergeneriertes Hologramm', 'Autokollimation', 'Messsystemanalyse', 'Gage R&amp;R', 'Wiederholbarkeit', 'Vergleichbarkeit', 'Messunsicherheit'],

  abschnitte: [
    {
      h: 'Die Messverfahren der Optikmontage',
      p: [
        'In der Justage wird selten direkt „die Position" gemessen — gemessen wird das optische Ergebnis. Die wichtigsten Verfahren:'
      ],
      karten: [
        { titel: 'Interferometrie (Fizeau, Twyman-Green)',
          text: 'Überlagert die Prüfwelle mit einer Referenzwelle; aus dem Streifenmuster wird die Wellenfront rekonstruiert. Auflösung im Bereich weniger Nanometer. Empfindlich gegen Vibration, Luftturbulenz und Temperaturgradienten — deshalb die aufwendige Umgebungskonditionierung. <em>Typischer Fehlerfall:</em> Driftende Umgebungsbedingungen erzeugen scheinbare Prozessstreuung.' },
        { titel: 'CGH-gestützte Prüfung',
          text: 'Ein computergeneriertes Hologramm erzeugt eine Referenzwellenfront beliebiger Form und macht damit Asphären und Freiformen interferometrisch prüfbar. <em>Typischer Fehlerfall:</em> Justage des CGH selbst — Fehler des Normals gehen direkt als Systematik in alle Messungen ein.' },
        { titel: 'Autokollimation',
          text: 'Winkelmessung über das zurückreflektierte Bild eines Fadenkreuzes. Robust, schnell, im Aufbau der Justagestation für die Grobausrichtung eingesetzt. <em>Typischer Fehlerfall:</em> Verwechslung von Reflexen an verschiedenen Flächen.' },
        { titel: 'Taktile und optische Koordinatenmesstechnik',
          text: 'Liefert geometrische Lage und Form der Fassungsteile. Bindeglied zwischen Mechanikfertigung und optischem Ergebnis — hier entstehen die Eingangsgrößen der Toleranzkette aus Modul 6.' }
      ]
    },

    {
      h: 'Warum die Messung zuerst geprüft wird',
      p: [
        'Jede beobachtete Streuung setzt sich aus Prozess- und Messstreuung zusammen. Da sich Varianzen addieren, gilt:'
      ],
      formel: 'σ²_beobachtet = σ²_Prozess + σ²_Messung\n\nσ_GRR = √( σ²_EV + σ²_AV )      <span class="fx-note">EV = Wiederholbarkeit, AV = Vergleichbarkeit</span>\n\n%GRR = 6 · σ_GRR / (OSG − USG) · 100\n\nndc = 1,41 · σ_PV / σ_GRR       <span class="fx-note">unterscheidbare Kategorien, gefordert ≥ 5</span>',
      tabelle: {
        kopf: ['%GRR (bezogen auf Toleranz)', 'Bewertung', 'Konsequenz für die Prozessarbeit'],
        zeilen: [
          ['&lt; 10 %', 'fähig', 'Messwerte dürfen als Prozessverhalten interpretiert werden'],
          ['10–30 %', 'bedingt fähig', 'Nutzbar mit Vorsicht; Reaktionsgrenzen weiter fassen, Verbesserungspotenzial dokumentieren'],
          ['&gt; 30 %', 'nicht fähig', 'Keine Prozessbewertung möglich — zuerst das Messsystem verbessern'],
          ['ndc &lt; 5', 'zu grob', 'Regelkarte kann Prozessveränderungen nicht auflösen']
        ]
      },
      callout: {
        typ: 'warn',
        titel: 'Der teuerste Fehler in der Prozessarbeit',
        text: 'Ein Prozessverbesserungsprojekt auf Basis eines nicht fähigen Messsystems liefert scheinbare Erfolge — die Streuung „sinkt", weil man an einem Rauschen misst. Nach der Umstellung tritt das alte Problem wieder auf, und niemand versteht warum. Deshalb steht in DMAIC die Messsystemanalyse fest in der Measure-Phase, <em>vor</em> jeder Analyse.'
      }
    },

    {
      h: 'Wiederholbarkeit und Vergleichbarkeit trennen',
      p: [
        'Die Unterscheidung ist nicht akademisch, sie zeigt direkt auf die Maßnahme:'
      ],
      bullets: [
        '<strong>Wiederholbarkeit (EV)</strong> dominiert → das Messmittel selbst ist die Grenze. Maßnahmen: Umgebung stabilisieren (Temperatur, Vibration, Luftströmung), Mittelung über mehr Einzelmessungen, besseres Gerät.',
        '<strong>Vergleichbarkeit (AV)</strong> dominiert → Menschen und Aufspannungen streuen. Maßnahmen: Standardarbeit, eindeutige Aufnahmen, Poka Yoke, Schulung. Deutlich günstiger und meist schneller wirksam.',
        '<strong>Beides klein, Prozess trotzdem streuend</strong> → gut, dann ist die Streuung echt und Modul 3 ist der richtige nächste Schritt.'
      ],
      callout: {
        typ: 'ok',
        titel: 'Praxisregel für die Frontline',
        text: 'Wenn ein Werker sagt „das Teil misst sich jedes Mal anders", ist das eine Aussage über die Wiederholbarkeit — nicht über das Teil. Diese Sätze sind wertvolle Hinweise und gehören dokumentiert, nicht wegdiskutiert.'
      }
    },

    {
      h: 'Messunsicherheit gegen Toleranz',
      p: [
        'Bei der Gut/Schlecht-Entscheidung an der Toleranzgrenze entstehen zwei Fehlerarten: Gutteile werden verworfen (Pseudoausschuss) oder Schlechtteile freigegeben (Durchschlupf). Beide skalieren direkt mit der Messunsicherheit.',
        'Deshalb definiert die Normung (z. B. ISO 14253-1) das Prinzip der <em>Konformitätszone</em>: Die Annahmegrenze wird um die erweiterte Messunsicherheit nach innen versetzt. Wer das nicht tut, gibt systematisch Teile frei, deren Konformität nicht belegt ist — im Reklamationsfall (Modul 5) eine schwer zu verteidigende Position.'
      ],
      callout: {
        typ: 'job',
        titel: 'Typische Frontline-Situation',
        text: 'Ein Modul misst 8,1 mλ bei einer Grenze von 8,0 mλ, die Messunsicherheit beträgt ±0,4 mλ. Freigeben, sperren oder nachmessen? Die fachlich saubere Antwort ist: Die Konformität ist nicht belegt, also keine Freigabe ohne zusätzliche Absicherung. Genau solche Positionen muss man in dieser Rolle „vertreten und verteidigen" können — so steht es im Anforderungsprofil.'
      }
    }
  ],

  quiz: [
    {
      frage: 'Ein Merkmal hat eine Toleranzbreite von 20 nm. Die Messsystemanalyse ergibt σ_GRR = 1,4 nm. Ist das Messsystem fähig?',
      optionen: [
        'Ja: %GRR = 6 · 1,4 / 20 = 42 % — deutlich unter 100 %.',
        'Ja: %GRR = 6 · 1,4 / 20 · 100 = 42 %, das liegt im bedingt fähigen Bereich.',
        'Nein: %GRR = 42 % liegt über 30 % — das Messsystem ist nicht fähig.',
        'Die Frage ist ohne Angabe der Teilestreuung nicht beantwortbar.'
      ],
      richtig: 2,
      erklaerung: '%GRR = 6 · 1,4 / 20 · 100 = 42 %. Über 30 % gilt das Messsystem nach AIAG als nicht fähig: Fast die Hälfte der Toleranzbreite wird von der Messstreuung belegt. Prozessbewertungen auf dieser Basis sind nicht belastbar.'
    },
    {
      frage: 'Die Gage R&R zeigt: AV ist dreimal so groß wie EV. Welche Maßnahme setzen Sie zuerst um?',
      optionen: [
        'Ein präziseres Interferometer beschaffen.',
        'Aufspannung und Messablauf standardisieren und die Prüfer darauf einweisen.',
        'Die Toleranz mit dem Kunden neu verhandeln.',
        'Die Anzahl der Wiederholmessungen je Teil erhöhen.'
      ],
      richtig: 1,
      erklaerung: 'AV ist die Streuung zwischen Prüfern und Aufspannungen — ein Verfahrens-, kein Geräteproblem. Standardarbeit und eindeutige Aufnahmen wirken hier schnell und günstig. Ein besseres Gerät würde EV senken, also genau den kleineren Anteil.'
    },
    {
      frage: 'Ein Prozess zeigt in der Regelkarte auffällig viel Streuung. Die MSA ergibt %GRR = 45 %. Was folgt daraus?',
      optionen: [
        'Der Prozess ist instabil und muss sofort verbessert werden.',
        'Ein großer Teil der sichtbaren Streuung ist Messrauschen — Prozessaussagen sind derzeit nicht belastbar.',
        'Die Eingriffsgrenzen müssen enger gefasst werden.',
        'Die Untergruppengröße muss erhöht werden, um die Streuung auszumitteln.'
      ],
      richtig: 1,
      erklaerung: 'Bei %GRR = 45 % dominiert das Messrauschen. Die Regelkarte zeigt dann überwiegend Messstreuung. Prozesseingriffe auf dieser Basis sind Overcontrol — sie verschlechtern das Ergebnis. Erst das Messsystem in Ordnung bringen, dann den Prozess bewerten.'
    },
    {
      frage: 'Was besagt ndc (number of distinct categories) = 3?',
      optionen: [
        'Das Messsystem kann drei verschiedene Merkmale gleichzeitig erfassen.',
        'Das Messsystem kann innerhalb der Teilestreuung nur drei Stufen unterscheiden — zu grob für Prozessregelung (gefordert: ≥ 5).',
        'Drei Prüfer wurden in die Analyse einbezogen.',
        'Der Prozess hat drei besondere Ursachen.'
      ],
      richtig: 1,
      erklaerung: 'ndc = 1,41 · σ_PV / σ_GRR beschreibt, in wie viele unterscheidbare Klassen das Messsystem die vorhandene Teilestreuung auflösen kann. Unter 5 taugt es allenfalls für Gut/Schlecht-Sortierung, nicht für Regelkarten oder Prozessverbesserung.'
    },
    {
      frage: 'Ein Modul misst 8,1 mλ, die Spezifikationsgrenze liegt bei 8,0 mλ, die erweiterte Messunsicherheit bei ±0,4 mλ. Wie entscheiden Sie?',
      optionen: [
        'Freigeben — die Abweichung liegt innerhalb der Messunsicherheit.',
        'Sperren — der Messwert liegt über der Grenze, das genügt.',
        'Konformität ist nicht belegt; keine Freigabe ohne zusätzliche Absicherung (Wiederholmessung mit belastbarerem Verfahren oder dokumentierte Sonderfreigabe).',
        'Die Spezifikationsgrenze um die Messunsicherheit anheben.'
      ],
      richtig: 2,
      erklaerung: 'Nach ISO 14253-1 belegt ein Messwert im Unsicherheitsband weder Konformität noch Nichtkonformität. „Innerhalb der Unsicherheit, also gut" ist genauso falsch wie „drüber, also Ausschuss". Der saubere Weg ist Absicherung oder eine bewusste, dokumentierte Sonderfreigabe — nicht das stille Anheben der Grenze.'
    }
  ]
},

/* ═══════════════════════════ MODUL 3 ═══════════════════════════ */
{
  id: 'spc',
  nr: 3,
  titel: 'Prozessstabilität & Fähigkeit',
  kurz: 'Regelkarten, Cp/Cpk und die schwierigste Disziplin der Frontline-Arbeit: erkennen, wann man eingreifen muss — und wann gerade nicht.',
  ziel: 'Sie können eine Regelkarte lesen, zwischen zufälliger und besonderer Ursache unterscheiden und begründen, warum Nachstellen ohne Signal die Streuung erhöht.',
  jobBezug: 'Prozessstabilität ist neben Qualität und Kosteneffizienz eines der drei erklärten Ziele dieser Rolle. Und es ist ihr Alltag: An der Justagestation entscheidet sich täglich, ob auf eine Abweichung reagiert wird — und jede Fehlentscheidung in beide Richtungen kostet.',
  sim: 'spc',
  simTitel: 'Simulation: Regelkarte mit Drift und Sprung',
  simIntro: 'Stellen Sie zuerst Drift und Sprung auf null und beobachten Sie einen beherrschten Prozess — die Punkte streuen, ohne dass etwas passiert. Erhöhen Sie dann die Drift schrittweise und achten Sie darauf, welche Western-Electric-Regel <em>zuerst</em> anschlägt. Vergleichen Sie außerdem, wie sich engere Eingriffsgrenzen (größeres n) auf die Zahl der Fehlalarme auswirken.',
  begriffe: ['Statistische Prozesslenkung', 'Eingriffsgrenze', 'Prozessfähigkeit', 'Besondere Ursache', 'Overcontrol'],

  abschnitte: [
    {
      h: 'Zwei Arten von Streuung',
      p: [
        'Der zentrale Gedanke der statistischen Prozesslenkung ist eine Unterscheidung, die vor Deming und Shewhart niemand konsequent gezogen hat:'
      ],
      bullets: [
        '<strong>Zufällige Streuung (Systemursachen)</strong> — die Summe vieler kleiner, immer vorhandener Einflüsse. Sie gehört zum Prozess. Reagieren macht es schlechter; verbessern kann sie nur, wer den Prozess selbst ändert.',
        '<strong>Besondere Ursachen</strong> — identifizierbare, von außen wirkende Einflüsse: neue Charge, gewechseltes Werkzeug, andere Vorrichtung, anderer Prüfer, Temperatursprung. Sie erzeugen Signale und müssen gefunden und abgestellt werden.'
      ],
      callout: {
        typ: 'warn',
        titel: 'Der teure Fehler heißt Overcontrol',
        text: 'Wird auf zufällige Streuung mit Nachstellen reagiert, addiert sich der Korrektureingriff zur natürlichen Streuung — die Prozessstreuung steigt nachweisbar. Deming hat das mit dem Trichterexperiment demonstriert. In der Justage ist das besonders relevant, weil Nachstellen dort scheinbar immer möglich ist.'
      }
    },

    {
      h: 'Die Regelkarte und ihre Grenzen',
      p: [
        'Eingriffsgrenzen werden aus der Prozessstreuung berechnet, üblicherweise als ±3σ um die Mittellinie. Bei Untergruppen der Größe n gilt für die Mittelwertkarte:'
      ],
      formel: 'OEG / UEG = x̿ ± 3 · σ / √n      <span class="fx-note">Eingriffsgrenzen — Aussage über den Prozess</span>\n\nOSG / USG                       <span class="fx-note">Spezifikationsgrenzen — Vorgabe des Kunden</span>',
      callout: {
        typ: 'bad',
        titel: 'Die Verwechslung, die am meisten Schaden anrichtet',
        text: 'Eingriffs- und Spezifikationsgrenzen haben nichts miteinander zu tun. Eingriffsgrenzen sagen, was der Prozess <em>tut</em>; Spezifikationsgrenzen, was der Kunde <em>braucht</em>. Spezifikationsgrenzen in die Regelkarte einzuzeichnen und danach zu reagieren, ist der Klassiker: Man reagiert zu spät auf Prozessveränderungen und zu früh auf zufällige Streuung.'
      },
      tabelle: {
        kopf: ['Western-Electric-Regel', 'Signal', 'Typische Bedeutung'],
        zeilen: [
          ['Regel 1', '1 Punkt außerhalb 3σ', 'Sprung, Einzelereignis, grober Fehler'],
          ['Regel 2', '2 von 3 Punkten jenseits 2σ (gleiche Seite)', 'Deutliche Mittelwertverschiebung'],
          ['Regel 3', '4 von 5 Punkten jenseits 1σ (gleiche Seite)', 'Beginnende Verschiebung'],
          ['Regel 4', '8 Punkte in Folge auf einer Seite', 'Drift, Verschleiß, Temperaturgang']
        ],
        fuss: 'Regel 4 schlägt bei langsamer Drift oft an, bevor ein einziger Punkt die 3σ-Grenze verletzt — deshalb reicht Regel 1 allein nicht aus.'
      }
    },

    {
      h: 'Welche Karte für welches Merkmal',
      p: [
        'Die Mittelwertkarte aus der Simulation ist nur eine von mehreren Bauarten. Die Wahl ist keine Geschmacksfrage: Eine falsch gewählte Karte signalisiert entweder ständig oder nie.'
      ],
      tabelle: {
        kopf: ['Karte', 'Wann', 'Besonderheit in der Optikmontage'],
        zeilen: [
          ['x̄ / R oder x̄ / s', 'messbares Merkmal, Untergruppen ab n = 2', 'Setzt voraus, dass man mehrere vergleichbare Teile kurz hintereinander fertigt'],
          ['Einzelwert / gleitende Spannweite (I-MR)', 'jedes Teil ist ein Unikat, n = 1', '<strong>Der Regelfall hier.</strong> Bei Stückzahlen im einstelligen Bereich je Woche gibt es keine natürlichen Untergruppen'],
          ['p- oder np-Karte', 'Anteil fehlerhafter Einheiten', 'Braucht große Stückzahlen — in dieser Fertigung praktisch unbrauchbar'],
          ['EWMA oder CUSUM', 'kleine Verschiebungen früh erkennen', 'Deutlich empfindlicher für Drift als die Shewhart-Karte; lohnt sich, wo eine späte Entdeckung teuer ist']
        ],
        fuss: 'I-MR = individuals and moving range. EWMA = exponentiell gewichteter gleitender Mittelwert, CUSUM = kumulierte Summe.'
      },
      callout: {
        typ: 'warn',
        titel: 'Die Falle bei n = 1',
        text: 'Die I-MR-Karte schätzt die Streuung aus der Differenz aufeinanderfolgender Werte. Enthält diese Differenz bereits eine Drift, werden die Eingriffsgrenzen zu weit — und die Karte signalisiert nie. Genau deshalb ist bei Einzelwerten die Prüfung auf Muster (Regel 4) wichtiger als die Grenzverletzung.'
      }
    },

    {
      h: 'Rationale Untergruppen',
      p: [
        'Eine Untergruppe soll nur zufällige Streuung enthalten — alles andere gehört zwischen die Untergruppen. Diese Regel klingt akademisch und ist der häufigste Konstruktionsfehler realer Regelkarten.',
        'Beispiel: Werden für eine Untergruppe vier Module aus <em>verschiedenen</em> Schichten zusammengefasst, steckt der Schichtunterschied in der Untergruppenstreuung. Die Eingriffsgrenzen werden dadurch breiter, und die Karte kann den Schichtunterschied nie mehr als Signal zeigen — sie hat ihn zur Normalität erklärt.'
      ],
      bullets: [
        '<strong>Innerhalb der Untergruppe</strong> soll nur wirken, was ohnehin immer wirkt: kurzfristige Streuung unter gleichen Bedingungen',
        '<strong>Zwischen den Untergruppen</strong> soll alles liegen, was Sie entdecken wollen: Schicht, Charge, Vorrichtung, Werker, Tageszeit',
        '<strong>Prüffrage:</strong> „Welche Veränderung soll diese Karte finden?" Wenn die Antwort ein Faktor ist, der innerhalb einer Untergruppe variiert, ist die Untergruppierung falsch'
      ],
      callout: {
        typ: 'job',
        titel: 'Praktische Anwendung',
        text: 'Im Reklamationsfall aus Modul 5 lief die Justage auf zwei Vorrichtungen. Hätte man beide in dieselbe Untergruppe gemischt, wäre der Vorrichtungsunterschied in der Streuung verschwunden — und die Ist/Ist-nicht-Abgrenzung hätte nie auf V2 geführt.'
      }
    },

    {
      h: 'Wie schnell schlägt die Karte an?',
      p: [
        'Eine Regelkarte entdeckt eine Verschiebung nicht sofort, sondern im Mittel nach einer bestimmten Anzahl Stichproben — der <em>mittleren Lauflänge</em> (ARL, average run length). Diese Zahl entscheidet darüber, wie viele Teile bereits falsch gefertigt sind, wenn das Signal kommt.',
        'Zwei Werte spannen den Rahmen auf. Ohne Verschiebung soll die ARL groß sein, sonst ertrinkt man in Fehlalarmen: bei reiner 3σ-Regel liegt sie bei etwa 370 Stichproben, mit dem vollen Western-Electric-Satz nur noch bei rund 90. Bei tatsächlicher Verschiebung soll sie klein sein — und genau hier zeigt sich, warum kleine Drifts so gefährlich sind.'
      ],
      sim: 'arl',
      simTitel: 'Simulation: mittlere Lauflänge',
      simIntro: 'Stellen Sie eine Verschiebung von 0,5 σ ein und lesen Sie ab, nach wie vielen <em>Teilen</em> die Karte anschlägt. Vergleichen Sie das mit 2 σ. Wechseln Sie dann den Regelsatz und beobachten Sie den Zielkonflikt: Die Western-Electric-Regeln finden kleine Verschiebungen deutlich früher, erkaufen das aber mit einer vervierfachten Fehlalarmrate.',
      callout: {
        typ: 'bad',
        titel: 'Was das in dieser Fertigung heißt',
        text: 'Bei n = 1 und einer Verschiebung von 0,5 σ liegt die ARL im Bereich mehrerer Dutzend Teile. Bei einer Wochenproduktion im einstelligen Bereich sind das Monate. Die Regelkarte ist hier also kein Frühwarnsystem — Prozessveränderungen müssen über die Ursachenseite erkannt werden: Änderungsmanagement, Rückverfolgbarkeit, Vorrichtungsfreigabe. Das ist der Grund, warum in der Kleinserie die Disziplin bei Änderungen wichtiger ist als jede Karte.'
      }
    },

    {
      h: 'Fähigkeit: Cp und Cpk',
      p: [
        'Stabilität ist die Voraussetzung, Fähigkeit die Anforderung. Ein Prozess kann perfekt beherrscht und trotzdem unfähig sein — dann streut er zwar vorhersagbar, aber zu breit oder an der falschen Stelle.'
      ],
      formel: 'Cp  = (OSG − USG) / (6σ)                       <span class="fx-note">nur Streuung</span>\n\nCpk = min(OSG − µ, µ − USG) / (3σ)             <span class="fx-note">Streuung und Lage</span>\n\nCp = Cpk  ⟺  Prozess exakt in Toleranzmitte',
      tabelle: {
        kopf: ['Befund', 'Interpretation', 'Richtiger Hebel'],
        zeilen: [
          ['Cp hoch, Cpk niedrig', 'Streuung passt, Prozess liegt außermittig', 'Sollwert verschieben — meist schnell und billig'],
          ['Cp niedrig, Cpk niedrig', 'Streuung zu groß', 'Prozess ändern: Vorrichtung, Verfahren, Umgebung'],
          ['Cpk gut, Karte zeigt Signale', 'Prozess fähig, aber nicht beherrscht', 'Besondere Ursachen abstellen, sonst hält die Fähigkeit nicht'],
          ['Beide gut', 'Zielzustand', 'Überwachen, nicht nachstellen']
        ],
        fuss: 'Übliche Forderung: Cpk ≥ 1,33. Achtung — Cp und Cpk sind nur bei einem beherrschten Prozess sinnvoll interpretierbar; bei Signalen auf der Karte beschreiben sie eine Verteilung, die es so gar nicht gibt.'
      },
      callout: {
        typ: '',
        titel: 'Cp/Cpk gegen Pp/Ppk — und woher „Six Sigma" kommt',
        text: 'Cp und Cpk werden aus der <em>Kurzzeitstreuung</em> innerhalb der Untergruppen gerechnet, Pp und Ppk aus der Gesamtstreuung aller Werte über die Zeit. Die Differenz ist ein Maß dafür, wie viel Drift der Prozess über den Beobachtungszeitraum aufweist — sind beide gleich, ist er stabil. Der Name Six Sigma kommt aus derselben Rechnung: Ein Prozess mit sechs Standardabweichungen zwischen Mittelwert und nächster Grenze entspricht Cp = 2. Die berühmten 3,4 ppm ergeben sich erst, wenn man dem Prozess zusätzlich eine Langzeitdrift von 1,5 σ zugesteht — eine Konvention, keine Naturkonstante.'
      }
    },

    {
      h: 'Die Reihenfolge, die im Alltag zählt',
      p: [
        'Bei jeder Abweichung an der Station läuft dieselbe Prüfkette — und sie beginnt bewusst nicht beim Prozess:'
      ],
      bullets: [
        '<strong>1. Ist die Messung in Ordnung?</strong> Wiederholmessung, Normal prüfen, Aufspannung kontrollieren (Modul 2).',
        '<strong>2. Gibt es überhaupt ein Signal?</strong> Ohne Regelverletzung ist die Abweichung zufällige Streuung — nicht eingreifen.',
        '<strong>3. Was hat sich geändert?</strong> Charge, Schicht, Werkzeug, Vorrichtung, Umgebung. Die Ist/Ist-nicht-Frage aus dem 8D (Modul 5).',
        '<strong>4. Erst dann eingreifen</strong> — und die Wirkung dokumentiert nachhalten, sonst ist der Eingriff selbst eine neue, unbekannte Ursache.'
      ],
      callout: {
        typ: 'job',
        titel: 'Was die Rolle hier konkret leistet',
        text: 'Diese Kette ist der Kern fertigungsnaher Prozessarbeit. Der Prozessingenieur ist die Instanz, die den Unterschied zwischen Rauschen und Signal belastbar entscheidet — gegen den verständlichen Impuls der Fertigung, sofort etwas zu tun. Genau deshalb gehört zum Anforderungsprofil, fachlich fundierte Positionen auch gegen Druck vertreten zu können.'
      }
    }
  ],

  quiz: [
    {
      frage: 'In der Optikmontage entstehen wenige Module pro Woche, jedes ist ein Einzelstück. Welche Regelkarte passt?',
      optionen: [
        'x̄/R-Karte mit Untergruppen von n = 5.',
        'Einzelwertkarte mit gleitender Spannweite (I-MR).',
        'p-Karte auf den Anteil nacharbeitspflichtiger Module.',
        'Gar keine — bei diesen Stückzahlen ist SPC nicht anwendbar.'
      ],
      richtig: 1,
      erklaerung: 'Ohne mehrere vergleichbare Teile in kurzem Abstand lassen sich keine sinnvollen Untergruppen bilden — die x̄/R-Karte scheidet aus. Die I-MR-Karte schätzt die Streuung aus den Differenzen aufeinanderfolgender Werte und ist damit der Regelfall in der Kleinserie. Die p-Karte bräuchte große Stückzahlen.'
    },
    {
      frage: 'Für eine Untergruppe werden vier Module aus zwei verschiedenen Schichten zusammengefasst. Welche Folge hat das?',
      optionen: [
        'Die Karte wird empfindlicher, weil mehr Variationsquellen abgedeckt sind.',
        'Der Schichtunterschied steckt in der Untergruppenstreuung, die Eingriffsgrenzen werden zu weit — und die Karte kann ihn nie als Signal zeigen.',
        'Die Untergruppengröße muss dann auf n = 8 erhöht werden.',
        'Keine, solange beide Schichten gleich viele Teile beisteuern.'
      ],
      richtig: 1,
      erklaerung: 'Eine Untergruppe soll nur zufällige Streuung enthalten. Was in ihr steckt, wird zur Normalität erklärt und geht in die Berechnung der Grenzen ein. Wer den Schichtunterschied finden will, muss ihn <em>zwischen</em> die Untergruppen legen — sonst hat man ihn per Konstruktion unsichtbar gemacht.'
    },
    {
      frage: 'Der Prozess verschiebt sich um 0,5 σ. Die Karte läuft mit n = 1 und nur Regel 1. Was erwarten Sie?',
      optionen: [
        'Ein Signal innerhalb der nächsten zwei bis drei Stichproben.',
        'Eine mittlere Lauflänge in der Größenordnung mehrerer Dutzend Stichproben — bei Kleinserie also Monate.',
        'Sofort ein Signal, da 0,5 σ eine deutliche Verschiebung ist.',
        'Nie ein Signal, da 0,5 σ innerhalb der Grenzen liegt.'
      ],
      richtig: 1,
      erklaerung: 'Kleine Verschiebungen haben eine sehr lange ARL — bei 0,5 σ und reiner 3σ-Regel liegt sie im Bereich von etwa 150 Stichproben. Bei einstelligen Wochenstückzahlen ist die Karte damit kein Frühwarnsystem. Deshalb müssen Prozessveränderungen in der Kleinserie über die Ursachenseite kontrolliert werden: Änderungsmanagement und Vorrichtungsfreigabe.'
    },
    {
      frage: 'Ein einzelner Punkt liegt bei 2,4σ, keine weitere Regel ist verletzt. Was tun Sie?',
      optionen: [
        'Sofort nachstellen — 2,4σ ist eine deutliche Abweichung.',
        'Nichts am Prozess ändern; der Punkt liegt innerhalb der Eingriffsgrenzen und keine Regel schlägt an.',
        'Die Eingriffsgrenzen auf 2σ verengen, um früher zu reagieren.',
        'Die Untergruppe verwerfen und neu messen.'
      ],
      richtig: 1,
      erklaerung: 'Ein Punkt zwischen 2σ und 3σ ohne weitere Regelverletzung ist erwartbare zufällige Streuung — etwa 5 % aller Punkte liegen jenseits 2σ. Eingreifen wäre Overcontrol. Regel 2 würde erst greifen, wenn 2 von 3 Punkten auf derselben Seite jenseits 2σ lägen.'
    },
    {
      frage: 'Cp = 1,8, Cpk = 0,9. Welcher Hebel wirkt am schnellsten?',
      optionen: [
        'Die Prozessstreuung reduzieren, etwa durch eine neue Vorrichtung.',
        'Den Prozessmittelwert in Richtung Toleranzmitte verschieben.',
        'Die Toleranz mit dem Kunden aufweiten.',
        'Die Untergruppengröße erhöhen.'
      ],
      richtig: 1,
      erklaerung: 'Cp deutlich größer als Cpk heißt: Die Streuung passt problemlos in die Toleranz, der Prozess liegt aber außermittig. Zentrieren ist meist eine reine Sollwertkorrektur — schnell, billig und mit direktem Effekt auf Cpk. Streuung zu reduzieren wäre der ungleich aufwendigere Weg für ein Problem, das gar nicht besteht.'
    },
    {
      frage: 'Acht aufeinanderfolgende Punkte liegen oberhalb der Mittellinie, alle innerhalb der 3σ-Grenzen. Bewertung?',
      optionen: [
        'Unauffällig — alle Punkte liegen innerhalb der Eingriffsgrenzen.',
        'Regelverletzung nach Western-Electric-Regel 4: Hinweis auf Drift oder Mittelwertverschiebung.',
        'Ein Messfehler, da acht gleichgerichtete Punkte statistisch unmöglich sind.',
        'Der Prozess ist besonders gut zentriert.'
      ],
      richtig: 1,
      erklaerung: 'Bei einem zentrierten Prozess hat eine Folge von acht gleichseitigen Punkten die Wahrscheinlichkeit 2 · 0,5⁸ ≈ 0,8 %. Das ist Regel 4 und ein klassisches Driftsignal — typischerweise Werkzeugverschleiß oder Temperaturgang. Genau solche Muster erkennt man nicht, wenn man nur auf Grenzverletzungen achtet.'
    },
    {
      frage: 'Warum dürfen Spezifikationsgrenzen nicht als Eingriffsgrenzen verwendet werden?',
      optionen: [
        'Weil sie meist enger sind als die Eingriffsgrenzen.',
        'Weil sie vom Kunden kommen und nichts über das Verhalten des Prozesses aussagen — man reagiert dann zu spät auf Prozessveränderungen und zu früh auf zufällige Streuung.',
        'Weil sie sich im Laufe der Zeit ändern können.',
        'Weil sie nicht statistisch begründet sind und daher keine Normkonformität besteht.'
      ],
      richtig: 1,
      erklaerung: 'Eingriffsgrenzen beschreiben das tatsächliche Prozessverhalten (±3σ), Spezifikationsgrenzen die Kundenanforderung. Bei einem fähigen Prozess liegen die Spezifikationsgrenzen weit außerhalb — Verschiebungen bleiben dann unbemerkt, bis Ausschuss entsteht. Bei einem unfähigen Prozess dagegen löst jede zufällige Streuung Alarm aus.'
    },
    {
      frage: 'Ein Prozess ist beherrscht (keine Signale), aber Cpk = 0,8. Was ist die richtige Schlussfolgerung?',
      optionen: [
        'Der Prozess ist in Ordnung, da er beherrscht ist.',
        'Der Prozess ist stabil, aber nicht fähig — er produziert vorhersagbar zu viel Ausschuss. Verbesserung erfordert eine Prozessänderung, nicht Eingriffe im laufenden Betrieb.',
        'Es liegt ein Messfehler vor, da beherrschte Prozesse immer fähig sind.',
        'Die Eingriffsgrenzen müssen neu berechnet werden.'
      ],
      richtig: 1,
      erklaerung: 'Stabilität und Fähigkeit sind unabhängig. Cpk = 0,8 bedeutet: Der Prozess liefert zuverlässig ein Ergebnis, das die Toleranz nicht sicher einhält (Größenordnung ~1 % außerhalb). Nachstellen hilft nicht — nur eine Änderung am Prozess selbst: Verfahren, Vorrichtung, Umgebung oder Konstruktion.'
    }
  ]
},

/* ═══════════════════════════ MODUL 4 ═══════════════════════════ */
{
  id: 'wertstrom',
  nr: 4,
  titel: 'Wertstrom & Lean in der Optikmontage',
  kurz: 'Technische Verantwortung für einen Wertstromabschnitt: Takt, Engpass, Nacharbeit, Durchlaufzeit — und warum Nacharbeit an der Justage doppelt zählt.',
  ziel: 'Sie können einen Montageabschnitt quantitativ bewerten, den Engpass benennen und die Hebel in der wirtschaftlich richtigen Reihenfolge ansetzen.',
  jobBezug: 'Die Rolle trägt die technische Verantwortung für komplette Wertstromabschnitte in der Objektiv- und Optikmontage samt Justage. Das heißt: nicht nur einzelne Prozessschritte optimieren, sondern den Abschnitt als Ganzes verantworten — inklusive Durchsatz, Bestand und Durchlaufzeit.',
  sim: 'valuestream',
  simTitel: 'Simulation: Wertstromabschnitt Optikmontage',
  simIntro: 'Der Abschnitt hat fünf Stationen. Beginnen Sie mit dem First Pass Yield der Justage: Senken Sie ihn von 82 % auf 65 % und beobachten Sie, um wie viel die Belastung von <em>zwei</em> Stationen steigt. Versuchen Sie anschließend, den Abschnitt taktfähig zu bekommen — einmal über Zykluszeit, einmal über FPY. Der Vergleich zeigt, welcher Hebel der stärkere ist.',
  begriffe: ['Wertstrom', 'Taktzeit', 'Zykluszeit', 'Engpass', 'Umlaufbestand', 'First Pass Yield', 'Gesamtanlageneffektivität', 'Standardarbeit'],

  abschnitte: [
    {
      h: 'Die vier Kennzahlen, die den Abschnitt beschreiben',
      formel: 'Taktzeit    = nutzbare Arbeitszeit / Kundenbedarf\n\nStationslast = Zykluszeit / Verfügbarkeit · Wiederholfaktor\n\nDurchsatz   = 1 / Belastung der Engpassstation\n\nDurchlaufzeit = WIP / Durchsatzrate          <span class="fx-note">Little’s Law</span>',
      p: [
        'Die Taktzeit kommt vom Kunden, die Zykluszeit vom Prozess. Liegt die Belastung einer Station über dem Takt, ist der Abschnitt nicht lieferfähig — unabhängig davon, wie gut alle anderen Stationen sind.',
        'Little’s Law ist die unterschätzte Formel: Bestand und Durchlaufzeit sind bei gegebenem Durchsatz fest gekoppelt. Wer die Durchlaufzeit halbieren will, ohne den Durchsatz zu erhöhen, muss den Bestand halbieren. Es gibt keinen dritten Weg.'
      ]
    },

    {
      h: 'Wertstromanalyse: den Abschnitt aufnehmen',
      p: [
        'Bevor man einen Wertstrom verbessert, nimmt man ihn auf — und zwar am Ort, nicht am Schreibtisch. Die Wertstromanalyse ist dafür das Standardwerkzeug: Man läuft den Abschnitt entgegen der Flussrichtung ab, notiert je Station die Kennzahlen und erfasst dazwischen die Bestände.'
      ],
      grafik: 'wertstromkarte',
      grafikText: '<strong>Abb. 1 — Wertstromkarte mit Zeitlinie.</strong> Oben die Stationen mit ihren Datenkästen, dazwischen die Bestände als Dreiecke. Unten die Zeitlinie: Der untere Ast ist Bearbeitungszeit, der obere Liegezeit. Das Verhältnis der beiden ist die Flusseffizienz — und sie ist die ernüchterndste Kennzahl der ganzen Analyse.',
      bullets: [
        '<strong>Entgegen der Flussrichtung laufen.</strong> Man beginnt beim Kunden und arbeitet sich rückwärts vor, sonst übernimmt man die Sicht der Fertigung statt die des Produkts.',
        '<strong>Selbst messen, nicht aus dem System ziehen.</strong> Zykluszeiten aus dem ERP sind Plandaten. Die Wertstromanalyse lebt von beobachteten Zeiten inklusive Rüsten, Suchen und Warten auf das Messmittel.',
        '<strong>Bestände zählen, nicht schätzen.</strong> Jedes Teil zwischen zwei Stationen ist gebundenes Kapital und über Little unmittelbar Durchlaufzeit.',
        '<strong>Die Zeitlinie ist das Ergebnis.</strong> Sie macht sichtbar, dass die Durchlaufzeit fast vollständig aus Warten besteht — und dass Zykluszeitoptimierung an dieser Bilanz kaum etwas ändert.'
      ],
      callout: {
        typ: 'bad',
        titel: 'Die Zahl, die Diskussionen beendet',
        text: 'Flusseffizienz = Bearbeitungszeit geteilt durch Durchlaufzeit. In vielen Montagebereichen liegt sie im einstelligen Prozentbereich. Wer sie kennt, diskutiert nicht mehr darüber, ob eine Station 10 % schneller werden kann — sondern darüber, warum ein Teil 90 % seiner Zeit liegt.'
      }
    },

    {
      h: 'Verschwendung in der Optikmontage',
      p: [
        'Die sieben klassischen Verschwendungsarten stammen aus der Automobilfertigung. Übertragen auf eine Kleinserienmontage hochpräziser Optik sehen sie anders aus, als das Lehrbuch nahelegt:'
      ],
      tabelle: {
        kopf: ['Art', 'Erscheinungsform hier', 'Warum sie oft übersehen wird'],
        zeilen: [
          ['Nacharbeit', 'Justageschleifen nach nicht bestandener Prüfung', 'Gilt als normal, weil Ausschuss keine Option ist — und wird deshalb nicht gezählt'],
          ['Warten', 'auf Messmittel, auf Aushärtung, auf Freigabe', 'Wird als technisch bedingt akzeptiert, obwohl die Belegung planbar wäre'],
          ['Bestand', 'Module zwischen den Stationen', 'Sieht nach Sicherheit aus, ist aber Durchlaufzeit und gebundenes Kapital'],
          ['Bewegung', 'Suchen von Vorrichtungen, Normalen, Dokumenten', 'Fällt nicht auf, weil sie zur gewohnten Arbeit gehört'],
          ['Transport', 'Umsetzen zwischen Reinraumbereichen', 'Jeder Transport ist zusätzlich ein Kontaminations- und Beschädigungsrisiko'],
          ['Überbearbeitung', 'Justieren über die Spezifikation hinaus', 'Wird als Sorgfalt gewertet — bindet aber Kapazität am Engpass ohne Kundennutzen'],
          ['Überproduktion', 'Vorziehen von Aufträgen zur Auslastung', 'Gilt als Effizienz, erzeugt aber genau den Bestand aus Zeile drei']
        ],
        fuss: 'Die achte, oft ergänzte Art ist ungenutztes Wissen der Mitarbeitenden — in einem Bereich mit hohem Anteil manueller Präzisionsarbeit die vermutlich teuerste von allen.'
      },
      callout: {
        typ: 'warn',
        titel: 'Die unbequemste Zeile',
        text: 'Überbearbeitung ist in der Justage schwer anzusprechen. Wer ein Modul von 5 mλ auf 3 mλ weiterjustiert, obwohl 8 mλ spezifiziert sind, tut subjektiv das Richtige — verbraucht aber Kapazität an der teuersten Station für einen Nutzen, den niemand bezahlt. Genau solche Fälle sichtbar und diskutierbar zu machen, ohne die fachliche Sorgfalt infrage zu stellen, gehört zu den schwierigeren Teilen dieser Rolle.'
      }
    },

    {
      h: 'Warum hohe Auslastung teuer wird',
      p: [
        'Das Belastungsdiagramm weiter unten rechnet deterministisch: feste Zykluszeiten, kein Warten. Die Realität hat Streuung — Teile kommen unregelmäßig an, Bearbeitungszeiten schwanken, Nacharbeit kommt dazwischen. Und sobald Streuung im Spiel ist, gilt ein Zusammenhang, der jeder Intuition widerspricht.',
        'Die Wartezeit vor einer Station wächst nicht linear mit der Auslastung, sondern explodiert gegen 100 %. Der Grund ist einfach: Eine Station, die zu 95 % belegt ist, hat keine Lücke mehr, um eine Störung aufzuholen. Jede Verzögerung bleibt im System.'
      ],
      formel: 'W_q ≈ (c_a² + c_e²)/2 · u/(1−u) · t_e     <span class="fx-note">Kingman-Näherung</span>\n\n<span class="fx-note">u = Auslastung, t_e = Bearbeitungszeit, c = Variationskoeffizient</span>',
      sim: 'queue',
      simTitel: 'Simulation: Wartezeit über der Auslastung',
      simIntro: 'Schieben Sie die Auslastung von 80 % auf 95 % und beobachten Sie den Sprung in der Durchlaufzeit — bei völlig unveränderter Kapazität. Erhöhen Sie danach die Schwankung: Das ist genau der Effekt, den Nacharbeit erzeugt, denn sie macht die Bearbeitungszeiten hochgradig ungleichmäßig.',
      callout: {
        typ: 'ok',
        titel: 'Die Konsequenz für die Planung',
        text: 'Eine bewusst freigehaltene Reserve am Engpass ist keine Verschwendung, sondern der Preis für kurze und vorhersagbare Durchlaufzeiten. Und der zweite Hebel steht gleichberechtigt daneben: Streuung senken wirkt genauso stark wie Kapazität erhöhen — kostet aber keine Investition. Nacharbeit zu reduzieren senkt beides gleichzeitig.'
      }
    },

    {
      h: 'Warum Nacharbeit an der Justage doppelt zählt',
      p: [
        'Ein Modul, das die Endprüfung nicht besteht, geht zurück in die Justage und danach erneut in die Prüfung. Beide Stationen werden also mehrfach belegt. Bei einem First Pass Yield von 80 % steigt die Belastung dieser Stationen um den Faktor 1/0,8 = 1,25 — bei 65 % bereits um 1,54.',
        'Das ist der Grund, warum in der Optikmontage FPY die wichtigste Kapazitätskennzahl ist und nicht die Zykluszeit. Zehn Prozentpunkte FPY an der Justage bringen typischerweise mehr Durchsatz als jede realistische Verkürzung der Zykluszeit — und kosten keine Investition.'
      ],
      callout: {
        typ: 'ok',
        titel: 'Die Hebelreihenfolge am Engpass',
        text: '1. Nacharbeit senken (wirkt multiplikativ auf mehrere Stationen) · 2. Verfügbarkeit erhöhen (Rüsten, Störungen, Wartezeiten auf Messmittel) · 3. Zykluszeit reduzieren · 4. Kapazität zukaufen. Die Reihenfolge ist nach Wirkung pro Aufwand sortiert — und wird in der Praxis regelmäßig von hinten nach vorne abgearbeitet.'
      }
    },

    {
      h: 'Engpass und die Versuchung, überall zu verbessern',
      p: [
        'Nach der Engpasstheorie bestimmt ausschließlich die höchstbelastete Station den Durchsatz. Verbesserungen an Nicht-Engpass-Stationen erhöhen den Durchsatz um exakt null — sie erzeugen nur mehr Bestand vor dem Engpass und damit längere Durchlaufzeiten.',
        'Das ist im Alltag schwer durchzuhalten, weil Verbesserungsvorschläge selten am Engpass entstehen: Sie kommen dort auf, wo Leute Zeit haben, über Verbesserung nachzudenken — also gerade nicht am überlasteten Engpass.'
      ],
      bullets: [
        '<strong>Engpass identifizieren</strong> — über die Belastung inklusive Verfügbarkeit und Nacharbeit, nicht über die nominale Zykluszeit',
        '<strong>Engpass ausreizen</strong> — keine Pausenlücken, Rüsten außerhalb, Material immer verfügbar, Prüfmittel bereit',
        '<strong>Alles andere unterordnen</strong> — vorgelagerte Stationen liefern im Takt des Engpasses, nicht in ihrem eigenen',
        '<strong>Erst dann erweitern</strong> — zusätzliche Kapazität ist der letzte, nicht der erste Schritt',
        '<strong>Neu suchen</strong> — nach jeder Verbesserung wandert der Engpass'
      ]
    },

    {
      h: 'Was in der Optikmontage besonders ist',
      p: [
        'Die klassische Lean-Werkzeugkiste stammt aus der Großserie. In der Kleinserienfertigung hochpräziser Optik gelten Besonderheiten, die man kennen muss, um nicht die falschen Werkzeuge zu ziehen:'
      ],
      tabelle: {
        kopf: ['Besonderheit', 'Konsequenz für die Prozessarbeit'],
        zeilen: [
          ['Sehr kleine Stückzahlen', 'Statistik ist knapp — Prozessfähigkeit nach klassischem Cpk oft erst spät belegbar (siehe Modul 6)'],
          ['Extrem hoher Teilewert', 'Ausschuss ist praktisch keine Option; Nacharbeit ist der Normalfall, nicht die Ausnahme'],
          ['Lange, umgebungsempfindliche Prüfzyklen', 'Prüfung ist selbst eine Engpassressource; Warten auf Messmittel ist ein realer Kapazitätsverlust'],
          ['Hoher Anteil manueller Präzisionsarbeit', 'Vergleichbarkeit zwischen Werkern ist eine Hauptstreuquelle — Standardarbeit wirkt hier stärker als Automatisierung'],
          ['Reinraumbedingungen', 'Jeder zusätzliche Handhabungsschritt ist ein Kontaminationsrisiko — „nochmal messen" ist nicht kostenlos']
        ]
      },
      callout: {
        typ: 'warn',
        titel: 'Häufige Fehldiagnose',
        text: 'Eine überlastete Justagestation wird gern mit zusätzlichem Personal beantwortet. Wenn die Ursache Nacharbeit ist, verdoppelt man damit nur die Kapazität, die für Nacharbeit verbraucht wird — bei gleichem Nettoausstoß pro Kopf. Der Blick auf FPY <em>vor</em> dem Blick auf Kapazität ist der Unterschied zwischen Prozessarbeit und Ressourcenverwaltung.'
      }
    }
  ],

  quiz: [
    {
      frage: 'Eine Station läuft mit 80 % Auslastung. Sie wird auf 95 % gefahren, um „besser auszulasten". Was passiert mit der Durchlaufzeit?',
      optionen: [
        'Sie bleibt gleich, da die Kapazität unverändert ist.',
        'Sie steigt leicht, etwa proportional zur Auslastung.',
        'Sie steigt drastisch — die Wartezeit wächst mit u/(1−u), also von Faktor 4 auf Faktor 19.',
        'Sie sinkt, da weniger Leerlauf entsteht.'
      ],
      richtig: 2,
      erklaerung: 'Nach Kingman wächst die Wartezeit mit u/(1−u). Von 80 % (0,8/0,2 = 4) auf 95 % (0,95/0,05 = 19) verfünffacht sich der Faktor. Eine hoch ausgelastete Station hat keine Lücke mehr, um Störungen aufzuholen — jede Verzögerung bleibt im System. Deshalb ist Reserve am Engpass keine Verschwendung.'
    },
    {
      frage: 'Die Zeitlinie einer Wertstromanalyse ergibt 7 h Bearbeitungszeit bei 41 h Durchlaufzeit. Was ist der wirksamste Hebel?',
      optionen: [
        'Die Zykluszeiten der Stationen um 10 % senken.',
        'Die Bestände zwischen den Stationen reduzieren — 83 % der Durchlaufzeit sind Warten.',
        'Eine zusätzliche Schicht einführen.',
        'Die Prüfschritte zusammenlegen.'
      ],
      richtig: 1,
      erklaerung: 'Die Flusseffizienz liegt bei 17 %. Selbst wenn man jede Bearbeitungszeit halbieren könnte, sänke die Durchlaufzeit nur um gut 8 %. Über Little ist die Durchlaufzeit direkt an den Bestand gekoppelt — dort liegt der Hebel, und er kostet keine Investition.'
    },
    {
      frage: 'Ein Werker justiert ein Modul von 5 auf 3 mλ weiter, obwohl 8 mλ spezifiziert sind. Wie ist das zu bewerten?',
      optionen: [
        'Vorbildlich — zusätzliche Qualitätsreserve schadet nie.',
        'Als Überbearbeitung: verbraucht Kapazität am Engpass für einen Nutzen, den der Kunde nicht bezahlt.',
        'Als Nacharbeit, die in der FPY-Statistik zu erfassen ist.',
        'Als notwendige Absicherung gegen die Messunsicherheit.'
      ],
      richtig: 1,
      erklaerung: 'Überbearbeitung ist eine der sieben Verschwendungsarten und in der Präzisionsfertigung besonders schwer anzusprechen, weil sie subjektiv wie Sorgfalt wirkt. Ein Sicherheitsabstand zur Spezifikation ist legitim — aber er gehört als bewusst festgelegte interne Grenze in den Arbeitsplan, nicht in das Ermessen des Einzelnen.'
    },
    {
      frage: 'Nutzbare Schichtzeit 450 min, Kundenbedarf 9 Stück. Wie hoch ist die Taktzeit?',
      optionen: ['9 min', '50 min', '4050 min', 'Ohne Zykluszeiten nicht berechenbar'],
      richtig: 1,
      erklaerung: 'Takt = 450 / 9 = 50 min. Jede Station muss also im Mittel alle 50 Minuten ein Stück fertigstellen. Zykluszeiten braucht man erst, um zu prüfen, ob das gelingt.'
    },
    {
      frage: 'Die Justage hat 150 min Zykluszeit, 88 % Verfügbarkeit und 80 % FPY (Nacharbeit läuft über Justage und Prüfung). Wie groß ist ihre Belastung je Stück?',
      optionen: ['150 min', '170 min', '213 min', '188 min'],
      richtig: 2,
      erklaerung: '150 / 0,88 = 170 min für die Verfügbarkeit, davon nochmals × 1/0,80 = 213 min für die Nacharbeitsschleife. Bei einem Takt von 50 min ist diese Station der klare Engpass — und der Nacharbeitsanteil allein kostet 43 min je Stück.'
    },
    {
      frage: 'Sie können entweder die Zykluszeit der Justage um 10 % senken oder den FPY von 80 % auf 88 % anheben. Was bringt mehr Durchsatz?',
      optionen: [
        'Die Zykluszeitreduktion — sie wirkt direkt auf jedes Stück.',
        'Die FPY-Verbesserung — sie senkt die Belastung an Justage <em>und</em> Prüfung und wirkt multiplikativ.',
        'Beide gleich, da beide etwa 10 % ausmachen.',
        'Keins von beidem, solange der Engpass nicht verlagert wird.'
      ],
      richtig: 1,
      erklaerung: 'Die Zykluszeit wirkt nur auf die Justage. Der FPY-Sprung von 80 auf 88 % senkt den Wiederholfaktor von 1,25 auf 1,14 — rund 9 % Entlastung an der Justage <em>und zusätzlich</em> an der Prüfung. Und FPY-Verbesserungen sind meist Prozess- statt Investitionsthemen.'
    },
    {
      frage: 'Im Abschnitt liegen 12 Module als WIP, der Engpass braucht 200 min je Stück. Wie lang ist die Durchlaufzeit nach Little’s Law?',
      optionen: ['200 min', '2400 min (40 h)', '12 min', 'Nur mit den Zykluszeiten aller Stationen berechenbar'],
      richtig: 1,
      erklaerung: 'DLZ = WIP × Engpasstakt = 12 × 200 = 2400 min ≈ 40 h. Das ist der Grund, warum Bestandsreduzierung die schnellste Maßnahme für kürzere Durchlaufzeiten ist — sie erfordert keine einzige Prozessverbesserung.'
    },
    {
      frage: 'Sie verkürzen die Zykluszeit der Reinigungsstation (nicht Engpass) um 30 %. Welche Wirkung hat das auf den Durchsatz des Abschnitts?',
      optionen: [
        'Der Durchsatz steigt um etwa 30 %.',
        'Der Durchsatz steigt leicht, da sich Wartezeiten verringern.',
        'Keine Wirkung auf den Durchsatz — es entsteht lediglich mehr Bestand vor dem Engpass.',
        'Der Durchsatz sinkt, weil die Taktabstimmung gestört wird.'
      ],
      richtig: 2,
      erklaerung: 'Der Durchsatz wird ausschließlich vom Engpass bestimmt. Eine schnellere vorgelagerte Station produziert nur früher — der Bestand vor dem Engpass wächst und mit ihm (Little) die Durchlaufzeit. Verbesserung außerhalb des Engpasses kann die Lage sogar verschlechtern.'
    }
  ]
},

/* ═══════════════════════════ MODUL 5 ═══════════════════════════ */
{
  id: 'achtd',
  nr: 5,
  titel: 'Problemlösung: 8D, PDCA, Six Sigma',
  kurz: 'Die Reklamation als strukturierter Prozess — welche Methode wann passt und woran ein 8D in der Praxis scheitert.',
  ziel: 'Sie können einen Reklamationsfall methodisch sauber führen: Kunden absichern, Ursache belegen statt vermuten, Wirksamkeit nachweisen und den Fall vollständig schließen.',
  jobBezug: 'Die technische Bewertung und Bearbeitung von Kundenreklamationen mit 8D- oder Six-Sigma-Methoden ist eine eigenständige Kernaufgabe dieser Rolle; erwartet wird sichere Anwendung von 8D/PDCA, Six Sigma und Lean.',
  sim: 'achtd',
  simTitel: 'Fallübung: 8D-Durchlauf R-2417',
  simIntro: 'Arbeiten Sie den Fall Schritt für Schritt durch. Jeder Schritt endet mit einer Entscheidung, wie sie in dieser Rolle tatsächlich zu treffen ist. Die Rückmeldung erklärt nicht nur, was richtig ist, sondern warum die naheliegende Alternative in der Praxis so oft schiefgeht.',
  begriffe: ['8D-Report', 'Sofortmaßnahme', 'Grundursache', 'Ishikawa-Diagramm', '5-Why', 'DMAIC', 'PDCA', 'Rückverfolgbarkeit'],

  abschnitte: [
    {
      h: 'Welche Methode wann',
      p: [
        'Die drei Methoden konkurrieren nicht, sie decken unterschiedliche Situationen ab. Die falsche Wahl kostet entweder Zeit oder Gründlichkeit:'
      ],
      tabelle: {
        kopf: ['Situation', 'Methode', 'Typische Dauer'],
        zeilen: [
          ['Kundenreklamation, externer Fehler, Nachweis gefordert', '8D — mit Containment und formalem Abschluss', 'Wochen'],
          ['Ursache unbekannt, viele Einflussgrößen, Daten vorhanden', 'Six Sigma / DMAIC — mit statistischer Analyse und DoE', 'Monate'],
          ['Kleine Verbesserung, Ursache im Wesentlichen klar', 'PDCA — schnelle Schleife', 'Tage'],
          ['Risiko vor dem Auftreten bewerten (Anlauf)', 'FMEA — vorausschauend statt reaktiv (Modul 6)', 'projektbegleitend']
        ]
      },
      callout: {
        typ: 'warn',
        titel: 'Häufige Fehlbesetzung',
        text: 'Ein DMAIC-Projekt für ein Problem mit offensichtlicher Ursache verbrennt Monate. Umgekehrt ist ein PDCA-Zettel für eine Kundenreklamation nicht auditfähig und schützt den Kunden nicht. Die Methodenwahl ist selbst eine fachliche Entscheidung — und eine, die in dieser Rolle regelmäßig zu begründen ist.'
      }
    },

    {
      h: 'Die acht Disziplinen',
      tabelle: {
        kopf: ['Schritt', 'Inhalt', 'Woran es in der Praxis scheitert'],
        zeilen: [
          ['D1 Team', 'Cross-funktional, prozessnah, mit Champion', 'Nur Entscheider, keine Werker — dann fehlen in D4 die entscheidenden Beobachtungen'],
          ['D2 Problem', 'Fakten, Zahlen, Ist/Ist-nicht-Abgrenzung', 'Ursachenvermutung wird als Beschreibung formuliert und legt die Analyse fest'],
          ['D3 Sofortmaßnahme', 'Kunde schützen, befristet, wirksamkeitsgeprüft', 'Unbefristet — die Maßnahme wird zum heimlichen Dauerprozess'],
          ['D4 Grundursache', 'Belegte Ursachenkette, technisch und systemisch', 'Korrelation wird als Beweis genommen; Effekt nie gezielt ein-/ausgeschaltet'],
          ['D5 Abstellmaßnahmen', 'Entstehung, Entdeckung und System adressieren', 'Nur die Entdeckung: zusätzliche Prüfung statt Ursachenbeseitigung'],
          ['D6 Umsetzung', 'Wirksamkeit an der Kenngröße aus D2 nachweisen', 'Umsetzung wird mit Wirksamkeit verwechselt'],
          ['D7 Vorbeugung', 'Übertragung auf vergleichbare Prozesse, FMEA, Standards', 'Endet bei einer Schulung des betroffenen Teams'],
          ['D8 Abschluss', 'Containment zurücknehmen, Dokumente freigeben, Team würdigen', 'Sofortmaßnahme bleibt im Prozess und niemand weiß später warum']
        ]
      }
    },

    {
      h: 'Six Sigma und der DMAIC-Zyklus',
      p: [
        'Der 8D-Prozess reagiert auf ein aufgetretenes Problem mit bekannter Wirkung. Six Sigma greift dort, wo die Ursache unbekannt ist, viele Einflussgrößen infrage kommen und die Datenlage eine statistische Analyse trägt. Sein Rahmen ist DMAIC — fünf Phasen, deren Reihenfolge nicht verhandelbar ist.'
      ],
      grafik: 'dmaic',
      grafikText: '<strong>Abb. 2 — DMAIC mit den Werkzeugen je Phase.</strong> Die häufigste Projektpathologie ist der Sprung von Define direkt nach Improve: Man hat eine Lösung im Kopf und sucht Daten, die sie stützen. Measure und Analyze sind genau die Phasen, die diesen Sprung verhindern sollen.',
      tabelle: {
        kopf: ['Phase', 'Leitfrage', 'Typischer Fehler'],
        zeilen: [
          ['Define', 'Welches Problem, welcher Nutzen, welche Grenzen?', 'Projektumfang zu weit — „die Qualität verbessern" statt einer messbaren Zielgröße'],
          ['Measure', 'Wie gut ist der Prozess heute wirklich?', 'Messsystemanalyse übersprungen und Messrauschen als Prozessstreuung analysiert'],
          ['Analyze', 'Welche Einflussgrößen wirken nachweisbar?', 'Korrelation aus Beobachtungsdaten als Ursache gewertet'],
          ['Improve', 'Welche Einstellung ist nachweislich die beste?', 'Faktor für Faktor probiert und dabei Wechselwirkungen übersehen'],
          ['Control', 'Wie halten wir das Ergebnis dauerhaft?', 'Projekt endet mit der Präsentation, der Prozess fällt in den alten Zustand zurück']
        ]
      }
    },

    {
      h: 'Define — der Projektauftrag',
      p: [
        'Ab hier läuft ein vollständiges Beispiel durch alle fünf Phasen. Ausgangslage: An der Justagestation streut der Rest-Wellenfrontfehler so stark, dass rund jedes fünfte Modul in die Nacharbeit geht — an genau der Station, die laut Modul 4 der Engpass des Abschnitts ist.'
      ],
      tabelle: {
        kopf: ['Feld', 'Inhalt'],
        zeilen: [
          ['Problem', 'Der Rest-RMS nach der Justage von OM-320-Modulen streut stark. Module über der internen Schwelle von 6,5 mλ gehen in die Nacharbeitsschleife.'],
          ['Zielgröße (CTQ)', 'Rest-Wellenfrontfehler RMS nach der Justage, in mλ'],
          ['Ausgangslage', 'Mittelwert 5,6 mλ, Standardabweichung 1,1 mλ, Nacharbeitsquote rund 20 % (entspricht FPY 80 %), Cpk gegen die Kundengrenze von 8,0 mλ: 0,73'],
          ['Ziel', 'Nacharbeitsquote unter 5 %, Streuung mindestens halbiert — nachgewiesen über 20 aufeinanderfolgende Module'],
          ['Nutzen', 'Die Nacharbeit belastet Justage und Prüfung doppelt. Jeder Punkt FPY entlastet den Engpass unmittelbar (siehe Modul 4).'],
          ['Abgrenzung', 'Nur der Justageprozess. Bauteiltoleranzen und Fassungskonstruktion sind ausdrücklich <em>nicht</em> Gegenstand — das wäre ein eigenes Projekt mit R&D.'],
          ['Team, Dauer', 'Prozessingenieur, zwei Justagewerker, Messtechniker, Qualitätsingenieur; rund vier Monate']
        ],
        fuss: 'Die Abgrenzungszeile ist die wichtigste. Ein Six-Sigma-Projekt ohne klare Grenze wächst, bis es niemand mehr abschließen kann.'
      },
      callout: {
        typ: 'warn',
        titel: 'Warum die interne Schwelle unter der Kundengrenze liegt',
        text: 'Der Kunde spezifiziert 8,0 mλ, die Nacharbeit beginnt aber schon bei 6,5. Der Abstand deckt zwei Dinge ab: das Setzverhalten nach dem Verkleben und die Messunsicherheit aus Modul 2. Diese Schwelle ist damit selbst eine Entscheidung — und im Projekt eine legitime Frage, ob sie richtig gewählt ist.'
      }
    },

    {
      h: 'Measure — erst das Messsystem, dann der Prozess',
      p: [
        'Vor jeder Analyse steht die Frage, ob die Zahlen überhaupt tragen. Die Messsystemanalyse aus Modul 2 ergibt hier %GRR = 24 % gegen die Toleranz — bedingt fähig. Für die Varianzbetrachtung heißt das:'
      ],
      formel: 'σ²_beobachtet = σ²_Prozess + σ²_Messung\n\n1,10² = σ²_Prozess + 0,33²   →   σ_Prozess = 1,05 mλ\n\n<span class="fx-note">Messrauschen erklärt nur etwa 9 % der beobachteten Varianz — die Streuung ist real.</span>',
      bullets: [
        '<strong>Erhebungsplan statt vorhandener Daten.</strong> Für 40 Module wird festgehalten: Vorrichtung, Schicht, Werker, Klebstoffcharge, gemessene Aufspannkraft, Einschwingzeit vor der Messung, Justagereihenfolge.',
        '<strong>Merkmale mitschreiben, die man später vielleicht braucht.</strong> Was in Measure nicht erfasst wurde, lässt sich in Analyze nicht mehr auswerten — und eine zweite Erhebungsrunde kostet in dieser Fertigung Wochen.',
        '<strong>Ausgangsfähigkeit dokumentieren.</strong> Cpk = 0,73 ist der Referenzwert, an dem das Projektergebnis später gemessen wird.'
      ],
      callout: {
        typ: 'bad',
        titel: 'Was passiert wäre, hätte man diesen Schritt übersprungen',
        text: 'Bei einem %GRR von beispielsweise 55 % wären mehr als die Hälfte der beobachteten Varianz Messrauschen gewesen. Jede Analyse hätte dann Zufall interpretiert, und das Projekt hätte nach Monaten mit einer nicht reproduzierbaren „Verbesserung" geendet. Die Messsystemanalyse ist kein Formalismus, sie entscheidet über die Gültigkeit von allem Folgenden.'
      }
    },

    {
      h: 'Analyze — welche Größen wirken nachweisbar?',
      p: [
        'Jetzt werden die erfassten Merkmale gegen die Zielgröße geprüft. Zuerst die naheliegenden Verdächtigen, dann die Prozessparameter:'
      ],
      tabelle: {
        kopf: ['Frage', 'Werkzeug', 'Ergebnis', 'Schluss'],
        zeilen: [
          ['Unterscheiden sich die Vorrichtungen?', 'Zweistichproben-t-Test', 'V1: 5,5 mλ · V2: 5,7 mλ · p = 0,58', 'kein Unterschied nachweisbar'],
          ['Wirkt die Schicht?', 't-Test', 'früh 5,4 · spät 5,8 · p = 0,24', 'nicht signifikant'],
          ['Wirkt der Werker?', 'Varianzanalyse', 'A 5,5 · B 5,7 · C 5,6 · p = 0,79', 'kein Effekt — die Standardarbeit greift'],
          ['Wirkt die Klebstoffcharge?', 'Varianzanalyse', 'p = 0,63', 'kein Effekt'],
          ['Wirkt die Aufspannkraft?', 'lineare Regression', 'Steigung +0,09 mλ je N · R² = 0,41 · p &lt; 0,01', '<strong>starker Zusammenhang</strong>']
        ],
        fuss: 'Die kategorialen Verdächtigen erklären nichts. Ein kontinuierlicher Prozessparameter erklärt 41 % der Streuung — das ist der Ansatzpunkt.'
      },
      callout: {
        typ: 'warn',
        titel: 'Der entscheidende Vorbehalt',
        text: 'In den Beobachtungsdaten hängen Aufspannkraft und Einschwingzeit zusammen: Wo mit hoher Kraft gespannt wurde, war auch die Wartezeit kürzer, weil beides aus derselben Arbeitsweise stammt. Die beiden Einflüsse sind damit <em>vermengt</em> und aus diesen Daten grundsätzlich nicht trennbar — egal wie viele Module man zusätzlich erfasst. Beobachtung findet Zusammenhänge; welcher davon Ursache ist, entscheidet nur der geplante Versuch. Das ist derselbe Gedanke wie der Nachweis in D4: Der Effekt muss sich gezielt ein- und ausschalten lassen.'
      }
    },

    {
      h: 'Improve — der statistische Versuchsplan',
      p: [
        'Statt Faktoren nacheinander zu probieren, werden alle Kombinationen systematisch gefahren. Drei Faktoren auf je zwei Stufen ergeben acht Einstellungen — ein vollfaktorieller 2³-Plan. Der entscheidende Vorteil: Er liefert nicht nur die Wirkung jedes einzelnen Faktors, sondern auch die <em>Wechselwirkungen</em> zwischen ihnen.'
      ],
      tabelle: {
        kopf: ['Faktor', 'Stufe −', 'Stufe +', 'Warum im Plan'],
        zeilen: [
          ['A  Aufspannkraft', 'niedrig (20 N)', 'hoch (32 N)', 'stärkster Zusammenhang aus der Regression'],
          ['B  Einschwingzeit', '5 min', '30 min', 'in den Beobachtungsdaten mit A vermengt — nur hier trennbar'],
          ['C  Justagereihenfolge', 'sequenziell', 'iterativ', 'billig mitzunehmen, solange man ohnehin Versuche fährt']
        ]
      },
      sim: 'doe',
      simTitel: 'Simulation: 2³-Versuchsplan durchführen',
      simIntro: 'Fahren Sie den Plan mit zwei Wiederholungen. Lesen Sie im linken Diagramm ab, welche Effekte über der Signifikanzgrenze liegen, und sehen Sie im rechten nach, ob die beiden Linien parallel verlaufen. Stellen Sie dann die Wiederholungen auf 1 — und beobachten Sie, dass die Aussage zusammenbricht. Zum Schluss der wichtigste Knopf: <em>Faktor für Faktor vergleichen</em>.',
      callout: {
        typ: 'ok',
        titel: 'Das Ergebnis des Projekts',
        text: 'Der Plan zeigt: Die Aufspannkraft wirkt stark, die Einschwingzeit ebenfalls — aber nur bei niedriger Kraft. Bei hoher Kraft dominiert die Fassungsspannung, und Warten hilft nicht mehr. Genau diese Wechselwirkung hätte ein Faktor-für-Faktor-Versuch nie gefunden; er hätte die Einschwingzeit als wirkungslos verworfen. Die beste Einstellung ist niedrige Aufspannkraft mit langer Einschwingzeit und iterativer Reihenfolge. Ein Bestätigungslauf über zehn Module belegt sie, bevor die Arbeitsanweisung geändert wird.'
      }
    },

    {
      h: 'Control — das Ergebnis halten',
      p: [
        'Die Improve-Phase liefert eine Einstellung. Ohne Control fällt der Prozess innerhalb weniger Monate zurück, sobald Personal wechselt oder eine Vorrichtung instand gesetzt wird.'
      ],
      tabelle: {
        kopf: ['Maßnahme', 'Konkret', 'Verweis'],
        zeilen: [
          ['Regelkarte', 'I-MR-Karte auf den Rest-RMS, weil bei Stückzahlen dieser Größe keine Untergruppen gebildet werden können', 'Modul 3'],
          ['Standardarbeit', 'Aufspannkraft als geprüfte Vorgabe mit Drehmomentschlüssel; Einschwingzeit im Arbeitsplan verankert', 'Modul 4'],
          ['Reaktionsplan', 'Wer bei einem Kartensignal was tut — schriftlich, sonst wird beim ersten Signal doch wieder nachgestellt', 'Modul 3'],
          ['Vorrichtungsfreigabe', 'Spannkraft nach jeder Instandsetzung prüfen und freigeben', 'Modul 5, D7'],
          ['Nutzen nachhalten', 'FPY und Engpassbelastung über sechs Monate mitschreiben — nicht die Präsentation, sondern diese Kurve schließt das Projekt ab', 'Modul 4']
        ]
      },
      callout: {
        typ: 'ok',
        titel: 'Bilanz des Beispielprojekts',
        text: 'Rest-RMS im Mittel von 5,6 auf 4,7 mλ, Standardabweichung von 1,1 auf 0,8 mλ, Cpk von 0,73 auf 1,38. Nacharbeitsquote von rund 20 % auf unter 2 %, FPY damit von 80 auf 98 %. Über die Rechnung aus Modul 4 sinkt die Belastung der Justagestation von 213 auf 174 Minuten je Stück — rund 18 % mehr Durchsatz am Engpass, ohne eine einzige Investition.'
      }
    },

    {
      h: 'Die Ist/Ist-nicht-Abgrenzung',
      p: [
        'Das wirksamste und am seltensten genutzte Werkzeug in D2. Statt nur zu beschreiben, wo das Problem auftritt, wird systematisch festgehalten, wo es <em>nicht</em> auftritt — bei ähnlichen Bedingungen.'
      ],
      tabelle: {
        kopf: ['Dimension', 'Ist', 'Ist nicht', 'Was die Differenz nahelegt'],
        zeilen: [
          ['Was', 'Koma-Anteil erhöht', 'Astigmatismus und Defokus unauffällig', 'Lagefehler, kein Spannungsproblem'],
          ['Wo', 'Beim Kunden nach Integration', 'Nicht in unserer Endprüfung', 'Zeit- oder aufspannungsabhängiger Effekt'],
          ['Wann', 'Ab KW 19', 'KW 17/18 unauffällig', 'Änderung in KW 18/19 suchen'],
          ['Umfang', '4 von 11 Modulen', 'Nicht alle Module derselben Wochen', 'Nicht generell — an eine Ressource gebunden']
        ],
        fuss: 'Jede Zeile halbiert den Hypothesenraum. Die Kombination „ab KW 19" + „nur ein Teil der Module" führt fast zwangsläufig auf eine Ressource, die in KW 19 geändert wurde und nicht alle Module betrifft — im Fallbeispiel die reparierte Vorrichtung.'
      }
    },

    {
      h: 'Grundursache heißt nachweisbar',
      p: [
        'Der belastbare Test für eine Grundursache ist einfach zu formulieren und unbequem durchzuführen: <strong>Lässt sich der Fehler durch Setzen der vermuteten Ursache gezielt erzeugen und durch ihr Entfernen wieder beseitigen?</strong> Alles andere ist eine Vermutung mit Aktenzeichen.',
        'In der Praxis braucht es meist zwei Ebenen. Die <em>technische</em> Ursachenkette erklärt den Mechanismus (erhöhte Spannkraft → Fassungsspannung → Wellenfrontfehler → Setzverhalten über Stunden). Die <em>systemische</em> Ursache erklärt, warum es passieren konnte (keine Freigabeprüfung nach Instandsetzung). D5 muss beide adressieren — sonst verhindert man entweder die Wiederholung nicht oder man versteht den Effekt nicht.'
      ],
      callout: {
        typ: 'ok',
        titel: '5-Why richtig beenden',
        text: 'Die Kette endet nicht bei „der Mitarbeiter hat nicht aufgepasst", sondern bei einer Systemursache, die man steuern kann: fehlender Standard, fehlende Freigabe, fehlende Prüfmöglichkeit, ungeeignete Vorrichtung. Landet ein 5-Why bei einer Person, wurde zu früh aufgehört.'
      }
    }
  ],

  quiz: [
    {
      frage: 'Wann setzen Sie DMAIC statt 8D ein?',
      optionen: [
        'Immer wenn der Kunde eine formale Antwort verlangt.',
        'Wenn die Ursache unbekannt ist, viele Einflussgrößen infrage kommen und genug Daten für eine statistische Analyse vorliegen.',
        'Wenn das Problem besonders dringend ist.',
        'Wenn kein Team zur Verfügung steht.'
      ],
      richtig: 1,
      erklaerung: '8D reagiert auf ein aufgetretenes, meist reklamiertes Problem und enthält Containment und formalen Abschluss. DMAIC ist ein Verbesserungsprojekt über Wochen bis Monate für Probleme mit unbekannter Ursache und vielen Kandidaten. Für Dringendes ist DMAIC gerade das falsche Werkzeug.'
    },
    {
      frage: 'In der Analyze-Phase zeigt die Regression einen starken Zusammenhang zwischen Aufspannkraft und Restfehler (R² = 0,41). Was folgt daraus?',
      optionen: [
        'Die Aufspannkraft ist die Ursache und kann in Improve direkt optimiert werden.',
        'Ein Zusammenhang, aber keine Ursache — zumal Aufspannkraft und Einschwingzeit in den Beobachtungsdaten vermengt sind und sich daraus nicht trennen lassen.',
        'Der Zusammenhang ist zu schwach, um weiterverfolgt zu werden.',
        'Es müssen mehr Module erfasst werden, dann klärt sich die Ursache.'
      ],
      richtig: 1,
      erklaerung: 'Beobachtungsdaten zeigen Zusammenhänge. Wenn zwei Größen in der gelebten Arbeitsweise gekoppelt auftreten, sind sie vermengt und lassen sich auch mit beliebig vielen zusätzlichen Datenpunkten nicht trennen. Nur der geplante Versuch, in dem die Faktoren unabhängig eingestellt werden, kann das leisten — dasselbe Prinzip wie der Nachweis in D4.'
    },
    {
      frage: 'Warum findet ein Faktor-für-Faktor-Versuch die beste Einstellung in diesem Beispiel nicht?',
      optionen: [
        'Weil er zu wenige Versuche umfasst und die Streuung zu groß ist.',
        'Weil er Wechselwirkungen prinzipiell nicht sichtbar machen kann: Bei hoher Aufspannkraft wirkt die Einschwingzeit kaum, also wird sie fälschlich als wirkungslos verworfen.',
        'Weil er die Reihenfolge der Faktoren nicht berücksichtigt.',
        'Er findet sie, braucht aber mehr Versuche als der vollfaktorielle Plan.'
      ],
      richtig: 1,
      erklaerung: 'Wer jeweils nur einen Faktor vom Ausgangspunkt aus verändert, misst dessen Wirkung genau bei den festgehaltenen Stufen der anderen. Hängt die Wirkung von diesen ab, ist das Ergebnis eine korrekte Messung mit falscher Verallgemeinerung. Der vollfaktorielle Plan schätzt jeden Effekt über beide Stufen der übrigen Faktoren und deckt die Wechselwirkung als eigene Größe auf.'
    },
    {
      frage: 'Was gehört zwingend in die Control-Phase?',
      optionen: [
        'Die Abschlusspräsentation vor der Leitung.',
        'Regelkarte, geänderte Standardarbeit, schriftlicher Reaktionsplan und ein Nutzennachweis über mehrere Monate.',
        'Eine erneute Messsystemanalyse.',
        'Die Übergabe an ein Folgeprojekt.'
      ],
      richtig: 1,
      erklaerung: 'Control sichert, dass der Prozess nicht zurückfällt, sobald Personal wechselt oder eine Vorrichtung instand gesetzt wird. Ohne verankerte Standardarbeit und ohne schriftlichen Reaktionsplan wird beim ersten Kartensignal doch wieder nachgestellt — und die Verbesserung verschwindet unbemerkt.'
    },
    {
      frage: 'Welche Formulierung gehört in D2 (Problembeschreibung)?',
      optionen: [
        '„Die Endprüfung misst zu optimistisch."',
        '„Ab KW 19 zeigen 4 von 11 Modulen beim Kunden 3,6–6,4 mλ mehr Koma als in unserer Endprüfung; Module aus KW 17 sind unauffällig."',
        '„Die Justagevorrichtung V2 spannt zu fest."',
        '„Die Qualität der Baureihe OM-320 hat nachgelassen."'
      ],
      richtig: 1,
      erklaerung: 'D2 beschreibt messbar mit Ist/Ist-nicht-Abgrenzung: was, wo, wann, wie viel — und wo es nicht auftritt. Die Optionen 1 und 3 sind Ursachenhypothesen, die die Analyse vorwegnehmen; Option 4 ist unspezifisch und damit nicht überprüfbar.'
    },
    {
      frage: 'Was ist das entscheidende Merkmal einer guten Sofortmaßnahme (D3)?',
      optionen: [
        'Sie beseitigt die Grundursache.',
        'Sie ist kostengünstig umzusetzen.',
        'Sie schützt den Kunden sofort, ist wirksamkeitsgeprüft und ausdrücklich befristet.',
        'Sie erfordert keine Zustimmung des Kunden.'
      ],
      richtig: 2,
      erklaerung: 'D3 wirkt bewusst ohne Kenntnis der Ursache — die kommt erst in D4. Entscheidend sind sofortige Schutzwirkung, ein Nachweis, dass sie greift, und ein Enddatum. Ohne Befristung wird aus dem Containment eine dauerhafte Zusatzprüfung, deren Ursprung nach zwei Jahren niemand mehr kennt.'
    },
    {
      frage: 'Ein 5-Why endet mit „der Werker hat die Vorrichtung nicht kontrolliert". Bewertung?',
      optionen: [
        'Korrekt — damit ist die Ursache benannt und eine Unterweisung die passende Maßnahme.',
        'Zu früh beendet: Die Frage nach dem System fehlt — warum gab es keine verbindliche Prüfung nach Instandsetzung?',
        'Falsch angewendet, da 5-Why für technische Probleme ungeeignet ist.',
        'Korrekt, sofern der Werker den Fehler bestätigt.'
      ],
      richtig: 1,
      erklaerung: 'Landet eine 5-Why-Kette bei einer Person, wurde zu früh aufgehört. Die steuerbare Systemursache liegt eine Ebene tiefer: fehlender Standard, fehlende Freigabe nach Instandsetzung, fehlende Prüfmöglichkeit. Nur diese Ebene verhindert die Wiederholung — Unterweisungen wirken nur lokal und nur so lange, wie die Personen bleiben.'
    },
    {
      frage: 'Womit weisen Sie in D6 die Wirksamkeit nach?',
      optionen: [
        'Mit der Bestätigung, dass alle Maßnahmen umgesetzt wurden.',
        'Mit der Zustimmung des Kunden zum 8D-Report.',
        'Mit Daten an derselben Kenngröße, mit der das Problem in D2 beschrieben wurde — über eine ausreichende Stückzahl und mit Angabe, ab welcher Seriennummer die Änderung greift.',
        'Mit einer erneuten FMEA-Bewertung der Fehlerart.'
      ],
      richtig: 2,
      erklaerung: 'Umsetzung ist nicht Wirksamkeit. Der Nachweis läuft immer über die Kenngröße aus D2 — sonst misst man etwas anderes als das reklamierte Problem. Die Seriennummer-Angabe macht die Änderung rückverfolgbar: Der Kunde erkennt, welche gelieferten Einheiten noch aus der alten Fertigung stammen.'
    },
    {
      frage: 'Der Fall ist gelöst, alle Maßnahmen wirken. Was gehört zwingend in D8?',
      optionen: [
        'Die Sofortmaßnahme aus D3 dokumentiert zurücknehmen.',
        'Die Spezifikationsgrenze dauerhaft verschärfen.',
        'Die betroffenen Module zurückrufen.',
        'Ein neues DMAIC-Projekt aufsetzen.'
      ],
      richtig: 0,
      erklaerung: 'D8 räumt auf: Containment zurücknehmen, geänderte Dokumente freigeben, Wirksamkeit ab Seriennummer festhalten, Team würdigen. Das Zurücknehmen der Sofortmaßnahme ist der in der Praxis am häufigsten vergessene Schritt — und über die Jahre der teuerste, weil sich Zusatzprüfungen im Prozess ansammeln.'
    }
  ]
},

/* ═══════════════════════════ MODUL 6 ═══════════════════════════ */
{
  id: 'rampup',
  nr: 6,
  titel: 'Ramp-up & Schnittstelle zu R&D',
  kurz: 'Vom Entwicklungsergebnis zur beherrschten Serie: Toleranzketten, FMEA, Sonderfreigaben und Prozessfähigkeit bei kleinen Stückzahlen.',
  ziel: 'Sie können eine Toleranzkette bewerten, den Unterschied zwischen Worst-Case- und statistischer Auslegung begründen und den Anlauf so führen, dass aus Sonderfreigaben kein Dauerzustand wird.',
  jobBezug: 'Zur Rolle gehört die Unterstützung von Anlauf und Hochlauf neuer Produkte bereits während der Entwicklungsphase und die Abstimmung der Entwicklungsergebnisse in enger Zusammenarbeit mit F&amp;E. Das ist ihre Doppelfunktion: Übersetzer zwischen dem, was im Design steht, und dem, was die Fertigung reproduzierbar leisten kann.',
  sim: 'tolerance',
  simTitel: 'Simulation: Toleranzkette im Montagestapel',
  simIntro: 'Vier Beiträge addieren sich zum resultierenden Zentrierfehler. Suchen Sie zuerst den Beitrag mit dem größten Produkt aus Toleranz und Empfindlichkeit — das ist der einzige, dessen Verengung sich lohnt. Schalten Sie danach auf Gleichverteilung um: So verhält sich eine Kette, in der die Einzelteile zu 100 % sortiert und die Randbereiche voll ausgeschöpft werden.',
  begriffe: ['Toleranzkette', 'RSS-Methode', 'Anlauf / Hochlauf', 'Sonderfreigabe', 'FMEA', 'Änderungsmanagement', 'Rückverfolgbarkeit'],

  abschnitte: [
    {
      h: 'Was im Anlauf systematisch anders ist',
      p: [
        'Im Anlauf fehlt alles, worauf sich die Serienfertigung stützt: Es gibt kaum Stückzahlen, die Prozesse sind noch nicht eingefahren, Standards existieren erst als Entwurf, und die Konstruktion ändert sich noch. Gleichzeitig soll bereits geliefert werden.'
      ],
      bullets: [
        '<strong>Statistik ist knapp</strong> — Cpk aus 8 Teilen hat ein so breites Vertrauensintervall, dass die Zahl allein nichts belegt',
        '<strong>Jeder Fehler ist ein Einzelfall</strong> — Muster erkennt man erst rückblickend, deshalb muss lückenlos dokumentiert werden',
        '<strong>Sonderfreigaben häufen sich</strong> — legitim, solange sie befristet und begründet sind',
        '<strong>Änderungen laufen parallel zur Fertigung</strong> — ohne saubere Rückverfolgbarkeit ist später nicht rekonstruierbar, welches Modul welchen Stand hat',
        '<strong>Fertigung und R&amp;D bewerten dasselbe Ergebnis unterschiedlich</strong> — „im Labor funktioniert es" gegen „reproduzierbar in Schicht 3 nicht herstellbar"'
      ],
      callout: {
        typ: 'job',
        titel: 'Die eigentliche Aufgabe an dieser Schnittstelle',
        text: 'Nicht zu entscheiden, wer recht hat, sondern die Frage übersetzbar zu machen: Welche Prozessfähigkeit setzt dieses Design voraus, und ist sie mit den vorhandenen Mitteln erreichbar? Wenn nicht, gibt es genau zwei saubere Antworten — Design ändern oder Prozessfähigkeit aufbauen. Die dritte, „mit Sonderfreigaben durchhalten", ist die, die man später bezahlt.'
      }
    },

    {
      h: 'Toleranzketten: Worst Case gegen RSS',
      p: [
        'Der resultierende Fehler einer Baugruppe entsteht aus vielen Einzelabweichungen, jeweils gewichtet mit ihrer Empfindlichkeit sᵢ — dem Umrechnungsfaktor von der Bauteilabweichung auf das Ergebnis.'
      ],
      formel: 'Worst Case:  T = Σ |tᵢ · sᵢ|            <span class="fx-note">alle Fehler gleichzeitig maximal, gleichgerichtet</span>\n\nRSS:         T = √( Σ (tᵢ · sᵢ)² )      <span class="fx-note">unabhängig, zufällig, zentriert</span>',
      tabelle: {
        kopf: ['Kriterium', 'Worst Case', 'RSS (statistisch)'],
        zeilen: [
          ['Annahme', 'Alle Beiträge gleichzeitig am Rand, gleiches Vorzeichen', 'Unabhängig, zufällig, zentriert'],
          ['Ergebnis', 'Immer sicher, oft deutlich zu konservativ', 'Realistisch, aber annahmeabhängig'],
          ['Kostenwirkung', 'Sehr enge Einzeltoleranzen, teure Fertigung', 'Weitere Einzeltoleranzen, erfordert Prozessnachweis'],
          ['Anwendbar wann', 'Sicherheitskritisch, sehr kleine Stückzahl, unbekannte Verteilungen', 'Serie mit belegten, stabilen Verteilungen']
        ],
        fuss: 'Der typische Anlaufkonflikt: Worst Case verletzt die Spezifikation, RSS hält sie ein. Die Entscheidung hängt davon ab, ob die RSS-Annahmen belegt sind — im Anlauf sind sie es meist noch nicht.'
      },
      callout: {
        typ: 'warn',
        titel: 'Wo RSS gefährlich wird',
        text: 'RSS setzt Unabhängigkeit voraus. Stammen mehrere Bauteile aus derselben Charge, laufen sie über dieselbe Maschine oder wurden sie mit derselben Vorrichtung gefertigt, korrelieren die Abweichungen — dann liegt das reale Ergebnis zwischen RSS und Worst Case, in ungünstigen Fällen nahe am Worst Case. Genau dieser Fall tritt im Anlauf besonders häufig auf, weil dort alles aus einer einzigen Vorserienfertigung stammt.'
      }
    },

    {
      h: 'Empfindlichkeit schlägt Toleranz',
      p: [
        'Der Beitrag eines Bauteils zum Gesamtfehler ist das Produkt tᵢ · sᵢ. Verengt man eine Toleranz von ±6 auf ±3 µm, halbiert sich der Beitrag — meist zu erheblichen Fertigungskosten. Halbiert man dagegen die Empfindlichkeit sᵢ durch eine konstruktive Änderung, ist der Effekt derselbe, die laufenden Kosten sinken aber dauerhaft.',
        'Deshalb ist die richtige Frage an R&amp;D nicht „können wir die Toleranz aufweiten?", sondern „welcher Beitrag hat das größte t·s, und lässt sich dessen Empfindlichkeit konstruktiv senken?". Das ist die Diskussion, die diese Rolle führen muss — und der Grund, warum ein Ingenieurverständnis des Designs verlangt wird und nicht nur Prozessmethodik.'
      ],
      callout: {
        typ: 'ok',
        titel: 'Der dritte Weg: aktiv kompensieren',
        text: 'Statt Toleranzen zu verengen, kann man eine Justageoperation vorsehen, die den Stapelfehler aktiv ausgleicht (Modul 1). Das verlagert Aufwand von der Bauteilfertigung in die Montage — sinnvoll, solange die Justage nicht bereits der Engpass ist (Modul 4). Diese Abwägung ist typisch für die Rolle: Sie hat immer eine optische, eine fertigungstechnische und eine wirtschaftliche Seite.'
      }
    },

    {
      h: 'Sonderfreigaben und Prozessfähigkeit im Anlauf',
      p: [
        'Sonderfreigaben sind im Anlauf ein legitimes Werkzeug — wenn drei Bedingungen erfüllt sind: technisch begründet (Auswirkung auf die Funktion bewertet), befristet (mit Datum oder Stückzahl) und mit Maßnahme hinterlegt (was passiert, damit sie nicht mehr nötig ist).',
        'Fehlt eine dieser Bedingungen, wird die Sonderfreigabe zur schleichenden Spezifikationsänderung. Nach einigen Monaten ist unklar, ob ein Merkmal je eingehalten wurde, und der ursprüngliche Grenzwert ist faktisch aufgegeben — ohne dass ihn jemand bewusst geändert hätte.'
      ],
      bullets: [
        '<strong>Sonderfreigabequote als Kennzahl führen</strong> — sie muss über den Anlauf sichtbar fallen, sonst läuft der Anlauf nicht',
        '<strong>Merkmale mit wiederholten Sonderfreigaben markieren</strong> — sie sind die Kandidaten für Designänderung oder Prozessertüchtigung',
        '<strong>Nicht Cpk aus 8 Teilen berichten</strong> — im Anlauf sind Verlaufsdarstellung und Ist/Ist-nicht-Bewertung aussagekräftiger als eine Kennzahl mit riesigem Vertrauensintervall',
        '<strong>FMEA aus realen Anlauffehlern nachschärfen</strong> — die Bewertung „Auftreten" ist zu Projektbeginn geschätzt; nach den ersten Losen ist sie belegbar'
      ]
    }
  ],

  quiz: [
    {
      frage: 'Vier Beiträge mit je t·s = 4 µm. Wie groß sind Worst Case und RSS?',
      optionen: [
        'Worst Case 16 µm, RSS 8 µm',
        'Worst Case 16 µm, RSS 4 µm',
        'Worst Case 8 µm, RSS 8 µm',
        'Worst Case 16 µm, RSS 16 µm'
      ],
      richtig: 0,
      erklaerung: 'Worst Case = 4 · 4 = 16 µm. RSS = √(4 · 4²) = √64 = 8 µm. Der Faktor √n zwischen beiden Verfahren — hier 2 — ist der Grund, warum die Wahl der Methode über Fertigungskosten in erheblicher Höhe entscheidet.'
    },
    {
      frage: 'Wann ist die RSS-Rechnung nicht zulässig?',
      optionen: [
        'Wenn mehr als vier Beiträge in der Kette liegen.',
        'Wenn die Beiträge korrelieren — etwa gemeinsame Charge, gemeinsame Maschine oder gemeinsame Vorrichtung.',
        'Wenn die Empfindlichkeiten unterschiedlich sind.',
        'Wenn die Toleranzen unterschiedlich groß sind.'
      ],
      richtig: 1,
      erklaerung: 'RSS setzt unabhängige, zufällige, zentrierte Beiträge voraus. Bei gemeinsamer Ursache — dieselbe Charge, dieselbe Maschine, dieselbe Vorrichtung — verschieben sich mehrere Beiträge gleichgerichtet, und das Ergebnis wandert Richtung Worst Case. Unterschiedliche Toleranzen und Empfindlichkeiten sind dagegen völlig unproblematisch.'
    },
    {
      frage: 'Ein Beitrag hat t = 3 µm bei s = 1,4; ein anderer t = 6 µm bei s = 0,3. Welchen greifen Sie an?',
      optionen: [
        'Den mit t = 6 µm — die größere Toleranz.',
        'Den mit t = 3 µm — sein Produkt t·s = 4,2 ist mehr als doppelt so groß wie 1,8.',
        'Beide gleichrangig, da s in der Toleranzrechnung nicht eingeht.',
        'Keinen — bei so kleinen Werten lohnt sich der Aufwand nicht.'
      ],
      richtig: 1,
      erklaerung: 'Maßgeblich ist das Produkt t·s: 3 · 1,4 = 4,2 gegen 6 · 0,3 = 1,8. Die größere Einzeltoleranz ist der harmlosere Beitrag. Genau deshalb ist die Empfindlichkeitsanalyse der erste Schritt jeder Toleranzdiskussion mit R&D — sonst optimiert man die auffälligste statt der wirksamsten Größe.'
    },
    {
      frage: 'Ein Merkmal erhält im Anlauf zum fünften Mal eine Sonderfreigabe. Wie reagieren Sie?',
      optionen: [
        'Routiniert freigeben — im Anlauf ist das normal.',
        'Die Spezifikationsgrenze anpassen, da sie offensichtlich zu eng gewählt war.',
        'Das Merkmal als Kandidat für Designänderung oder Prozessertüchtigung eskalieren — wiederholte Sonderfreigaben sind das Signal, dass Anforderung und Fähigkeit nicht zusammenpassen.',
        'Eine 100 %-Prüfung des Merkmals einführen.'
      ],
      richtig: 2,
      erklaerung: 'Eine einmalige Sonderfreigabe überbrückt, eine wiederholte zeigt eine strukturelle Lücke zwischen Anforderung und Prozessfähigkeit. Stilles Weiterfreigeben macht die Sonderfreigabe zur verdeckten Spezifikationsänderung. Die Grenze anzupassen kann am Ende richtig sein — aber erst nach bewerteter Auswirkung auf die Systemfunktion, nicht weil sie stört.'
    },
    {
      frage: 'R&D berichtet Cpk = 1,45 aus 8 Vorserienteilen. Wie bewerten Sie das?',
      optionen: [
        'Sehr gut — über 1,33, der Prozess ist fähig.',
        'Aus 8 Teilen ist das Vertrauensintervall so breit, dass der Wert keine belastbare Fähigkeitsaussage trägt.',
        'Der Wert ist unbrauchbar, da Cpk mindestens 125 Teile erfordert.',
        'Der Wert ist zu gut, um korrekt zu sein, und deutet auf einen Rechenfehler hin.'
      ],
      richtig: 1,
      erklaerung: 'Cpk aus 8 Werten hat ein Vertrauensintervall, das grob von deutlich unter 1,0 bis über 2,0 reicht — die Punktschätzung sagt fast nichts. Im Anlauf sind Verlaufsdarstellungen, die Ist/Ist-nicht-Bewertung und der Nachweis stabiler Einflussgrößen aussagekräftiger. Die Zahl ist nicht falsch berechnet, sie wird nur überinterpretiert.'
    }
  ]
}

];
