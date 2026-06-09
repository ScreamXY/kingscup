import { Injectable, computed, effect, signal } from '@angular/core';
import { CardId, DECK, RuleRank, rankOf } from '../shared/card';

const STORAGE_KEY = 'game';

/** The number of kings that ends the game (the loser drinks the King's Cup). */
const KINGS_TO_END = 4;

interface PersistedGame {
  deck: CardId[];
  drawnCount: number;
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
  private readonly savedGame = signal<PersistedGame | null>(this.loadSaved());

  public readonly running = this.runningSignal.asReadonly();
  public readonly drawnCount = this.drawnCountSignal.asReadonly();

  public readonly drawn = computed<readonly CardId[]>(() =>
    this.deckSignal().slice(0, this.drawnCountSignal()),
  );

  public readonly currentCard = computed<CardId | null>(() => {
    const count = this.drawnCountSignal();
    return count > 0 ? this.deckSignal()[count - 1] : null;
  });

  public readonly kings = computed(() => this.countOf('king'));
  public readonly fives = computed(() => this.countOf('five'));
  public readonly sevens = computed(() => this.countOf('seven'));
  public readonly eights = computed(() => this.countOf('eight'));
  public readonly tens = computed(() => this.countOf('ten'));
  public readonly queens = computed(() => this.countOf('queen'));

  public readonly gameEnd = computed(() => this.kings() === KINGS_TO_END);

  public readonly progress = computed(() => {
    const total = this.deckSignal().length;
    return total > 0 ? (this.drawnCountSignal() / total) * 100 : 0;
  });

  public readonly canResume = computed(() => this.savedGame() !== null);

  constructor() {
    effect(() => {
      if (this.runningSignal()) {
        const game: PersistedGame = {
          deck: [...this.deckSignal()],
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
    const saved = this.savedGame();
    if (!saved) {
      return;
    }
    this.deckSignal.set(saved.deck);
    this.drawnCountSignal.set(saved.drawnCount);
    this.runningSignal.set(true);
  }

  private countOf(rank: RuleRank): number {
    return this.drawn().filter((card) => rankOf(card) === rank).length;
  }

  private shuffle(cards: readonly CardId[]): CardId[] {
    const result = [...cards];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  private loadSaved(): PersistedGame | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    try {
      const parsed = JSON.parse(stored) as PersistedGame;
      if (Array.isArray(parsed.deck) && typeof parsed.drawnCount === 'number') {
        return parsed;
      }
    } catch {
      // Corrupt data — treat as no saved game.
    }
    return null;
  }
}
