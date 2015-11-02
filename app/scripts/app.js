'use strict';

/**
 * @ngdoc overview
 * @name kingscupApp
 * @description
 * # kingscupApp
 *
 * Main module of the application.
 */
angular
  .module('kingscupApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      })
      .when('/game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        controllerAs: 'vm'
      })
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingsCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .dark();
  });
