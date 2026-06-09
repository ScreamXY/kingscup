import { TestBed } from '@angular/core/testing';
import { DEFAULT_RULES } from '../shared/rule';
import { GameStore } from '../stores/game-store';
import { RulesStore } from '../stores/rules-store';
import { Game } from './game';

describe('Game', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('derives the tally rows from the tracked ranks and their rule titles', () => {
    const game = TestBed.createComponent(Game).componentInstance;

    expect(game.stats().map((stat) => stat.rank)).toEqual([
      'king',
      'five',
      'seven',
      'eight',
      'ten',
      'queen',
    ]);
    expect(game.stats().map((stat) => stat.label)).toEqual([
      DEFAULT_RULES.king.title,
      DEFAULT_RULES.five.title,
      DEFAULT_RULES.seven.title,
      DEFAULT_RULES.eight.title,
      DEFAULT_RULES.ten.title,
      DEFAULT_RULES.queen.title,
    ]);
    expect(game.stats().every((stat) => stat.count === 0)).toBe(true);
  });

  it('relabels a tally row when its rule title is edited', () => {
    const game = TestBed.createComponent(Game).componentInstance;
    const rulesStore = TestBed.inject(RulesStore);

    rulesStore.setRule('queen', { title: 'Quizmaster', text: 'Ask away.' });

    expect(game.stats().at(-1)?.label).toBe('Quizmaster');
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
    expect(el.querySelector('[data-testid="stat-king"]')?.textContent).toContain('/ 4');
  });
});
