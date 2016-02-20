function homeCtrl($scope, thisVersion) {

	$scope.version = thisVersion.version;
}

angular.module('dokl.controllers', [])
	.controller('homeCtrl', homeCtrl);