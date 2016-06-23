'use strict';

describe('Controller: LstproductsCtrl', function () {

  // load the controller's module
  beforeEach(module('lightStoreApp'));

  var LstproductsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LstproductsCtrl = $controller('LstproductsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LstproductsCtrl.awesomeThings.length).toBe(3);
  });
});
