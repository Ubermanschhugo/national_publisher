classicsSg

.factory('authenticationService', function($http, $rootScope, $q){
	return {
		signup: function(email, displayedname, password) {
			var deferred = $q.defer();
			return $http.post('/api/signup', {email:email, displayedname: displayedname, password: password}).then(function(response) {
				deferred.resolve(response);
				$rootScope.$broadcast('loggedIn', response.data.username);
				return deferred.promise;
			}, function(response) {
				deferred.reject(response);
				return deferred.promise;
			});
		},

		login: function(email, password) {
			var deferred = $q.defer();
			return $http.post('/api/login', {email:email, password:password}).then(function(response) {
				deferred.resolve(response);
				$rootScope.$broadcast('loggedIn', response.data.username);
				return deferred.promise;
			}, function(response) {
				deferred.reject(response);
				return deferred.promise;
			});
		},

		signout: function() {
			var deferred = $q.defer();
			return $http.post('/api/signout', {}).then(function(response){
				deferred.resolve(response);
				$rootScope.$broadcast('loggedOut', response.data.username);
				return deferred.promise;
			}, function(response) {
				deferred.reject(response);
				return deferred.promise;
			});
		}

	}
})

.factory('$swal', function() {
	return sweetAlert;
})