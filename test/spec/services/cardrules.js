'use strict';

describe('Service: cardRules', function () {

  // load the service's module
  beforeEach(module('kingscupApp'));

  // instantiate service
  var cardRules;
  beforeEach(inject(function (_cardRules_) {
    cardRules = _cardRules_;
  }));

  it('should do something', function () {
    expect(!!cardRules).toBe(true);
  });

});
