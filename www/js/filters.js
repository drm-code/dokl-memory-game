function secondsToTime() {
	return function(seconds) {
		return new Date(1970, 0, 1).setSeconds(seconds);
	}
}

angular.module('dokl.filters', [])
	.filter('secondsToTime', secondsToTime)