'use strict';

/**
 * @name kingscupApp.cardRules
 * @description
 * # cardRules
 * Factory in the kingscupApp.
 */
angular.module('kingscupApp')
  .factory('cardRules', function () {
    return {
      getRuleText: getRuleText,
      setRuleText: setRuleText
    };

    function getRuleText(cardName) {
      //todo init to localstorage, read from local storage
      return lol;
    }

    function setRuleText(cardName, text) {
      //  todo save to localsotrage
    }
  });
