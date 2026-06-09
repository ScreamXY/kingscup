import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Card } from '../card/card';
import { GameStore } from '../stores/game-store';

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

  public readonly stats: readonly GameStat[] = [
    { label: 'Kings', value: this.store.kings },
    { label: 'Imitate', value: this.store.fives },
    { label: 'Rules', value: this.store.sevens },
    { label: 'Mates', value: this.store.eights },
    { label: 'Snake Eyes', value: this.store.tens },
    { label: 'Questionmaster', value: this.store.queens },
  ];
}
