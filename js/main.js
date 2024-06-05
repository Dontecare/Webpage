// Get all elements with class "image"
var images = document.getElementsByClassName("image");

// Get the modal element
var modal = document.getElementById("myModal");

// Get the image inside the modal
var modalImg = document.getElementById("img01");

// Get the caption text
var captionText = document.getElementById("caption");

// Flag to track whether the modal is open
var modalOpen = false;

// Loop through each image and add a click event listener
for (var i = 0; i < images.length; i++) {
  images[i].addEventListener("click", function() {
    // Check if the modal is already open
    if (!modalOpen) {
      // Set the modal content based on the clicked image
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;

      // Hide the site's scrollbar
      document.body.style.overflow = "hidden";

      // Set the flag to indicate that the modal is open
      modalOpen = true;

      // Remove the click event listener after the first click
      for (var j = 0; j < images.length; j++) {
        images[j].removeEventListener("click", clickListener);
      }
    }
  });
}

// Close the modal when the close button is clicked
var closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = function() {
  modal.style.display = "none";

  // Restore the site's scrollbar
  document.body.style.overflow = "auto";

  // Reset the flag when the modal is closed
  modalOpen = false;

  // Reattach the click event listener to all images
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", clickListener);
  }
};

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";

    // Restore the site's scrollbar
    document.body.style.overflow = "auto";

    // Reset the flag when the modal is closed
    modalOpen = false;

    // Reattach the click event listener to all images
    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener("click", clickListener);
    }
  }
};

var images = document.getElementsByClassName("image");
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
var closeButton = document.getElementsByClassName("close")[0];

function openModal(imageSrc, altText) {
  modal.style.display = "block";
  modalImg.src = imageSrc;
  captionText.innerHTML = altText;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Click event listener for images
function clickListener() {
  openModal(this.src, this.alt);
  for (var j = 0; j < images.length; j++) {
    images[j].removeEventListener("click", clickListener);
  }
}

// Loop through each image and add a click event listener
for (var i = 0; i < images.length; i++) {
  images[i].addEventListener("click", clickListener);
}

// Close the modal when the close button is clicked
closeButton.onclick = function() {
  closeModal();
  for (var i = 0; i < images.length; i++) {
    images[i].addEventListener("click", clickListener);
  }
};

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener("click", clickListener);
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  
  function checkSection() {
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      
      if (isVisible) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", checkSection);
  window.addEventListener("resize", checkSection);

  // Initial check when the page loads
  checkSection();
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