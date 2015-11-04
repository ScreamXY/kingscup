'use strict';

angular.module('kingscupApp')
  .controller('MainCtrl', function ($mdSidenav, $mdMedia) {

    var vm = this;

    vm.mdMedia = $mdMedia;

    vm.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
  });
