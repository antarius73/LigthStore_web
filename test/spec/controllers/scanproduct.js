'use strict';

describe('Controller: ScanproductCtrl', function () {

  // load the controller's module
  beforeEach(module('lightStoreApp'));

  var ScanproductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ScanproductCtrl = $controller('ScanproductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ScanproductCtrl.awesomeThings.length).toBe(3);
  });
});
