'use strict';

/**
 * @ngdoc directive
 * @name lightStoreApp.directive:valMatch
 * @description
 * # valMatch
 */
angular.module('lightStoreApp')
  .directive('compareTo', function () {
    return {
      scope: {
        targetModel: '=compareTo'
      },
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ctrl) {

        var compare = function () {
       //   console.log("compare fx");
          var e1 = element.val();
          var e2 = scope.targetModel;

          if (e2 !== null) {
       //     console.log(e1+"compare =="+e2);
            return e1 === e2;
          }

       //   console.log(e1+"compare !="+e2);
          return false;
        };

        scope.$watch(compare, function (newValue) {
          ctrl.$setValidity('errorCompareTo', newValue);
        });

      }
    };
  });
