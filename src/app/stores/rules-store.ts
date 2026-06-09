import { Injectable, effect, signal } from '@angular/core';
import { CardId, RuleRank, rankOf } from '../shared/card';
import { DEFAULT_RULES, Rule, RuleSet } from '../shared/rule';

const STORAGE_KEY = 'rules';

/**
 * Holds the editable King's Cup rule set as a signal and transparently persists
 * it to `localStorage`. Replaces the old imperative `CardRulesService`.
 */
@Injectable({ providedIn: 'root' })
export class RulesStore {
  private readonly rules = signal<RuleSet>(this.load());

  constructor() {
    effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(this.rules())));
  }

  /** The rule triggered by a given card. */
  public ruleFor(cardId: CardId): Rule {
    return this.rules()[rankOf(cardId)];
  }

  /** The rule for a rule rank directly. */
  public ruleForRank(rank: RuleRank): Rule {
    return this.rules()[rank];
  }

  /** Replace the rule for a single rank. */
  public setRule(rank: RuleRank, rule: Rule): void {
    this.rules.update((current) => ({ ...current, [rank]: { ...rule } }));
  }

  /** Restore every rule to its shipped default. */
  public reset(): void {
    this.rules.set(structuredClone(DEFAULT_RULES));
  }

  private load(): RuleSet {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<RuleSet>;
        return { ...structuredClone(DEFAULT_RULES), ...parsed };
      } catch {
        // Corrupt data — fall back to defaults below.
      }
    }
    return structuredClone(DEFAULT_RULES);
  }
}
