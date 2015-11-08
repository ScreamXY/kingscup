'use strict';

angular.module('kingscupApp')
  .controller('GameCtrl', GameCtrl);

function GameCtrl ($rootScope) {
  var vm = this;
  vm.title = 'Game';
  vm.resumeGame = resumeGame;
  vm.startGame = startGame;
  vm.playCard = playCard;
  vm.resumeAllowed = false;
  vm.gameRunning = false;
  vm.playedCards = 0;
  vm.currentCard = {};
  vm.gameArray = [];
  $rootScope.viewName = vm.title;

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
    vm.gameRunning = true;
    //  todo
  }

  function startGame() {
    vm.gameRunning = true;
    vm.gameArray = shuffle(cards);
    vm.currentCard = vm.gameArray[0];
    vm.playedCards += 1;
  }

  function playCard() {
    //todo check game finish, king counter and so on.
    //todo make everything persistent
    vm.currentCard = vm.gameArray[vm.playedCards];
    vm.playedCards += 1;
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
