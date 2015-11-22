'use strict';

angular.module('kingscupApp')
  .controller('HomeCtrl', HomeCtrl);

function HomeCtrl ($rootScope) {
  var vm = this;
  vm.title = 'Home';
  $rootScope.viewName = vm.title;
}
