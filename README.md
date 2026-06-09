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
npm run e2e        # headless (or: ng e2e)
npm run e2e:ui     # interactive UI mode (or: ng e2e -c ui)
```

[Playwright](https://playwright.dev/) specs live in `e2e/` and select elements through resilient
`data-testid` attributes. The dev server is started (or reused) automatically via the `webServer`
block in `playwright.config.ts`; the `ng e2e` target is wired through
[`playwright-ng-schematics`](https://github.com/playwright-community/playwright-ng-schematics).

## Type checking, linting & formatting

```bash
npx tsc -b        # type-checks app, unit specs and e2e specs (tsconfig.*.json)
npm run lint      # type-aware ESLint (angular-eslint + typescript-eslint)
npm run format    # Prettier
```

The whole repo is strictly typed (`strict`, `strictTemplates`, `noUncheckedIndexedAccess`) with no
`any`; data read back from `localStorage` is validated with type guards before use. The Playwright
specs and config are covered by their own `tsconfig.e2e.json` project so they are type-checked too.

## Project structure

- `src/app/shared` — the domain model: card/rank/suit types, the 54-card `DECK`, the editable
  `Rule` set, and helpers such as `rankOf` and `displayName`.
- `src/app/stores` — `GameStore` and `RulesStore`: signal-based state with derived `computed`
  statistics (e.g. a single-pass per-rank tally) and `localStorage` persistence.
- `src/app/card` — the reusable flip-card component (a native `<button>`; scale it via the
  `--card-zoom` CSS custom property).
- `src/app/{home,game,rules,settings,impressum,page-not-found}` — lazily loaded routed views. The
  sidenav links and toolbar title both derive from the route config (via a custom `TitleStrategy`),
  so navigation, titles and routes cannot drift apart.
- `src/styles` — the card sprite sheet and shared enter animations.
