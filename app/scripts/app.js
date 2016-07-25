'use strict';

/**
 * @ngdoc overview
 * @name lightStoreApp
 * @description
 * # lightStoreApp
 *
 * Main module of the application.
 */
angular
  .module('lightStoreApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'kendo.directives',
    'vcRecaptcha',
    'ngPasswordStrength',
    'ui.validate'
  ])
  .constant('WCF_URL_BASE', 'https://svr-grind.tesfri.intra:8084')
  .config(['$resourceProvider', function ($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/profil', {
        templateUrl: 'views/profil.html',
        controller: 'ProfilCtrl',
        controllerAs: 'profil'
      })
      .when('/updatepsw', {
        templateUrl: 'views/updatepsw.html',
        controller: 'UpdatepswCtrl',
        controllerAs: 'updatepsw'
      })
      .when('/lstOperators', {
        templateUrl: 'views/lstoperators.html',
        controller: 'LstoperatorsCtrl',
        controllerAs: 'lstOperators'
      })
      .when('/lstProducts', {
        templateUrl: 'views/lstproducts.html',
        controller: 'LstproductsCtrl',
        controllerAs: 'lstProducts'
      })
      .when('/scanProduct', {
        templateUrl: 'views/scanproduct.html',
        controller: 'ScanproductCtrl',
        controllerAs: 'scanProduct'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope', '$location', '$cookieStore', '$http',
  function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }
    $rootScope.$on('$locationChangeStart', function () {
      // redirect to login page if not logged in
      if ($location.path() !== '/login' && (!$rootScope.globals.currentUser)) {
        $location.path('/login');
      }
    });
  }]);
