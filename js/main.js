document.addEventListener('DOMContentLoaded', function () {
  const images = document.getElementsByClassName("image");
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  const closeButton = document.getElementsByClassName("close")[0];

  let modalOpen = false;

  function openModal(imageSrc, altText) {
      modal.style.display = "block";
      modalImg.src = imageSrc;
      captionText.innerHTML = altText;
      document.body.style.overflow = "hidden";
      modalOpen = true;
  }

  function closeModal() {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      modalOpen = false;
  }

  function clickListener(event) {
      if (!modalOpen) {
          openModal(this.src, this.alt);
          event.stopPropagation(); // Prevent the event from bubbling up to window
      }
  }

  for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("click", clickListener);
  }

  closeButton.onclick = function(event) {
      closeModal();
      event.stopPropagation(); // Prevent the event from bubbling up to window
  };

  window.onclick = function(event) {
      if (modalOpen && event.target === modal) {
          closeModal();
      }
  };

  // Touch event listeners for closing the modal
  window.addEventListener("touchstart", function(event) {
      if (modalOpen && event.target === modal) {
          closeModal();
      }
  });

  // Touch event listeners for image click
  for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("touchstart", function(event) {
          if (!modalOpen) {
              openModal(this.src, this.alt);
              event.preventDefault(); // Prevent default touch behavior
          }
      });
  }
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
    threshold: 0.5
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

  // Function to toggle the menu visibility
  function toggleMenu() {
      if (mobileMenu.classList.contains('menu-visible')) {
          navbar.classList.remove('navbar-hidden');
          mobileMenu.classList.remove('menu-visible');
          menuIcon.classList.remove('open');
      } else {
          navbar.classList.add('navbar-hidden');
          mobileMenu.classList.add('menu-visible');
          menuIcon.classList.add('open');
          animateMobileNavLinks();
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

  // Initial background update when page loads
  updateNavbarBackground(window.pageYOffset || document.documentElement.scrollTop);

  // Add event listeners
  window.addEventListener('scroll', function () {
      requestAnimationFrame(handleNavbarScroll);
  });

  menuIcon.addEventListener('click', toggleMenu);
  closeIcon.addEventListener('click', toggleMenu);
});






document.addEventListener('DOMContentLoaded', function() {
  var map = L.map('map').setView([29.695161, -95.901054], 13);  // Center the map on the specific location

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add a marker for the specific location
  L.marker([29.695161, -95.901054]).addTo(map)
      .bindPopup('<b>8050 FM359, Fulshear, TX 77441</b>').openPopup();

  // Try to get user's location and display it on the map
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
      });
  } else {
      console.log('Geolocation is not supported by your browser.');
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
      window.location.href = 'https://www.google.com/maps/search/?api=1&query=La+Balance+Cafe+Mexicana&query_place_id=ChIJB7cmMJHHRoYR9SqAUGKXfw4';
  }
  // For other devices or browsers, provide a fallback link
  else {
      window.location.href = 'https://www.google.com/maps/search/?api=1&query=La+Balance+Cafe+Mexicana&query_place_id=ChIJB7cmMJHHRoYR9SqAUGKXfw4';
  }
});





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