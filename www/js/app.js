// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'dokl' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('dokl', [
  'ionic',
  'dokl.controllers',
  'dokl.services',
  'dokl.constants',
  'dokl.filters',
  'pascalprecht.translate',
  'ngCordova'
])

.run(function($ionicPlatform, $localstorageService, $rootScope, cookieName, thisVersion, $translate, $cordovaNativeAudio, $state, $timeout) {
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
    $cordovaNativeAudio.preloadSimple('fx13', 'sounds/futuresoundfx-13.mp3');
    $cordovaNativeAudio.preloadSimple('arcade', 'sounds/Arcade80kbps.mp3');
    $cordovaNativeAudio.preloadSimple('fx2', 'sounds/futuresoundfx-2.mp3');
    $cordovaNativeAudio.preloadSimple('fx3', 'sounds/futuresoundfx-3.mp3');
    $cordovaNativeAudio.preloadSimple('fx40', 'sounds/futuresoundfx-40.mp3');
    $cordovaNativeAudio.preloadSimple('fx52', 'sounds/futuresoundfx-52.mp3');
    $cordovaNativeAudio.preloadSimple('b10', 'sounds/beep-10.mp3');
  });
  
  // Try to catch physical OS back button
  $ionicPlatform.registerBackButtonAction(function() {
    switch ($state.current.name) {
      case 'app.game':
      case 'app.settings':
      case 'app.about':                      
                      if ($rootScope.globals.sounds && $state.current.name == 'app.game') {
                        $cordovaNativeAudio.stop('arcade');
                      }
                      $state.go('app.home');
                      break;

      case 'app.home':
                      ionic.Platform.exitApp();
    }
  }, 100);

  // Get or set local variables
  $rootScope.globals = $localstorageService.getObject(cookieName);
  if (Object.keys($rootScope.globals).length == 0) {
    $rootScope.globals = { language: 'es', level: 2, sounds: true };
    $localstorageService.setObject(cookieName, $rootScope.globals);
  }
  $translate.use($rootScope.globals.language)
  console.log('Dokl Memory Game (ver. ' + thisVersion.version + ')');
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $translateProvider) {
  // Hide the text of the back button, only an arrow is displayed
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
  // Center nav bar title
  $ionicConfigProvider.navBar.alignTitle('center');

  // Translations
  $translateProvider
    .useStaticFilesLoader({
      prefix: 'locales/',
      suffix: '.js'
    })
    .registerAvailableLanguageKeys(['es', 'en'], {
      'es': 'es', 'es_ES': 'es',
      'en': 'en', 'en_US': 'en'
    })
    .preferredLanguage('es')
    .fallbackLanguage('es')
    .determinePreferredLanguage()
    .useSanitizeValueStrategy('escapeParameters');

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
    })
    .state('app.game', {
      url: "/game",
      views: {
        'app-view': {
          templateUrl: "tpls/game.html",
          controller: "gameCtrl"
        }
      }
    })
    .state('app.settings', {
      url: "/settings",
      views: {
        'app-view': {
          templateUrl: "tpls/settings.html",
          controller: "settingsCtrl"
        }
      }
    })
    .state('app.about', {
      url: "/about",
      views: {
        'app-view': {
          templateUrl: "tpls/about.html",
          controller: "aboutCtrl"
        }
      }
    });

  // Default route
  $urlRouterProvider.otherwise('/app/home');
})