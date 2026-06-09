import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright end-to-end test configuration. Tests live in `e2e/` and select
 * elements through resilient `data-testid` attributes. The dev server is started
 * automatically (and reused locally) on port 4200.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4200',
    testIdAttribute: 'data-testid',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
  },
});
