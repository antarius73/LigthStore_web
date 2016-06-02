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

          // recuperer l'id
          //console.log("id:"+response.Id);
          AuthenticationService.SetCredentials($scope.username, $scope.password, response.Id);

          var pswDefined = AuthenticationService.SpotFirstConnection(function (response) {
            if (response.success) {


              if(response.IsPasswordDefined){
                $location.path('/profil');
              }
              else{
                $location.path('/updatepsw');
              }

            }
            else {
              $scope.error = response.message;
              $scope.dataLoading = false;
            }

          });





        } else {
          $scope.error = response.message;
          $scope.dataLoading = false;
        }
      });
    };


    $scope.response = null;
    $scope.widgetId = null;
    $scope.model = {
      key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
    };
    $scope.setResponse = function (response) {
     // console.info('Response available'+response);
      $scope.response = response;
    };
    $scope.setWidgetId = function (widgetId) {
     // console.info('Created widget ID: %s', widgetId);
      $scope.widgetId = widgetId;
    };
    $scope.cbExpiration = function() {
    //  console.info('Captcha expired. Resetting response object');
      vcRecaptchaService.reload($scope.widgetId);
      $scope.response = null;
    };


  });
