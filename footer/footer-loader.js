// footer-loader.js
document.addEventListener('DOMContentLoaded', function() {
    // Load footer HTML
    fetch('./footer/footer.html')
        .then(response => response.text())
        .then(html => {
            // Insert the footer HTML at the end of the body
            document.body.insertAdjacentHTML('beforeend', html);
            
            // Initialize footer functionality
            initializeFooter();
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            
            // Fallback: Create a simple footer if loading fails
            const fallbackFooter = document.createElement('div');
            fallbackFooter.className = 'footer-root';
            fallbackFooter.innerHTML = `
                <footer class="footer-modern" style="padding: 1rem; text-align: center;">
                    <div class="footer-bottom">
                        <div class="footer-copyright">© 2024 Niloy Kanti Paul. All rights reserved.</div>
                    </div>
                </footer>
            `;
            document.body.appendChild(fallbackFooter);
        });
});

function initializeFooter() {
    // Create animated particles
    createFooterParticles();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('.footer-modern a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe footer sections
    document.querySelectorAll('.footer-section').forEach(section => {
        observer.observe(section);
    });
    
    // Add ripple effect to contact items
    document.querySelectorAll('.footer-contact-item').forEach(item => {
        item.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(79, 70, 229, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'footer-ripple 0.6s ease-out';
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes footer-ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

function createFooterParticles() {
    const particlesContainer = document.getElementById('footer-particles');
    if (!particlesContainer) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'footer-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}