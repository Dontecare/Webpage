document.addEventListener('DOMContentLoaded', function () {
  const images = document.getElementsByClassName("image");
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");
  const captionText = document.getElementById("caption");
  const closeButton = document.getElementsByClassName("close")[0];
  const navbar = document.querySelector('.navbar-wrapper');

  let modalOpen = false;

  function openModal(imageSrc, altText) {
      modal.style.display = "block";
      modalImg.src = imageSrc;
      captionText.innerHTML = altText;
      document.body.style.overflow = "hidden";
      navbar.classList.add('hidden');
      modalOpen = true;
  }

  function closeModal() {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      navbar.classList.remove('hidden');
      modalOpen = false;
  }

  function clickListener() {
      openModal(this.src, this.alt);
  }

  for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("click", clickListener);
  }

  closeButton.onclick = function() {
      closeModal();
  };

  window.onclick = function(event) {
      if (event.target === modal) {
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
  const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in, .fade');
  
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
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const navbar = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.mobile-menu .menu-icon'); // Close icon within the mobile menu
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Handle scroll event for changing navbar background and hiding/showing menu
  window.addEventListener('scroll', function () {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      let scrollDirection = currentScroll > lastScrollTop ? 'down' : 'up';

      if (scrollDirection === 'down' && mobileMenu.classList.contains('menu-visible')) {
          toggleMenu();
      }

      if (scrollDirection === 'up' && window.scrollY > 50) {
          navbarWrapper.classList.add('scrolled');
      } else {
          navbarWrapper.classList.remove('scrolled');
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // Add event listener to the menu icon
  menuIcon.addEventListener('click', function () {
      toggleMenu();
      if (mobileMenu.classList.contains('menu-visible')) {
          animateMobileNavLinks();
      }
  });

  // Add event listener to the close icon
  closeIcon.addEventListener('click', function () {
      toggleMenu();
  });

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
      }
  }

  // Function to animate mobile nav links
  function animateMobileNavLinks() {
      mobileNavLinks.forEach((link, index) => {
          link.style.animationDelay = `${0.1 * index}s`; // Set animation delay for each link
          link.classList.toggle('slide-in'); // Add class to trigger animation
      });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const navbar = document.getElementById('navbar');
  const navbarOptions = document.querySelector('.nav-right'); // Selecting navbar options
  const navbarHeight = navbar.offsetHeight; // Get the height of the navbar
  let lastScrollTop = 0;
  let scrolling = false;

  // Add event listener for scroll events
  window.addEventListener('scroll', function () {
    if (!scrolling) {
      requestAnimationFrame(function () {
        handleNavbarScroll();
        scrolling = false;
      });

      scrolling = true;
    }
  });

  // Function to handle navbar sliding on scroll
  function handleNavbarScroll() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    let scrollDirection = currentScroll > lastScrollTop ? 'down' : 'up';

    // Slide the navbar based on scroll direction and position
    if (scrollDirection === 'down' && currentScroll > navbarHeight * 2) {
      navbarWrapper.classList.add('hidden');
    } else {
      navbarWrapper.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  let lastScrollTop = 0;

  // Function to update the background color based on scroll position
  function updateNavbarBackground() {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      // Check if the scroll position is at the top
      if (currentScroll <= 0) {
          navbarWrapper.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Set background color to black with 0 opacity
      } else {
          navbarWrapper.style.backgroundColor = 'rgba(0, 0, 0, 1)'; // Set background color to black with full opacity
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  // Call the function once when the page loads
  updateNavbarBackground();

  // Add event listener for scroll events
  window.addEventListener('scroll', function () {
      updateNavbarBackground();
  });
});









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