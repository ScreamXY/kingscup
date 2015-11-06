'use strict';

/**
 * @name kingscupApp.directive:playingcard
 * @description
 * # playingcard
 */
angular.module('kingscupApp')
  .directive('playingcard', playingcard);

function playingcard(cardRules) {
  var directive = {
    template: '<div ng-class="card" ng-style="{zoom: zoom}" ng-click="dm.card = false"></div>',
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
      card: true;
      ruleText: '';
    }

  }
}
