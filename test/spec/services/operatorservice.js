'use strict';

describe('Service: operatorService', function () {

  // load the service's module
  beforeEach(module('lightStoreApp'));

  // instantiate service
  var operatorService;
  beforeEach(inject(function (_operatorService_) {
    operatorService = _operatorService_;
  }));

  it('should do something', function () {
    expect(!!operatorService).toBe(true);
  });

});
