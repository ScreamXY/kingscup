import { expect, test } from '@playwright/test';

test('flips a card to reveal its rule', async ({ page }) => {
  await page.goto('/rules');

  // The first joker card starts showing its face.
  const joker = page.getByTestId('card-joker_black').first();
  await expect(joker).toHaveAttribute('aria-pressed', 'false');

  await joker.click();
  await expect(joker).toHaveAttribute('aria-pressed', 'true');
});
