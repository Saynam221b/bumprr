(function ($) {
	"use strict";
	var wind = $(window);
	var parallaxSlider;
	var parallaxSliderOptions = {
		speed: 5000,
		autoplay: true,
		parallax: true,
		loop: true,
		on: {
			init: function () {
				var swiper = this;
				for (var i = 0; i < swiper.slides.length; i++) {
					$(swiper.slides[i]).find('.bg-img').attr({
						'data-swiper-parallax': 0.75
					});
				}
			},
			resize: function () {
				this.update();
			}
		},
		pagination: {
			el: '.slider-prlx .parallax-slider .swiper-pagination',
			dynamicBullets: true,
			clickable: true
		},
		navigation: {
			nextEl: '.slider-prlx .parallax-slider .next-ctrl',
			prevEl: '.slider-prlx .parallax-slider .prev-ctrl'
		}
	};
	parallaxSlider = new Swiper('.slider-prlx .parallax-slider', parallaxSliderOptions);
	// Var Background image
	var pageSection = $(".bg-img, section");
	pageSection.each(function (indx) {
		if ($(this).attr("data-background")) {
			$(this).css("background-image", "url(" + $(this).data("background") + ")");
		}
	});
	var nav = $('nav');
	var navHeight = nav.outerHeight();
	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	});

	// Navbar Menu Reduce 
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-lg').addClass('navbar-reduce');
			$('.navbar-expand-lg').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-lg').addClass('navbar-trans');
			$('.navbar-expand-lg').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});
	// Back to top button 
	$(function () {
		// Scroll Event
		$(window).on('scroll', function () {
			var scrolled = $(window).scrollTop();
			if (scrolled > 300) $('.back-to-top').addClass('active');
			if (scrolled < 300) $('.back-to-top').removeClass('active');
		});
		// Click Event
		$('.back-to-top').on('click', function () {
			$("html, body").animate({
				scrollTop: "0"
			}, 500);
		});
	});
	//  Star Scrolling nav
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 30)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});
	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});
	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	
	
	// Testimonials owl
	$('#testimonial-slide').owlCarousel({
		margin: 0,
		autoplay: true,
		autoplayTimeout: 4000,
		nav: false,
		smartSpeed: 800,
		dots: true,
		autoplayHoverPause: true,
		loop: true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 1
			},
			1000: {
				items: 1
			}
		}
	});

	
	$(window).on('load', function () {
		if ($(".wow").length) {
			var wow = new WOW({
				boxClass: 'wow', // Animated element css class (default is wow)
				animateClass: 'animated', // Animation css class (default is animated)
				offset: 30, // Distance to the element when triggering the animation (default is 0)
				mobile: false, // Trigger animations on mobile devices (default is true)
				live: true, // Act on asynchronously loaded content (default is true)
			});
			wow.init();
		}
	});
	// Preloader Area
	jQuery(window).on('load', function () {
	  jQuery('.preloader').delay(500).fadeOut('slow');
	});
	
})(jQuery);

// contact
 // Data structure for services, plans, and their costs
var servicePlans = {
	"service1": [
	  { name: "Basic Plan", cost: "100" },
	  { name: "Standard Plan", cost: "200" },
	  { name: "Premium Plan", cost: "300" }
	],
	"service2": [
	  { name: "Starter Plan", cost: "$15" },
	  { name: "Pro Plan", cost: "$25" },
	  { name: "Ultimate Plan", cost: "$35" }
	],
	"service3": [
	  { name: "Silver Plan", cost: "$12" },
	  { name: "Gold Plan", cost: "$22" },
	  { name: "Platinum Plan", cost: "$40" }
	]
  };
  
  window.onload = function() {
	var serviceSel = document.getElementById("service");
	var planSel = document.getElementById("plan");
	var planCost = document.getElementById("plan-cost");
  
	// When the service is selected, populate the plans dropdown
	serviceSel.onchange = function() {
	  // Clear the current plan options and cost
	  planSel.innerHTML = '<option value="" disabled selected>Select a plan</option>';
	  planCost.value = ''; // Clear the cost input
  
	  // Check if a service is selected
	  if (this.value) {
		var selectedService = this.value;
		if (servicePlans[selectedService]) {
		  var plans = servicePlans[selectedService];
		  for (var i = 0; i < plans.length; i++) {
			var option = document.createElement('option');
			option.value = plans[i].name; // Plan name
			option.textContent = plans[i].name; // Plan name
			planSel.appendChild(option);
		  }
		}
	  }
	};
  
	// When a plan is selected, display the corresponding cost
	planSel.onchange = function() {
	  var selectedPlan = this.value;
	  var selectedService = serviceSel.value;
	  
	  if (selectedService && selectedPlan) {
		var plans = servicePlans[selectedService];
		for (var i = 0; i < plans.length; i++) {
		  if (plans[i].name === selectedPlan) {
			planCost.value = plans[i].cost; // Display the cost for the selected plan
		  }
		}
	  }
	};
  };