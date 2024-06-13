// Modal code
document.addEventListener('DOMContentLoaded', function () {
  const images = document.getElementsByClassName("image");
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  const closeButton = document.getElementsByClassName("close")[0];
  let modalOpen = false;
  let touchStartX = 0;
  let touchEndX = 0;

  function openModal(imageSrc, altText) {
    modal.style.display = "block";
    modalImg.src = imageSrc;
    captionText.innerHTML = altText;
    document.body.style.overflow = "hidden";
    modalOpen = true;
    navbarWrapper.classList.add('navbar-hidden'); // Hide navbar
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    modalOpen = false;
    navbarWrapper.classList.remove('navbar-hidden'); // Show navbar
  }

  function clickListener(event) {
    if (!modalOpen) {
      openModal(this.src, this.alt);
      event.stopPropagation(); // Prevent the event from bubbling up to window
    }
  }

  function touchStartListener(event) {
    touchStartX = event.touches[0].clientX;
  }

  function touchEndListener(event) {
    touchEndX = event.changedTouches[0].clientX;
    if (Math.abs(touchStartX - touchEndX) < 10 && !modalOpen && !isTouchedInsideImage(event.target)) {
      openModal(this.src, this.alt);
      event.preventDefault(); // Prevent default touch behavior
    }
  }
  
  function isTouchedInsideImage(target) {
    // Check if the touched element or any of its ancestors is an image
    return target.tagName === 'IMG' || target.closest('img');
  }

  for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", clickListener);
    images[i].addEventListener("touchstart", touchStartListener);
    images[i].addEventListener("touchend", touchEndListener);
  }

  closeButton.onclick = function (event) {
    closeModal();
    event.stopPropagation(); // Prevent the event from bubbling up to window
  };

  window.onclick = function (event) {
    if (modalOpen && event.target === modal && !isTouchedInsideImage(event.target)) {
      closeModal();
    }
  };
});





// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in, .fade, .fading');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);  // Stop observing once the element is visible
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(element => {
    observer.observe(element);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const whiteShape = entry.target.querySelector('.white-shape');
        whiteShape.style.animationPlayState = 'running'; // Start the reveal animation
        observer.unobserve(entry.target); // Stop observing once the animation is triggered
      }
    });
  }, {
    threshold: 0.3
  });

  const elements = document.querySelectorAll('.section');
  elements.forEach(element => {
    observer.observe(element);
  });
});


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------




