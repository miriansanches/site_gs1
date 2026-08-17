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

    runScrollyEngine();
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

    // 4) CRM feature text
    document.querySelectorAll('.crm-feature').forEach((feature, i) => {
      const text = feature.querySelector('.crm-feature-text');
      if (!text) return;
      const rect = text.getBoundingClientRect();
      const progress = clamp((windowHeight - rect.top) / (windowHeight * 0.55), 0, 1);
      const eased = easeOutCubic(progress);
      const dir = i % 2 === 1 ? -1 : 1;
      text.style.opacity = eased;
      text.style.transform = `translateX(${(1 - eased) * 60 * dir}px)`;
    });

    // 5) CRM mini grid cards
    document.querySelectorAll('.crm-mini-card').forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const progress = clamp((windowHeight - rect.top) / (windowHeight * 0.5), 0, 1);
      const stagger = (index % 3) * 0.06;
      const sp = clamp((progress - stagger) / (1 - stagger), 0, 1);
      const se = easeOutCubic(sp);
      card.style.opacity = se;
      card.style.transform = `translateY(${(1 - se) * 60}px) scale(${0.9 + se * 0.1})`;
    });

    // 6) QR cards
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

    document.querySelectorAll('.crm-feature-image .img-wrapper').forEach(wrapper => {
      const rect = wrapper.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const yOffset = (progress - 0.5) * 25;
        const scale = wrapper.matches(':hover') ? 1.02 : 1;
        wrapper.style.transform = `translateY(${yOffset}px) scale(${scale})`;
      }
    });

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
  document.querySelectorAll('.crm-feature-image .img-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
      const img = wrapper.querySelector('img');
      openLightbox(img.src, img.alt, wrapper.getAttribute('data-caption') || '');
    });
  });

  document.querySelectorAll('.crm-mini-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      openLightbox(img.src, img.alt, card.getAttribute('data-caption') || '');
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

// ============================================
// CRM SCROLLYTELLING ENGINE
// ============================================
const SLIDE_DATA = [
  { color: '#3B82F6', glow: 'rgba(59,130,246,0.18)', metric: 'Receita do dia',       status: 'Dashboard ativo' },
  { color: '#F59E0B', glow: 'rgba(245,158,11,0.18)',  metric: 'Agendamentos do dia', status: 'Agenda ao vivo' },
  { color: '#06B6D4', glow: 'rgba(6,182,212,0.18)',   metric: 'Clientes ativos',     status: 'CRM sincronizado' },
];

const scrollyWrapper = document.getElementById('crm-scrolly-wrapper');
const crmNavSteps = document.querySelectorAll('.crm-step-btn');
const crmProgressFill = document.getElementById('crm-nav-progress-fill');
const narrativeSlides = document.querySelectorAll('.narrative-slide');
const slideImgs = document.querySelectorAll('.slide-img');
const deviceAmbientGlow = document.getElementById('device-ambient-glow');
const dfbMetricText = document.getElementById('dfb-metric-text');
const dfbStatusText = document.getElementById('dfb-status-text');

let currentSlide = 0;
let scrollyEnabled = window.innerWidth > 1024;

function initScrollyEngine() {
  if (window.innerWidth <= 1024) {
    scrollyEnabled = false;
    narrativeSlides.forEach((slide, i) => {
      slide.style.position = 'relative';
      slide.style.top = 'auto';
      slide.style.opacity = '1';
      slide.style.transform = 'none';
      slide.style.display = i === 0 ? 'block' : 'none';
    });
    return;
  }
  scrollyEnabled = true;
  activateSlide(0, false);
}

function runScrollyEngine() {
  if (!scrollyEnabled || !scrollyWrapper || window.innerWidth <= 1024) return;

  const wRect = scrollyWrapper.getBoundingClientRect();
  const scrolledPast = -wRect.top;
  const activeScrollHeight = scrollyWrapper.offsetHeight - window.innerHeight;

  if (scrolledPast < 0 || scrolledPast > activeScrollHeight) return;

  const progress = scrolledPast / activeScrollHeight;
  const rawSlide = progress * 3;
  const targetSlide = Math.min(Math.floor(rawSlide), 2);
  const slideLocalProgress = rawSlide - Math.floor(rawSlide);

  if (crmProgressFill) {
    const fillPercent = (targetSlide / 2 + slideLocalProgress / 2) * 100;
    crmProgressFill.style.height = `${Math.min(fillPercent, 100)}%`;
  }

  if (targetSlide !== currentSlide) {
    activateSlide(targetSlide, true);
  }
}

function activateSlide(index, animated) {
  if (index === currentSlide && animated) return;

  const direction = index > currentSlide ? 'forward' : 'backward';
  currentSlide = index;

  crmNavSteps.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  slideImgs.forEach((slide, i) => {
    if (i === index) {
      slide.classList.remove('exit-left', 'exit-right');
      slide.classList.add('active');
    } else if (slide.classList.contains('active')) {
      slide.classList.remove('active');
      slide.classList.add(direction === 'forward' ? 'exit-left' : 'exit-right');
      setTimeout(() => slide.classList.remove('exit-left', 'exit-right'), 900);
    } else {
      slide.classList.remove('active', 'exit-left', 'exit-right');
    }
  });

  narrativeSlides.forEach((ns, i) => {
    if (i === index) {
      ns.classList.remove('exit');
      ns.classList.add('active');
    } else if (ns.classList.contains('active')) {
      ns.classList.remove('active');
      ns.classList.add('exit');
      setTimeout(() => ns.classList.remove('exit'), 700);
    } else {
      ns.classList.remove('active', 'exit');
    }
  });

  const data = SLIDE_DATA[index];
  if (deviceAmbientGlow) {
    deviceAmbientGlow.style.background = `radial-gradient(circle, ${data.glow} 0%, transparent 70%)`;
  }

  const frame = document.querySelector('.device-frame');
  if (frame) {
    frame.style.boxShadow = `0 40px 100px rgba(0,0,0,0.7), 0 0 80px ${data.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`;
  }

  if (dfbMetricText) dfbMetricText.textContent = data.metric;
  if (dfbStatusText) dfbStatusText.textContent = data.status;
}

crmNavSteps.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    if (!scrollyWrapper || window.innerWidth <= 1024) {
      activateSlide(index, true);
      return;
    }
    const wTop = scrollyWrapper.getBoundingClientRect().top + window.scrollY;
    const totalH = scrollyWrapper.offsetHeight - window.innerHeight;
    const targetScroll = wTop + (index / 3) * totalH;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  });
});

initScrollyEngine();

window.addEventListener('resize', () => {
  if (window.innerWidth <= 1024) {
    scrollyEnabled = false;
  } else {
    scrollyEnabled = true;
    initScrollyEngine();
  }
});

});
