/**
 * Ke Li — artist portfolio.
 * Native dialogs provide focus containment and an inert page behind overlays.
 */
(function () {
  'use strict';

  var supported = ['en', 'fr', 'de', 'zh', 'ja', 'ko'];
  var root = document.documentElement;
  var browserLang = (navigator.language || 'en').slice(0, 2);
  var currentLang = supported.includes(browserLang) ? browserLang : 'en';
  var isPortfolio = document.body.dataset.page === 'portfolio';
  try {
    var savedLang = localStorage.getItem('lang');
    if (supported.includes(savedLang)) currentLang = savedLang;
  } catch (_) {
    // The portfolio remains usable when storage is blocked.
  }

  var metaTitle = {
    en: 'Ke Li — Contemporary Jewellery Artist',
    fr: 'Ke Li — Artiste Joaillière Contemporaine',
    de: 'Ke Li — Zeitgenössische Schmuckkünstlerin',
    zh: 'Ke Li — 当代珠宝艺术家',
    ja: 'Ke Li — コンテンポラリージュエリーアーティスト',
    ko: 'Ke Li — 현대 주얼리 아티스트'
  };
  var metaDesc = {
    en: 'Ke Li is a contemporary jewellery artist based in London. RCA graduate exploring the symbiotic relationship between jewellery and the human form.',
    fr: 'Ke Li est une artiste joaillière contemporaine basée à Londres. Diplômée du RCA, elle explore la relation symbiotique entre le bijou et la forme humaine.',
    de: 'Ke Li ist eine zeitgenössische Schmuckkünstlerin in London. RCA-Absolventin, die die symbiotische Beziehung zwischen Schmuck und dem menschlichen Körper erforscht.',
    zh: 'Ke Li（李可）是一位驻伦敦的当代珠宝艺术家，皇家艺术学院硕士，探索珠宝与人体的共生关系。',
    ja: 'Ke Liはロンドンを拠点とするコンテンポラリージュエリーアーティスト。RCA修了、ジュエリーと人体の共生関係を探求。',
    ko: 'Ke Li는 런던에 거주하는 현대 주얼리 아티스트입니다. RCA 졸업, 주얼리와 인체의 공생 관계를 탐구합니다.'
  };

  if (isPortfolio) {
    supported.forEach(function (lang) {
      metaTitle[lang] = 'Ke Li — Portfolio';
      metaDesc[lang] = 'Symbiotic relief, Psychotherapy, Eden and Shape of Traveling Memory. Jewellery & Metal, 2022–2024.';
    });
  }
  var labels = {
    en: { skip: 'Skip to content', language: 'Language', navigation: 'Navigation', openMenu: 'Open menu', close: 'Close', viewer: 'Image viewer', previous: 'Previous image', next: 'Next image', loading: 'Loading image…', error: 'This image could not load. Try another image or close the viewer.', backTop: 'Back to top', photography: 'Photography' },
    fr: { skip: 'Aller au contenu', language: 'Langue', navigation: 'Navigation', openMenu: 'Ouvrir le menu', close: 'Fermer', viewer: 'Visionneuse', previous: 'Image précédente', next: 'Image suivante', loading: 'Chargement de l’image…', error: 'Impossible de charger cette image. Essayez une autre image ou fermez la visionneuse.', backTop: 'Haut de page', photography: 'Photographie' },
    de: { skip: 'Zum Inhalt', language: 'Sprache', navigation: 'Navigation', openMenu: 'Menü öffnen', close: 'Schließen', viewer: 'Bildansicht', previous: 'Vorheriges Bild', next: 'Nächstes Bild', loading: 'Bild wird geladen…', error: 'Dieses Bild konnte nicht geladen werden. Wählen Sie ein anderes Bild oder schließen Sie die Ansicht.', backTop: 'Nach oben', photography: 'Fotografie' },
    zh: { skip: '跳转到正文', language: '语言', navigation: '导航', openMenu: '打开菜单', close: '关闭', viewer: '作品大图', previous: '上一张', next: '下一张', loading: '正在加载图片…', error: '图片加载失败，请尝试其他图片或关闭大图。', backTop: '回到顶部', photography: '摄影' },
    ja: { skip: '本文へ移動', language: '言語', navigation: 'ナビゲーション', openMenu: 'メニューを開く', close: '閉じる', viewer: '画像ビューア', previous: '前の画像', next: '次の画像', loading: '画像を読み込み中…', error: '画像を読み込めませんでした。他の画像を選ぶか、ビューアを閉じてください。', backTop: 'トップへ', photography: '写真' },
    ko: { skip: '본문으로 이동', language: '언어', navigation: '탐색', openMenu: '메뉴 열기', close: '닫기', viewer: '이미지 뷰어', previous: '이전 이미지', next: '다음 이미지', loading: '이미지 로딩 중…', error: '이미지를 불러올 수 없습니다. 다른 이미지를 선택하거나 뷰어를 닫아 주세요.', backTop: '맨 위로', photography: '사진' }
  };

  var languageSelect = document.getElementById('languageSelect');
  function setLang(lang, persist) {
    if (!supported.includes(lang)) return;
    currentLang = lang;
    root.dataset.lang = lang;
    root.lang = lang;
    document.title = metaTitle[lang];
    document.querySelector('meta[name="description"]').content = metaDesc[lang];
    document.querySelector('meta[property="og:title"]').content = metaTitle[lang];
    document.querySelector('meta[property="og:description"]').content = metaDesc[lang];
    languageSelect.value = lang;
    document.querySelectorAll('[data-ui]').forEach(function (element) {
      element.textContent = labels[lang][element.dataset.ui];
    });
    document.querySelectorAll('[data-ui-aria]').forEach(function (element) {
      element.setAttribute('aria-label', labels[lang][element.dataset.uiAria]);
    });
    if (persist) {
      try { localStorage.setItem('lang', lang); } catch (_) {
        // Saving a preference is optional.
      }
    }
  }
  setLang(currentLang, false);
  root.classList.add('js-enabled');
  languageSelect.addEventListener('change', function () {
    setLang(languageSelect.value, true);
    updateActiveNav();
  });
  document.querySelectorAll('.copyright-year').forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  var menu = document.getElementById('mobileMenu');
  var menuToggle = document.getElementById('menuToggle');
  var lightbox = document.getElementById('lightbox');
  var focusAfterMenu = null;
  var savedOverflow = '';

  // Keep Tab navigation inside the dialog, including at either boundary.
  [menu, lightbox].filter(Boolean).forEach(function (dialog) {
    dialog.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab') return;
      var controls = Array.from(dialog.querySelectorAll('button, a[href]'));
      var first = controls[0];
      var last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  });

  function lockScroll() {
    savedOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  function unlockScroll() {
    document.body.style.overflow = savedOverflow;
  }
  menuToggle.addEventListener('click', function () {
    focusAfterMenu = null;
    menu.showModal();
    menuToggle.setAttribute('aria-expanded', 'true');
    lockScroll();
  });
  document.getElementById('closeMenu').addEventListener('click', function () {
    menu.close();
  });
  menu.addEventListener('close', function () {
    menuToggle.setAttribute('aria-expanded', 'false');
    unlockScroll();
    if (focusAfterMenu) {
      focusAfterMenu.focus({ preventScroll: true });
      focusAfterMenu = null;
    }
  });
  menu.querySelectorAll('a[href]').forEach(function (link) {
    link.addEventListener('click', function () {
      var href = link.getAttribute('href');
      focusAfterMenu = href.startsWith('#') ? document.querySelector(href) : null;
      menu.close();
    });
  });
  window.matchMedia('(min-width: 761px)').addEventListener('change', function (event) {
    if (event.matches && menu.open) menu.close();
  });

  // Only full collection pages need an image viewer; previews use normal links.
  if (lightbox) setupGallery();

  function setupGallery() {
    var triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
    var galleryTriggers = triggers;
    var viewerImage = document.getElementById('lightboxImg');
    var status = document.getElementById('lightboxStatus');
    var counter = document.getElementById('lightboxCounter');
    var artworkLabel = document.getElementById('lightboxArtwork');
    var currentIndex = 0;
    var requestId = 0;
    var opener = null;

    function showImage(index) {
      currentIndex = (index + galleryTriggers.length) % galleryTriggers.length;
      var trigger = galleryTriggers[currentIndex];
      var request = ++requestId;
      viewerImage.hidden = true;
      status.textContent = labels[currentLang].loading;
      counter.textContent = String(currentIndex + 1).padStart(2, '0') + ' / ' + String(galleryTriggers.length).padStart(2, '0');
      if (artworkLabel) artworkLabel.textContent = trigger.dataset.caption || 'Portfolio';
      var pendingImage = new Image();
      pendingImage.onload = function () {
        if (request !== requestId || !lightbox.open) return;
        viewerImage.src = pendingImage.src;
        viewerImage.alt = trigger.querySelector('img').alt;
        viewerImage.hidden = false;
        status.textContent = '';
      };
      pendingImage.onerror = function () {
        if (request !== requestId || !lightbox.open) return;
        status.textContent = labels[currentLang].error;
      };
      pendingImage.src = trigger.href;
    }
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof lightbox.showModal !== 'function') return;
        event.preventDefault();
        opener = trigger;
        galleryTriggers = trigger.dataset.gallery
          ? triggers.filter(function (item) { return item.dataset.gallery === trigger.dataset.gallery; })
          : triggers;
        lightbox.showModal();
        lockScroll();
        showImage(galleryTriggers.indexOf(trigger));
      });
    });
    lightbox.querySelector('.lightbox-close').addEventListener('click', function () {
      lightbox.close();
    });
    lightbox.addEventListener('close', function () {
      requestId++;
      unlockScroll();
      if (opener) opener.focus({ preventScroll: true });
    });
    document.getElementById('lightboxPrev').addEventListener('click', function () { showImage(currentIndex - 1); });
    document.getElementById('lightboxNext').addEventListener('click', function () { showImage(currentIndex + 1); });
    lightbox.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        showImage(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox || event.target.classList.contains('lightbox-stage')) lightbox.close();
    });
  }

  var navLinks = document.querySelectorAll('[data-nav-link]');
  var sections = Array.from(document.querySelectorAll('main > section[id]'));
  var scrollScheduled = false;
  function updateActiveNav() {
    var current = '';
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= 150) current = section.id;
    });
    if (!isPortfolio && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
    navLinks.forEach(function (link) {
      if (link.getAttribute('href') === '#' + current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollScheduled = false;
  }
  window.addEventListener('scroll', function () {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(updateActiveNav);
    }
  }, { passive: true });
  window.addEventListener('resize', updateActiveNav);
  updateActiveNav();
})();
