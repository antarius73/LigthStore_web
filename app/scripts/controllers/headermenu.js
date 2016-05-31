'use strict';

/**
 * @ngdoc function
 * @name lightStoreApp.controller:HeadermenuCtrl
 * @description
 * # HeadermenuCtrl
 * Controller of the lightStoreApp
 */
angular.module('lightStoreApp')
  .controller('HeadermenuCtrl', function ($scope, $location) {
  $scope.isActive = function (viewLocation){
   // console.log("header "+viewLocation+ "=== "+$location.path());
    return viewLocation === $location.path();


  }
  });
