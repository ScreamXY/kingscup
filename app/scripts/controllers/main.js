'use strict';

angular.module('kingscupApp')
  .controller('MainCtrl', function ($mdSidenav) {
    var vm = this;

    vm.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
  });
