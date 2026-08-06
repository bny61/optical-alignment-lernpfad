/* modules.js — Lerninhalte. Reine Datenzuweisung (kein fetch/JSON), damit die Seite auch per file:// lädt. */
window.APP_DATA = window.APP_DATA || {};
window.APP_DATA.module = [

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
