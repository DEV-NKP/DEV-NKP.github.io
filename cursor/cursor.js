document.addEventListener('DOMContentLoaded', () => {
    // Performance optimization: Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Don't initialize if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    // Create cursor element dynamically
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    
    // Add cursor element to the body
    document.body.appendChild(cursor);
    
    const body = document.body;
    
    // Check if mobile device - simplified check
    const isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    // Quick browser support check
    const isSupported = !!(window.CSS && CSS.supports && CSS.supports('transform', 'translateZ(0)'));
    
    // Initialize custom cursor if supported and not mobile
    if (!isMobile && isSupported) {
        // Add class to body to indicate custom cursor is active
        body.classList.add('custom-cursor-active');
        
        // Position tracking with requestAnimationFrame for smooth performance
        let mouseX = 0, mouseY = 0;
        
        // Throttled mouse move handler
        let isTicking = false;
        
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Update cursor immediately
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
            
            // Use requestAnimationFrame for smooth performance
            if (!isTicking) {
                isTicking = true;
                requestAnimationFrame(() => {
                    isTicking = false;
                });
            }
        };
        
        // Add single mousemove listener to document
        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        
        // Use event delegation for better performance
        const handleElementHover = (e) => {
            const target = e.target;
            
            // Remove all existing classes first
            cursor.className = 'cursor';
            
            // Add appropriate classes based on element type
            if (target.matches('h1, h2, h3, h4, h5, h6')) {
                cursor.classList.add('cursor-heading');
            } else if (target.matches('p')) {
                cursor.classList.add('cursor-paragraph');
            } else if (target.matches('img')) {
                cursor.classList.add('cursor-img');
            } else if (target.matches('a')) {
                cursor.classList.add('cursor-link', 'pulse');
            } else if (target.matches('input, textarea')) {
                cursor.classList.add('cursor-input');
            } else if (target.matches('button')) {
                cursor.classList.add('cursor-button', 'pulse');
            }
        };
        
        const handleElementLeave = () => {
            // Reset to default cursor state
            cursor.className = 'cursor';
        };
        
        // Add event delegation listeners
        document.addEventListener('mouseover', handleElementHover);
        document.addEventListener('mouseout', handleElementLeave);
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
        
        // Handle window resize - debounced
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth <= 768) {
                    cursor.style.display = 'none';
                } else {
                    cursor.style.display = 'block';
                }
            }, 150);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup function to prevent memory leaks
        const cleanup = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleElementHover);
            document.removeEventListener('mouseout', handleElementLeave);
            document.removeEventListener('mouseleave', () => {});
            document.removeEventListener('mouseenter', () => {});
            window.removeEventListener('resize', handleResize);
        };
        
        // Optional: Cleanup on page unload
        window.addEventListener('beforeunload', cleanup);
        
    } else {
        // Custom cursor not supported or mobile device
        cursor.style.display = 'none';
    }
});