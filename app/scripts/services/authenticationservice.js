'use strict';

/**
 * @ngdoc service
 * @name lightStoreApp.AuthenticationService
 * @description
 * # AuthenticationService
 * Service in the lightStoreApp.
 */
angular.module('lightStoreApp')

  .factory('AuthenticationService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout', 'WCF_URL_BASE',
      function (Base64, $http, $cookieStore, $rootScope, $timeout, WCF_URL_BASE) {
        var service = {};

        service.Login = function (username, password, callback) {
          //console.log(JSON.stringify({Login: username, Password: password}));

          var req = {
            method: 'PUT',
            url: WCF_URL_BASE + '/Login/log/',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({Login: username, Password: password})
          };

//          $timeout(function(){
          /* Use this for real authentication
           ----------------------------------------------*/
          var person;
          $http(req).then(function (data) {
            if (data !== null) {
              callback({success: true, Id:data.data.Id});
            } else {
              callback({success: false, message: 'Username or password is incorrect'});
            }
          }, function (error) {
            var message = 'Service call failed '+error.data.ErrorCode+" message"+error.data.ErrorMessage;
            console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);


            callback({success: false, message: message});
          });
        };


        service.SpotFirstConnection= function(callback){

          var req = {
            method: 'PUT',
            url: WCF_URL_BASE + '/Login/info/',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({Login: $rootScope.globals.currentUser.username})
          };

//          $timeout(function(){
          /* Use this for real authentication
           ----------------------------------------------*/
          var person;
          $http(req).then(function (data) {
         //   console.log("SpotFirstConnection"+data.Id);

            if (data.data.IsPasswordDefined == false) {
          //    console.log("pass word not defined");
              callback({success: true, IsPasswordDefined:false });

            } else {
           //   console.log("password defined");
              callback({success: true, IsPasswordDefined:true });

            }
          }, function (error) {
            console.log("error code : "+error.data.ErrorCode+" message"+error.data.ErrorMessage);


          });

        }

        service.SetCredentials = function (username, password, id) {

          if(!angular.isDefined(password)) password="";

          var authdata = Base64.encode(username + ':' + password);
          $rootScope.globals = {
            currentUser: {
              username: username,
              authdata: authdata,
              userid : id
            }
          };

          $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
          $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
          $rootScope.globals = {};
          $cookieStore.remove('globals');
          $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;
      }])

  .factory('Base64', function () {
    /* jshint ignore:start */

    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    return {
      encode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
      },

      decode: function (input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
          window.alert("There were invalid base64 characters in the input text.\n" +
            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
            "Expect errors in decoding.");
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }

          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);

        return output;
      }
    };
  });
