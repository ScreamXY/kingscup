'use strict';

describe('Controller: RulesCtrl', function () {

  // load the controller's module
  beforeEach(module('kingscupApp'));

  var RulesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RulesCtrl = $controller('RulesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RulesCtrl.awesomeThings.length).toBe(3);
  });
});
