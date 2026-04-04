# Finance Dashboard

A responsive finance dashboard built with React, Vite, Tailwind CSS, and Recharts. The app includes summary cards, charts, insights, transaction filters, and a simple role switcher for viewer and admin modes.

## Features

- Dashboard summary cards with polished spacing and hover states
- Transaction table with search and type filters
- Income vs expense line chart and category-wise expense pie chart
- Insights panel for top spending category, savings, and observations
- Role switcher with admin-only add action
- Graceful empty states for transactions, charts, and insights
- `localStorage` persistence for role and transaction data

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Recharts
- ESLint

## Setup

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Create a production build

```bash
npm run build
```

## Submission Notes

- The dashboard seeds itself from local mock transaction data.
- Role and transaction data are saved to `localStorage`.
- If local storage is cleared, the app falls back to the bundled mock dataset.
