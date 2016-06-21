'use strict';

/**
 * @ngdoc function
 * @name lightStoreApp.controller:ProfilCtrl
 * @description
 * # ProfilCtrl
 * Controller of the lightStoreApp
 */
angular.module('lightStoreApp')
  .controller('ProfilCtrl', function ($scope, operatorService) {


    $scope.infos=null;

    $scope.GetUserInfos = function () {

      operatorService.GetCurrentInfos(function (response) {
        if (response.success) {

          console.log("ok");
          $scope.infos = response.infos;
          console.log(response.infos.Email);
        } else {
          console.log("ko");
          $scope.error = response.message;
          $scope.dataLoading = false;
        }
      });
    };

    $scope.SetUserInfos = function () {

      operatorService.SetCurrentInfos($scope.infos,function (response) {
        if (response.success) {

          console.log("set infos ok");
          $scope.infos = response.infos;
          console.log(response.infos.Email);
        } else {
          console.log("set infos ko");
          $scope.error = response.message;
          $scope.dataLoading = false;
        }
      });
    };



    $scope.GetUserInfos();
  });
