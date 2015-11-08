'use strict';

angular.module('kingscupApp')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl($rootScope, $mdToast, CardRulesService) {
  var vm = this;
  vm.title = 'Settings';
  vm.clearAll = clearAll;

  $rootScope.viewName = vm.title;

  function clearAll() {
    try {
      CardRulesService.clearAll();
      $mdToast.show($mdToast.simple().content('Success'));
    }
    catch (e) {
      console.log(e);
      $mdToast.show($mdToast.simple().content('Error: This shit didn\'t work...'));
    }
    CardRulesService.clearAll();

  }
}
