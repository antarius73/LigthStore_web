'use strict';

describe('Controller: UpdatepswCtrl', function () {

  // load the controller's module
  beforeEach(module('lightStoreApp'));

  var UpdatepswCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdatepswCtrl = $controller('UpdatepswCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UpdatepswCtrl.awesomeThings.length).toBe(3);
  });
});
