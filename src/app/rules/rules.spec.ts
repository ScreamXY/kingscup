import { TestBed } from '@angular/core/testing';
import { RANKS, REPRESENTATIVE_CARD } from '../shared/card';
import { Rules } from './rules';

describe('Rules', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('lists every rule rank in display order', () => {
    expect(TestBed.createComponent(Rules).componentInstance.ranks).toEqual(RANKS);
  });

  it('maps each rank to its representative card', () => {
    const rules = TestBed.createComponent(Rules).componentInstance;
    expect(rules.cardFor('king')).toBe(REPRESENTATIVE_CARD.king);
    expect(rules.cardFor('joker')).toBe('joker_black');
  });

  it('renders a face/back card pair for every rank', async () => {
    const fixture = TestBed.createComponent(Rules);
    await fixture.whenStable();
    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('.rules__row');

    expect(rows.length).toBe(RANKS.length);
  });
});
