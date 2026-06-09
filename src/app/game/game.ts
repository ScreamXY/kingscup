import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Card } from '../card/card';
import { PipRank, SUITS } from '../shared/card';
import { Rule } from '../shared/rule';
import { GameStore } from '../stores/game-store';
import { RulesStore } from '../stores/rules-store';

/** The ranks worth tallying during play, in display order. */
const TALLY_RANKS: readonly PipRank[] = ['king', 'five', 'seven', 'eight', 'ten', 'queen'];

@Component({
  selector: 'app-game',
  imports: [Card, MatButtonModule, MatProgressBarModule],
  templateUrl: './game.html',
  styleUrl: './game.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Game {
  public readonly store = inject(GameStore);
  private readonly rulesStore = inject(RulesStore);

  /** Each tallied rank appears once per suit in the deck. */
  public readonly cardsPerRank = SUITS.length;

  /** The rule proclaimed by the card currently in play, shown as a decree. */
  public readonly currentRule = computed<Rule | null>(() => {
    const card = this.store.currentCard();
    return card ? this.rulesStore.ruleFor(card) : null;
  });

  /** One tally row per tracked rank, labelled with its (editable) rule title. */
  public readonly stats = computed(() =>
    TALLY_RANKS.map((rank) => ({
      rank,
      label: this.rulesStore.ruleForRank(rank).title,
      count: this.store.counts()[rank],
    })),
  );
}
