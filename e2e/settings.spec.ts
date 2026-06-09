import { expect, test } from '@playwright/test';

test('edits a rule and persists it across a reload', async ({ page }) => {
  await page.goto('/settings');

  await page.getByTestId('rule-title-two').fill('Custom two');
  await page.reload();

  await expect(page.getByTestId('rule-title-two')).toHaveValue('Custom two');
});

test('reset restores the default rules', async ({ page }) => {
  await page.goto('/settings');

  await page.getByTestId('rule-title-two').fill('Temporary');
  await page.getByTestId('reset-rules').click();

  await expect(page.getByTestId('rule-title-two')).toHaveValue('You');
});