document.addEventListener('DOMContentLoaded', function () {
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.mobile-menu .menu-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  let lastScrollTop = 0;
  const navbarHeight = navbar.offsetHeight;
  let isMenuOpen = false; // Variable to track menu state

  // Function to toggle the menu visibility
  function toggleMenu() {
    isMenuOpen = !isMenuOpen; // Toggle menu state
    if (isMenuOpen) {
      navbar.classList.add('navbar-hidden');
      mobileMenu.classList.add('menu-visible');
      menuIcon.classList.add('open');
      animateMobileNavLinks();
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
      // Add touch event listeners to prevent swiping
      document.addEventListener('touchstart', handleTouchStart, false);
      document.addEventListener('touchmove', handleTouchMove, false);
    } else {
      navbar.classList.remove('navbar-hidden');
      mobileMenu.classList.remove('menu-visible');
      menuIcon.classList.remove('open');
      // Restore scrolling when menu is closed
      document.body.style.overflow = '';
      // Remove touch event listeners when menu is closed
      document.removeEventListener('touchstart', handleTouchStart, false);
      document.removeEventListener('touchmove', handleTouchMove, false);
    }
  }


  // Function to animate mobile nav links
  function animateMobileNavLinks() {
    mobileNavLinks.forEach((link, index) => {
      link.style.animationDelay = `${0.1 * index}s`;
      link.classList.toggle('slide-in');
    });
  }

  // Function to update the navbar background based on scroll position
  function updateNavbarBackground(currentScroll) {
    if (currentScroll <= 0) {
      navbarWrapper.style.backgroundColor = 'rgba(28, 28, 28, 0)';
      navbar.style.backgroundColor = 'rgba(28, 28, 28, 0)';
    } else {
      navbarWrapper.style.backgroundColor = 'rgba(28, 28, 28, 1)';
      navbar.style.backgroundColor = 'rgba(28, 28, 28, 1)';
    }
  }

  // Function to handle navbar scroll effects
  function handleNavbarScroll() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let scrollDirection = currentScroll > lastScrollTop ? 'down' : 'up';

    if (scrollDirection === 'down' && mobileMenu.classList.contains('menu-visible')) {
      toggleMenu();
    }

    if (scrollDirection === 'down' && currentScroll > navbarHeight * 2) {
      navbarWrapper.classList.add('hidden');
    } else {
      navbarWrapper.classList.remove('hidden');
    }

    updateNavbarBackground(currentScroll);

    if (scrollDirection === 'up' && currentScroll > 50) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

    // Function to handle touch start event
  let xStart = null;
  function handleTouchStart(event) {
    xStart = event.touches[0].clientX;
  }

  // Function to handle touch move event
  function handleTouchMove(event) {
    if (!xStart) {
      return;
    }
    let xEnd = event.touches[0].clientX;
    let xDiff = xStart - xEnd;
    if (Math.abs(xDiff) > 50) { // Adjust the threshold as needed
      event.preventDefault(); // Prevent default swipe action
    }
  }

  // Initial background update when page loads
  updateNavbarBackground(window.pageYOffset || document.documentElement.scrollTop);

  // Add event listeners
  window.addEventListener('scroll', function () {
    requestAnimationFrame(handleNavbarScroll);
  });

  menuIcon.addEventListener('click', toggleMenu);
  closeIcon.addEventListener('click', toggleMenu);

  // Prevent navbar from closing when using scroll wheel
  navbar.addEventListener('wheel', function(event) {
    event.stopPropagation();
  });

  // Prevent navbar from closing when swiping
  mobileMenu.addEventListener('touchmove', function(event) {
    event.stopPropagation();
  });
});




document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.item');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let intervalId; // To store the interval ID

  // Function to move to the next slide
  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateRadioButtons();
  };

  // Function to update the active radio button
  const updateRadioButtons = () => {
    const radios = document.querySelectorAll('.radio-button');
    radios.forEach((radio, index) => {
      radio.checked = index === currentIndex;
      if (index === currentIndex) {
        slides[index].classList.remove('inactive');
      } else {
        slides[index].classList.add('inactive');
      }
    });
  };

  // Function to start the auto slide interval
  const startAutoSlide = () => {
    intervalId = setInterval(nextSlide, 5000);
  };

  // Function to stop and restart the auto slide interval
  const restartAutoSlide = () => {
    clearInterval(intervalId); // Clear the existing interval
    setTimeout(startAutoSlide, 10000); // Restart after 6 seconds
  };

  // Auto slide to the next item every 2 seconds
  startAutoSlide();

  // Previous and next button functionality
  document.querySelector('.prev-arrow').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateRadioButtons();
    restartAutoSlide(); // Restart auto slide after user interaction
  });

  document.querySelector('.next-arrow').addEventListener('click', () => {
    nextSlide();
    restartAutoSlide(); // Restart auto slide after user interaction
  });

  // Radio button functionality
  const radioButtons = document.querySelectorAll('.radio-button');
  radioButtons.forEach(radioButton => {
    radioButton.addEventListener('click', () => {
      currentIndex = Array.from(radioButtons).indexOf(radioButton);
      updateRadioButtons();
      restartAutoSlide(); // Restart auto slide after user interaction
    });
  });
});





// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------


