/* JustZillion — script.js */

/* ---- Theme ---- */
function applyTheme(theme) {
  document.body.classList.toggle('light-mode', theme === 'light');
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) applyTheme(savedTheme);

function setupToggle(btn) {
  if (!btn) return;
  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

setupToggle(document.getElementById('themeToggle'));
setupToggle(document.getElementById('themeToggleFooter'));

/* ---- Mobile menu ---- */
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
    menuBtn.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  });

  // Close on link click
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', false);
      mobileMenu.setAttribute('aria-hidden', true);
    });
  });
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}

/* ---- FAQ accordion ---- */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = btn.nextElementSibling;

    // Close all others
    document.querySelectorAll('.faq-q').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        if (other.nextElementSibling) other.nextElementSibling.style.maxHeight = '0';
      }
    });

    btn.setAttribute('aria-expanded', !expanded);
    if (answer) {
      answer.style.maxHeight = expanded ? '0' : answer.scrollHeight + 'px';
    }
  });
});

/* ---- Sticky header shadow on scroll ---- */
const header = document.getElementById('site-header');
if (header) {
  const scrollHandler = () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 32px rgba(0,0,0,0.35)'
      : 'none';
  };
  window.addEventListener('scroll', scrollHandler, { passive: true });
}

/* ---- Particles (about page only) ---- */
if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 55, density: { enable: true, value_area: 900 } },
      color: { value: '#ffd000' },
      opacity: { value: 0.25, random: true },
      size: { value: 2, random: true },
      line_linked: { enable: true, distance: 140, color: '#ffd000', opacity: 0.1, width: 1 },
      move: { enable: true, speed: 1.2, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: false } }
    }
  });
}
