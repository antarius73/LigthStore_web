'use strict';

/**
 * @ngdoc service
 * @name lightStoreApp.packagingService
 * @description
 * # packagingService
 * Service in the lightStoreApp.
 */
angular.module('lightStoreApp')

.factory('packagingService', [ '$http', '$rootScope', 'WCF_URL_BASE',

  function ($http, $rootScope, WCF_URL_BASE) {

    var service = {};
/*
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
*/

    function AddPackageInfos(packageData, baseUnitLbl){


      var rootPackaging = $.grep(packageData,function(e){return e.FromId == null});


      for(var i = 0; i<rootPackaging.length;i++){
        rootPackaging[i].BaseUnitQ = rootPackaging[i].Quantity;
        rootPackaging[i].BaseUnitTotal = rootPackaging[i].Quantity;
        rootPackaging[i].FromLbl = baseUnitLbl;
        CompleteChildrenPackagingInfo(packageData, rootPackaging[i].BaseUnitTotal, rootPackaging[i].BaseUnitQ, rootPackaging[i].Id,  rootPackaging[i].Unity );
      }
      return packageData;
    }

    function CompleteChildrenPackagingInfo(packageData, BaseUnitTotal, BaseUnitQ, parentId, parentUnitLbl){
      var childPackaging = $.grep(packageData,function(e){return e.FromId == parentId});

      if(childPackaging.length == 0) return;
      else{
        childPackaging[0].BaseUnitQ = BaseUnitQ;
        childPackaging[0].BaseUnitTotal = BaseUnitTotal * childPackaging[0].Quantity;
        childPackaging[0].FromLbl = parentUnitLbl;
        CompleteChildrenPackagingInfo(packageData, childPackaging[0].BaseUnitTotal, BaseUnitQ,  childPackaging[0].Id,  childPackaging[0].Unity);
      }
    }



    service.GetProductPackaging = function (id, baseUnitLbl, callback) {

      var req = {
        method: 'GET',
        url: WCF_URL_BASE + '/products/'+id+'/packaging',
        headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}

      };

      $http(req).then(function (data) {
        if (data !== null) {

          var transformedData = AddPackageInfos(data.data, baseUnitLbl);

          callback({success: true, packaging : transformedData});
        } else {
          callback({success: false, message: 'impossible de charger les packaging du produits'});
        }
      }, function (error) {
        console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);

        var message = error.data.ErrorCode;

        callback({success: false, message: message});
      });
    };


    return service;
  }
]);
