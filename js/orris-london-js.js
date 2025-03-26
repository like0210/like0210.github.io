document.addEventListener("DOMContentLoaded", function() {
  // Initialize components
  initHeaderScroll();
  initHeroSlider();
  initCollectionFilter();
  initMobileMenu();
  initModals();
  initProductQuantity();
  initBackToTop();
  initSmoothScroll();
});

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector(".header");
  
  window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Hero Slider functionality
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slider .slide");
  const dots = document.querySelectorAll(".hero-slider .dot");
  const prevBtn = document.querySelector(".hero-slider .prev");
  const nextBtn = document.querySelector(".hero-slider .next");
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds
  let slideTimer;
  
  // Function to show specific slide
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    // Add active class to current slide and dot
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    
    // Update currentSlide
    currentSlide = index;
  }
  
  // Function to show next slide
  function nextSlide() {
    let next = currentSlide + 1;
    if (next >= slides.length) next = 0;
    showSlide(next);
  }
  
  // Function to show previous slide
  function prevSlide() {
    let prev = currentSlide - 1;
    if (prev < 0) prev = slides.length - 1;
    showSlide(prev);
  }
  
  // Set up click events for controls
  if (prevBtn) prevBtn.addEventListener("click", function() {
    prevSlide();
    resetTimer();
  });
  
  if (nextBtn) nextBtn.addEventListener("click", function() {
    nextSlide();
    resetTimer();
  });
  
  // Set up click events for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function() {
      showSlide(index);
      resetTimer();
    });
  });
  
  // Start automatic slideshow
  function startTimer() {
    slideTimer = setInterval(nextSlide, slideInterval);
  }
  
  // Reset timer after manual navigation
  function resetTimer() {
    clearInterval(slideTimer);
    startTimer();
  }
  
  // Initialize
  startTimer();
}

// Testimonial Slider functionality
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".testimonial-dots .dot");
  const prevBtn = document.querySelector(".testimonial-nav.prev");
  const nextBtn = document.querySelector(".testimonial-nav.next");
  
  if (!testimonials.length) return;
  
  let currentTestimonial = 0;
  
  // Function to show specific testimonial
  function showTestimonial(index) {
    // Remove active class from all testimonials and dots
    testimonials.forEach(testimonial => testimonial.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    // Add active class to current testimonial and dot
    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    
    // Update currentTestimonial
    currentTestimonial = index;
  }
  
  // Function to show next testimonial
  function nextTestimonial() {
    let next = currentTestimonial + 1;
    if (next >= testimonials.length) next = 0;
    showTestimonial(next);
  }
  
  // Function to show previous testimonial
  function prevTestimonial() {
    let prev = currentTestimonial - 1;
    if (prev < 0) prev = testimonials.length - 1;
    showTestimonial(prev);
  }
  
  // Set up click events for controls
  if (prevBtn) prevBtn.addEventListener("click", prevTestimonial);
  if (nextBtn) nextBtn.addEventListener("click", nextTestimonial);
  
  // Set up click events for dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function() {
      showTestimonial(index);
    });
  });
}

// Collection filtering functionality
function initCollectionFilter() {
  const categoryBtns = document.querySelectorAll(".category-btn");
  const collectionItems = document.querySelectorAll(".collection-item");
  
  if (!categoryBtns.length || !collectionItems.length) return;
  
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      // Remove active class from all buttons
      categoryBtns.forEach(btn => btn.classList.remove("active"));
      
      // Add active class to clicked button
      this.classList.add("active");
      
      // Get category to filter
      const category = this.getAttribute("data-category");
      
      // Filter items
      collectionItems.forEach(item => {
        if (category === "all" || item.getAttribute("data-category") === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const closeMenu = document.getElementById("closeMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav a");
  
  if (!menuToggle || !mobileMenu) return;
  
  // Open mobile menu
  menuToggle.addEventListener("click", function() {
    mobileMenu.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  });
  
  // Close mobile menu function
  function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = ""; // Re-enable scrolling
  }
  
  // Close menu with close button
  if (closeMenu) {
    closeMenu.addEventListener("click", closeMobileMenu);
  }
  
  // Close menu when clicking overlay
  if (overlay) {
    overlay.addEventListener("click", closeMobileMenu);
  }
  
  // Close menu when clicking a nav link
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });
}

// Modal functionality
function initModals() {
  // Quick view modal
  const quickViewBtns = document.querySelectorAll(".view-btn");
  const quickViewModal = document.getElementById("quickViewModal");
  const closeModalBtn = document.querySelector(".close-modal");
  
  if (!quickViewModal) return;
  
  // Open modal function
  function openModal(modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }
  
  // Close modal function
  function closeModal(modal) {
    modal.classList.remove("open");
    document.body.style.overflow = ""; // Re-enable scrolling
  }
  
  // Set up click events for quick view buttons
  quickViewBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      openModal(quickViewModal);
      
      // Here you would typically fetch product details using AJAX
      // and update the modal content, but for demo we'll skip that
    });
  });
  
  // Close modal with close button
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", function() {
      closeModal(quickViewModal);
    });
  }
  
  // Close modal when clicking outside
  quickViewModal.addEventListener("click", function(e) {
    if (e.target === this) {
      closeModal(quickViewModal);
    }
  });
  
  // Close modal with ESC key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && quickViewModal.classList.contains("open")) {
      closeModal(quickViewModal);
    }
  });
}

// Product quantity functionality
function initProductQuantity() {
  const minusBtn = document.querySelector(".quantity-btn.minus");
  const plusBtn = document.querySelector(".quantity-btn.plus");
  const quantityInput = document.querySelector(".quantity input");
  
  if (!quantityInput) return;
  
  // Decrease quantity
  if (minusBtn) {
    minusBtn.addEventListener("click", function() {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });
  }
  
  // Increase quantity
  if (plusBtn) {
    plusBtn.addEventListener("click", function() {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
    });
  }
  
  // Validate input
  if (quantityInput) {
    quantityInput.addEventListener("change", function() {
      let value = parseInt(this.value);
      if (isNaN(value) || value < 1) {
        this.value = 1;
      }
    });
  }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    // For demo, we'll just log it to console
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message (in a real app, do this after server response)
    alert('Thank you for your message. We will contact you shortly!');
    
    // Reset form
    this.reset();
  });
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get email value
    const email = this.querySelector('input[type="email"]').value;
    
    // Here you would typically send the data to a server
    // For demo, we'll just log it to console
    console.log('Newsletter subscription:', email);
    
    // Show success message (in a real app, do this after server response)
    alert('Thank you for subscribing to our newsletter!');
    
    // Reset form
    this.reset();
  });
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        if (src) {
          img.src = src;
        }
        
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  // Target images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imgObserver.observe(img);
  });
}