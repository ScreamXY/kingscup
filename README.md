# King's Cup

A small King's Cup card-game companion app, built with **Angular 22** (standalone, signals,
zoneless change detection) and **Angular Material** (Material 3). Shuffle a deck, draw cards, track
the per-rank rules, and edit them to your group's house rules — everything is stored locally in the
browser.

## Prerequisites

- Node.js as pinned in [`.nvmrc`](.nvmrc) (`nvm use`)
- npm

This repo resolves dependencies against the public npm registry (see [`.npmrc`](.npmrc)).

## Development server

```bash
npm start
```

Then open `http://localhost:4200/`. The app reloads on source changes.

## Building

```bash
npm run build
```

Build artifacts are written to `dist/`. The production configuration is optimized and AOT-compiled
with strict template checking.

## Unit tests

```bash
npm test
```

Tests run on the [Vitest](https://vitest.dev/) runner (jsdom environment).

## End-to-end tests

```bash
npm run e2e        # headless
npm run e2e:ui     # interactive UI mode
```

[Playwright](https://playwright.dev/) specs live in `e2e/` and select elements through resilient
`data-testid` attributes. The dev server is started automatically.

## Linting & formatting

```bash
npm run lint      # ESLint (angular-eslint)
npm run format    # Prettier
```

## Project structure

- `src/app/shared` — domain types (`Card`, `Rule`, the 54-card `DECK`).
- `src/app/stores` — `GameStore` and `RulesStore`: signal-based state with derived `computed`
  statistics and `localStorage` persistence.
- `src/app/card` — the reusable flip-card component.
- `src/app/{home,game,rules,settings,impressum,page-not-found}` — lazily loaded routed views.
- `src/styles` — the card sprite sheet and shared enter animations.
