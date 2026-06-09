import { expect, test } from '@playwright/test';

test('redirects to home and shows the home cards', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/home$/);
  await expect(page.getByTestId('page-title')).toHaveText('Home');

  const main = page.getByRole('main');
  for (const suit of ['diamonds', 'spades', 'hearts', 'clubs']) {
    await expect(main.getByTestId(`card-${suit}_king`)).toBeVisible();
  }
});

test('navigates between sections through the sidenav', async ({ page }) => {
  await page.goto('/home');

  await page.getByTestId('nav-game').click();
  await expect(page).toHaveURL(/\/game$/);
  await expect(page.getByTestId('page-title')).toHaveText('Game');

  await page.getByTestId('nav-rules').click();
  await expect(page).toHaveURL(/\/rules$/);
  await expect(page.getByTestId('page-title')).toHaveText('Rules');

  await page.getByTestId('nav-settings').click();
  await expect(page).toHaveURL(/\/settings$/);
  await expect(page.getByTestId('page-title')).toHaveText('Settings');
});

test('shows a friendly page for unknown routes', async ({ page }) => {
  await page.goto('/does-not-exist');
  await expect(page.getByTestId('page-title')).toHaveText('Page not found');
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL(/\/home$/);
});
