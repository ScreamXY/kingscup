import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CardId } from '../shared/card';
import { Home } from './home';

describe('Home', () => {
  const kings: readonly CardId[] = ['diamonds_king', 'spades_king', 'hearts_king', 'clubs_king'];

  beforeEach(() => {
    localStorage.clear();
    // Home links to the game and rules via routerLink, so it needs a router.
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('exposes one king per suit', () => {
    expect(TestBed.createComponent(Home).componentInstance.kings).toEqual(kings);
  });

  it('renders a card for every king with a stable test id', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    for (const king of kings) {
      expect(el.querySelector(`[data-testid="card-${king}"]`)).not.toBeNull();
    }
  });
});
