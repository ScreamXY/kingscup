'use strict';

angular.module('kingscupApp')
  .controller('GameCtrl', GameCtrl);

function GameCtrl ($rootScope, localStorageService) {
  var vm = this;

  vm.title = 'Game';
  vm.resumeGame = resumeGame;
  vm.startGame = startGame;
  vm.playCard = playCard;
  $rootScope.viewName = vm.title;
  function init() {
    vm.gameRunning = false;
    vm.gameEnd = false;
    vm.playedCards = 0;
    vm.kings = 0;
    vm.fives = 0;
    vm.sevens = 0;
    vm.eights = 0;
    vm.tens = 0;
    vm.queens = 0;
    vm.currentCard = {};
    vm.gameArray = [];
    vm.pausedGame = localStorageService.get('game');
    vm.resumeAllowed = vm.pausedGame && !vm.gameEnd ? true : false;
  }
  init();

  var cards = [
    'joker_black', 'joker_color',
    'diamonds_ace', 'diamonds_two', 'diamonds_three',
    'diamonds_four', 'diamonds_five', 'diamonds_six',
    'diamonds_seven', 'diamonds_eight', 'diamonds_nine',
    'diamonds_ten', 'diamonds_jack', 'diamonds_queen', 'diamonds_king',
    'spades_ace', 'spades_two', 'spades_three',
    'spades_four', 'spades_five', 'spades_six',
    'spades_seven', 'spades_eight', 'spades_nine',
    'spades_ten', 'spades_jack', 'spades_queen', 'spades_king',
    'hearts_ace', 'hearts_two', 'hearts_three',
    'hearts_four', 'hearts_five', 'hearts_six',
    'hearts_seven', 'hearts_eight', 'hearts_nine',
    'hearts_ten', 'hearts_jack', 'hearts_queen', 'hearts_king',
    'clubs_ace', 'clubs_two', 'clubs_three',
    'clubs_four', 'clubs_five', 'clubs_six',
    'clubs_seven', 'clubs_eight', 'clubs_nine',
    'clubs_ten', 'clubs_jack', 'clubs_queen', 'clubs_king'
  ];

  function resumeGame() {
    var game = localStorageService.get('game');
    vm.gameRunning = true;
    vm.gameEnd = game.gameEnd;
    vm.playedCards = game.playedCards;
    vm.kings = game.kings;
    vm.fives = game.fives;
    vm.sevens = game.sevens;
    vm.eights = game.eights;
    vm.tens = game.tens;
    vm.queens = game.queens;
    vm.gameArray = game.gameArray;
    vm.currentCard = game.currentCard;
  }

  function startGame() {
    init();
    vm.gameRunning = true;
    vm.gameArray = shuffle(cards);
    vm.currentCard = vm.gameArray[0];
    vm.playedCards += 1;
  }

  function playCard() {
    vm.currentCard = vm.gameArray[vm.playedCards];
    vm.playedCards += 1;

    var card = vm.currentCard.split('_');
    switch(card[1]) {
      case 'king':
        vm.kings += 1;
        break;
      case 'five':
        vm.fives += 1;
        break;
      case 'seven':
        vm.sevens += 1;
        break;
      case 'eight':
        vm.eights += 1;
        break;
      case 'ten':
        vm.tens += 1;
        break;
      case 'queen':
        vm.queens += 1;
        break;
    }

    if(vm.kings === 4) {
      console.log('You lost the game :D');
      vm.gameEnd = true;
    }
    var game = {
      gameRunning: vm.gameRunning,
      gameEnd: vm.gameEnd,
      playedCards: vm.playedCards,
      kings: vm.kings,
      fives: vm.fives,
      sevens: vm.sevens,
      eights: vm.eights,
      tens: vm.tens,
      queens: vm.queens,
      gameArray: vm.gameArray,
      currentCard: vm.gameArray[vm.playedCards - 1]
    };
    localStorageService.set('game', vm);
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

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
