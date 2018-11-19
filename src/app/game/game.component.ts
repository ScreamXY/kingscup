import { Component, OnInit } from '@angular/core';
import { Game } from '../shared/Game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private title = 'Game';
  private gameRunning: boolean;
  private gameEnd: boolean;
  private playedCards: number;
  private kings: number;
  private fives: number;
  private sevens: number;
  private eights: number;
  private tens: number;
  private queens: number;
  private currentCard: string;
  private gameArray: string[];
  private pausedGame: string[];
  private resumeAllowed: boolean;
  private cards: string[];

  constructor() {}

  ngOnInit() {
    this.gameRunning = false;
    this.gameEnd = false;
    this.playedCards = 0;
    this.kings = 0;
    this.fives = 0;
    this.sevens = 0;
    this.eights = 0;
    this.tens = 0;
    this.queens = 0;
    this.currentCard = null;
    this.gameArray = [];
    this.pausedGame = JSON.parse(localStorage.getItem('game'));
    this.resumeAllowed = this.pausedGame && !this.gameEnd ? true : false;
    this.cards = [
      'joker_black',
      'joker_color',
      'diamonds_ace',
      'diamonds_two',
      'diamonds_three',
      'diamonds_four',
      'diamonds_five',
      'diamonds_six',
      'diamonds_seven',
      'diamonds_eight',
      'diamonds_nine',
      'diamonds_ten',
      'diamonds_jack',
      'diamonds_queen',
      'diamonds_king',
      'spades_ace',
      'spades_two',
      'spades_three',
      'spades_four',
      'spades_five',
      'spades_six',
      'spades_seven',
      'spades_eight',
      'spades_nine',
      'spades_ten',
      'spades_jack',
      'spades_queen',
      'spades_king',
      'hearts_ace',
      'hearts_two',
      'hearts_three',
      'hearts_four',
      'hearts_five',
      'hearts_six',
      'hearts_seven',
      'hearts_eight',
      'hearts_nine',
      'hearts_ten',
      'hearts_jack',
      'hearts_queen',
      'hearts_king',
      'clubs_ace',
      'clubs_two',
      'clubs_three',
      'clubs_four',
      'clubs_five',
      'clubs_six',
      'clubs_seven',
      'clubs_eight',
      'clubs_nine',
      'clubs_ten',
      'clubs_jack',
      'clubs_queen',
      'clubs_king'
    ];
  }

  private resumeGame(): void {
    const game: Game = JSON.parse(localStorage.getItem('game'));
    this.gameRunning = true;
    this.gameEnd = game.gameEnd;
    this.playedCards = game.playedCards;
    this.kings = game.kings;
    this.fives = game.fives;
    this.sevens = game.sevens;
    this.eights = game.eights;
    this.tens = game.tens;
    this.queens = game.queens;
    this.gameArray = game.gameArray;
    this.currentCard = game.currentCard;
  }
  private startGame(): void {
    this.ngOnInit();
    this.gameRunning = true;
    this.gameArray = this.shuffle(this.cards);
    this.playCard();
  }
  private playCard(): void {
    this.currentCard = this.gameArray[this.playedCards];
    this.playedCards += 1;

    const card = this.currentCard.split('_');
    switch (card[1]) {
      case 'king':
        this.kings += 1;
        break;
      case 'five':
        this.fives += 1;
        break;
      case 'seven':
        this.sevens += 1;
        break;
      case 'eight':
        this.eights += 1;
        break;
      case 'ten':
        this.tens += 1;
        break;
      case 'queen':
        this.queens += 1;
        break;
    }

    if (this.kings === 4) {
      console.log('You lost the game :D');
      this.gameEnd = true;
    }
    const game = {
      gameRunning: this.gameRunning,
      gameEnd: this.gameEnd,
      playedCards: this.playedCards,
      kings: this.kings,
      fives: this.fives,
      sevens: this.sevens,
      eights: this.eights,
      tens: this.tens,
      queens: this.queens,
      gameArray: this.gameArray,
      currentCard: this.gameArray[this.playedCards - 1]
    };
    localStorage.setItem('game', JSON.stringify(game));
  }

  private shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
