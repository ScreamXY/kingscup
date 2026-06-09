import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from '../card/card';
import { CardId, RANKS, REPRESENTATIVE_CARD, RuleRank } from '../shared/card';

@Component({
  selector: 'app-rules',
  imports: [Card],
  templateUrl: './rules.html',
  styleUrl: './rules.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Rules {
  public readonly ranks = RANKS;

  public cardFor(rank: RuleRank): CardId {
    return REPRESENTATIVE_CARD[rank];
  }
}
