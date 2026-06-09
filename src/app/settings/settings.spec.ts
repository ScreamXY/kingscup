import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { REPRESENTATIVE_CARD } from '../shared/card';
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

  function inputEvent(value: string): Event {
    return { target: { value } } as unknown as Event;
  }

  it('updates a rule title while preserving its text', () => {
    const settings = TestBed.createComponent(Settings).componentInstance;
    const store = TestBed.inject(RulesStore);

    settings.updateTitle('two', inputEvent('Custom two'));

    expect(store.ruleForRank('two')).toEqual({
      title: 'Custom two',
      text: DEFAULT_RULES.two.text,
    });
  });

  it('updates a rule text while preserving its title', () => {
    const settings = TestBed.createComponent(Settings).componentInstance;
    const store = TestBed.inject(RulesStore);

    settings.updateText('two', inputEvent('Drink twice, loudly.'));

    expect(store.ruleForRank('two')).toEqual({
      title: DEFAULT_RULES.two.title,
      text: 'Drink twice, loudly.',
    });
  });

  it('reset restores defaults and announces it via the snackbar', () => {
    const settings = TestBed.createComponent(Settings).componentInstance;
    const store = TestBed.inject(RulesStore);

    settings.updateTitle('two', inputEvent('Custom two'));
    settings.reset();

    expect(store.ruleForRank('two')).toEqual(DEFAULT_RULES.two);
    expect(snackBar.open).toHaveBeenCalledWith('Rules reset to defaults', undefined, {
      duration: 2500,
    });
  });

  it('maps each rank to its representative card', () => {
    const settings = TestBed.createComponent(Settings).componentInstance;
    expect(settings.cardFor('queen')).toBe(REPRESENTATIVE_CARD.queen);
  });
});
