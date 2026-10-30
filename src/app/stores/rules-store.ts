import { Injectable, effect, signal } from '@angular/core';
import { CardId, RANKS, RuleRank, rankOf } from '../shared/card';
import { DEFAULT_RULES, Rule, RuleSet } from '../shared/rule';

const STORAGE_KEY = 'rules';

function isRule(value: unknown): value is Rule {
  return (
    typeof value === 'object' &&
    value !== null &&
    'title' in value &&
    typeof value.title === 'string' &&
    'text' in value &&
    typeof value.text === 'string'
  );
}

/** Holds the editable rule set as a signal and saves it to `localStorage`. */
@Injectable({ providedIn: 'root' })
export class RulesStore {
  private readonly rules = signal<RuleSet>(this.load());

  constructor() {
    effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(this.rules())));
  }

  public ruleFor(cardId: CardId): Rule {
    return this.rules()[rankOf(cardId)];
  }

  public ruleForRank(rank: RuleRank): Rule {
    return this.rules()[rank];
  }

  public setRule(rank: RuleRank, rule: Rule): void {
    this.rules.update((current) => ({ ...current, [rank]: { ...rule } }));
  }

  public reset(): void {
    this.rules.set(structuredClone(DEFAULT_RULES));
  }

  private load(): RuleSet {
    const rules: RuleSet = structuredClone(DEFAULT_RULES);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return rules;
    }
    try {
      const parsed: unknown = JSON.parse(stored);
      if (typeof parsed === 'object' && parsed !== null) {
        for (const rank of RANKS) {
          const candidate = (parsed as Partial<Record<RuleRank, unknown>>)[rank];
          if (isRule(candidate)) {
            rules[rank] = candidate;
          }
        }
      }
    } catch {
      // Corrupt data — keep the defaults.
    }
    return rules;
  }
}
