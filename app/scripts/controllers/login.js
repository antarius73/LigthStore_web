'use strict';

/**
 * @ngdoc function
 * @name lightStoreApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the lightStoreApp
 */
angular.module('lightStoreApp')
  .controller('LoginCtrl', function ($scope, $window, $rootScope, $location, $cookieStore, AuthenticationService) {

    $scope.Logout = function () {
      AuthenticationService.ClearCredentials();
      $location.path('/');
    };

    $scope.Quit = function () {
     // $window.close();
      // pour chrome fermer le mode kiosk grace a l'extension chrome "close kiosk"
      $location.path('closekiosk');
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
                $location.path('/');
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
      // cle de dev
      //key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
      // cle tesfri
      key: '6LdlACITAAAAAIwoQtBvDekt9jZ9X49eLxo7FAQ9'
    };
    $scope.setResponse = function (response) {
      //console.info('Response available'+response);
      $scope.response = response;

      /*
      AuthenticationService.ValidateCaptcha($scope.model.key, response, function (response) {
        if (response.success) {
          console.log("ctrl captcha ok");

        } else {
          console.log("ctrl captcha ko"+response.success+ "error");
        }
      });
      */


    };
    $scope.setWidgetId = function (widgetId) {
      console.info('Created widget ID: %s', widgetId);
      $scope.widgetId = widgetId;
    };
    $scope.cbExpiration = function() {
      console.info('Captcha expired. Resetting response object');
      vcRecaptchaService.reload($scope.widgetId);
      $scope.response = null;
    };




  });
