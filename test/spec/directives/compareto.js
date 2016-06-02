'use strict';

describe('Directive: valMatch', function () {

  // load the directive's module
  beforeEach(module('lightStoreApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<val-match></val-match>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the valMatch directive');
  }));
});
