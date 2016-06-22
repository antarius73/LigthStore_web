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
            url: WCF_URL_BASE + '/operators/'+id,
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

        service.GetCurrentInfos = function (callback) {

          var req = {
            method: 'GET',
            url: WCF_URL_BASE + '/operators/'+ $rootScope.globals.currentUser.userid,
            headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}

          };

          $http(req).then(function (data) {
            if (data !== null) {
              callback({success: true, infos : data.data});
            } else {
              callback({success: false, message: 'impossible de charger les infos'});
            }
          }, function (error) {
            console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);

            var message = error.data.ErrorCode;

            callback({success: false, message: message});
          });
        };

        service.SetCurrentInfos = function (infos, callback) {

          var req = {
            method: 'PUT',
            url: WCF_URL_BASE + '/operators/'+ $rootScope.globals.currentUser.userid,
            headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata},
            data: JSON.stringify({Email: infos.Email, FirstName: infos.FirstName, LastName: infos.LastName})

          };

          $http(req).then(function (data) {
            if (data !== null) {
              callback({success: true});
            } else {
              callback({success: false, message: 'impossible de charger les infos'});
            }
          }, function (error) {
            console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);

            var message = error.data.ErrorCode;

            callback({success: false, message: message});
          });
        };

        service.SetOperatorInfos = function (infos, callback) {

          var req = {
            method: 'PUT',
            url: WCF_URL_BASE + '/operators/'+ infos.Id,
            headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata},
            data: JSON.stringify({Email: infos.Email, FirstName: infos.FirstName, LastName: infos.LastName})

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

        service.CreateOperator = function (infos, callback) {

          var req = {
            method: 'POST',
            url: WCF_URL_BASE + '/operators',
            headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata},
            data: JSON.stringify({Login: infos.Login, Email: infos.Email, FirstName: infos.FirstName, LastName: infos.LastName})

          };

          $http(req).then(function (data) {
            if (data !== null) {
              callback({success: true});
            } else {
              callback({success: false, message: "impossible de créer l'operateur"});
            }
          }, function (error) {
            console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);

            var message = error.data.ErrorCode;

            callback({success: false, message: message});
          });
        };

        service.DeleteOperator = function (id, callback) {

          var req = {
            method: 'DELETE',
            url: WCF_URL_BASE + '/operators/'+id,
            headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata},


          };

          $http(req).then(function (data) {
            if (data !== null) {
              callback({success: true});
            } else {
              callback({success: false, message: "impossible de supprimer l'operateur"});
            }
          }, function (error) {
            console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);

            var message = error.data.ErrorCode;

            callback({success: false, message: message});
          });
        };

        service.GetAllOperators = function (callback) {

          var req = {
            method: 'GET',
            url: WCF_URL_BASE + '/operators',
            headers: {'Content-Type': 'application/json','Authorization': 'Basic ' + $rootScope.globals.currentUser.authdata}

          };

          $http(req).then(function (data) {
            if (data !== null) {
              callback({success: true, operators : data.data});
            } else {
              callback({success: false, message: 'impossible de charger les operators'});
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


