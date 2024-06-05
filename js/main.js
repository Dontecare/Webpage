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

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }
  });
});

function toggleMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
}



if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(error) {
      console.log('ServiceWorker registration failed: ', error);
    });
  });
}