'use strict';

angular.module('kingscupApp')
  .controller('ImpressumCtrl', ImpressumCtrl);

function ImpressumCtrl ($rootScope) {
  var vm = this;
  vm.title = 'Impressum';
  $rootScope.viewName = vm.title;
}
