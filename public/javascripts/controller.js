/* 
* @Author: ocean
* @Date:   2015-12-15 14:37:38
* @Last Modified by:   ocean
* @Last Modified time: 2016-04-11 17:34:19
*/

'use strict';

var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope){
	$scope.firstName = 'ocean';
	$scope.lastName = 'deng';
	$scope.fullName = function(){
		return $scope.firstName + $scope.lastName;
	}
});

app.controller('namesCtrl', function($scope){
	$scope.names = [
		{name:'Jani',country:'Norway'},
		{name:'Hege',country:'Sweden'},
		{name:'Kai',country:'Denmark'}
	];
});

app.controller('costCtrl', function($scope){
	$scope.quantity = 5;
	$scope.cost = 2;
});

app.controller('customCtrl', function($scope, $http){
	$http.get('http://192.168.10.164/interface/custom_JSON.php').success(function(res){
		$scope.names = res.records;
	});
	$scope.myVar = false;
	$scope.toggle = function(){
		return $scope.myVar = !$scope.myVar;
	}
});

app.controller('eventCtrl', function($scope){
	
});

app.controller('formCtrl', function($scope){
	$scope.master = {firstName: "ocean", lastName: "deng"};
	$scope.reset = function(){
		return $scope.user = angular.copy($scope.master);
	}
	$scope.reset();
});

app.controller('validateCtrl', function($scope) {
    $scope.user = 'John Doe';
    $scope.email = 'john.doe@gmail.com';
});