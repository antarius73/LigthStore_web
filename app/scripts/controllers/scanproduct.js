'use strict';

/**
 * @ngdoc function
 * @name lightStoreApp.controller:ScanproductCtrl
 * @description
 * # ScanproductCtrl
 * Controller of the lightStoreApp
 */
angular.module('lightStoreApp')
  .controller('ScanproductCtrl', function ($scope, productService, packagingService) {



    $scope.sendCab = function(){


      productService.GetProductFromCab(function (response) {
        if (response.success) {

          console.log("ok read");

          console.log(response.productInfos);

          $scope.productInfos = response.productInfos;


          packagingService.GetProductPackaging($scope.productInfos.Id, $scope.productInfos.Unity, function (response) {
            if (response.success) {

              console.log("ok read");
              console.log(response.packaging);
              $scope.productPackagingInfos = response.packaging;

            } else {
              console.log("ko read");
              $scope.error = response.message;
            }
          });




          $scope.productCab = null;
        } else {
          console.log("ko read");
          $scope.error = response.message;
          $scope.dataLoading = false;
        }
      }, $scope.productCab);


    }
  });
