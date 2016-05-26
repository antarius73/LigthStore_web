'use strict';

describe('Controller: HeadermenuCtrl', function () {

  // load the controller's module
  beforeEach(module('lightStoreApp'));

  var HeadermenuCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeadermenuCtrl = $controller('HeadermenuCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HeadermenuCtrl.awesomeThings.length).toBe(3);
  });
});
