import { TestBed } from '@angular/core/testing';
import { RANKS } from '../shared/card';
import { Rules } from './rules';

describe('Rules', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('lists every rule rank in display order with its representative card', () => {
    const rules = TestBed.createComponent(Rules).componentInstance;

    expect(rules.ruleCards.map((entry) => entry.rank)).toEqual(RANKS);
    expect(rules.ruleCards.find((entry) => entry.rank === 'king')?.card).toBe('spades_king');
    expect(rules.ruleCards.find((entry) => entry.rank === 'joker')?.card).toBe('joker_black');
  });

  it('renders a face/back card pair for every rank', async () => {
    const fixture = TestBed.createComponent(Rules);
    await fixture.whenStable();
    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('.rules__row');

    expect(rows.length).toBe(RANKS.length);
  });
});
