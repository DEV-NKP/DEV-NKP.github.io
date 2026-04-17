// ══════════════════════════════════════
// SERVICES PAGE — services.js
// ══════════════════════════════════════

// ── FAQ Toggle ──
// Collapses when you click an already-open question
function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  const isActive = element.classList.contains('active');

  // Close ALL open FAQs first
  document.querySelectorAll('.svc-faq-question').forEach(q => {
    q.classList.remove('active');
    q.setAttribute('aria-expanded', 'false');
  });
  document.querySelectorAll('.svc-faq-answer').forEach(a => {
    a.classList.remove('active');
  });

  // If the clicked one was NOT active, open it
  if (!isActive) {
    element.classList.add('active');
    element.setAttribute('aria-expanded', 'true');
    answer.classList.add('active');
  }
}

// ── Sticky Hire Button & Scroll-to-Top ──
function initStickyButton() {
  const stickyBtn = document.querySelector('.svc-sticky-hire-btn');
  const scrollBtn = document.querySelector('.svc-stb');
  if (!stickyBtn || !scrollBtn) return;

  let heroHeight = 0;
  const hero = document.getElementById('hero');
  if (hero) heroHeight = hero.offsetHeight;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > heroHeight) {
      stickyBtn.classList.add('visible');
      scrollBtn.classList.add('visible');
    } else {
      stickyBtn.classList.remove('visible');
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });
}

// ── Consultation Form Handling ──
function initContactForm() {
  const form = document.getElementById('consultationForm');
  const formWrapper = document.getElementById('formWrapper');
  const successPanel = document.getElementById('successPanel');
  const submitBtn = document.getElementById('submitBtn');
  const btnLoader = document.getElementById('btnLoader');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const service = form.querySelector('#service').value;
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !service || !message) {
      highlightEmptyFields(form);
      return;
    }

    // Simulate loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';
    if (btnLoader) btnLoader.classList.add('active');

    // Collect form data for logging / future backend integration
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log('Consultation form submitted:', data);

    // Simulate a short network delay, then show success
    setTimeout(() => {
      // Hide the form, show success panel
      if (formWrapper) formWrapper.style.display = 'none';
      if (successPanel) successPanel.style.display = 'block';

      // Smooth scroll to the success panel
      if (successPanel) {
        successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Reset button state (for if user navigates back)
      submitBtn.disabled = false;
      if (btnLoader) btnLoader.classList.remove('active');
      submitBtn.querySelector('span').textContent = 'Send Message';
      form.reset();
    }, 1200);
  });
}

function highlightEmptyFields(form) {
  const required = form.querySelectorAll('[required]');
  required.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = 'rgba(239,68,68,0.8)';
      field.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.12)';
      field.addEventListener('input', function recover() {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        field.removeEventListener('input', recover);
      }, { once: true });
    }
  });
}

// ── Scroll Progress Bar ──
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// ── Reveal Animation Observer ──
function initRevealAnimations() {
  const rvElements = document.querySelectorAll('.rv, .rvl');
  if (!rvElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  rvElements.forEach(el => observer.observe(el));
}

// ── Smooth Anchor Scroll ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('nav')?.offsetHeight || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ── Service Card Hover Glow ──
function initCardEffects() {
  document.querySelectorAll('.svc-service-card, .svc-featured-card, .svc-why-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
}

// ── Keyboard Accessibility for FAQ ──
function initFAQKeyboard() {
  document.querySelectorAll('.svc-faq-question').forEach(question => {
    question.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFAQ(this);
      }
    });
  });
}

// ── Nav Active Link for Services Page ──
function initNavActive() {
  // Mark the Services nav link as active (already hardcoded in HTML but double-checks)
  const servicesLinks = document.querySelectorAll('a[href="./"], a[href="/services/"]');
  servicesLinks.forEach(link => {
    if (!link.classList.contains('nav-active')) {
      link.classList.add('nav-active');
    }
  });
}

// ── DOMContentLoaded Init ──
document.addEventListener('DOMContentLoaded', function () {
  // Attach click listeners to FAQ questions
  document.querySelectorAll('.svc-faq-question').forEach(question => {
    question.addEventListener('click', function () {
      toggleFAQ(this);
    });
  });

  initNavActive();
  initStickyButton();
  initContactForm();
  initScrollProgress();
  initRevealAnimations();
  initSmoothScroll();
  initCardEffects();
  initFAQKeyboard();
});