import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardId } from '../shared/card';
import { DEFAULT_RULES } from '../shared/rule';
import { Card } from './card';

describe('Card', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  function createCard(card: CardId, showFace = true): ComponentFixture<Card> {
    const fixture = TestBed.createComponent(Card);
    fixture.componentRef.setInput('card', card);
    fixture.componentRef.setInput('showFace', showFace);
    fixture.detectChanges();
    return fixture;
  }

  it('shows the face by default and prompts to reveal the rule', () => {
    const card = createCard('hearts_king').componentInstance;
    expect(card.showingFace()).toBe(true);
    expect(card.ariaLabel()).toBe('King of Hearts. Activate to reveal its rule.');
  });

  it('resolves the rule for its card from the rules store', () => {
    const card = createCard('hearts_king').componentInstance;
    expect(card.rule()).toEqual(DEFAULT_RULES.king);
  });

  it('flip() toggles the shown side and swaps the label to the rule title', () => {
    const card = createCard('hearts_king').componentInstance;
    card.flip();
    expect(card.showingFace()).toBe(false);
    expect(card.ariaLabel()).toBe(DEFAULT_RULES.king.title);
  });

  it('encodes the card id in the face classes', () => {
    const card = createCard('clubs_two').componentInstance;
    expect(card.faceClasses()).toBe('card__face clubs_two');
  });

  it('follows the showFace input for the displayed side', () => {
    const fixture = createCard('hearts_king', true);
    expect(fixture.componentInstance.showingFace()).toBe(true);

    // A parent changing showFace re-seeds the displayed side via linkedSignal.
    fixture.componentRef.setInput('showFace', false);
    fixture.detectChanges();
    expect(fixture.componentInstance.showingFace()).toBe(false);
  });

  it('renders a native button whose aria-pressed reflects the side', () => {
    const fixture = createCard('joker_black', true);
    const button = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="card-joker_black"]',
    );
    expect(button?.tagName).toBe('BUTTON');
    expect(button?.getAttribute('aria-label')).toBe('Black Joker. Activate to reveal its rule.');
    expect(button?.getAttribute('aria-pressed')).toBe('false');
  });

  it('flips when its element is clicked', () => {
    const fixture = createCard('joker_black', true);
    const button = (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(
      '[data-testid="card-joker_black"]',
    );
    button?.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.showingFace()).toBe(false);
    expect(button?.getAttribute('aria-pressed')).toBe('true');
  });
});
