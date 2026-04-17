/* ══════════════════════════════════════════════════════════
   CASE STUDY DETAIL PAGE — SHARED SCRIPTS
══════════════════════════════════════════════════════════ */

// ── PERFORMANCE UTILS ──
const csdDebounce=(fn,w)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),w);}};
const csdThrottle=(fn,l)=>{let t;return(...a)=>{if(!t){fn(...a);t=setTimeout(()=>t=null,l);}};};

// ── FAQ ACCORDION ──
document.querySelectorAll('.csd-faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.csd-faq-item');
    const wasOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.csd-faq-item.open').forEach(i => i.classList.remove('open'));
    // Toggle clicked
    if (!wasOpen) item.classList.add('open');
  });
});

// ── TOC ACTIVE STATE & MOBILE SCROLL ──
(function() {
  const tocContainer = document.querySelector('.csd-toc-inner');
  const tocLinks = document.querySelectorAll('.csd-toc-link');
  const sections = [];
  
  tocLinks.forEach(link => {
    const id = link.getAttribute('href');
    if (id && id.startsWith('#')) {
      const el = document.querySelector(id);
      if (el) sections.push({ el, link });
    }
  });

  function updateToc() {
    const scrollY = window.scrollY + 160;
    let current = null;
    sections.forEach(s => {
      if (s.el.offsetTop <= scrollY) current = s;
    });
    
    tocLinks.forEach(l => l.classList.remove('active'));
    if (current) {
      current.link.classList.add('active');
      
      // Auto-scroll TOC on mobile to keep active link visible
      if (window.innerWidth <= 768 && tocContainer) {
        const linkRect = current.link.getBoundingClientRect();
        const containerRect = tocContainer.getBoundingClientRect();
        
        if (linkRect.left < containerRect.left || linkRect.right > containerRect.right) {
          tocContainer.scrollTo({
            left: current.link.offsetLeft - tocContainer.offsetWidth / 2 + current.link.offsetWidth / 2,
            behavior: 'smooth'
          });
        }
      }
    }
  }

  window.addEventListener('scroll', csdThrottle(updateToc, 100), { passive: true });
  updateToc();
})();

// ── COUNTER ANIMATION ──
(function() {
  const counters = document.querySelectorAll('.csd-hero-stat-num, .csd-result-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const num = parseFloat(text);
        const suffix = text.replace(/[0-9.]/g, '');
        if (isNaN(num)) return;
        let start = 0;
        const duration = 2000;
        const step = num / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { start = num; clearInterval(timer); }
          el.textContent = Math.round(start) + suffix;
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => observer.observe(c));
})();

// ── TECH CAROUSEL DUPLICATION (for infinite scroll) ──
document.querySelectorAll('.csd-tech-track').forEach(track => {
  const items = Array.from(track.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
});

// ── SMOOTH SCROLL FOR TOC LINKS ──
document.querySelectorAll('.csd-toc-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const target = document.querySelector(id);
    if (target) {
      const offset = 140;
      const top = target.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── REVEAL ANIMATIONS ──
(function() {
  const revealEls = document.querySelectorAll('.csd-rv');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => obs.observe(el));
})();

// ── SHARE FUNCTIONALITY ──
window.csdShare = function(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const links = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    email: `mailto:?subject=${title}&body=Check out this case study: ${decodeURIComponent(url)}`
  };
  if (links[platform]) window.open(links[platform], '_blank', 'width=600,height=400');
};

// ── BACK TO TOP ──
const csdStb = document.getElementById('stb');
if (csdStb) {
  window.addEventListener('scroll', csdThrottle(() => {
    csdStb.classList.toggle('on', window.scrollY > 400);
  }, 100), { passive: true });
}