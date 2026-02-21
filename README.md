# SouqPro

A retail management dashboard built with Angular 21—designed as a portfolio demo for small businesses in the Middle East. Features bilingual support (English/Arabic), RTL layout, and mock analytics.

## Highlights

- **Modern Angular** — Standalone components, Signals for state, `computed()` for derived data
- **i18n** — Custom JSON-based translation (no ngx-translate), full RTL support for Arabic
- **Chart.js** — Sales trends, revenue over time, category breakdown
- **Clean architecture** — Feature-based structure, shared services, typed models

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Angular 21 |
| State | Signals + `computed()` |
| Charts | Chart.js |
| i18n | Custom service (JSON) |
| Styling | Utility-first CSS, CSS variables |

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

## Project Structure

```
src/app/
├── core/           # Layout, translation service
├── shared/         # Chart component, translate pipe
├── features/       # Dashboard, Inventory, Sales, Settings
├── models/         # Product, Sale interfaces
└── services/       # Mock data generator
```

## What's Inside

- **Dashboard** — Today's sales, monthly revenue, low-stock alerts, best seller, 3 charts
- **Inventory** — Product table with search, low-stock highlighting
- **Sales** — Transaction history with search
- **Settings** — Language switcher (EN/العربية), store info

Mock data: 30 products, 250 sales across 3 months. Categories include Electronics, Clothing, Perfumes, Groceries, Accessories—with realistic Arabic product names.

## Build

```bash
npm run build
```

Output in `dist/SouqPro/`.
