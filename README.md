# E-Check

E-Check ist eine mobile, offlinefähige PWA für die elektrische Instandhaltung. Version 0.2.0 liefert eine zweisprachige, datengetriebene Grundlage für die spätere modulare IH-App. Sie unterstützt Fachkräfte beim strukturierten Prüfen, erweitert aber keine betrieblichen Berechtigungen. Sicherheits- und Arbeitsanweisungen des Betriebs haben immer Vorrang.

## Funktionsumfang v0.2

- vollständige Bedienoberfläche und Fachinhalte in `de-CH` und Slowakisch (`sk`)
- 20 strukturierte Artikel mit Symptomen, Suchbegriffen, Prüfschritten und Ergebnissen
- mehrsprachige lokale Suche über Titel, Begriffe, Synonyme, Symptome und Hersteller
- zentraler, datengetriebener Störungsbaum „Motor läuft nicht“
- Datenmodell für mehrere Artikel- und Schrittbilder mit Bildtext und Vollbildansicht
- installierbare PWA mit kontrolliertem Aktualisierungshinweis und Offline-Precache
- getrennte App-Version `0.2.0` und Inhaltsversion `2026.09.1`

Für v0.2 wurden keine nicht vorhandenen Bilder oder zusätzlichen Störungsabläufe erfunden. Das Datenmodell ist dafür vorbereitet.

## Technik

- React 19, TypeScript, Vite und Tailwind CSS 4
- Phosphor Icons
- `vite-plugin-pwa` mit Workbox
- Vitest, Testing Library und jsdom
- kein Login, Backend, keine Datenbank und keine API für die Kernfunktion

## Installation, Tests und Build

```bash
npm install
npm test
npm run build
npm run preview
```

Automatisierte Offline-/Update-Prüfung nach dem Produktionsbuild:

```bash
npx playwright install chromium
npm run test:e2e
```

Der Test startet einen lokalen Server für `dist/`, lädt die App, schaltet den Browser offline und startet sie in einem neuen Tab. Er prüft Suche, Artikel, Störungsnavigation und eine gecachte SVG-Datei bei 360, 390 und 412 Pixel Breite. Eine zweite HTML-/Service-Worker-Version wird nur im Testserver simuliert: Der Test prüft Erkennung nach Netzrückkehr, Bestätigung, Aktivierung und anschliessenden Offline-Reload. Echte Geräteinstallation, Safari und echte Artikelbilder werden damit nicht geprüft. Pull Requests führen Unit-Tests, Build und diese Chromium-Tests vor dem Merge aus.

Der Produktionsbuild liegt in `dist/`. Für Tests auf einem Mobilgerät kann der Entwicklungsserver mit `npm run dev -- --host` im lokalen Netz bereitgestellt werden.

## PWA und Offline-Verhalten

Workbox legt HTML, JavaScript, CSS, Icons, Schriften und lokale Bilder in einem versionierten Precache ab. Nach dem ersten vollständigen Laden sind Navigation, Suche, Artikel und Störungsbaum ohne Netz nutzbar. Nach Netzrückkehr, beim erneuten Anzeigen der App und stündlich wird nach Updates gesucht. Eine neue Version wird nicht unbemerkt mitten im Einsatz aktiviert: Die App zeigt einen Hinweis und lässt den Nutzer den Aktualisierungszeitpunkt wählen. Veraltete Caches werden bereinigt.

Installierbarkeit und Offline-Betrieb sollten über einen Produktionsbuild unter HTTPS oder auf `localhost` geprüft werden.

## Sprachen und Fallback

- `src/i18n.tsx` enthält UI-Texte, Sprachkonfiguration und Bezeichnungen.
- `src/data/articleTranslations.sk.ts` enthält slowakische Artikelübersetzungen.
- `src/data/decisionTreeTranslations.sk.ts` enthält den slowakischen Störungsbaum.
- `de-CH` ist Standardsprache und kontrollierter Fallback, falls ein einzelner Text in einer weiteren Sprache fehlt.
- Die Sprachwahl wird nur lokal und versioniert im Browser gespeichert.

Prüfschritte, Ergebnisse und Bilder werden als vollständige übersetzte Listen gepflegt, einschliesslich aller zugehörigen Sicherheitshinweise. Unterschiedlich aufgebaute Listen werden nie positionsweise vermischt. Fehlt eine Liste oder ist sie leer, erscheint die vollständige deutsche Liste. Einzelne Textfelder ausserhalb dieser Listen fallen auf Deutsch zurück. Übersetzungen von Entscheidungsoptionen ändern nur die Beschriftung; Zielknoten bleiben sprachunabhängig.

