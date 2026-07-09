/* Stackly Global JS - Common Elements & Library Initializations */

$(document).ready(function() {
  // 0. Inject Preloader Logo Image
  const loaderLogo = $('.loader-logo');
  if (loaderLogo.length && !loaderLogo.find('img').length) {
    loaderLogo.prepend('<img src="assets/logo.webp" alt="Stackly Logo" class="logo-img" style="height: 50px;">');
  }

  // 1. Injects Header and Footer
  injectHeaderFooter();

  // 2. Hide Preloader
  $(window).on('load', function() {
    fadePreloader();
  });
  // Fallback for preloader
  setTimeout(fadePreloader, 1500);

  // 3. Initialize Animations & UI Plugins Safely
  initAOS();
  initGSAP();
  initJarallax();
  initCarouselsAndSliders();
  initIsotope();
  initMagnificPopup();
  initTextEffects();
  initFormsAndValidation();
  initDateTimePickers();
  initNoUiSlider();
  initCountdown();

  // Scroll effect on Header navbar
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $('.navbar-stackly').addClass('scrolled');
    } else {
      $('.navbar-stackly').removeClass('scrolled');
    }
  });
});

function fadePreloader() {
  const loader = $('#preloader');
  if (loader.length) {
    loader.css({ opacity: 0, visibility: 'hidden' });
    setTimeout(function() {
      loader.remove();
    }, 600);
  }
}

function injectHeaderFooter() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Header injection
  const headerContainer = $('#header-container');
  if (headerContainer.length) {
    const isLoginActive = currentPath === 'login.html';
    const isSignupActive = currentPath === 'signup.html';
    const isHomeActive = currentPath === 'index.html' || currentPath === '';
    const isToursActive = currentPath === 'tours.html';
    const isAboutActive = currentPath === 'about.html';
    const isBlogActive = currentPath === 'blog.html';
    const isContactActive = currentPath === 'contact.html';

    headerContainer.html(`
      <nav class="navbar navbar-expand-lg navbar-dark navbar-stackly fixed-top animate__animated animate__fadeInDown">
        <div class="container">
          <a class="navbar-brand navbar-brand-stackly" href="index.html">
            <img src="assets/logo.webp" alt="Stackly Logo" class="logo-img">STACKLY<span>.</span>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto align-items-lg-center">
              <li class="nav-item"><a class="nav-link nav-link-stackly ${isHomeActive ? 'active' : ''}" href="index.html" id="nav-home">Home</a></li>
              <li class="nav-item"><a class="nav-link nav-link-stackly ${isToursActive ? 'active' : ''}" href="tours.html" id="nav-tours">Tours</a></li>
              <li class="nav-item"><a class="nav-link nav-link-stackly ${isAboutActive ? 'active' : ''}" href="about.html" id="nav-about">About Us</a></li>
              <li class="nav-item"><a class="nav-link nav-link-stackly ${isBlogActive ? 'active' : ''}" href="blog.html" id="nav-blog">Blog</a></li>
              <li class="nav-item"><a class="nav-link nav-link-stackly ${isContactActive ? 'active' : ''}" href="contact.html" id="nav-contact">Contact</a></li>
              <li class="nav-item"><a class="nav-btn-login ${isLoginActive ? 'active' : ''}" href="login.html" id="nav-login"><i class="fas fa-sign-in-alt me-1"></i> Login</a></li>
              <li class="nav-item"><a class="nav-btn-signup ${isSignupActive ? 'active' : ''}" href="signup.html" id="nav-signup"><i class="fas fa-user-plus me-1"></i> Sign Up</a></li>
            </ul>
          </div>
        </div>
      </nav>
    `);
  }

  // Footer injection
  const footerContainer = $('#footer-container');
  if (footerContainer.length) {
    footerContainer.html(`
      <footer class="footer-stackly">
        <div class="container">
          <div class="row gy-5">
            <div class="col-lg-4 col-md-6">
              <a class="footer-logo" href="index.html">
                <img src="assets/logo.webp" alt="Stackly Logo" class="logo-img" style="height: 35px;">STACKLY<span>.</span>
              </a>
              <p class="mt-3 text-secondary">Premium curated Indian travel experiences across the subcontinent. Travel beyond limits with custom planned itineraries.</p>
              <div class="social-links mt-4">
                <a href="404.html" class="me-3 text-secondary"><i class="fab fa-facebook-f"></i></a>
                <a href="404.html" class="me-3 text-secondary"><i class="fab fa-instagram"></i></a>
                <a href="404.html" class="me-3 text-secondary"><i class="fab fa-twitter"></i></a>
                <a href="404.html" class="me-3 text-secondary"><i class="fab fa-youtube"></i></a>
              </div>
            </div>
            <div class="col-lg-2 col-md-6">
              <h5 class="text-white mb-4">Navigations</h5>
              <ul class="footer-links-list">
                <li><a href="index.html">Home</a></li>
                <li><a href="tours.html">Tours</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="blog.html">Blog & Gallery</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div class="col-lg-2 col-md-6">
              <h5 class="text-white mb-4">Our Services</h5>
              <ul class="footer-links-list">
                <li><a href="404.html">Custom Booking</a></li>
                <li><a href="404.html">VIP Tour Guides</a></li>
                <li><a href="404.html">Flight Booking</a></li>
                <li><a href="404.html">Luxury Transfers</a></li>
                <li><a href="404.html">Hotel Booking</a></li>
              </ul>
            </div>
            <div class="col-lg-4 col-md-6">
              <h5 class="text-white mb-4">Subscribe Newsletter</h5>
              <p class="mb-4 text-secondary">Get the latest deals and destinations directly in your inbox.</p>
              <form class="newsletter-form-common" id="newsletterCommonForm" action="404.html" method="GET">
                <div class="input-group">
                  <input type="email" class="form-control bg-transparent border-secondary text-white" placeholder="Your Email Address" required name="email">
                  <button class="btn btn-stackly-primary" type="submit">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
          <div class="footer-bottom text-center">
            <p class="mb-0 text-muted">&copy; 2026 Stackly Travel. All Rights Reserved. </p>
          </div>
        </div>
      </footer>
    `);
  }
}

