/**
 * Ke Li — Portfolio Website
 * Main JavaScript
 */

(function () {
  'use strict';

  // ─── Language System ────────────────────────────────────────
  var savedLang = localStorage.getItem('lang') || 'en';
  document.documentElement.setAttribute('data-lang', savedLang);
  document.documentElement.setAttribute('lang', savedLang);

  var metaTitle = { en: 'Ke Li — Contemporary Jewellery Artist', zh: 'Ke Li — 当代珠宝艺术家' };
  var metaDesc = {
    en: 'Ke Li is a contemporary jewellery artist based in London. RCA graduate exploring the symbiotic relationship between jewellery and the human form.',
    zh: 'Ke Li（李可）是一位驻伦敦的当代珠宝艺术家，皇家艺术学院硕士，探索珠宝与人体的共生关系。'
  };

  function setLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('lang', lang);
    document.title = metaTitle[lang];
    var descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute('content', metaDesc[lang]);
    highlightActiveLang(lang);
  }

  function highlightActiveLang(lang) {
    // Desktop: highlight active option in dropdown
    document.querySelectorAll('.lang-option').forEach(function (btn) {
      btn.classList.toggle('font-medium', btn.getAttribute('data-lang-value') === lang);
      btn.classList.toggle('text-muted', btn.getAttribute('data-lang-value') !== lang);
    });
    // Mobile: highlight active flag
    document.querySelectorAll('.lang-option-mobile').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang-value') === lang;
      btn.classList.toggle('ring-2', isActive);
      btn.classList.toggle('ring-primary', isActive);
      btn.classList.toggle('opacity-50', !isActive);
    });
  }

  // Init
  document.title = metaTitle[savedLang];
  var descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) descMeta.setAttribute('content', metaDesc[savedLang]);
  highlightActiveLang(savedLang);

  // ─── Desktop Language Dropdown ─────────────────────────────
  var langToggleBtn = document.getElementById('langToggle');
  var langMenu = document.getElementById('langMenu');

  function openLangMenu() {
    langMenu.classList.remove('opacity-0', 'pointer-events-none');
    langMenu.classList.add('opacity-100');
    langToggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeLangMenu() {
    langMenu.classList.add('opacity-0', 'pointer-events-none');
    langMenu.classList.remove('opacity-100');
    langToggleBtn.setAttribute('aria-expanded', 'false');
  }

  langToggleBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = langToggleBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) { closeLangMenu(); } else { openLangMenu(); }
  });

  // Desktop dropdown options
  document.querySelectorAll('.lang-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-lang-value'));
      closeLangMenu();
    });
  });

  // Mobile flag options
  document.querySelectorAll('.lang-option-mobile').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setLang(btn.getAttribute('data-lang-value'));
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', function () {
    closeLangMenu();
  });

  // ─── Dynamic Copyright Year ───────────────────────────────
  var year = new Date().getFullYear();
  var yearEl = document.getElementById('copyrightYear');
  var yearElZh = document.getElementById('copyrightYearZh');
  if (yearEl) yearEl.textContent = year;
  if (yearElZh) yearElZh.textContent = year;

  // ─── Header Scroll Effect ─────────────────────────────────
  var header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 60) {
      header.classList.add('bg-white/95', 'backdrop-blur-sm', 'shadow-sm');
    } else {
      header.classList.remove('bg-white/95', 'backdrop-blur-sm', 'shadow-sm');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ─── Active Nav Link ──────────────────────────────────────
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('[data-nav-link]');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // ─── Mobile Menu ──────────────────────────────────────────
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var closeMenu = document.getElementById('closeMenu');
  var mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenu.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeMenu.focus();
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  menuToggle.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.contains('active');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  closeMenu.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // Escape key closes mobile menu
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // ─── Scroll Reveal ────────────────────────────────────────
  var revealElements = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  } else if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ─── Lightbox ─────────────────────────────────────────────
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var lightboxClose = lightbox.querySelector('.lightbox-close');

  var galleryImages = [];
  var currentImageIndex = 0;

  // Collect gallery images with alt text
  document.querySelectorAll('[data-lightbox]').forEach(function (el) {
    var img = el.querySelector('img');
    if (img) {
      galleryImages.push({
        src: img.getAttribute('data-full') || img.src,
        alt: img.getAttribute('alt') || ''
      });
    }
  });

  function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightboxNav();
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    // Return focus to the trigger
    var trigger = document.querySelector('[data-lightbox="' + currentImageIndex + '"]');
    if (trigger) trigger.focus();
  }

  function updateLightboxNav() {
    lightboxPrev.style.display = galleryImages.length > 1 ? '' : 'none';
    lightboxNext.style.display = galleryImages.length > 1 ? '' : 'none';
  }

  function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
  }

  function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentImageIndex].src;
    lightboxImg.alt = galleryImages[currentImageIndex].alt;
  }

  // Lightbox click handlers
  document.querySelectorAll('[data-lightbox]').forEach(function (el) {
    el.addEventListener('click', function () {
      var index = parseInt(el.getAttribute('data-lightbox'), 10);
      openLightbox(index);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', nextImage);
  lightboxPrev.addEventListener('click', prevImage);

  // Close on background click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation (lightbox)
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // ─── Smooth Scroll for Anchor Links ───────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPos, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

})();
