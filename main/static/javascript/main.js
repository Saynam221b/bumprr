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
  document.getElementById("contactForm").addEventListener("submit", function (event) {
	event.preventDefault(); // Prevent default form submission
  
	// Collect form data
	let formData = new FormData(this);
	
	// Send AJAX POST request to the server
	fetch("{% url 'contact' %}", {
	  method: "POST",
	  body: formData,
	  headers: {
		"X-CSRFToken": "{{ csrf_token }}"
	  }
	})
	.then(response => response.json())
	.then(data => {
	  if (data.success) {
		// Show the success message and play the animation
		document.getElementById("resultMessage").style.display = "block";
		playSendAnimation();
	  } else {
		alert("An error occurred. Please try again.");
	  }
	})
	.catch(error => {
	  console.error("Error:", error);
	  alert("An error occurred. Please try again later.");
	});
  });
  
  function playSendAnimation() {
	const button = document.getElementById("sendLetter");
	button.classList.add("sending-animation"); // Add class to start the animation
  }
  



// reservation


// Function to toggle the dropdown visibility
function toggleDropdown() {
	const dropdownOptions = document.getElementById("dropdownOptions");
	dropdownOptions.classList.toggle("open");
}

// Function to handle service selection
function selectOption(service, amount) {
	const serviceDescriptions = {
		'Denting': 'Smooth out those dents and dings!',
		'Painting': 'Bring your car\'s color back to life!',
		'Daily Washing': 'Keep your car sparkling clean!',
		'PPF': 'Shield your car with Paint Protection Film!',
		'Detailing & Paint Correction': 'Restore your car’s true shine!',
		'Interior Cleaning': 'Deep clean for a brand new feel!',
		'Ceramic and Graphene Coating': 'Unmatched durability and gloss!',
		'Insurance': 'Peace of mind on the road!',
		'Insurance Claim Assistance': 'Simplifying your claim process!',
	};

	document.getElementById("selectedService").textContent = service + " - " + serviceDescriptions[service];
	document.getElementById("service").value = service.toLowerCase().replace(" ", "-");
	document.getElementById("amount").value = amount; // Set the amount for payment
	toggleDropdown(); // Close dropdown after selecting
}

// Close the dropdown if clicking outside of it
document.addEventListener("click", function (event) {
	const dropdown = document.querySelector(".dropdown-container");
	const dropdownOptions = document.getElementById("dropdownOptions");
	if (!dropdown.contains(event.target)) {
		dropdownOptions.classList.remove("open");
	}
});

// Handle the form submission
document.querySelector('.styled-form').addEventListener('submit', function (e) {
	e.preventDefault(); // Prevent the default form submission

	const amount = document.getElementById('amount').value;
	const options = {
		key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
		amount: amount * 100, // Convert to paisa
		currency: "INR", // Currency code
		name: "BUMPRR", // Your company name
		description: "Car Service Reservation",
		handler: function (response) {
			// Handle successful payment here
			console.log(response);
			alert("Payment successful! Payment ID: " + response.razorpay_payment_id);

			// Optionally, submit the form to your server for processing
			this.submit(); // Submit the form after successful payment
		}.bind(this),
		prefill: {
			name: document.getElementById('name').value,
			email: document.getElementById('email').value,
			contact: document.getElementById('phone').value,
		},
		notes: {
			service: document.getElementById('service').value
		},
		theme: {
			color: "#F37254" // Customize the theme color
		}
	};

	const rzp = new Razorpay(options);
	rzp.open(); // Open the Razorpay payment popup
});