/* Safely Initialize Libraries */

function initAOS() {
  try {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  } catch (e) {
    console.warn("AOS load issue: ", e);
  }
}

function initGSAP() {
  try {
    if (typeof gsap !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Hero simple animations
      gsap.from(".hero-content .hero-title-large", {
        duration: 1.2,
        y: 80,
        opacity: 0,
        ease: "power4.out",
        stagger: 0.2
      });

      gsap.from(".hero-content .hero-description, .hero-content .hero-buttons", {
        duration: 1,
        y: 40,
        opacity: 0,
        ease: "power3.out",
        delay: 0.5
      });
    }
  } catch (e) {
    console.warn("GSAP load issue: ", e);
  }
}

function initJarallax() {
  try {
    if (typeof jarallax !== 'undefined') {
      $('.jarallax').jarallax({
        speed: 0.5
      });
    }
  } catch (e) {
    console.warn("Jarallax load issue: ", e);
  }
}

function initCarouselsAndSliders() {
  try {
    // Owl Carousel (for Destinations on Home)
    if ($.fn.owlCarousel) {
      $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 24,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          992: { items: 3 },
          1200: { items: 4 }
        }
      });
    }

    // Slick Slider (for testimonials)
    if ($.fn.slick) {
      $('.slick-slider-testimonials').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        cssEase: 'linear'
      });

      $('.slick-slider-partners').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          { breakpoint: 992, settings: { slidesToShow: 3 } },
          { breakpoint: 576, settings: { slidesToShow: 2 } }
        ]
      });
    }

    // Tiny Slider (alternate implementation for special offers on Tours page)
    if (typeof tns !== 'undefined' && $('.tiny-slider-container').length) {
      tns({
        container: '.tiny-slider-container',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        controls: false,
        nav: true,
        mouseDrag: true,
        responsive: {
          640: { items: 2 },
          900: { items: 3 }
        }
      });
    }
  } catch (e) {
    console.warn("Sliders load issue: ", e);
  }
}

