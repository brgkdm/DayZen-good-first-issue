# AGENTS.md — DayZen-good-first-issue

## What this is

A static frontend-only daily routine tracker website. No build step, no bundler, no npm packages (the lockfile is empty). The entire app is raw HTML + CSS + vanilla JavaScript served directly from disk.

## Entrypoint

- `DayZen/index.html` — the landing page and only real entrypoint
- Opening that file in a browser (or via Live Server) runs the app
- The VS Code launch config targets `http://localhost:8080` with Chrome DevTools

## Structure

```
DayZen/
  index.html          ← landing page (all CSS is inline in <style>)
  css/                ← per-page/component stylesheets
  js/                 ← vanilla JS modules (no bundler, loaded via <script> tags)
  pages/              ← secondary HTML pages (about, blog, help, register, profile, etc.)
  assets/images/      ← logos/, icons/, illustrations/, misc/
tests/                ← manual browser test redirects (no test framework)
```

- There is **no build pipeline**. Files are served as-is.
- `package-lock.json` exists but has zero dependencies — do not run `npm install` or `npm start` despite what CONTRIBUTING.md says.
- External dependencies are loaded from CDN: Bootstrap 5.3.3, Intro.js 8.3.2, Google Fonts.

## Running locally

1. Open `DayZen/index.html` directly in a browser, **or**
2. Use VS Code Live Server extension (right-click → Open with Live Server)

There are no CLI commands to build, test, or lint. There is no automated test suite.

## Key conventions

- **CSS is inline on index.html** — the landing page styles live in a `<style>` block inside `index.html`, not in a separate CSS file. Other pages use the css/ directory.
- **Page-relative paths** — pages inside `pages/` reference assets with `../` prefix (e.g., `../assets/images/...`). The theme toggle script (`theme-toggle.js`) detects folder depth via `location.pathname.includes('/pages/')`.
- **Theme state** is persisted in `localStorage` key `dayzen_theme` (values: `light` / `dark`), applied by toggling `dark-mode` / `light-mode` classes on `<body>`.
- **No module system** — scripts are loaded as plain `<script>` tags. Globals are shared across scripts on the same page.

## Common pitfalls

- Editing CSS for the landing page? It is in `index.html`, not in `css/style.css`.
- Adding a new page? Remember to use `../` relative paths for assets and sibling JS/CSS files.
- The `tests/` directory contains manual HTML redirect files, not automated tests.
- CONTRIBUTING.md references `npm install` / `npm start` but no `package.json` exists — these commands will fail.
