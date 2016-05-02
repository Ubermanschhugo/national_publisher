/**************************************************/
/**************************************************/
/* File name: directives.js
/* Description: Includes directives that are transported from jQuery plugins and functions
/**************************************************/
/**************************************************/

classicsSg.directive("ngScopeElement", function () {
  var directiveDefinitionObject = {

    restrict: "A",

    compile: function compile(tElement, tAttrs, transclude) {
      return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            scope[iAttrs.ngScopeElement] = iElement;
          }
        };
    }
  };

  return directiveDefinitionObject;
})

.directive('revolutionSlider', function(){
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		template: 	`<div class="tp-banner-container">` +
						"<div class='tp-banner' ng-scope-element='_revolutionSliderContainer'>" +
							"<ul ng-transclude>" +
							"</ul>" + 
						"</div>" +
					`</div>`,
		link: function(scope, element, attrs){
			scope._revolutionSliderContainer.revolution(
	            {
	                delay:9000,
	                startwidth:1170,
	                startheight:500,
	                hideThumbs:10,
					navigationStyle:"preview4"
	            });
		}
	}
})

/**************************************************/
/**************************************************/
/* owl-carousel directive
/* attributes available: count= *number of items shown per page*, controls 
/**************************************************/
/**************************************************/
.directive('owlCarousel', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: 	`<div class="illustration-v2">`		+
						`<ul class="list-inline owl-slider" ng-transclude ng-scope-element="_owlCarouselContainer">`		+
						"</ul>"+
					`</div>`,
		link: function(scope, tElement, attrs){
			var html = `<div class="customNavigation margin-bottom-25">`	+
							`<a class="owl-btn prev rounded-x" ng-scope-element="_prevButton"><i class="fa fa-angle-left"></i></a>`	+
							`<a class="owl-btn next rounded-x" ng-scope-element="_nextButton"><i class="fa fa-angle-right"></i></a>`	+
						`</div>`;
			if(attrs.controls != undefined) {
				tElement.prepend($(html));
				angular.element('.prev').click(function(){
	                element.trigger('owl.prev');
	            });
	            angular.element('.next').click(function(){
	                element.trigger('owl.next');
	            });
			}

			var element = scope._owlCarouselContainer;
			element.owlCarousel({
		            	items: [attrs.count],
		                itemsDesktop : [1000,3], //3 items between 1000px and 901px
		                itemsDesktopSmall : [979,2], //2 items between 901px
		                itemsTablet: [600,1], //1 items between 600 and 0;
		                slideSpeed: 1000
		            });
			// Custom Navigation Events
			
            
		}
	}
})

/**************************************************/
/**************************************************/
/* owl-carousel-v2: without controls but with page indicator + auto-scroll 
/* parameters: count: *number*
/**************************************************/
/**************************************************/
.directive('owlSliderV2', function(){
	return {
		restrict: 'C',
		replace:false,
		transclude: false,
		link: function(scope, iElem, attrs){
			iElem.owlCarousel({
	                items:attrs.count,
	                itemsDesktop : [1000,4], //4 items between 1000px and 901px
		            itemsDesktopSmall : [979,3], //3 items between 901px
	                itemsTablet: [600,2], //2 items between 600 and 0;
	            });
		}
	}
})

/**************************************************/
/**************************************************/
/* twitter-carousel 
/* parameters available: title: *text*
/**************************************************/
/**************************************************/
.directive('twitterCarousel', function(){
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		template: 	`<div class="parallax-bg margin-bottom-60 twitter-block">`	+
					 `<div class="container">`	+
					  `<div class="heading heading-v1 margin-bottom-20" id='twitterHeading'>` +
					  `</div>` + 
					  `<div id="carousel-example-generic-v5" class="carousel slide" data-ride="carousel">` +
					   `<div class="carousel-inner" ng-transclude>` +
					   `</div>` +
					  `</div>` + 
					 `</div>`  +
					`</div>`,
		link: function(scope, iElem, attrs) {
			angular.element('.parallax-bg').parallax("50%", 0.2);
			var html = `<ol class="carousel-indicators">` +
					 	`<li class="active rounded-x" data-target="#carousel-example-generic-v5" data-slide-to="0"></li>`;
			var i = 1;
			for(i=1; i<attrs.count; i++){
				html += `<li class="rounded-x" data-target="#carousel-example-generic-v5" data-slide-to="` + String(i) + `"></li>`;
			}
			angular.element('#carousel-example-generic-v5').prepend($(html));

			html = `<div class="carousel-arrow">` +
					    `<a class="left carousel-control" href="#carousel-example-generic-v5" data-slide="prev"><i class="fa fa-angle-left"></i></a>` + 
					    `<a class="right carousel-control" href="#carousel-example-generic-v5" data-slide="next"><i class="fa fa-angle-right"></i></a>` +
					   `</div>`;
			angular.element('#carousel-example-generic-v5').append($(html));

			if(attrs.title != undefined){
				html = "<h2>" + attrs.title + "</h2>";
				angular.element('#twitterHeading').append($(html));
			}

			angular.element('.carousel').carousel({
	            interval: 15000,
	            pause: 'hover'
	        });
		}
	}
})

