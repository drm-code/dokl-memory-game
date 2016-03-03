function homeCtrl($scope, $rootScope, thisVersion, $ionicPlatform, $timeout, $cordovaNativeAudio) {

	$scope.version = thisVersion.version;
	// $scope.sounds = $rootScope.globals.sounds;
	$ionicPlatform.ready(function() {
		$cordovaNativeAudio.preloadSimple('fx13', 'sounds/futuresoundfx-13.mp3');
	});
	$scope.play = function(sound) {
		if ($rootScope.globals.sounds) {
			$cordovaNativeAudio.play(sound);
		}
	};

}

function gameCtrl($scope, $rootScope, $interval, $gameService, $ionicLoading, $ionicPopup, $timeout, $translate, $filter, $ionicPlatform, $cordovaNativeAudio) {

	var placeholders = $translate.instant(['DMG_GAME_LOADING', 'DMG_GAME_CONGRATULATIONS', 'DMG_GAME_YOUR_TIME', 'DMG_GAME_PLAY_AGAIN', 'DMG_GAME_THANK_YOU', 'DMG_GAME_THANK_YOU_VERY_MUCH']);


	$scope.level = $rootScope.globals.level;
	$scope.sounds = $rootScope.globals.sounds;
	$scope.flip = flip;
	$scope.newGame = newGame();

	function newGame() {
		$scope.time = 0;
		$scope.loading = loading();
		$timeout(function() {
			$scope.time = 0;
			$scope.matched = 0;
			$scope.fPick = undefined;
			$scope.sPick = undefined;
			$scope.gameTime = gameTime();
		}, 1000);
		$scope.grid = $gameService.grid();
	}

	function flip(card) {
		if ($scope.matched < $gameService.pairs()) {
			if (!card.flipped) {
				$gameService.flip(card);
				if (angular.isUndefined($scope.sPick)) {
					if (angular.isUndefined($scope.fPick)) {
						$scope.fPick = card;
						$scope.play('fx2');
					} else {
						$scope.sPick = card;
						if ($scope.fPick.icon === $scope.sPick.icon) {
							$scope.matched++;
							$scope.fPick = undefined;
							$scope.sPick = undefined;
							$scope.play('fx40');
						} else {
							$scope.play('b10');
						}
						if ($scope.matched == $gameService.pairs()) {
							$interval.cancel($scope.gameTime);
							$ionicPopup.confirm({
								title: placeholders.DMG_GAME_CONGRATULATIONS,
								template: placeholders.DMG_GAME_YOUR_TIME + '<b>'+$filter('date')($filter('secondsToTime')( $scope.time), 'HH:mm:ss') + '</b>' + placeholders.DMG_GAME_PLAY_AGAIN
							}).then(function(res) {
								if (res) {
									newGame();
								} else {
									$ionicPopup.alert({
										title: placeholders.DMG_GAME_THANK_YOU,
										template: placeholders.DMG_GAME_THANK_YOU_VERY_MUCH
									});
								}
							});
						}
					}
				} else {
					$gameService.flip($scope.fPick);
					$gameService.flip($scope.sPick);
					$scope.fPick = card;
					$scope.sPick = undefined;
					$scope.play('fx2');
				}
			} else {
				$scope.play('fx3');
			}
		}
	}


	function gameTime() {
		return $interval(function() {
			return $scope.time++;
		}, 1000, false);
	}

	function loading() {
		$ionicLoading.show({
			template: '<h1>'+placeholders.DMG_GAME_LOADING+'</h1>',
			duration: 1500
		});
	}

	$ionicPlatform.ready(function() {
		$cordovaNativeAudio.preloadSimple('fx2', 'sounds/futuresoundfx-2.mp3');
		$cordovaNativeAudio.preloadSimple('fx3', 'sounds/futuresoundfx-3.mp3');
		$cordovaNativeAudio.preloadSimple('fx40', 'sounds/futuresoundfx-40.mp3');
		$cordovaNativeAudio.preloadSimple('fx52', 'sounds/futuresoundfx-52.mp3');
		$cordovaNativeAudio.preloadSimple('b10', 'sounds/beep-10.mp3');
	});
	$scope.play = function(sound) {
		if ($scope.sounds) {
			$cordovaNativeAudio.play(sound);
		}
	};

}

function settingsCtrl($scope, $rootScope, $localstorageService, $translate, cookieName) {

	$scope.language = $rootScope.globals.language;
	$scope.level = $rootScope.globals.level;
	$scope.sounds = $rootScope.globals.sounds;
	$scope.saveLanguage = saveLanguage;
	$scope.saveLevel = saveLevel;
	$scope.enableSounds = enableSounds;

	function saveLanguage(key) {
		$rootScope.globals.language = key;
		$scope.language = key;
		$translate.use(key);
		$localstorageService.setObject(cookieName, $rootScope.globals);
	}

	function saveLevel(level) {
		$rootScope.globals.level = level;
		$scope.level = level;
		$localstorageService.setObject(cookieName, $rootScope.globals);
	}

	function enableSounds() {
		$scope.sounds = !$scope.sounds;
		$rootScope.globals.sounds = $scope.sounds;
		$localstorageService.setObject(cookieName, $rootScope.globals);
	}

}

function aboutCtrl($scope, thisVersion) {

	$scope.version = thisVersion.version;

}

angular.module('dokl.controllers', [])
	.controller('homeCtrl', homeCtrl)
	.controller('gameCtrl', gameCtrl)
	.controller('settingsCtrl', settingsCtrl)
	.controller('aboutCtrl', aboutCtrl);