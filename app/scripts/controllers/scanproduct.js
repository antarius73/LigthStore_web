'use strict';

/**
 * @ngdoc function
 * @name lightStoreApp.controller:ScanproductCtrl
 * @description
 * # ScanproductCtrl
 * Controller of the lightStoreApp
 */
angular.module('lightStoreApp')
  .controller('ScanproductCtrl', function ($scope, productService) {



    $scope.sendCab = function(){


      productService.GetProductFromCab(function (response) {
        if (response.success) {

          console.log("ok read");

          console.log(response.productInfos);

          $scope.productInfos = response.productInfos;



        } else {
          console.log("ko read");
          $scope.error = response.message;
          $scope.dataLoading = false;
        }
      }, $scope.productCab);


    }
  });