function initIsotope() {
  try {
    if ($.fn.isotope && $('.isotope-grid').length) {
      const $grid = $('.isotope-grid').imagesLoaded(function() {
        $grid.isotope({
          itemSelector: '.isotope-item',
          layoutMode: 'masonry'
        });
      });

      // Filter items on button click
      $('.isotope-filters').on('click', 'button', function() {
        const filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
        $(this).addClass('active').siblings().removeClass('active');
      });
    }
  } catch (e) {
    console.warn("Isotope load issue: ", e);
  }
}

function initMagnificPopup() {
  try {
    if ($.fn.magnificPopup) {
      // Image gallery
      $('.magnific-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
          enabled: true
        },
        zoom: {
          enabled: true,
          duration: 300
        }
      });

      // Video Popups
      $('.magnific-video').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });
    }
  } catch (e) {
    console.warn("Magnific Popup load issue: ", e);
  }
}

function initTextEffects() {
  try {
    // Lettering.js
    if ($.fn.lettering) {
      $(".lettering-effect").lettering();
    }

    // CircleType
    if (typeof CircleType !== 'undefined' && $('#circletype-element').length) {
      new CircleType(document.getElementById('circletype-element')).radius(380);
    }
  } catch (e) {
    console.warn("Text effects load issue: ", e);
  }
}

function initFormsAndValidation() {
  try {
    // Form validation
    if ($.fn.validate) {
      // Set global validator defaults to place errors outside input-groups
      $.validator.setDefaults({
        errorPlacement: function(error, element) {
          if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
          } else {
            error.insertAfter(element);
          }
        }
      });

      // Contact Form Validation
      $('#contactForm').validate({
        rules: {
          name: "required",
          email: {
            required: true,
            email: true
          },
          subject: "required",
          message: {
            required: true,
            minlength: 10
          }
        },
        messages: {
          name: "Please enter your name",
          email: "Please enter a valid email address",
          subject: "Please enter a subject",
          message: "Please write a message containing at least 10 characters"
        },
        submitHandler: function(form) {
          alert("Thank you! Your inquiry has been submitted. Redirecting to summary...");
          window.location.href = "404.html";
        }
      });

      // Common Newsletter validation
      $('.newsletter-form-common, #newsletterHomeForm').each(function() {
        $(this).validate({
          submitHandler: function(form) {
            alert("Thank you for subscribing! Redirecting to confirmation page...");
            window.location.href = "404.html";
          }
        });
      });

      // Login/Signup Validation
      $('#loginForm').validate({
        rules: {
          email: { required: true, email: true },
          password: { required: true, minlength: 6 }
        },
        submitHandler: function(form) {
          // If credentials typed in manually, check if admin vs client and redirect
          const emailVal = $(form).find('input[name="email"]').val();
          
          // Extract name from email: e.g. "rajesh.sharma@gmail.com" -> "rajesh.sharma" -> "Rajesh Sharma"
          let username = emailVal.split('@')[0];
          username = username.replace(/[\._-]/g, ' '); // replace dots, underscores with space
          username = username.replace(/\b\w/g, c => c.toUpperCase()); // capitalize words

          localStorage.setItem('loggedInUser', username);
          localStorage.setItem('loggedInUserEmail', emailVal);

          if (emailVal.toLowerCase().includes('admin')) {
            alert("Admin Login Successful! Welcome " + username);
            window.location.href = "dashboard-admin.html";
          } else {
            alert("Client Login Successful! Welcome " + username);
            window.location.href = "dashboard-client.html";
          }
        }
      });

      $('#signupForm').validate({
        rules: {
          fullname: "required",
          email: { required: true, email: true },
          password: { required: true, minlength: 6 },
          confirm_password: {
            required: true,
            equalTo: "#password"
          },
          terms: "required"
        },
        messages: {
          fullname: "Please enter your full name",
          email: "Please enter a valid email address",
          password: "Password must be at least 6 characters long",
          confirm_password: {
            required: "Please confirm your password",
            equalTo: "Passwords do not match"
          },
          terms: "You must agree to our Terms of Service"
        },
        submitHandler: function(form) {
          alert("Registration successful! Redirecting to login portal...");
          window.location.href = "login.html";
        }
      });

      // Tours Search Form Validation
      $('#toursSearchForm').validate({
        rules: {
          date: "required"
        },
        messages: {
          date: "Please select a departure date"
        },
        submitHandler: function(form) {
          alert("Search successful! Redirecting to matches...");
          window.location.href = "404.html";
        }
      });

      // Callback Request Form Validation
      $('#callbackForm').validate({
        rules: {
          phone: "required",
          time: "required"
        },
        messages: {
          phone: "Please enter your mobile phone number",
          time: "Please enter your preferred callback time"
        },
        submitHandler: function(form) {
          alert("Callback request submitted! A travel coordinator will phone you back. Redirecting...");
          window.location.href = "404.html";
        }
      });

      // 404 Search Form Validation
      $('#search404Form').validate({
        rules: {
          query: "required"
        },
        messages: {
          query: "Please enter a search query"
        },
        submitHandler: function(form) {
          alert("Redirecting to tours search...");
          window.location.href = "tours.html";
        }
      });
    }
  } catch (e) {
    console.warn("Validation load issue: ", e);
  }
}

