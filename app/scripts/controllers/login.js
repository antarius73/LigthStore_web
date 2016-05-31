'use strict';

/**
 * @ngdoc function
 * @name lightStoreApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the lightStoreApp
 */
angular.module('lightStoreApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, $cookieStore, AuthenticationService) {

    $scope.Logout = function () {
      AuthenticationService.ClearCredentials();
      $location.path('/');
    };

    $scope.isNotLogin = function () {
      var globals = $cookieStore.get('globals');
      if (!angular.isDefined(globals) || !angular.isDefined(globals.currentUser)) {
        return false;
      }

      return true;
    };

    $scope.loginUser = function () {
      // reset login status
      AuthenticationService.ClearCredentials();

      $scope.dataLoading = true;
      AuthenticationService.Login($scope.username, $scope.password, function (response) {
        if (response.success) {
          AuthenticationService.SetCredentials($scope.username, $scope.password);
          $location.path('/profil');
        } else {
          $scope.error = response.message;
          $scope.dataLoading = false;
        }
      });
    };


  });
