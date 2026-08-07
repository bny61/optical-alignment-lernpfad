# Optical Alignment — Lernpfad Prozessingenieur Optische Justage

Lern-Webseite zu den täglichen Aufgaben eines Prozessingenieurs in der Optikmontage und Justage von
Lithografieoptik: Prozessanalyse und -verbesserung, technische Verantwortung für einen Wertstromabschnitt,
Serienanlauf gemeinsam mit der Entwicklung und die Bearbeitung von Kundenreklamationen. Eine Einordnung in
das Lithografiesystem plus sieben Module, jeweils mit Erklärteil, interaktiver Simulation und Selbsttest.

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
| 2 | Justage im EUV-System | Was sich beim Spiegelsystem ändert | Gefalteter Strahlengang und 2α-Regel · Fehlerbudget über sechs Spiegel |
| 3 | Messtechnik, MSA & Abnahme | Taugt die Messung — und wie wird das Modul abgenommen | Prüfkaskade · Gage R&R · Annahmegrenze zwischen Pseudoausschuss und Durchschlupf |
| 4 | Prozessstabilität & Fähigkeit | Eingreifen oder nicht eingreifen | Regelkarte mit Drift und Western-Electric-Regeln · mittlere Lauflänge (ARL) |
| 5 | Wertstrom & Lean | Takt, Engpass, Nacharbeit, Durchlaufzeit | Wertstromkarte · Belastungsdiagramm · Wartezeit über der Auslastung (Kingman) |
| 6 | 8D, PDCA, Six Sigma | Reklamation und Verbesserungsprojekt führen | Geführter 8D-Durchlauf · vollständiges DMAIC-Beispiel mit 2³-Versuchsplan |
| 7 | Ramp-up & Schnittstelle R&D | Worst Case vs. RSS, Sonderfreigaben, Fähigkeit bei kleinen Stückzahlen | Monte-Carlo über die Toleranzkette |

Dazu zwei Referenzseiten: eine **Kompaktübersicht** (zwölf Kernsätze, Diagnosetabelle, Formelsammlung,
Kennzahlen mit Grenzwerten, häufige Fehlschlüsse, Selbsttestfragen — mit Druckansicht) und ein Glossar.

Empfohlene Reihenfolge: Einordnung → 1 → 2 → 3 → 4 → 5 → 6 → 7 → Kompaktübersicht zum Wiederholen.
Modul 1 entwickelt die Justage am refraktiven Fall (Linsen, 193 nm), Modul 2 überträgt sie auf das
reflektive EUV-System (Spiegel, 13,5 nm). Die Methodenmodule 3 bis 7 gelten für beide unverändert. Module 1 bis 3 sind Voraussetzung für die Kennzahlen in Modul 4.
Rechnen Sie mit 30–45 Minuten je Modul, wenn Sie die Simulationen wirklich durchspielen.

## Projektstruktur

```
index.html          Shell: Topbar, Seitenleiste, Content-Container
css/base.css        Reset, Farbvariablen (Light/Dark), Layout
css/components.css  Karten, Simulator-Layout, Quiz, Tabellen, Badges
js/charts.js        SVG- und Mathe-Helfer (Plot, Skalen, seeded PRNG, Slider, Kennzahlkacheln)
js/figures.js       Schemaskizzen: Scanner, Spiegelfertigung, Ortsfrequenzen,
                    Messplatz, Modulschnitt, Justagezyklus (window.FIGS)
js/sim-*.js         die elf Simulatoren, registriert unter window.SIMS
js/quiz.js          Multiple-Choice mit Auswertung
js/render.js        Seitenaufbau aus den Datenobjekten
js/router.js        Hash-Router (#/, #/modul/<id>, #/kompakt, #/glossar?t=<begriff>)
js/app.js           Bootstrap, Navigation, Fortschritt
data/modules.js     alle Lerninhalte und Quizfragen
data/glossary.js    Fachbegriffe DE/EN
data/cases.js       Fallbeispiel für den 8D-Durchlauf
data/summary.js     Inhalte der Kompaktübersicht
```

### Cache-Buster

Alle `js`- und `css`-Verweise in `index.html` tragen einen Versionsparameter `?v=N`. **Vor jedem Deploy
`./bump-version.sh` ausführen** — sonst liefern Browser und CDN nach einer Änderung weiterhin die alten
Dateien aus, und die Seite zeigt trotz erfolgreichem Deploy den alten Inhalt.

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
