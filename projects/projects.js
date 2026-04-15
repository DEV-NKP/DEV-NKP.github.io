// Project filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          // Add animation
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Set initial state for project cards
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });
  
  // Trigger initial animation after page load
  setTimeout(() => {
    projectCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }, 300);
});

// Video modal functionality
function oVM(url) {
  document.getElementById('vf').src = url;
  document.getElementById('vm').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cV() {
  document.getElementById('vm').classList.remove('open');
  document.getElementById('vf').src = '';
  document.body.style.overflow = '';
}

// Close modal when clicking outside
document.getElementById('vm').addEventListener('click', function(e) {
  if (e.target === this) {
    cV();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    cV();
  }
});

// Add hover effect to project cards
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add glow effect
      this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 20px var(--accent-glow)';
    });
    
    card.addEventListener('mouseleave', function() {
      // Remove glow effect
      this.style.boxShadow = '';
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const nav = document.getElementById('nav');
      const targetPosition = target.offsetTop - nav.offsetHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('nav-active');
    }
  });
});

// Add parallax effect to project cards on scroll
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    
    if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
      card.style.transform = `translateY(${yPos * 0.1}px)`;
    }
  });
});