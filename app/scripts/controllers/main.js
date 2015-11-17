'use strict';

angular.module('kingscupApp')
  .controller('MainCtrl', MainCtrl);

function MainCtrl($mdSidenav, $mdMedia, $location, CardRulesService) {
  var vm = this;
  vm.mdMedia = $mdMedia;
  vm.openLeftMenu = openLeftMenu;
  vm.menuItemClick = menuItemClick;

  CardRulesService.initRules();

  function openLeftMenu() {
    $mdSidenav('left').toggle();
  }

  function menuItemClick(route) {
    console.log('menuItemClick', route);
    $location.path(route);
    $mdSidenav('left').toggle();
  }
  //todo cookie notification
  //todo impressum / licences

}
