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
      '<div id="card_face" ng-class="card" ng-style="{zoom: zoom}" ng-if="dm.card" ng-click="dm.card = side ? dm.card : false">' +
      '</div>' +
      '<div id="card_back" class="empty" ng-style="{zoom: zoom}" ng-if="!dm.card" ng-click="dm.card = side ? dm.card : true">' +
        '<h2 class="rule_title">{{dm.ruleText.title}}</h2>' +
        '<p class="rule_text">{{dm.ruleText.text}}</p>' +
      '</div>',
    restrict: 'EA',
    scope: {
      card: '@',
      zoom: '@',
      side: '@'
    },
    link: link
  };

  return directive;

  function link(scope, element, attrs) {

    var side = {
      face: true,
      back: false
    };

    scope.dm = {
      card: scope.side ? side[scope.side] : true,
      init: init
    };

    function init() {
      scope.dm.ruleText = CardRulesService.getRuleText(scope.card)
    }

    init();

    scope.$watch('card', function(newVal, oldVal) {
      if(newVal) {
        init();
      }
    })
  }
}