document.addEventListener('DOMContentLoaded', function() {
  var map = L.map('map').setView([29.695161, -95.901054], 13);  // Center the map on the specific location

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add a marker for the specific location
  L.marker([29.695161, -95.901054]).addTo(map)
      .bindPopup("<b>Welcome!</b><br>Our One and Only Location").openPopup();

  // Check if the location has already been requested in this session
  var locationRequested = sessionStorage.getItem('locationRequested');

  // If the location has not been requested, prompt the user for their location
  if (!locationRequested) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLat = position.coords.latitude;
        var userLng = position.coords.longitude;

        // Define a custom icon for the user's location marker
        var customIcon = L.divIcon({
          className: 'custom-icon',
          html: '<div class="outer-circle"></div><div class="inner-circle"></div><div class="directional-arrow"></div>'
        });

        // Add a marker for the user's location
        L.marker([userLat, userLng], { icon: customIcon }).addTo(map)
          .bindPopup('<b>Your Location</b>').openPopup();

        // Store the user's location in sessionStorage
        sessionStorage.setItem('userLat', userLat);
        sessionStorage.setItem('userLng', userLng);
      });

      // Set the flag to indicate that the location has been requested
      sessionStorage.setItem('locationRequested', 'true');
    } else {
      console.log('Geolocation is not supported by your browser.');
    }
  } else {
    // If the location has already been requested, retrieve the user's location from sessionStorage
    var userLat = sessionStorage.getItem('userLat');
    var userLng = sessionStorage.getItem('userLng');

    if (userLat && userLng) {
      // Define a custom icon for the user's location marker
      var customIcon = L.divIcon({
        className: 'custom-icon',
        html: '<div class="outer-circle"></div><div class="inner-circle"></div><div class="directional-arrow"></div>'
      });

      // Add a marker for the user's location
      L.marker([userLat, userLng], { icon: customIcon }).addTo(map)
        .bindPopup('<b>Your Location</b>').openPopup();
    }
  }
});

document.getElementById('open-maps-link').addEventListener('click', function(event) {
  event.preventDefault();
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // If it's an iOS device, open Apple Maps
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href = 'https://maps.apple.com/?q=La+Balance+Cafe+Mexicana&ll=29.695161,-95.901054';
  }
  // If it's an Android device, open Google Maps
  else if (/android/i.test(userAgent)) {
      window.location.href = 'https://www.google.com/maps/place/La+Balance+Cafe+Mexicana/@29.6952214,-95.9017876,19z/data=!4m6!3m5!1s0x86413d2d01655555:0x7c34a56f8e44bc9b!8m2!3d29.6952223!4d-95.9010979!16s%2Fg%2F1pp2wyd8n?entry=ttu';
  }
  // For other devices or browsers, provide a fallback link
  else {
      window.location.href = 'https://www.google.com/maps/place/La+Balance+Cafe+Mexicana/@29.6952214,-95.9017876,19z/data=!4m6!3m5!1s0x86413d2d01655555:0x7c34a56f8e44bc9b!8m2!3d29.6952223!4d-95.9010979!16s%2Fg%2F1pp2wyd8n?entry=ttu';
  }
});



// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

// script.js

document.addEventListener("DOMContentLoaded", () => {
  const menuFilter = document.getElementById("menuFilter");

  menuFilter.addEventListener("change", filterMenu);
  filterMenu(); // Initially filter the menu
});

function filterMenu() {
  const category = document.getElementById("menuFilter").value;
  const menuSections = document.querySelectorAll(".menu-section");

  menuSections.forEach(section => {
      const sectionCategory = section.classList[1];
      if (category === "all" || sectionCategory === category) {
          section.style.display = "block";
          if (category === "all") {
              section.querySelector("h2").style.display = "block";
          } else {
              section.querySelector("h2").style.display = "none";
          }
      } else {
          section.style.display = "none";
      }

      const menuItems = section.querySelectorAll(".menu-item");
      menuItems.forEach(item => {
          const itemCategory = item.classList[1];
          if (category === "all" || itemCategory === category) {
              item.style.display = "block";
          } else {
              item.style.display = "none";
          }
      });
  });
}


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------




// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------


if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('js/service-worker.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

