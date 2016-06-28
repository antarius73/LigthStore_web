'use strict';

describe('Service: packagingService', function () {

  // load the service's module
  beforeEach(module('lightStoreApp'));

  // instantiate service
  var packagingService;
  beforeEach(inject(function (_packagingService_) {
    packagingService = _packagingService_;
  }));

  it('should do something', function () {
    expect(!!packagingService).toBe(true);
  });

});
