# Spark News Live — Headless Intelligence Web Portal

This repository powers the live GitHub Pages website for **Spark News Live**.

## Architecture (Headless Decoupled CMS)
- `index.html`: The permanent frontend single-page application shell.
- `styles.css`: Vercel/Apple-style high-contrast dark theme, glassmorphic HUD, and responsive grid.
- `app.js`: Dynamic client-side engine that fetches `data/manifest.json` and loads daily issue files.
- `data/manifest.json`: Master index tracking all published editions.
- `data/issues/`: Directory containing daily structured JSON intelligence files (`YYYY-MM-DD.json`).

## Automated Deployment Workflow
1. At 4:00 AM IST, Spark compiles the daily intelligence into a structured JSON payload and emails it to Make.com.
2. Make.com creates `data/issues/YYYY-MM-DD.json` and appends the issue to `data/manifest.json`.
3. GitHub Pages automatically builds and deploys the new edition with zero human intervention.
