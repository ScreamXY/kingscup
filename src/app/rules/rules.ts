import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from '../card/card';
import { RULE_CARDS } from '../shared/card';

@Component({
  selector: 'app-rules',
  imports: [Card],
  templateUrl: './rules.html',
  styleUrl: './rules.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Rules {
  public readonly ruleCards = RULE_CARDS;
}
