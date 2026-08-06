# Optical Alignment — Lernpfad Prozessingenieur Optische Justage

Lern-Webseite zu den täglichen Aufgaben eines Prozessingenieurs in der Optikmontage und Justage von
Lithografieoptik: Prozessanalyse und -verbesserung, technische Verantwortung für einen Wertstromabschnitt,
Serienanlauf gemeinsam mit der Entwicklung und die Bearbeitung von Kundenreklamationen. Eine Einordnung in
das Lithografiesystem plus sechs Module, jeweils mit Erklärteil, interaktiver Simulation und Selbsttest.

Läuft ohne Build und ohne Server — `index.html` genügt.

## Starten

Doppelklick auf `index.html` genügt — es gibt keinen Build-Schritt und keine externen Abhängigkeiten.

Alternativ mit lokalem Server:

```bash
cd opticalalignment
python3 -m http.server 8000
# → http://localhost:8000
```

Der Lernfortschritt wird im `localStorage` des Browsers gespeichert (`oa-progress`) und über die Schaltfläche
unten in der Seitenleiste zurückgesetzt.

## Module

| # | Modul | Tägliche Herausforderung | Simulation |
|---|-------|--------------------------|------------|
| · | Einordnung: das Lithografiesystem | Warum die Toleranzen so eng sind | Scanner-Strahlengang, Rayleigh-Gleichung, Generationen, EUV-Spiegelfertigung und Ortsfrequenzbänder |
| 1 | Grundlagen der Justage | Welche Aberration verrät welche mechanische Ursache | Drei Schemaskizzen des realen Messplatzes plus Simulation Stellgrößen → Wellenfront |
| 2 | Messtechnik & MSA | Taugt die Messung, bevor man Prozessentscheidungen darauf stützt | Gage R&R gegen Toleranz und Teilestreuung |
| 3 | Prozessstabilität & Fähigkeit | Eingreifen oder nicht eingreifen | Regelkarte mit Drift, Sprung, Western-Electric-Regeln, Cp/Cpk |
| 4 | Wertstrom & Lean | Takt, Engpass, Nacharbeit, Durchlaufzeit | Belastungsdiagramm des Montageabschnitts |
| 5 | 8D, PDCA, Six Sigma | Reklamation methodisch führen | Geführter 8D-Durchlauf über Fall R-2417 |
| 6 | Ramp-up & Schnittstelle R&D | Worst Case vs. RSS, Sonderfreigaben, Fähigkeit bei kleinen Stückzahlen | Monte-Carlo über die Toleranzkette |

Empfohlene Reihenfolge: Einordnung → 1 → 2 → 3 → 4 → 5 → 6. Module 1 und 2 sind Voraussetzung für die Kennzahlen in Modul 3.
Rechnen Sie mit 30–45 Minuten je Modul, wenn Sie die Simulationen wirklich durchspielen.

## Projektstruktur

```
index.html          Shell: Topbar, Seitenleiste, Content-Container
css/base.css        Reset, Farbvariablen (Light/Dark), Layout
css/components.css  Karten, Simulator-Layout, Quiz, Tabellen, Badges
js/charts.js        SVG- und Mathe-Helfer (Plot, Skalen, seeded PRNG, Slider, Kennzahlkacheln)
js/figures.js       Schemaskizzen: Scanner, Spiegelfertigung, Ortsfrequenzen,
                    Messplatz, Modulschnitt, Justagezyklus (window.FIGS)
js/sim-*.js         die sechs Simulatoren, registriert unter window.SIMS
js/quiz.js          Multiple-Choice mit Auswertung
js/render.js        Seitenaufbau aus den Datenobjekten
js/router.js        Hash-Router (#/, #/modul/<id>, #/glossar?t=<begriff>)
js/app.js           Bootstrap, Navigation, Fortschritt
data/modules.js     alle Lerninhalte und Quizfragen
data/glossary.js    Fachbegriffe DE/EN
data/cases.js       Fallbeispiel für den 8D-Durchlauf
```

### Warum `.js` statt `.json`

Die Inhalte liegen als klassische Skriptdateien vor, die auf `window.APP_DATA` schreiben — nicht als JSON per
`fetch()` und nicht als ES-Module. Beides scheitert unter `file://` an der CORS-Policy des Browsers. So lässt
sich die Seite ohne Server öffnen.

Alle Diagramme werden zur Laufzeit als SVG erzeugt; es gibt keine Bilddateien und keine externen Bibliotheken.

## Inhaltlicher Hinweis

Alle Zahlenwerte, Kopplungsfaktoren und Fallbeispiele sind didaktisch konstruiert und größenordnungsplausibel
gewählt. Sie stammen aus keinem realen Fertigungsbetrieb und geben keine Systemdaten eines Herstellers wieder.
Die Simulationen sind Lernmodelle, keine Optikdesign- oder Fertigungssoftware — die verwendeten Formeln und
Annahmen stehen jeweils unter der Simulation.
