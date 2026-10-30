# King's Cup

A small companion app for the King's Cup card game. It is built with **Angular 22** (standalone
components, signals, zoneless change detection) and **Angular Material** (Material 3). Shuffle a
deck, draw cards, see the rule for each card and change the rules to your own house rules. All
data stays in the browser (`localStorage`).

## Prerequisites

- Node.js as pinned in [`.nvmrc`](.nvmrc) (mise or nvm can switch to it)
- npm

This repo resolves dependencies against the public npm registry (see [`.npmrc`](.npmrc)).

The Vite override keeps the dev server on the patched 8.3 line. Remove it once
`@angular/build` requires Vite 8.3.3 or newer.

## Commands

```bash
npm ci
npm start             # dev server on http://localhost:4200
npx tsc -b            # type check (app, unit tests, e2e tests)
npm test              # unit tests (Vitest, jsdom)
npm run e2e           # end-to-end tests (Playwright, headless)
npm run e2e:ui        # end-to-end tests in the Playwright UI
npm run lint          # ESLint (type-aware)
npm run format        # Prettier (format:check only checks)
npm run build         # production build to dist/
```

The e2e tests in `e2e/` find elements by `data-testid`. Playwright starts the dev server, or
reuses a running one (see `playwright.config.ts`).

## Project structure

- `src/app/shared` — the domain model: card, rank and suit types, the 54-card `DECK`, the default
  rules and helpers such as `rankOf` and `displayName`.
- `src/app/stores` — `GameStore` and `RulesStore`: state as signals, saved to `localStorage`.
  Saved data is checked with type guards before use.
- `src/app/card` — the flip card component (a native `<button>`). Set the `--card-zoom` CSS
  custom property to scale it.
- `src/app/{home,game,rules,settings,impressum,page-not-found}` — the lazy-loaded pages. The
  sidenav links and the toolbar title both come from the route config (through a custom
  `TitleStrategy`), so they always match the routes.
- `src/styles` — the card sprite sheet styles and the shared enter animation. The sprite SVG is in
  `src/images`; the build adds a content hash to its file name.

## CI and deployment

- [`ci.yml`](.github/workflows/ci.yml) runs the type check, lint, format check, unit tests and
  production build for pushes to `main` and for pull requests. The e2e tests run only locally.
- [`deploy.yml`](.github/workflows/deploy.yml) builds with `--base-href /kingscup/` and publishes
  `dist/kingscup/browser` to GitHub Pages on every push to `main`. It also copies `index.html` to
  `404.html`, so deep links still work after a reload. One-time setup: in the repository settings,
  set **Pages → Build and deployment → Source** to **GitHub Actions**.
