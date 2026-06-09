import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Card } from '../card/card';
import { CardId, SUITS } from '../shared/card';

@Component({
  selector: 'app-home',
  imports: [Card, MatButtonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  /** One king per suit, fanned out as the hero hand. */
  public readonly kings: readonly CardId[] = SUITS.map((suit): CardId => `${suit}_king`);
}
