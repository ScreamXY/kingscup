export interface Game {
  gameRunning: boolean;
  gameEnd: boolean;
  playedCards: number;
  kings: number;
  fives: number;
  sevens: number;
  eights: number;
  tens: number;
  queens: number;
  gameArray: string[];
  currentCard: string;
}
