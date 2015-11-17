'use strict';

angular.module('kingscupApp')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl($rootScope, $mdToast, CardRulesService) {
  var vm = this;
  vm.title = 'Settings';
  vm.clearAll = clearAll;
  vm.edit = false;
  vm.editMode = editMode;
  vm.getCardRule = getCardRule;
  vm.setCardRule = setCardRule;

  $rootScope.viewName = vm.title;

  function clearAll() {
    vm.edit = false;
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

  function editMode() {
    vm.edit = true;
  }

  function getCardRule(cardName) {
    return CardRulesService.getRuleText(cardName);
  }

  function setCardRule(cardName, model) {
    return CardRulesService.setRuleText(cardName, model.title, model.text);
  }
}
