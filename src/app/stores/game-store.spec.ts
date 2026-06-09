import { TestBed } from '@angular/core/testing';
import { CardId } from '../shared/card';
import { GameStore } from './game-store';

describe('GameStore', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
  });

  it('starts a game and reveals the first card', () => {
    const store = TestBed.inject(GameStore);
    store.start();
    expect(store.running()).toBe(true);
    expect(store.drawnCount()).toBe(1);
    expect(store.currentCard()).not.toBeNull();
  });

  it('draw advances to the next card', () => {
    const store = TestBed.inject(GameStore);
    store.start();
    store.draw();
    expect(store.drawnCount()).toBe(2);
    expect(store.currentCard()).toBe(store.drawn()[1]);
  });

  it('ends after the fourth king regardless of shuffle order', () => {
    const store = TestBed.inject(GameStore);
    store.start();
    while (!store.gameEnd() && store.drawnCount() < 54) {
      store.draw();
    }
    expect(store.gameEnd()).toBe(true);
    expect(store.kings()).toBe(4);
  });

  it('derives per-rank counts from the drawn cards', () => {
    const deck: CardId[] = [
      'spades_king',
      'hearts_king',
      'clubs_king',
      'diamonds_king',
      'spades_five',
      'spades_seven',
    ];
    localStorage.setItem('game', JSON.stringify({ deck, drawnCount: 5 }));
    const store = TestBed.inject(GameStore);
    store.resume();
    expect(store.kings()).toBe(4);
    expect(store.fives()).toBe(1);
    expect(store.sevens()).toBe(0);
    expect(store.gameEnd()).toBe(true);
  });

  it('can resume a saved game', () => {
    const deck: CardId[] = ['spades_two', 'hearts_three', 'clubs_four'];
    localStorage.setItem('game', JSON.stringify({ deck, drawnCount: 2 }));
    const store = TestBed.inject(GameStore);
    expect(store.canResume()).toBe(true);
    store.resume();
    expect(store.drawnCount()).toBe(2);
    expect(store.currentCard()).toBe('hearts_three');
  });

  it('has no resumable game when storage is empty', () => {
    const store = TestBed.inject(GameStore);
    expect(store.canResume()).toBe(false);
  });
});
