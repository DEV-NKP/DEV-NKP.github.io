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

// Animate elements on scroll
const animateOnScroll = function() {
  const elements = document.querySelectorAll('.rv, .rvl, .rvr');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('on');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add hover effect to feature items
document.addEventListener('DOMContentLoaded', function() {
  const featureItems = document.querySelectorAll('.feature-item');
  
  featureItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      // Add glow effect to icon
      const icon = this.querySelector('.feature-icon');
      icon.style.boxShadow = '0 0 20px var(--accent-glow)';
      icon.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
      // Remove glow effect from icon
      const icon = this.querySelector('.feature-icon');
      icon.style.boxShadow = '';
      icon.style.transform = '';
    });
  });
  
  // Add hover effect to tech items
  const techItems = document.querySelectorAll('.tech-item');
  
  techItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      // Add glow effect to icon
      const icon = this.querySelector('.tech-icon');
      icon.style.boxShadow = '0 0 20px var(--accent-glow)';
      icon.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
      // Remove glow effect from icon
      const icon = this.querySelector('.tech-icon');
      icon.style.boxShadow = '';
      icon.style.transform = '';
    });
  });
});

// Add parallax effect to hero image
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroImg = document.querySelector('.project-hero-img');
  
  if (heroImg) {
    heroImg.style.transform = `translateY(${scrolled * 0.2}px) scale(1.05)`;
  }
});

// Add morphing animation to section titles
document.addEventListener('DOMContentLoaded', function() {
  const sectionTitles = document.querySelectorAll('.project-section-title');
  
  sectionTitles.forEach(title => {
    // Store the original text
    const text = title.textContent;
    title.innerHTML = '';
    
    // Create span elements for each character, preserving spaces
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i];
      span.style.display = 'inline-block';
      span.style.transition = 'all 0.3s ease';
      
      // Special handling for spaces to maintain them properly
      if (text[i] === ' ') {
        span.style.width = '0.3em'; // Adjust width of space as needed
      }
      
      title.appendChild(span);
    }
    
    // Add hover effect
    title.addEventListener('mouseenter', function() {
      animateTitle(this);
    });
    
    // Set up interval for animation when section is active
    let animationInterval;
    const section = title.closest('section');
    
    const startAnimation = () => {
      if (animationInterval) clearInterval(animationInterval);
      animateTitle(title);
      animationInterval = setInterval(() => animateTitle(title), 3000);
    };
    
    const stopAnimation = () => {
      if (animationInterval) {
        clearInterval(animationInterval);
        animationInterval = null;
      }
    };
    
    // Check if section is active based on scroll position
    const checkIfActive = () => {
      const rect = section.getBoundingClientRect();
      const isActive = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isActive) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };
    
    // Start checking if section is active
    window.addEventListener('scroll', checkIfActive);
    checkIfActive(); // Initial check
  });
  
  // Function to animate the title
  function animateTitle(titleElement) {
    const spans = titleElement.querySelectorAll('span');
    
    // Reset all spans first
    spans.forEach(span => {
      span.style.color = '';
      span.style.transform = '';
    });
    
    // Then animate them
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.color = 'var(--accent)';
        span.style.transform = 'translateY(-5px)';
        
        // Reset after animation completes
        setTimeout(() => {
          span.style.color = '';
          span.style.transform = '';
        }, 1000);
      }, index * 50);
    });
  }
});

// Add typing effect to project title with morph animation
document.addEventListener('DOMContentLoaded', function() {
  const projectTitle = document.querySelector('.project-hero-title');
  
  if (projectTitle) {
    const text = projectTitle.textContent;
    
    // Create a temporary element to measure the text width
    const tempElement = document.createElement('span');
    tempElement.style.visibility = 'hidden';
    tempElement.style.position = 'absolute';
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.textContent = text;
    tempElement.className = projectTitle.className; // Copy the same class for styling
    document.body.appendChild(tempElement);
    
    // Get the width of the text
    const textWidth = tempElement.offsetWidth;
    
    // Remove the temporary element
    document.body.removeChild(tempElement);
    
    // Set the title's width to the measured width to reserve space
    projectTitle.style.width = `${textWidth}px`;
    projectTitle.style.display = 'inline-block';
    
    // Clear the title content
    projectTitle.textContent = '';
    
    // Create a container for the morphing effect
    const morphContainer = document.createElement('div');
    morphContainer.style.position = 'relative';
    morphContainer.style.height = '1.2em'; // Adjust based on your font size
    morphContainer.style.overflow = 'hidden';
    projectTitle.appendChild(morphContainer);
    
    // Create the text element for typing
    const textElement = document.createElement('span');
    textElement.style.position = 'absolute';
    textElement.style.whiteSpace = 'nowrap';
    morphContainer.appendChild(textElement);
    
    let index = 0;
    
    function typeWriter() {
      if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
      } else {
        // Add morph animation when typing is complete
        textElement.style.transition = 'transform 0.5s ease';
        setTimeout(() => {
          textElement.style.transform = 'scale(1.05)';
          setTimeout(() => {
            textElement.style.transform = 'scale(1)';
          }, 500);
        }, 200);
      }
    }
    
    // Start typing effect after page load
    setTimeout(typeWriter, 500);
  }
});