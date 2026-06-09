import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Card } from '../card/card';
import { CardId } from '../shared/card';

@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  public readonly kings: readonly CardId[] = [
    'diamonds_king',
    'spades_king',
    'hearts_king',
    'clubs_king',
  ];
}
