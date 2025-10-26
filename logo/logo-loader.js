// logo-loader.js
document.addEventListener('DOMContentLoaded', function() {
    // Load logo HTML
    fetch('./logo/logo.html')
        .then(response => response.text())
        .then(html => {
            // Find all logo containers in the document
            const logoContainers = document.querySelectorAll('.logo-component-container');
            
            // If no specific containers found, add to body
            if (logoContainers.length === 0) {
                document.body.insertAdjacentHTML('afterbegin', html);
                initializeLogo();
            } else {
                // Add logo to each container
                logoContainers.forEach(container => {
                    container.innerHTML = html;
                    // Initialize logo for this container
                    initializeLogo(container);
                });
            }
        })
        .catch(error => {
            console.error('Error loading logo:', error);
            
            // Fallback: Create a simple logo if loading fails
            const fallbackLogo = document.createElement('div');
            fallbackLogo.className = 'logo-root';
            fallbackLogo.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <h2 style="color: #333;">Niloy Paul</h2>
                    <p style="color: #555;">Portfolio</p>
                </div>
            `;
            
            const logoContainers = document.querySelectorAll('.logo-component-container');
            if (logoContainers.length === 0) {
                document.body.insertBefore(fallbackLogo, document.body.firstChild);
            } else {
                logoContainers.forEach(container => {
                    container.appendChild(fallbackLogo.cloneNode(true));
                });
            }
        });
});

// ===================== LOGO SPECIFIC FUNCTIONS =====================
// These functions are specifically for logo functionality
// Can be removed if logo is removed without affecting other parts

function initializeLogo(container = document) {
    const logoContainer = container.querySelector('#logo-container') || container;
    const leftText = "Niloy";
    const rightText = "Paul";
    const leftElement = container.querySelector('#logo-left-text');
    const rightElement = container.querySelector('#logo-right-text');
    const subtitle = container.querySelector('#logo-subtitle');
    const borderPath = container.querySelector('.logo-border-path');
    const morphPathLeft = container.querySelector('.logo-morph-path-left');
    const morphPathRight = container.querySelector('.logo-morph-path-right');
    const liquidLeft = container.querySelector('.logo-liquid-left');
    const liquidRight = container.querySelector('.logo-liquid-right');
    const shineLeft = container.querySelector('.logo-left .logo-shine');
    const shineRight = container.querySelector('.logo-right .logo-shine');
    
    let animationInProgress = false;
    let hoverTimeout = null;
    let particleInterval = null;
    
    // Create continuous particle animation
    function startParticleAnimation() {
        // Clear any existing interval
        if (particleInterval) clearInterval(particleInterval);
        
        // Create particles at regular intervals
        particleInterval = setInterval(() => {
            // Create particles for left side
            for (let i = 0; i < 2; i++) {
                createParticle('left');
            }
            
            // Create particles for right side
            for (let i = 0; i < 2; i++) {
                createParticle('right');
            }
        }, 300);
    }
    
    // Create a single particle
    function createParticle(side) {
        const particle = document.createElement('div');
        particle.className = `logo-particle logo-particle-${side}`;
        
        // Random position within the appropriate half
        const leftOffset = side === 'left' ? 15 : 240; // 15px padding + half width
        const randomX = leftOffset + Math.random() * 195; // Half width minus padding
        const randomY = 15 + Math.random() * 110; // Height minus padding
        
        particle.style.left = `${randomX}px`;
        particle.style.top = `${randomY}px`;
        
        logoContainer.appendChild(particle);
        
        // Animate the particle
        setTimeout(() => {
            particle.style.animation = `logo-particleFloat ${2 + Math.random() * 2}s ease-out forwards`;
        }, 10);
        
        // Remove particle after animation completes
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }
    
    // Add logo animation styles
    const logoStyle = document.createElement('style');
    logoStyle.textContent = `
        @keyframes logo-particleFloat {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0);
            }
            20% {
                opacity: 1;
                transform: translateY(-15px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-80px) scale(0.5);
            }
        }
        
        @keyframes logo-drawBorder {
            to {
                stroke-dashoffset: 0;
            }
        }
        
        @keyframes logo-reverseBorder {
            from {
                stroke-dashoffset: 0;
            }
            to {
                stroke-dashoffset: 1200;
            }
        }
        
        @keyframes logo-morphLeft {
            0% {
                d: path("M0,0 L0,0 L0,110 L0,110 Z");
            }
            50% {
                d: path("M0,0 L210,0 L210,110 L0,110 Z");
            }
            100% {
                d: path("M-210,0 L210,0 L210,110 L-210,110 Z");
            }
        }
        
        @keyframes logo-reverseMorphLeft {
            0% {
                d: path("M-210,0 L210,0 L210,110 L-210,110 Z");
            }
            50% {
                d: path("M0,0 L210,0 L210,110 L0,110 Z");
            }
            100% {
                d: path("M0,0 L0,0 L0,110 L0,110 Z");
            }
        }
        
        @keyframes logo-morphRight {
            0% {
                d: path("M210,0 L210,0 L210,110 L210,110 Z");
            }
            50% {
                d: path("M0,0 L210,0 L210,110 L0,110 Z");
            }
            100% {
                d: path("M-210,0 L420,0 L420,110 L-210,110 Z");
            }
        }
        
        @keyframes logo-reverseMorphRight {
            0% {
                d: path("M-210,0 L420,0 L420,110 L-210,110 Z");
            }
            50% {
                d: path("M0,0 L210,0 L210,110 L0,110 Z");
            }
            100% {
                d: path("M210,0 L210,0 L210,110 L210,110 Z");
            }
        }
        
        @keyframes logo-textAppear {
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes logo-textDisappear {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.8);
            }
        }
        
        @keyframes logo-letterReveal {
            to {
                opacity: 1;
                transform: translateY(0) rotateX(0);
            }
        }
        
        @keyframes logo-letterHide {
            from {
                opacity: 1;
                transform: translateY(0) rotateX(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px) rotateX(90deg);
            }
        }
        
        @keyframes logo-liquidSwipe {
            0% {
                opacity: 0;
                transform: translateX(-100%) rotate(45deg);
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translateX(100%) rotate(45deg);
            }
        }
        
        @keyframes logo-liquidSwipeRight {
            0% {
                opacity: 0;
                transform: translateX(100%) rotate(45deg);
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
                transform: translateX(-100%) rotate(45deg);
            }
        }
        
        @keyframes logo-shine {
            0% {
                left: -100%;
            }
            20% {
                left: 100%;
            }
            100% {
                left: 100%;
            }
        }
        
        @keyframes logo-fadeIn {
            to {
                opacity: 1;
            }
        }
        
        @keyframes logo-fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        @keyframes logo-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(logoStyle);
    
    // Reset and start animations
    function startAnimations() {
        if (animationInProgress) return;
        animationInProgress = true;
        
        // Reset all elements to initial state
        borderPath.style.animation = 'none';
        morphPathLeft.style.animation = 'none';
        morphPathRight.style.animation = 'none';
        leftElement.style.animation = 'none';
        rightElement.style.animation = 'none';
        liquidLeft.style.animation = 'none';
        liquidRight.style.animation = 'none';
        shineLeft.style.animation = 'none';
        shineRight.style.animation = 'none';
        subtitle.style.animation = 'none';
        
        // Reset morph paths to initial state
        morphPathLeft.setAttribute('d', 'M0,0 L0,0 L0,110 L0,110 Z');
        morphPathRight.setAttribute('d', 'M210,0 L210,0 L210,110 L210,110 Z');
        
        // Reset border
        borderPath.style.strokeDashoffset = '1200';
        
        // Clear text
        leftElement.innerHTML = '';
        rightElement.innerHTML = '';
        leftElement.style.opacity = '0';
        rightElement.style.opacity = '0';
        subtitle.style.opacity = '0';
        
        // Force reflow
        void logoContainer.offsetWidth;
        
        // Start border animation
        borderPath.style.animation = 'logo-drawBorder 2.5s ease-in-out forwards';
        
        // Start morph animations
        morphPathLeft.style.animation = 'logo-morphLeft 2s ease-in-out 0.5s forwards';
        morphPathRight.style.animation = 'logo-morphRight 2s ease-in-out 0.7s forwards';
        
        // Animate text with staggered letter appearance
        function animateText(element, text, delay) {
            element.innerHTML = '';
            element.style.animation = `logo-textAppear 1s ease-out ${delay}s forwards`;
            
            text.split('').forEach((letter, index) => {
                const span = document.createElement('span');
                span.className = 'logo-letter';
                span.textContent = letter;
                span.style.animation = `logo-letterReveal 0.6s ease-out ${delay + index * 0.1}s forwards`;
                element.appendChild(span);
            });
        }
        
        // Start text animations
        animateText(leftElement, leftText, 2.7);
        animateText(rightElement, rightText, 2.9);
        
        // Start liquid animations
        liquidLeft.style.animation = 'logo-liquidSwipe 2s ease-out 3s forwards';
        liquidRight.style.animation = 'logo-liquidSwipeRight 2s ease-out 3.2s forwards';
        
        // Start shine animations
        shineLeft.style.animation = 'logo-shine 4s infinite 4s';
        shineRight.style.animation = 'logo-shine 4s infinite 4.2s';
        
        // Start subtitle animation
        subtitle.style.animation = 'logo-fadeIn 1s ease-out 3.5s forwards';
        
        // Start continuous particle animation
        startParticleAnimation();
        
        // Reset animation flag after completion
        setTimeout(() => {
            animationInProgress = false;
        }, 5000);
    }
    
    // Smooth hover transition
    function smoothHoverTransition() {
        if (animationInProgress) return;
        animationInProgress = true;
        
        // Clear any existing hover timeout
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
        
        // Add a subtle pulse effect instead of full reverse
        logoContainer.style.animation = 'logo-pulse 0.5s ease';
        
        // Add a temporary liquid effect
        liquidLeft.style.animation = 'none';
        liquidRight.style.animation = 'none';
        
        void liquidLeft.offsetWidth; // Force reflow
        
        liquidLeft.style.animation = 'logo-liquidSwipe 1s ease-out forwards';
        liquidRight.style.animation = 'logo-liquidSwipeRight 1s ease-out 0.2s forwards';
        
        // Reset after animation
        setTimeout(() => {
            logoContainer.style.animation = '';
            animationInProgress = false;
        }, 1000);
    }
    
    // Start animations on load
    startAnimations();
    
    // Handle hover events with smooth transition
    logoContainer.addEventListener('mouseenter', function() {
        smoothHoverTransition();
    });
}

// ===================== END OF LOGO SPECIFIC FUNCTIONS =====================