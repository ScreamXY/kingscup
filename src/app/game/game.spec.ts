import { TestBed } from '@angular/core/testing';
import { GameStore } from '../stores/game-store';
import { Game } from './game';

describe('Game', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('lists the six derived stats, in order, wired to the store signals', () => {
    const game = TestBed.createComponent(Game).componentInstance;
    const store = TestBed.inject(GameStore);

    expect(game.stats.map((stat) => stat.label)).toEqual([
      'Kings',
      'Imitate',
      'Rules',
      'Mates',
      'Snake Eyes',
      'Questionmaster',
    ]);
    expect(game.stats[0].value).toBe(store.kings);
    expect(game.stats.at(-1)?.value).toBe(store.queens);
  });

  it('shows the start controls before a game is running', async () => {
    const fixture = TestBed.createComponent(Game);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('[data-testid="start-game"]')).not.toBeNull();
    expect(el.querySelector('[data-testid="deal-card"]')).toBeNull();
  });

  it('renders the deal action and stat grid once a game is started', async () => {
    const fixture = TestBed.createComponent(Game);
    TestBed.inject(GameStore).start();
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('[data-testid="deal-card"]')).not.toBeNull();
    expect(el.querySelector('[data-testid="stat-Kings"]')?.textContent).toContain('/ 4');
  });
});
