// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'dokl' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dokl', ['ionic', 'dokl.controllers', 'dokl.services', 'dokl.constants'])

.run(function($ionicPlatform, $localstorageService, $rootScope, cookieName, thisVersion) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    // Get or set local variables
    $rootScope.globals = $localstorageService.getObject(cookieName);
    if (Object.keys($rootScope.globals).length == 0) {
      $rootScope.globals = { language: 'es', level: 2 };
      $localstorageService.setObject(cookieName, $rootScope.globals);
    }
    console.log('Dokl Memory Game (ver. ' + thisVersion.version + ')');
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  // Hide the text of the back button, only an arrow is displayed
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  // Center nav bar title
  $ionicConfigProvider.navBar.alignTitle('center');


  // Routes
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "tpls/app.html"
    })
    .state('app.home', {
      url: "/home",
      views: {
        'app-view': {
          templateUrl: "tpls/home.html",
          controller: "homeCtrl"
        }
      }
    });

  // Default route
  $urlRouterProvider.otherwise('/app/home');
})