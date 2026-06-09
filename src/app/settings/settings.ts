import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from '../card/card';
import { CardId, RANKS, REPRESENTATIVE_CARD, RuleRank } from '../shared/card';
import { RulesStore } from '../stores/rules-store';

@Component({
  selector: 'app-settings',
  imports: [Card, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  public readonly rulesStore = inject(RulesStore);
  private readonly snackBar = inject(MatSnackBar);

  public readonly ranks = RANKS;

  public cardFor(rank: RuleRank): CardId {
    return REPRESENTATIVE_CARD[rank];
  }

  public updateTitle(rank: RuleRank, event: Event): void {
    const title = (event.target as HTMLInputElement).value;
    this.rulesStore.setRule(rank, { ...this.rulesStore.ruleForRank(rank), title });
  }

  public updateText(rank: RuleRank, event: Event): void {
    const text = (event.target as HTMLTextAreaElement).value;
    this.rulesStore.setRule(rank, { ...this.rulesStore.ruleForRank(rank), text });
  }

  public reset(): void {
    this.rulesStore.reset();
    this.snackBar.open('Rules reset to defaults', undefined, { duration: 2500 });
  }
}
