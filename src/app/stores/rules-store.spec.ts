import { TestBed } from '@angular/core/testing';
import { DEFAULT_RULES } from '../shared/rule';
import { RulesStore } from './rules-store';

describe('RulesStore', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('exposes the default rules initially', () => {
    const store = TestBed.inject(RulesStore);
    expect(store.ruleForRank('king').title).toBe("King's Cup");
  });

  it('maps both jokers and pip cards to the right rule', () => {
    const store = TestBed.inject(RulesStore);
    expect(store.ruleFor('joker_color')).toEqual(DEFAULT_RULES.joker);
    expect(store.ruleFor('joker_black')).toEqual(DEFAULT_RULES.joker);
    expect(store.ruleFor('hearts_king')).toEqual(DEFAULT_RULES.king);
  });

  it('updates a single rule without touching the others', () => {
    const store = TestBed.inject(RulesStore);
    store.setRule('two', { title: 'Custom', text: 'Drink twice, loudly.' });
    expect(store.ruleForRank('two')).toEqual({ title: 'Custom', text: 'Drink twice, loudly.' });
    expect(store.ruleForRank('king')).toEqual(DEFAULT_RULES.king);
  });

  it('reset restores every default rule', () => {
    const store = TestBed.inject(RulesStore);
    store.setRule('two', { title: 'Custom', text: 'x' });
    store.reset();
    expect(store.ruleForRank('two')).toEqual(DEFAULT_RULES.two);
  });

  it('loads previously persisted rules from storage', () => {
    localStorage.setItem(
      'rules',
      JSON.stringify({ ...DEFAULT_RULES, two: { title: 'Saved', text: 'from storage' } }),
    );
    const store = TestBed.inject(RulesStore);
    expect(store.ruleForRank('two').title).toBe('Saved');
  });
});
