'use strict';

/**
 * @name kingscupApp.cardRules
 * @description
 * # cardRules
 * Factory in the kingscupApp.
 */
angular.module('kingscupApp')
  .factory('CardRulesService', function () {
    return {
      getRuleText: getRuleText,
      setRuleText: setRuleText
    };

    function getRuleText(cardName) {
      var defaultRules = {
        joker: 'Joker_Rules',
        ace: 'Ace Rules',
        two: 'Two Rules',
        three: 'Three Rules',
        four: 'Four Rules',
        five: 'Five Rules',
        six: 'Six Rules',
        seven: 'Seven Rules',
        eight: 'Eight Rules',
        nine: 'Nine Rules',
        ten: 'Ten Rules',
        jack: 'Jack Rules',
        queen: 'Queen Rules',
        king: 'King Rules'
      };
      //todo init to localstorage, read from local storage
      var rules = defaultRules;
      var card = cardName.split('_');
      if (card.indexOf('joker') > -1) {
        return rules['joker'];
      }
      return rules[card[1]];
    }

    function setRuleText(cardName, text) {
      //  todo save to localsotrage
    }
  });
