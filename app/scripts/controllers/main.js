'use strict';

angular.module('kingscupApp')
  .controller('MainCtrl', MainCtrl);

function MainCtrl($mdSidenav, $mdMedia, CardRulesService) {
  var vm = this;
  vm.mdMedia = $mdMedia;
  vm.openLeftMenu = openLeftMenu;

  CardRulesService.initRules();

  function openLeftMenu() {
    $mdSidenav('left').toggle();
  }

}
