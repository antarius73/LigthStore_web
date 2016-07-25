'use strict';

/**
 * @ngdoc service
 * @name lightStoreApp.productService
 * @description
 * # productService
 * Service in the lightStoreApp.
 */
angular.module('lightStoreApp')
  .factory('productService', [ '$http', '$rootScope', 'WCF_URL_BASE',

  function ($http, $rootScope, WCF_URL_BASE) {

    var service = {};

    service.SetProductInfos = function (infos, callback) {

      var req = {
        method: 'PUT',
        url: WCF_URL_BASE + '/products/'+ infos.Id,
        headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata},
        data: JSON.stringify({Code: infos.Code, Label: infos.Label, Unity: infos.Unity, Weight: infos.Weight, GTIN: infos.GTIN})

      };

      $http(req).then(function (data) {
        if (data !== null) {
          callback({success: true});
        } else {
          callback({success: false, message: 'impossible de modifier les infos'});
        }
      }, function (error) {
        console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);

        var message = error.data.ErrorCode;

        callback({success: false, message: message});
      });
    };



    service.CreateProduct = function (infos, callback) {

      var req = {
        method: 'POST',
        url: WCF_URL_BASE + '/products',
        headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata},
        data: JSON.stringify({Code: infos.Code, Label: infos.Label, Unity: infos.Unity, Weight: infos.Weight, GTIN: infos.GTIN})

      };

      $http(req).then(function (data) {
        if (data !== null) {
          callback({success: true});
        } else {
          callback({success: false, message: "impossible de créer le produit"});
        }
      }, function (error) {
        console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);

        var message = error.data.ErrorCode;

        callback({success: false, message: message});
      });
    };

    service.DeleteProduct = function (id, callback) {

      var req = {
        method: 'DELETE',
        url: WCF_URL_BASE + '/products/'+id,
        headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata},


      };

      $http(req).then(function (data) {
        if (data !== null) {
          callback({success: true});
        } else {
          callback({success: false, message: "impossible de supprimer le produit"});
        }
      }, function (error) {
        console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);

        var message = error.data.ErrorCode;

        callback({success: false, message: message});
      });
    };

    service.GetAllProducts = function (callback) {

      var req = {
        method: 'GET',
        url: WCF_URL_BASE + '/products',
        headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}

      };

      $http(req).then(function (data) {
        if (data !== null) {
          callback({success: true, operators : addProductInfos(data.data)});
        } else {
          callback({success: false, message: 'impossible de charger les produits'});
        }
      }, function (error) {
        console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);

        var message = error.data.ErrorCode;

        callback({success: false, message: message});
      });
    };


    service.GetProductFromCab = function (callback, cab) {

      var req = {
        method: 'GET',
        url: WCF_URL_BASE + '/products?cab='+cab,
        headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}

      };

      $http(req).then(function (data) {
        if (data !== null) {
          callback({success: true, productInfos : data.data});
        } else {
          callback({success: false, message: 'impossible de charger le produits depuis le cab'});
        }
      }, function (error) {
        console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);

        var message = error.data.ErrorCode;

        callback({success: false, message: message});
      });
    };



    function addProductInfos(data){


      for(var i = 0; i<data.length;i++) {
        data[i].Unity = UniteLblToFr(data[i].Unity);
      }

        return data;
    }


    function UniteLblToFr(unit) {
      switch (unit) {
        case "CSU":
          return "UVC";

        default :
          return unit;

      }
    }
    return service;
  }
]);
