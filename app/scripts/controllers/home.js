'use strict';

angular.module('kingscupApp')
  .controller('HomeCtrl', MainCtrl);

function MainCtrl ($rootScope) {
  var vm = this;
  vm.title = 'Home';
  $rootScope.viewName = vm.title;
}
