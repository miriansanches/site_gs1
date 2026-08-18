/* ============================================
   CR BEAUTY FLOW — Site de Apresentação
   Interactions, Scrollytelling & Animations — v3
   ENHANCED DYNAMIC SCROLL EFFECTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Elements ----
  const introScreen = document.getElementById('intro-screen');
  const revealScreen = document.getElementById('reveal-screen');
  const mainSite = document.getElementById('main-site');
  const lightDot = document.getElementById('light-dot');
  const revealContinue = document.getElementById('reveal-continue');
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  // ============================================
  // STEP 1 — Intro: Click the glowing dot
  // ============================================
  lightDot.addEventListener('click', () => {
    introScreen.classList.add('hidden');
    revealScreen.classList.add('active');
  });

  // ============================================
  // STEP 2 — Reveal: Click to continue to site
  // ============================================
  revealContinue.addEventListener('click', () => {
    revealScreen.classList.remove('active');
    revealScreen.classList.add('fade-out');

    setTimeout(() => {
      mainSite.classList.add('visible');
      document.body.style.overflow = 'auto';

      setTimeout(() => {
        initScrollAnimations();
        triggerOrigemLines();
      }, 300);
    }, 1000);
  });

  document.body.style.overflow = 'hidden';

  // ============================================
  // NAVBAR — Scroll effect, active link & theme
  // ============================================
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  function onScroll() {
    const scrollY = window.scrollY;

    // Navbar shrink
    navbar.classList.toggle('scrolled', scrollY > 50);

    // Dark/light navbar
    updateNavbarTheme();

    // Active nav link
    updateActiveNav();

    // Continuous scroll-driven animations
    animateOnScroll();

    // Parallax
    applyParallax();
  }

  function updateNavbarTheme() {
    const darkZone = document.querySelector('.origem-dark-zone');
    const gradientZone = document.querySelector('.origem-gradient-transition');
    if (!darkZone || !gradientZone) return;

    const gradientMid = gradientZone.getBoundingClientRect().top + gradientZone.offsetHeight * 0.4;

    if (gradientMid > 0) {
      navbar.classList.add('dark-mode');
    } else {
      navbar.classList.remove('dark-mode');
    }
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-links a');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  // ============================================
  // MOBILE NAV TOGGLE
  // ============================================
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // ============================================
  // SCROLL REVEAL — Intersection Observer
  // ============================================
  function initScrollAnimations() {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      revealObserver.observe(el);
    });
  }

  function triggerOrigemLines() {
    const lines = document.querySelectorAll('.origem-phrase-large .line');
    lines.forEach((line, index) => {
      setTimeout(() => line.classList.add('visible'), index * 350);
    });
  }

  const origemPhrase = document.querySelector('.origem-phrase-large');
  if (origemPhrase) {
    const phraseObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerOrigemLines();
          phraseObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    phraseObserver.observe(origemPhrase);
  }

  // ============================================
  // CONTINUOUS SCROLL-DRIVEN ANIMATIONS
  // ============================================
  function animateOnScroll() {
    const windowHeight = window.innerHeight;

    // 1) Fade the scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      const progress = Math.min(window.scrollY / 300, 1);
      scrollIndicator.style.opacity = 1 - progress;
    }

    // 2) Story block elements
    document.querySelectorAll('.story-block-content p, .story-block-content h3').forEach(el => {
      const rect = el.getBoundingClientRect();
      const progress = clamp((windowHeight - rect.top) / (windowHeight * 0.6), 0, 1);
      const eased = easeOutCubic(progress);
      el.style.opacity = eased;
      el.style.transform = `translateY(${(1 - eased) * 40}px)`;
    });

    // 3) Mission cards
    document.querySelectorAll('.mission-card').forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const progress = clamp((windowHeight - rect.top) / (windowHeight * 0.55), 0, 1);
      const delay = index * 0.08;
      const dp = clamp((progress - delay) / (1 - delay), 0, 1);
      const de = easeOutCubic(dp);
      card.style.opacity = de;
      card.style.transform = `translateY(${(1 - de) * 50}px) scale(${0.92 + de * 0.08})`;
    });


    document.querySelectorAll('.qr-card').forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const progress = clamp((windowHeight - rect.top) / (windowHeight * 0.55), 0, 1);
      const stagger = index * 0.08;
      const sp = clamp((progress - stagger) / (1 - stagger), 0, 1);
      const se = easeOutCubic(sp);
      const rotateDir = index % 2 === 0 ? 1 : -1;
      card.style.opacity = se;
      card.style.transform = `translateY(${(1 - se) * 50}px) rotate(${(1 - se) * 3 * rotateDir}deg)`;
    });

    // 7) Section badges & titles
    document.querySelectorAll('.section-badge, .crm-intro .section-title, .qrcode-intro .section-title').forEach(el => {
      const rect = el.getBoundingClientRect();
      const progress = clamp((windowHeight - rect.top) / (windowHeight * 0.5), 0, 1);
      const eased = easeOutCubic(progress);
      el.style.opacity = eased;
      el.style.transform = `translateY(${(1 - eased) * 30}px) scale(${0.95 + eased * 0.05})`;
    });

    // 8) Section subtitles
    document.querySelectorAll('.section-subtitle').forEach(el => {
      const rect = el.getBoundingClientRect();
      const progress = clamp((windowHeight - rect.top) / (windowHeight * 0.45), 0, 1);
      const eased = easeOutCubic(progress);
      el.style.opacity = eased;
      el.style.transform = `translateY(${(1 - eased) * 25}px)`;
    });

    // 9) Story photo frames
    document.querySelectorAll('.story-photo-frame').forEach(frame => {
      const rect = frame.getBoundingClientRect();
      const progress = clamp((windowHeight - rect.top) / (windowHeight * 0.7), 0, 1);
      const eased = easeOutCubic(progress);
      frame.style.opacity = eased;
      frame.style.transform = `scale(${0.85 + eased * 0.15}) translateY(${(1 - eased) * 30}px)`;
    });
  }

  // ============================================
  // PARALLAX
  // ============================================
  function applyParallax() {
    const windowHeight = window.innerHeight;

    document.querySelectorAll('.mission-card-icon').forEach(icon => {
      const rect = icon.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        icon.style.transform = `translateY(${(progress - 0.5) * -15}px)`;
      }
    });

    document.querySelectorAll('.qr-icon').forEach(icon => {
      const rect = icon.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        icon.style.transform = `translateY(${(progress - 0.5) * -12}px)`;
      }
    });
  }

  // ============================================
  // LIGHTBOX
  // ============================================
  document.querySelectorAll('.lightbox-trigger').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.tagName.toUpperCase() === 'IMG' ? card : card.querySelector('img');
      if (img) {
        openLightbox(img.src, img.alt, card.getAttribute('data-caption') || '');
      }
    });
  });

  function openLightbox(src, alt, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ============================================
  // UTILITIES
  // ============================================
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }



});
