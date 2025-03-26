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
  initInstagramFeed();
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
function initSmoothScroll() {
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
}

// Back to Top button functionality
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  
  if (!backToTopBtn) return;
  
  // Show/hide button based on scroll position
  window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });
  
  // Scroll to top when clicked
  backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Instagram Feed functionality
function initInstagramFeed() {
  const instagramGrid = document.querySelector('.instagram-grid');
  
  if (!instagramGrid) return;
  
  // Instagram Graph API configuration
  const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN'; // Replace with your actual access token
  const userId = 'YOUR_INSTAGRAM_USER_ID'; // Replace with your Instagram user ID
  const limit = 6; // Number of posts to display
  
  // API endpoint for Instagram Graph API
  const apiUrl = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}&limit=${limit}`;
  
  // Fetch Instagram posts
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Instagram API request failed');
      }
      return response.json();
    })
    .then(data => {
      // Clear existing placeholder content
      instagramGrid.innerHTML = '';
      
      // Process and display Instagram posts
      if (data && data.data && data.data.length > 0) {
        data.data.forEach(post => {
          // Create Instagram item element
          const instagramItem = document.createElement('a');
          instagramItem.href = post.permalink;
          instagramItem.className = 'instagram-item';
          instagramItem.target = '_blank';
          
          // Create image element
          const img = document.createElement('img');
          img.src = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
          img.alt = post.caption ? post.caption.substring(0, 50) + '...' : 'Instagram Post';
          
          // Create overlay element
          const overlay = document.createElement('div');
          overlay.className = 'instagram-overlay';
          
          // Create icon element
          const icon = document.createElement('i');
          icon.className = 'fab fa-instagram';
          
          // Assemble the elements
          overlay.appendChild(icon);
          instagramItem.appendChild(img);
          instagramItem.appendChild(overlay);
          
          // Add to grid
          instagramGrid.appendChild(instagramItem);
          
          // Add click event listener
          instagramItem.addEventListener('click', function(e) {
            // Let the link handle navigation to Instagram
          });
        });
      } else {
        // Display a message if no posts are available
        instagramGrid.innerHTML = '<p class="no-posts">No Instagram posts available at the moment.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching Instagram posts:', error);
      
      // Display error message and fallback to placeholder images
      instagramGrid.innerHTML = '';
      
      // Create 6 placeholder items
      for (let i = 0; i < 6; i++) {
        const instagramItem = document.createElement('a');
        instagramItem.href = '#';
        instagramItem.className = 'instagram-item';
        
        const img = document.createElement('img');
        img.src = 'images/logo.jpg';
        img.alt = 'Instagram Post ' + (i + 1);
        
        const overlay = document.createElement('div');
        overlay.className = 'instagram-overlay';
        
        const icon = document.createElement('i');
        icon.className = 'fab fa-instagram';
        
        overlay.appendChild(icon);
        instagramItem.appendChild(img);
        instagramItem.appendChild(overlay);
        
        instagramGrid.appendChild(instagramItem);
      }
    });
}

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