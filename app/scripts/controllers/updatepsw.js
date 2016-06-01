'use strict';

/**
 * @ngdoc function
 * @name lightStoreApp.controller:UpdatepswCtrl
 * @description
 * # UpdatepswCtrl
 * Controller of the lightStoreApp
 */
angular.module('lightStoreApp')
  .controller('UpdatepswCtrl', function ($scope) {


    $scope.updatePsw = function(credential){

      console.log("old one:"+credential.oldPsw+" new one:"+credential.newPsw)

      // connection à l'api

      // recuperation de la reponse

      // redirection de l'utilisateur

    }

  });
