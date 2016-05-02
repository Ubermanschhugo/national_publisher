classicsSg

.controller('headerController', function($scope, $rootScope, authenticationService){
	$scope.loggedIn = false;
	$rootScope.$on('loggedIn', function(event, username) {
		$scope.loggedIn = true;
		$scope.username = username;
	});
	$rootScope.$on('loggedOut', function() {
		$scope.loggedIn = false;
		$scope.username = undefined;
        if (!$scope.$$phase) $scope.$apply();
	});
	$scope.signout = function() {
		authenticationService.signout();
	}
})

.controller('mainController',function($scope){
	
})

.controller("homeController",function($scope){

})

.controller('loginController', function($scope, authenticationService, $rootScope, $location, $swal){
	$scope.submit = function(email, password) {
		if($rootScope.config.debug) console.log(email, password);
		if($scope.formElement.valid()) {
			authenticationService.login(email, password).then(function(response){
				if($rootScope.config.debug) console.log(response);
				$location.url('/home');
			}, function(response) {
				if($rootScope.config.debug) console.log(response);
				switch(response.status) {
					case 401: {
						$swal({
							title: "Ooops!",
							text: "The login credentials are a bit off. Please try again!",
							type: 'error'
						});
						break;
					}
				}
			});
		}
	}
})

.controller('signupController', function($scope, authenticationService, $rootScope, $swal, $location){
	$scope.submit = function(email, displayedname, password, terms) {
		if($scope.formElement.valid()) {
			authenticationService.signup(email, displayedname, password).then(function(response){
				if($rootScope.config.debug) console.log(response);
				$location.url('/home');
			}, function(response) {
				if($rootScope.config.debug) console.log(response);
				switch(response.status) {
					case 401: {
						$swal({
							title: "Ooops!",
							text: "The email address is already registered. Please use a different address to sign up or sign in using the given email address.",
							type: 'error'
						});
						break;
					}
				}
			});
		}
		
	}
})

.controller('cartController', function($scope){
	
})

.controller('productController', function($scope){
	
})