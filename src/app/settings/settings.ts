import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Card } from '../card/card';
import { RULE_CARDS, RuleRank } from '../shared/card';
import { RulesStore } from '../stores/rules-store';

@Component({
  selector: 'app-settings',
  imports: [Card, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  private readonly rulesStore = inject(RulesStore);
  private readonly snackBar = inject(MatSnackBar);

  /** One editable row per rank: its representative card and current rule. */
  public readonly rows = computed(() =>
    RULE_CARDS.map((entry) => ({ ...entry, rule: this.rulesStore.ruleForRank(entry.rank) })),
  );

  public updateRule(rank: RuleRank, field: 'title' | 'text', value: string): void {
    this.rulesStore.setRule(rank, { ...this.rulesStore.ruleForRank(rank), [field]: value });
  }

  public reset(): void {
    this.rulesStore.reset();
    this.snackBar.open('Rules reset to defaults', undefined, { duration: 2500 });
  }
}
