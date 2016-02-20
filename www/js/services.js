function Card(icon) {

	this.icon = icon;
	this.flipped = false;
	this.flip = function() { this.flipped = !this.flipped; };

}

function gameService($rootScope) {

	var pairs = 0,
	Game = {
		grid: function() {
			var dimension = $rootScope.globals.level,
			icons = [
				'ion-ios-infinite',
				'ion-ios-medkit',
				'ion-ios-americanfootball',
				'ion-ios-flask',
				'ion-ios-heart',
				'ion-ios-pulse-strong',
				'ion-ios-camera',
				'ion-ios-keypad',
				'ion-ios-game-controller-b',
				'ion-ios-football',
				'ion-ios-lightbulb',
				'ion-ios-wineglass',
				'ion-ios-body',
				'ion-ios-bolt',
				'ion-ios-plus-outline',

				'ion-android-hand',
				'ion-android-plane',
				'ion-android-pin',
				'ion-android-options',
				'ion-android-calendar',
				'ion-android-wifi',
				'ion-android-walk',
				'ion-android-color-palette',
				'ion-android-globe',
				'ion-android-notifications',
				'ion-social-googleplus',
				'ion-social-facebook',
				'ion-social-octocat',
				'ion-social-twitch-outline',
				'ion-social-vimeo',

				'ion-outlet',
				'ion-headphone',
				'ion-eye',
				'ion-clock',
				'ion-ios-paw',
				'ion-pricetag',
				'ion-pricetags',
				'ion-arrow-expand',
				'ion-trash-a',
				'ion-settings',
				'ion-scissors',
				'ion-map',
				'ion-coffee',
				'ion-battery-charging',
				'ion-bug'
			],
			cards = [],
			matrix = [],
			items = (dimension == 3 || dimension == 5) ? (Math.pow(dimension, 2) - 1) / 2 : (Math.pow(dimension, 2)) / 2;

			pairs = items;
			for (var rc=0; rc<items; rc++) {
				var i = Math.floor(Math.random() * icons.length);
				cards.push(new Card(icons[i]));
				cards.push(new Card(icons[i]));
				icons.splice(i, 1);
			}
			if (dimension == 3 || dimension == 5) { cards.push(new Card()); }
			for (var row=0; row<dimension; row++) {
				matrix[row] = [];
				for (var col=0; col<dimension; col++) {
					i = Math.floor(Math.random() * cards.length);
					matrix[row][col] = cards[i];
					cards.splice(i, 1);
				}
			}
			return matrix;
		},
		flip: function(card) {
			card.flip();
		},
		pairs: function() {
			return pairs;
		}
	};
	
	return Game;

}

function localstorageService($window) {

	var LocalStorage = {
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
			return JSON.parse($window.localStorage[key] || '{}');
		}
	};

	return LocalStorage;
}

angular.module('dokl.services', [])
	.factory('$gameService', gameService)
	.factory('$localstorageService', localstorageService)
