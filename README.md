# Kleine-Hilfe

Deutschsprachiger Shop für digitale PDF-Planer zum Ausdrucken. Statische Website (HTML, CSS, JS, ohne Build-Schritt), vorgesehen für GitHub Pages. Zahlung, MwSt.-Abwicklung und Download über Lemon Squeezy (Merchant of Record).

Im Sortiment liegen **38 Produkte**: 35 Einzelplaner und 3 vergünstigte Pakete, gegliedert in Alltag & Organisation, Finanzen, Familie & Kinder, Gesundheit & Selbstfürsorge, Schule & Lernen sowie Events. Die vollständige Liste steht in `products.csv`.

Die Kauf-Buttons führen noch auf Platzhalter-URLs der Form `https://kleine-hilfe.lemonsqueezy.com/checkout/buy/PLACEHOLDER-…`.

## Lokal ansehen

Im Projektordner:

```bash
python3 -m http.server 8765
```

Danach im Browser `http://127.0.0.1:8765/` öffnen.

## PDFs und Mockups neu erzeugen

Voraussetzungen: Python 3, Google Chrome, Pillow, poppler-utils, pdfunite (poppler), die Schriftarten unter `assets/fonts/`.

Die drei Launch-Planer:

```bash
python3 scripts/build_planners.py
python3 scripts/generate_mockups.py
```

Das erweiterte Sortiment (inkl. Produktseiten, Startseite und `products.csv`):

```bash
python3 scripts/expand_shop.py
```

Die Verkaufs-PDFs unter `products/*.pdf` sind gitignoriert und gehören nicht in das öffentliche GitHub-Pages-Paket.

## Auf GitHub Pages veröffentlichen

1. Neues GitHub-Repository anlegen (das macht die Betreiberin / der Betreiber selbst).
2. Dieses Projekt als Inhalt des Repositories verwenden, ohne die PDF-Dateien.
3. In den Repository-Settings GitHub Pages auf den Branch `main` und das Verzeichnis `/ (root)` stellen.
4. Optional eine eigene Domain auf Pages legen.

Vor dem öffentlichen Verkauf unbedingt die Checkliste unten abarbeiten. Dieses Repository wurde lokal initialisiert und nicht automatisch veröffentlicht.

## Was vor dem Verkauf noch zu tun ist

- Lemon-Squeezy-Konto und Store anlegen, die PDFs als Produkte (und Pakete) einrichten (inkl. Widerrufs-Checkbox für digitale Inhalte), echte Checkout-Links in den HTML-Dateien ersetzen.
- Impressum, Datenschutzerklärung, Widerrufsbelehrung und AGB enthalten die Betreiberdaten, sollten aber rechtlich geprüft werden.
- Gewerbe anmelden, Steuerfragebogen ausfüllen, Buchhaltung starten (siehe `buchhaltung.md` – keine Steuerberatung).
- Optional eine eigene Domain festlegen; die Shop-Kontaktadresse steht im Impressum.
- Marketing starten nach `marketing.md`.

## Inhalte

- `index.html` und die übrigen HTML-Seiten: Shop, Produktseiten und Rechtstexte
- `css/`, `js/`, `images/`, `assets/fonts/`: Darstellung
- `products/`: Verkaufs-PDFs (gitignoriert) und Mockups
- `pdf-src/`: HTML-Quellen der Planer
- `products.csv`, `research.md`, `marketing.md`, `buchhaltung.md`, `buchhaltung.csv`
- `screenshots/`: Ansichten der Startseite und von Produktseiten
- `scripts/`: Erzeugung von PDFs, Mockups und Shop-Seiten
