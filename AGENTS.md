# King’s Cup

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

## Shared release and CI rules

- Public support and security contact: `screamcode@gmail.com`. Keep in-app contact details, portal policies and App Store metadata consistent.
- `AGENTS.md` owns the rules. `CLAUDE.md` contains only: `See @AGENTS.md for monorepo documentation and guidelines.`
- Every Actions job needs a finite timeout and minimal permissions. Cancel superseded checks, but let an active production deployment finish.
- Exclude confirmed internal documentation from app builds. Documentation shipped in the product remains a build input. Scope jobs to their component and shared dependencies; unknown paths still run. Keep fixtures, migrations, dependency locks, localization and build configuration in CI scope.
- GitHub runners are for fast lint, type checks, deterministic unit tests and compilation only. Extensive browser E2E, simulator/device suites and screenshots run locally, including when agents code; do not add hosted opt-ins for them. Never run paid AI calls, live provider corpus runs, production database tests or signing/publishing as routine PR checks.
- Keep artifacts short-lived (7 days or less), and release bundles limited to tags/manual runs. Cheap lint, type checks, deterministic tests and compilation remain automatic.
- Release status lives in the Obsidian vault: `~/Library/Mobile Documents/iCloud~md~obsidian/Documents/Privat/Development/ScreamXY/` (`ScreamXY.md`, `TODO.md`). If unavailable, say so. Distinguish prepared files, published pages, CI results and hardware verification.

## Local validation required for relevant changes

`npm test` and `npm run e2e` against the local app for changed user flows. Browser dependencies must be available locally; report any blocked check instead of substituting compilation.

Run the affected suites before committing and report what actually ran. Keep tests
and local scripts even when their hosted jobs are removed. Do not increase a CI
timeout to hide a hang; inspect the failure first.
