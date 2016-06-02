  'use strict';

  /**
   * @ngdoc function
   * @name lightStoreApp.controller:UpdatepswCtrl
   * @description
   * # UpdatepswCtrl
   * Controller of the lightStoreApp
   */
  angular.module('lightStoreApp')
    .controller('UpdatepswCtrl', function ($scope,$rootScope, operatorService, $location) {


      $scope.updatePsw = function(credential){

       // console.log("old one:"+credential.oldPsw+" new one:"+credential.newPsw)

            // connection à l'api
        operatorService.SetPsw($rootScope.globals.currentUser.userid, credential.oldPsw, credential.newPsw, function (response) {
          if (response.success) {

              $location.path('/login');

          } else {
            $scope.error = response.message;
            $scope.dataLoading = false;
          }
        });
      };





    });
