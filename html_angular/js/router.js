classicsSg.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "views/home.html",
      controller: "homeController"
    })
    .state('login',{
    	url:"/login",
    	templateUrl:"views/login.html",
    	controller: "loginController"
    })
    .state('signup',{
    	url:"/signup",
    	templateUrl:"views/signup.html",
    	controller: "signupController"
    })
    .state('cart',{
    	url:"/cart",
    	templateUrl:"views/cart.html",
    	controller: "cartController"
    })
    .state('product',{
    	url:"/product/:id",
    	templateUrl:"views/product.html",
    	controller: "productController"
    })
        
    

});