function initDateTimePickers() {
  try {
    if (typeof flatpickr !== 'undefined') {
      $('.flatpickr-date').flatpickr({
        enableTime: false,
        dateFormat: "Y-m-d"
      });

      $('.flatpickr-datetime').flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i"
      });
    }
  } catch (e) {
    console.warn("Flatpickr load issue: ", e);
  }
}

function initNoUiSlider() {
  try {
    const slider = document.getElementById('price-range-slider');
    if (slider && typeof noUiSlider !== 'undefined') {
      noUiSlider.create(slider, {
        start: [15000, 75000],
        connect: true,
        range: {
          'min': 5000,
          'max': 150000
        },
        format: wNumb({
          decimals: 0,
          prefix: '₹'
        })
      });

      const priceMin = document.getElementById('price-min');
      const priceMax = document.getElementById('price-max');

      slider.noUiSlider.on('update', function(values, handle) {
        if (handle === 0) {
          priceMin.innerText = values[0];
        } else {
          priceMax.innerText = values[1];
        }
      });
    }
  } catch (e) {
    console.warn("noUiSlider load issue: ", e);
  }
}

function initCountdown() {
  try {
    // Custom/jQuery countdown
    if ($.fn.countdown && $('#flash-deals-countdown').length) {
      // Set to 5 days from now
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 5);

      $('#flash-deals-countdown').countdown(targetDate, function(event) {
        $(this).html(event.strftime(
          '<div class="row text-center">' +
          '<div class="col-3"><div class="glass-card py-3"><span class="h2 text-gradient font-sans font-bold d-block">%D</span><small class="text-secondary text-uppercase tracking-wider">Days</small></div></div>' +
          '<div class="col-3"><div class="glass-card py-3"><span class="h2 text-gradient font-sans font-bold d-block">%H</span><small class="text-secondary text-uppercase tracking-wider">Hours</small></div></div>' +
          '<div class="col-3"><div class="glass-card py-3"><span class="h2 text-gradient font-sans font-bold d-block">%M</span><small class="text-secondary text-uppercase tracking-wider">Mins</small></div></div>' +
          '<div class="col-3"><div class="glass-card py-3"><span class="h2 text-gradient font-sans font-bold d-block">%S</span><small class="text-secondary text-uppercase tracking-wider">Secs</small></div></div>' +
          '</div>'
        ));
      });
    }
  } catch (e) {
    console.warn("Countdown load issue: ", e);
  }
}
