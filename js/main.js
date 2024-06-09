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
  // Initialize the map with a specific location and zoom level
  var map = L.map('map').setView([40.7128, -74.0060], 13); // Coordinates for New York City

  // Add the OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add a marker to the map for the specific location
  var marker = L.marker([40.7128, -74.0060]).addTo(map); // Coordinates for New York City
  marker.bindPopup("<b>Hello!</b><br>This is the specific location.").openPopup(); // Add a popup to the marker
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