'use strict';

describe('Controller: ImpressumCtrl', function () {

  // load the controller's module
  beforeEach(module('kingscupApp'));

  var ImpressumCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImpressumCtrl = $controller('ImpressumCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ImpressumCtrl.awesomeThings.length).toBe(3);
  });
});
