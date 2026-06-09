import { expect, test } from '@playwright/test';

test('starts a game and deals cards', async ({ page }) => {
  await page.goto('/game');
  await page.getByTestId('start-game').click();

  // A current card is shown (face + back pair).
  await expect(page.locator('.card').first()).toBeVisible();
  await expect(page.getByTestId('deal-card')).toBeEnabled();

  // Stats start at zero for kings.
  await expect(page.getByTestId('stat-king')).toHaveText('0 / 4');

  await page.getByTestId('deal-card').click();
  await page.getByTestId('deal-card').click();
  // The six derived stat rows are present.
  for (const rank of ['king', 'five', 'seven', 'eight', 'ten', 'queen']) {
    await expect(page.getByTestId(`stat-${rank}`)).toBeVisible();
  }
});

test('ends the game after the fourth king and disables dealing', async ({ page }) => {
  // Seed a game with three kings already drawn so the next card is the fourth.
  await page.addInitScript(() => {
    localStorage.setItem(
      'game',
      JSON.stringify({
        deck: ['spades_king', 'hearts_king', 'clubs_king', 'diamonds_king', 'spades_two'],
        drawnCount: 3,
      }),
    );
  });
  await page.goto('/game');
  await page.getByTestId('resume-game').click();

  await expect(page.getByTestId('stat-king')).toHaveText('3 / 4');

  // Drawing the fourth king ends the game.
  await page.getByTestId('deal-card').click();

  await expect(page.getByTestId('game-over')).toBeVisible();
  await expect(page.getByTestId('stat-king')).toHaveText('4 / 4');
  await expect(page.getByTestId('deal-card')).toBeDisabled();
});

test('resume is offered after a game is in progress', async ({ page }) => {
  await page.goto('/game');
  await expect(page.getByTestId('resume-game')).toBeDisabled();

  await page.getByTestId('start-game').click();
  await page.getByTestId('deal-card').click();

  // Reload: the saved game can now be resumed.
  await page.goto('/game');
  await expect(page.getByTestId('resume-game')).toBeEnabled();
  await page.getByTestId('resume-game').click();
  await expect(page.getByTestId('deal-card')).toBeVisible();
});
