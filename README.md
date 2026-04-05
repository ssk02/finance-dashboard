# Finance Dashboard

A responsive finance dashboard built with React, Vite, Tailwind CSS, and Recharts. The app includes summary cards, charts, insights, transaction filters, and a simple role switcher for viewer and admin modes.

## Features

- Dashboard summary cards with polished spacing and hover states
- Transaction table with search, type, and date range filters
- Income vs expense line chart and category-wise expense pie chart
- Insights panel for top spending category, month-over-month expense comparison, savings, and observations
- Role switcher with admin-only add action
- Export transactions to CSV or JSON formats
- Graceful empty states for transactions, charts, and insights
- `localStorage` persistence for role and transaction data
- Indian rupee (INR) currency formatting and India-inspired dataset

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

## Assignment Compliance

This project meets all core requirements of the Finance Dashboard assignment:

- Dashboard Overview: Summary cards for total income, total expenses, net savings, and investments, plus time-based and category-based charts
- Transactions Section: Transaction list with date, amount, category, and type, plus search and filtering by type and date range
- Basic Role Based UI: Viewer can inspect data, while Admin can add transactions from the frontend
- Insights Section: Highest spending category, month-over-month expense comparison, savings summary, and a quick observation
- State Management: React state handles role, transactions, and transaction filters, with `localStorage` persistence for role and transactions
- UI and UX: Responsive layout, readable hierarchy, and graceful empty states across dashboard areas
- Optional Enhancements: Data persistence, animations/transitions, export functionality (CSV/JSON), and advanced filtering via date range

The implementation focuses on simplicity and clarity while demonstrating solid frontend development skills, attention to detail, and user-centric design.
