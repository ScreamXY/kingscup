'use strict';

angular.module('kingscupApp')
  .controller('MainCtrl', MainCtrl);

function MainCtrl($mdSidenav, $mdMedia, $mdToast, $location, $cookies, CardRulesService) {
  var vm = this;
  vm.mdMedia = $mdMedia;
  vm.openLeftMenu = openLeftMenu;
  vm.menuItemClick = menuItemClick;

  CardRulesService.initRules();

  function openLeftMenu() {
    $mdSidenav('left').toggle();
  }

  function menuItemClick(route) {
    $location.path(route);
    $mdSidenav('left').toggle();
  }
  
  var cookieInformation = $cookies.get('scCookie');
  if(!cookieInformation) {
    var toast = $mdToast.simple()
      .content('This site uses cookies!')
      .action('OK')
      .highlightAction(true)
      .hideDelay(0);
    $mdToast.show(toast).then(function(response) {
      if(response === 'ok') {
        $cookies.put('scCookie', true);
      }
    })
  }

}
