import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { map } from 'rxjs';
import { Card } from '../card/card';
import { Rule } from '../shared/rule';
import { GameStore } from '../stores/game-store';
import { RulesStore } from '../stores/rules-store';

interface GameStat {
  label: string;
  value: Signal<number>;
}

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
  private readonly breakpointObserver = inject(BreakpointObserver);

  /**
   * On narrow screens the table stacks into one column, so shrink the hero card
   * to keep the drawn card and its decree visible together without scrolling.
   */
  private readonly isNarrow = toSignal(
    this.breakpointObserver.observe('(max-width: 720px)').pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  public readonly cardZoom = computed(() => (this.isNarrow() ? 0.72 : 0.95));

  /** The rule proclaimed by the card currently in play, shown as a decree. */
  public readonly currentRule = computed<Rule | null>(() => {
    const card = this.store.currentCard();
    return card ? this.rulesStore.ruleFor(card) : null;
  });

  public readonly stats: readonly GameStat[] = [
    { label: 'Kings', value: this.store.kings },
    { label: 'Imitate', value: this.store.fives },
    { label: 'Rules', value: this.store.sevens },
    { label: 'Mates', value: this.store.eights },
    { label: 'Snake Eyes', value: this.store.tens },
    { label: 'Questionmaster', value: this.store.queens },
  ];
}
