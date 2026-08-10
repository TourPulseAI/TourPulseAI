# TourPulse — Website

Dieses Repository enthält den Quellcode der öffentlichen Website von **TourPulse** – einer SaaS-Plattform für kleine Hotels, Ferienwohnungen, Campingplätze und Tourenanbieter. Das Produkt sagt Gästeankünfte und Auslastung voraus, schlägt passende Zimmerpreise vor, erkennt buchungsschwache Zeiten und gibt Werbe- und Angebotstipps per KI.

Die Website ist eine deutsche Landingpage, die Produkt, Funktionen und Pakete vorstellt (inklusive des geplanten 24-Stunden-Testangebots).

## Tech-Stack

- [TanStack Start](https://tanstack.com/start) (React + Vite)
- Tailwind CSS v4
- [Bun](https://bun.sh) als Paketmanager und Runtime

## Lokal starten

```bash
bun install
bun run dev
```

## Publizieren

```bash
bun run publish
```

Das Skript baut die Seite und startet den Server auf Port 3000 neu (die öffentliche Oberfläche des Teams). Weitere Details finden sich in [SITE.md](./SITE.md).

## Struktur

- `src/routes/` – Seiten (Landingpage in `index.tsx`)
- `src/styles/app.css` – Tailwind-Styles
- `public/` – statische Assets (Bilder, `robots.txt`, `sitemap.xml`)
- `serve.ts` / `vercel-entry.ts` – Server-Einstiegspunkte

## Status

Aktueller Stand: MVP der Landingpage. Die Dashboard-Software folgt in weiteren Schritten. Das 24-Stunden-Testangebot ist als geplantes Angebot ausgewiesen und technisch noch nicht umgesetzt.
