import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
} from '@angular/core';
import { CardId, displayName } from '../shared/card';
import { Rule } from '../shared/rule';
import { RulesStore } from '../stores/rules-store';

/**
 * Renders a single playing card. The face shows the sprite for `card`; the back
 * shows the rule it triggers. `showFace` sets the initial side and activating
 * the card flips it. Whenever the `card` input changes (e.g. a new card is
 * dealt) the element plays a short "deal-in" animation. Consumers scale the
 * card by setting the `--card-zoom` custom property on the host element.
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  private readonly rulesStore = inject(RulesStore);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  public readonly card = input.required<CardId>();
  public readonly showFace = input(true);

  /** Locally toggled side, re-seeded whenever the `showFace` input changes. */
  public readonly showingFace = linkedSignal(() => this.showFace());

  public readonly rule = computed<Rule>(() => this.rulesStore.ruleFor(this.card()));
  public readonly faceClasses = computed(() => `card__face ${this.card()}`);
  public readonly ariaLabel = computed(() =>
    this.showingFace()
      ? `${displayName(this.card())}. Activate to reveal its rule.`
      : this.rule().title,
  );

  constructor() {
    let isFirstCard = true;
    effect(() => {
      this.card();
      // Skip the initial render (the enter animation covers that); animate only
      // on subsequent deals.
      if (isFirstCard) {
        isFirstCard = false;
        return;
      }
      this.playDealIn();
    });
  }

  public flip(): void {
    this.showingFace.update((showing) => !showing);
  }

  private playDealIn(): void {
    const element = this.host.nativeElement;
    if (typeof element.animate !== 'function') {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    element.animate(
      [
        { opacity: 0, transform: 'translateY(-24px) rotate(-4deg) scale(0.96)' },
        { opacity: 1, transform: 'none' },
      ],
      { duration: 320, easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)' },
    );
  }
}