/**************************************************/
/**************************************************/
/* parallax: cannot be used within other directive definitions
/* parameter available: parallax-style = *text*
/**************************************************/
/**************************************************/
.directive('parallax', function(){
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		template: `<div class="parallax-bg" ng-transclude> </div>`,
		link: function(scope, iElem, attrs){
			iElem.addClass(attrs.parallaxStyle);
			iElem.parallax("50%", 0.2);
		}
	}
})

.directive('skyForm', function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: `<form class="log-reg-block sky-form" ng-transclude>` + `</form>`,
		link: function(scope, iElem, attrs) {
			if(attrs.type === 'login') {
				iElem.validate({
		            // Rules for form validation
		            rules:
		            {
		                email:
		                {
		                    required: true,
		                    email: true
		                },
		                password:
		                {
		                    required: true,
		                    minlength: 3,
		                    maxlength: 20
		                }
		            },
		                                
		            // Messages for form validation
		            messages:
		            {
		                email:
		                {
		                    required: 'Please enter your email address',
		                    email: 'Please enter a VALID email address'
		                },
		                password:
		                {
		                    required: 'Please enter your password'
		                }
		            },                  
		            
		            // Do not change code below
		            errorPlacement: function(error, element)
		            {
		                error.insertAfter(element.parent());
		            }
		        });
			}
			if(attrs.type === 'signup') {
				iElem.validate({                   
		            // Rules for form validation
		            rules:
		            {
		                email:
		                {
		                    required: true,
		                    email: true
		                },
		                password:
		                {
		                    required: true,
		                    minlength: 3,
		                    maxlength: 128
		                },
		                terms:
		                {
		                    required: true
		                }
		            },
		            
		            // Messages for form validation
		            messages:
		            {
		                email:
		                {
		                    required: 'Please enter your email address',
		                    email: 'Please enter a VALID email address'
		                },
		                password:
		                {
		                    required: 'Please enter your password'
		                },
		                terms:
		                {
		                    required: 'You must agree with our Terms and Conditions'
		                }
		            },                  
		            
		            // Do not change code below
		            errorPlacement: function(error, element)
		            {
		                error.insertAfter(element.parent());
		            }
		        });
			}
			if(attrs.type === 'cart') {
				iElem.addClass('shopping-cart');
				iElem.validate({
                    errorPlacement: function errorPlacement(error, element) { element.before(error); },
                    rules: {
                        confirm: {
                            equalTo: "#password"
                        }
                    }
                });
			}
			scope.formElement = iElem;
		}
	}
})

.directive('stepWizard', function() {
	return {
		restrict: "E",
		replace: true,
		transclude: true,
		template: "<div ng-transclude></div>",
		link: function(scope, iElem, attrs) {
			var form = angular.element('#_cartForm');console.log(form);
			iElem.steps({
                headerTag: "step-header",
                bodyTag: "step-body",
                transitionEffect: "fade",
                onStepChanging: function (event, currentIndex, newIndex) {
                    // Allways allow previous action even if the current form is not valid!
                    if (currentIndex > newIndex)
                    {
                        return true;
                    }
                    form.validate().settings.ignore = ":disabled,:hidden";
                    return form.valid();
                },
                onFinishing: function (event, currentIndex) {
                    form.validate().settings.ignore = ":disabled";
                    return form.valid();
                },
                onFinished: function (event, currentIndex) {
                    alert("Submitted!");
                }
            });
		}
	}
})

.directive('headerSearchBar', function(){
	return {
		restrict: "E",
		replace: true,
		transclude: false,
		template: 	`<div class="search-open">
						<div class="container">
							<input type="text" class="form-control" placeholder="Search">
							<div class="search-close"><i class="icon-close"></i></div>
						</div>
					</div>`,
		link: function(scope, iElem, attrs) {
			angular.element('.search-button').click(function () {
	            angular.element('.search-open').slideDown();
	        });

	        angular.element('.search-close').click(function () {
	            angular.element('.search-open').slideUp();
	        });

	        angular.element(window).scroll(function(){
	          if(angular.element(this).scrollTop() > 1) angular.element('.search-open').fadeOut('fast');
	        });
		}
	}
})

.directive('masterSlider', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: `<div class="master-slider ms-skin-default" id="masterslider" ng-transclude></div>`,
		link: function(scope, iElem, attrs){
			var slider = new MasterSlider();
		     
		    if(attrs.controls != undefined) {
			    slider.control('arrows');  
			    slider.control('thumblist' , {autohide:false ,dir:'h',arrows:false, align:'bottom', width:180, height:170, margin:5, space:5});
		    }

		    slider.setup('masterslider' , {
		        width:550,
		        height:550,
		        space:5,
		        view:'fade'
		    });
		}

	}
})