import { Injectable, computed, effect, signal } from '@angular/core';
import { CardId, DECK, RuleRank, rankOf } from '../shared/card';

const STORAGE_KEY = 'game';

/** The number of kings that ends the game (the loser drinks the King's Cup). */
const KINGS_TO_END = 4;

interface PersistedGame {
  deck: readonly CardId[];
  drawnCount: number;
}

function isCardId(value: unknown): value is CardId {
  return typeof value === 'string' && DECK.some((card) => card === value);
}

function isPersistedGame(value: unknown): value is PersistedGame {
  return (
    typeof value === 'object' &&
    value !== null &&
    'deck' in value &&
    Array.isArray(value.deck) &&
    value.deck.every(isCardId) &&
    'drawnCount' in value &&
    typeof value.drawnCount === 'number' &&
    value.drawnCount >= 0 &&
    value.drawnCount <= value.deck.length
  );
}

/**
 * Owns all King's Cup game state as signals. Per-rank statistics and the
 * end-of-game condition are derived with `computed()` from the drawn cards,
 * so there are no manual counters to keep in sync.
 */
@Injectable({ providedIn: 'root' })
export class GameStore {
  private readonly deckSignal = signal<readonly CardId[]>([]);
  private readonly drawnCountSignal = signal(0);
  private readonly runningSignal = signal(false);
  private readonly savedGame = this.loadSaved();

  public readonly running = this.runningSignal.asReadonly();
  public readonly drawnCount = this.drawnCountSignal.asReadonly();

  public readonly kingsToEnd = KINGS_TO_END;
  public readonly canResume = this.savedGame !== null;

  public readonly drawn = computed<readonly CardId[]>(() =>
    this.deckSignal().slice(0, this.drawnCountSignal()),
  );

  public readonly currentCard = computed<CardId | null>(() => {
    const count = this.drawnCountSignal();
    return count > 0 ? (this.deckSignal()[count - 1] ?? null) : null;
  });

  /** How often each rank has been drawn, tallied in one pass over the cards. */
  public readonly counts = computed<Readonly<Record<RuleRank, number>>>(() => {
    const tally: Record<RuleRank, number> = {
      joker: 0,
      ace: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      seven: 0,
      eight: 0,
      nine: 0,
      ten: 0,
      jack: 0,
      queen: 0,
      king: 0,
    };
    for (const card of this.drawn()) {
      tally[rankOf(card)] += 1;
    }
    return tally;
  });

  public readonly kings = computed(() => this.counts().king);

  public readonly gameEnd = computed(() => this.kings() === KINGS_TO_END);

  /** Fill level of the chalice, from 0 (no kings yet) to 1 (game over). */
  public readonly kingsFill = computed(() => this.kings() / KINGS_TO_END);

  public readonly progress = computed(() => {
    const total = this.deckSignal().length;
    return total > 0 ? (this.drawnCountSignal() / total) * 100 : 0;
  });

  constructor() {
    effect(() => {
      if (this.runningSignal()) {
        const game: PersistedGame = {
          deck: this.deckSignal(),
          drawnCount: this.drawnCountSignal(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(game));
      }
    });
  }

  /** Shuffle a fresh deck, start playing and draw the first card. */
  public start(): void {
    this.deckSignal.set(this.shuffle(DECK));
    this.drawnCountSignal.set(0);
    this.runningSignal.set(true);
    this.draw();
  }

  /** Reveal the next card, unless the game has already ended. */
  public draw(): void {
    if (this.gameEnd() || this.drawnCountSignal() >= this.deckSignal().length) {
      return;
    }
    this.drawnCountSignal.update((count) => count + 1);
  }

  /** Continue a previously saved game, if one exists. */
  public resume(): void {
    if (!this.savedGame) {
      return;
    }
    this.deckSignal.set(this.savedGame.deck);
    this.drawnCountSignal.set(this.savedGame.drawnCount);
    this.runningSignal.set(true);
  }

  private shuffle(cards: readonly CardId[]): readonly CardId[] {
    return cards
      .map((card) => ({ card, key: Math.random() }))
      .sort((a, b) => a.key - b.key)
      .map((entry) => entry.card);
  }

  private loadSaved(): PersistedGame | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    try {
      const parsed: unknown = JSON.parse(stored);
      if (isPersistedGame(parsed)) {
        return parsed;
      }
    } catch {
      // Corrupt data — treat as no saved game.
    }
    return null;
  }
}
