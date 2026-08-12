# E-Check Projektregeln

- Entwickle mobile-first und offline-first.
- Die Kern-App hat kein Backend, keine Datenbank und keine Cloud-Abhängigkeit.
- Vermeide unnötige Dependencies.
- Trenne Inhalte konsequent von UI-Komponenten.
- Artikel und Störungsbäume bleiben datengetrieben.
- Formuliere kurz, technisch und in neutraler Du-Sprache.
- Erfinde keine technischen Sollwerte oder Herstellerparameter.
- Entferne oder relativiere keine Sicherheitsinformationen.
- Fordere nie zum Überbrücken von Sicherheitsfunktionen auf.
- Baue bestehende Funktionen bei späteren Änderungen nicht unnötig um.
- Ergänze neue Inhalte über die zentrale Artikelstruktur in `src/data/articles.ts`.
- Ergänze neue Störungsbäume über die Struktur in `src/data/decisionTrees.ts`.
- Artikel müssen mehrere Bilder über `images[]` und einzelne Schrittbilder unterstützen.
- Prüfe vor Abschluss Build, Tests, mobile Bedienung und Offline-Verhalten.
