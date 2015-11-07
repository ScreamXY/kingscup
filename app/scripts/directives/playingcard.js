'use strict';

/**
 * @name kingscupApp.directive:playingcard
 * @description
 * # playingcard
 */
angular.module('kingscupApp')
  .directive('playingcard', playingcard);

function playingcard(CardRulesService) {
  var directive = {
    template: '' +
      '<div ng-class="card" ng-style="{zoom: zoom}" ng-if="dm.card" ng-click="dm.card = false"></div>' +
      '<div class="empty" ng-style="{zoom: zoom}" ng-if="!dm.card" ng-click="dm.card = true">' +
        '<p class="rule_text">{{dm.ruleText}}</p>' +
      '</div>',
    restrict: 'EA',
    scope: {
      card: '@',
      zoom: '@'
    },
    link: link
  };

  return directive;

  function link(scope, element, attrs) {

    scope.dm = {
      card: true,
      ruleText: CardRulesService.getRuleText(scope.card)
    };

  }
}
