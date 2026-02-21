# SouqPro

A portfolio-level SaaS demo for small retail businesses in the Middle East.

## Overview

SouqPro is a standalone Angular 20+ application demonstrating a retail management dashboard with bilingual support (English/Arabic), RTL layout for Arabic, and mock data for inventory, sales, and analytics.

## Tech Stack

- **Angular 21** (standalone components)
- **Signals** for state management
- **RxJS** where needed
- **Chart.js** for data visualization
- **JSON-based i18n** (no external translation library)

## Features

- **Dashboard**: Sales metrics, revenue trends, category distribution charts
- **Inventory**: Product catalog with search, low-stock highlighting
- **Sales**: Transaction history with search
- **Settings**: Language switcher, store information
- **Internationalization**: English (default) and Arabic with RTL support

## Project Structure

```
src/app/
├── core/
│   ├── layout/          # Main layout, header, nav
│   └── services/        # Translation service
├── shared/
│   ├── components/      # Reusable components (e.g. Chart)
│   └── pipes/           # Translate pipe
├── models/              # Product, Sale interfaces
├── services/            # Mock data service
└── features/
    ├── dashboard/
    ├── inventory/
    ├── sales/
    └── settings/
```

## Development

```bash
npm install
npm start
```

Navigate to `http://localhost:4200`.

## Build

```bash
npm run build
```

## Demo Data

- 30 products across 5 categories (Electronics, Clothing, Perfumes, Groceries, Accessories)
- 250 sales over 3 months
- Realistic Middle Eastern product names and store owners

**Note:** This is a demo version with simulated data only. No backend is included.
