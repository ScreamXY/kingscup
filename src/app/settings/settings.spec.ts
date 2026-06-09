import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DEFAULT_RULES } from '../shared/rule';
import { RulesStore } from '../stores/rules-store';
import { Settings } from './settings';

describe('Settings', () => {
  let snackBar: { open: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    localStorage.clear();
    snackBar = { open: vi.fn() };
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: snackBar }],
    });
  });

  it('updates a rule title while preserving its text', () => {
    const settings = TestBed.createComponent(Settings).componentInstance;
    const store = TestBed.inject(RulesStore);

    settings.updateRule('two', 'title', 'Custom two');

    expect(store.ruleForRank('two')).toEqual({
      title: 'Custom two',
      text: DEFAULT_RULES.two.text,
    });
  });

  it('updates a rule text while preserving its title', () => {
    const settings = TestBed.createComponent(Settings).componentInstance;
    const store = TestBed.inject(RulesStore);

    settings.updateRule('two', 'text', 'Drink twice, loudly.');

    expect(store.ruleForRank('two')).toEqual({
      title: DEFAULT_RULES.two.title,
      text: 'Drink twice, loudly.',
    });
  });

  it('reset restores defaults and announces it via the snackbar', () => {
    const settings = TestBed.createComponent(Settings).componentInstance;
    const store = TestBed.inject(RulesStore);

    settings.updateRule('two', 'title', 'Custom two');
    settings.reset();

    expect(store.ruleForRank('two')).toEqual(DEFAULT_RULES.two);
    expect(snackBar.open).toHaveBeenCalledWith('Rules reset to defaults', undefined, {
      duration: 2500,
    });
  });

  it('pairs each rank with its representative card and current rule', () => {
    const settings = TestBed.createComponent(Settings).componentInstance;

    const queenRow = settings.rows().find((row) => row.rank === 'queen');
    expect(queenRow?.card).toBe('spades_queen');
    expect(queenRow?.rule).toEqual(DEFAULT_RULES.queen);
  });
});
