'use strict';

/**
 * @ngdoc service
 * @name lightStoreApp.operatorService
 * @description
 * # operatorService
 * Service in the lightStoreApp.
 */
angular.module('lightStoreApp')

    .factory('operatorService', ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout', 'WCF_URL_BASE',

      function (Base64, $http, $cookieStore, $rootScope, $timeout, WCF_URL_BASE) {

        var service = {};

        service.SetPsw = function (id, oldPsw, newPsw , callback) {




          var req = {
            method: 'PATCH',
            url: WCF_URL_BASE + '/operators/'+id+"/",
            headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata},
            data: JSON.stringify({Password: oldPsw, NewPassword: newPsw})
          };

          $http(req).then(function (data) {
            if (data !== null && data.data.IsPasswordDefined) {
              callback({success: true});
            } else {
              callback({success: false, message: 'impossible de modifier le mot de passe'});
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


