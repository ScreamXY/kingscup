'use strict';

angular.module('kingscupApp')
  .controller('RulesCtrl', RulesCtrl);

function RulesCtrl ($rootScope) {
  var vm = this;
  vm.title = 'Rules';
  $rootScope.viewName = vm.title;
}