Eine weitere Sprache wird zuerst in `SUPPORTED_LOCALES` und den UI-Nachrichten ergänzt. Danach werden Artikel- und Störungsbaumübersetzungen hinterlegt und die Sprachtests erweitert.

## Inhalte und Bilder pflegen

Neue Artikel werden datengetrieben in `src/data/articlesV02.ts` ergänzt. Jeder Artikel braucht eine eindeutige `id`, Kategorie, Kurzbeschreibung, Symptome, Suchbegriffe, Werkzeuge, mindestens drei klare Prüfschritte, Ergebniszustände und passende Übersetzungen. Technische Sollwerte, Herstellerparameter und Klemmenbezeichnungen dürfen nicht erfunden werden.

Bilder liegen lokal unter `public/` und werden im Artikel so referenziert:

```ts
images: [{
  src: '/e-check/articles/beispiel.webp',
  alt: 'Sachliche Beschreibung des sichtbaren Bauteils',
  caption: 'Optionaler Bildtext',
  stepReference: 'Optionaler Bezug zum Prüfschritt'
}]
```

Ein einzelner Prüfschritt kann zusätzlich ein `image` mit derselben Struktur enthalten. Für produktive Inhalte keine externen Bild-URLs verwenden; nur freigegebene, optimierte lokale Dateien mit aussagekräftigem Alternativtext.

## Architektur und Projektstruktur

```text
src/
├── data/
│   ├── articles.ts                    # Zusammenführung und Lokalisierung
│   ├── articlesV02.ts                 # 15 neue v0.2-Fachartikel
│   ├── articleTranslations.sk.ts      # slowakische Artikeltexte
│   ├── decisionTrees.ts               # zentraler Motor-Störungsbaum
│   ├── decisionTreeTranslations.sk.ts # slowakische Baumtexte
│   └── meta.ts                        # App-/Inhaltsversion und Stammdaten
├── lib/
│   ├── search.ts                      # gewichtete mehrsprachige Suche
│   ├── faultNavigation.ts             # Vor/Zurück/Neustart-Logik
│   └── storage.ts                     # versionierte lokale Präferenzen
├── App.tsx                            # mobile Ansichten
├── i18n.tsx                           # UI-Lokalisierung und Fallback
└── types.ts                           # zentrale erweiterbare Datenmodelle
```

Verweise im Störungsbaum müssen auf vorhandene Knoten zeigen. Weiterführende Inhalte verwenden `ContentLink`; dessen Typen bereiten Artikel, Dokumente, Werkzeuge, Störungen und Fehlercodes vor, ohne diese Module bereits zu implementieren.

## Hosting und Informationsschutz

Das aktuelle Deployment erfolgt über das öffentliche GitHub-Pages-Repository `YuuBoon/e-check`. Dieses Hosting ist ungeeignet für interne Dokumente, Anlagenfotos, Telefonnummern oder vertrauliches Anlagenwissen. Solche Inhalte dürfen dort nicht eingecheckt oder ausgeliefert werden. Vor V1.0 muss mit IT ein internes Hosting-, Berechtigungs- und Zugriffskonzept festgelegt werden.

## Qualitätssicherung

Die Tests prüfen Artikeldaten und Verweise, de-CH/sk-Lokalisierung und Fallback, Suchbegriffe und Synonyme, gültige Entscheidungsbaum-Ziele, Vor/Zurück/Neustart sowie zentrale UI-Abläufe. Vor jedem Release zusätzlich den Produktionsbuild, kleine und grosse Mobilansichten, PWA-Aktualisierung und Offline-Betrieb manuell prüfen.

## Roadmap

- **v0.2.0:** Mehrsprachigkeit, 20 Artikel, Bildmodell, zentrale datengetriebene Störungsbasis und belastbares PWA-Updateverhalten
- **V1.0:** spätestens Dokumentenbibliothek, Elektriker-Rechner, FU-Fehlercode-Suche und freigegebene Bildunterstützung
- **langfristig:** Mechanik, Pneumatik, Hydraulik, Teamkontakte, Anlagenwissen und QR-Zugriff

App-Version: **0.2.0** · Inhaltsstand: **2026.09.1**
