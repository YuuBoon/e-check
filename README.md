# E-Check

E-Check ist eine mobile, offline nutzbare Arbeitshilfe für die elektrische Instandhaltung. Der Prototyp führt Mechaniker schnell von einem Problem zu einem sinnvollen nächsten Prüfschritt. Die App ersetzt weder Ausbildung noch betriebliche Berechtigungen.

## Tech-Stack

- React 19 und TypeScript
- Vite
- Tailwind CSS 4
- Phosphor Icons
- `vite-plugin-pwa` mit Workbox
- Vitest

Kein Backend, keine Datenbank und keine API für die Kernfunktion.

## Installation und Entwicklung

```bash
npm install
npm run dev
```

Vite zeigt danach die lokale Adresse an. Für einen Test auf dem Smartphone kann der Entwicklungsserver mit `npm run dev -- --host` im lokalen Netzwerk freigegeben werden.

## Tests und Build

```bash
npm test
npm run build
npm run preview
```

Der Produktionsbuild liegt in `dist/`.

## PWA und Offline

Das Web-App-Manifest und der Service Worker werden in `vite.config.ts` konfiguriert. Workbox legt eine versionierte Precache-Liste für HTML, JavaScript, CSS, Icons und lokale Bilder an. Nach dem ersten vollständigen Laden funktionieren Navigation, Suche, Artikel und Störungsbaum offline. Alte Caches werden beim Update bereinigt.

Installierbarkeit und Offline-Modus am zuverlässigsten über einen Produktionsbuild und HTTPS oder `localhost` prüfen.

## Projektstruktur

```text
src/
├── data/
│   ├── articles.ts        # fünf MVP-Artikel
│   ├── decisionTrees.ts   # Motor-Störungsbaum
│   └── meta.ts            # Version, Kategorien, Hersteller, Grundlagen
├── lib/
│   └── search.ts          # lokale gewichtete Fuzzy-Suche
├── App.tsx                # mobile Ansichten und Navigation
├── styles.css             # Designsystem und responsive UI
└── types.ts               # zentrale Datenmodelle
public/
├── icon.svg
└── icon-maskable.svg
```

## Inhalte pflegen

### Neuen Artikel hinzufügen

In `src/data/articles.ts` ein Objekt gemäß `Article` aus `src/types.ts` ergänzen. Eine eindeutige `id`, alle Suchfelder, strukturierte Schritte und Ergebnisstatus angeben. Bilder kommen als lokale Pfade in `images[]`; ein Schritt kann zusätzlich `image` enthalten.

### Suchbegriffe hinzufügen

Beim passenden Artikel Einträge unter `keywords`, `symptoms` oder `manufacturers` ergänzen. Das Ranking lautet Titel, Keyword, Symptom, Hersteller, Beschreibung, Kategorie. Danach `npm test` ausführen.

### Neuen Entscheidungsbaum hinzufügen

In `src/data/decisionTrees.ts` einen `DecisionTree` ergänzen. UI-Komponenten enthalten keine Pfadlogik. Jeder `next`-Wert muss auf einen vorhandenen Knoten verweisen. Die Validierungsfunktion und Tests als Vorlage nutzen.

### Hersteller hinzufügen

Die zentrale Liste `MANUFACTURERS` in `src/data/meta.ts` ergänzen und den Hersteller nur bei passenden Artikeln in `manufacturers[]` eintragen. Keine Parameter oder Klemmenbezeichnungen erfinden.

### Version ändern

`APP_VERSION` in `src/data/meta.ts` und die Paketversion in `package.json` anpassen. Bei relevanten Offline-Änderungen entsteht mit dem neuen Build automatisch eine neue Workbox-Precache-Version.

### Logo austauschen

`public/icon.svg` und `public/icon-maskable.svg` ersetzen. Dateinamen beibehalten oder die Referenzen in `vite.config.ts` und `index.html` aktualisieren.

## Version

E-Check – Version 0.1 Prototype
