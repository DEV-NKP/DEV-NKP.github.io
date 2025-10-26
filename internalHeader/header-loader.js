// header-loader.js
document.addEventListener('DOMContentLoaded', function() {
    // Load header HTML
    fetch('../internalHeader/header.html')
        .then(response => response.text())
        .then(html => {
            // Insert the header HTML at the beginning of the body
            document.body.insertAdjacentHTML('afterbegin', html);
            
            // Initialize header functionality
            initializeHeader();
        })
        .catch(error => {
            console.error('Error loading header:', error);
            
            // Fallback: Create a simple header if loading fails
            const fallbackHeader = document.createElement('div');
            fallbackHeader.className = 'header-root';
            fallbackHeader.innerHTML = `
                <header class="header-header" style="padding: 1rem; text-align: center; background: #0a0a0a;">
                    <a href="/" style="color: white; text-decoration: none; font-size: 1.2rem;">NILOY KANTI PAUL</a>
                </header>
            `;
            document.body.insertBefore(fallbackHeader, document.body.firstChild);
        });
});

// ===================== HEADER SPECIFIC FUNCTIONS =====================
// These functions are specifically for header functionality
// Can be removed if header is removed without affecting other parts

function initializeHeader() {
    // DOM Elements for Header
    const primaryNav = document.getElementById('header-navlink');
    const navToggle = document.getElementById('header-mobile-nav-toggle');
    const mobileNav = document.getElementById('header-mobile-nav');
    const mobileMenuToggle = document.getElementById('header-mobile-menu-toggle');
    const header = document.getElementById('header-header');
    const themeToggle = document.getElementById('header-theme-toggle');
    const themeToggleMobile = document.getElementById('header-theme-toggle-mobile');
    
    // Function to toggle navigation visibility
    function toggleNav() {
        const visibility = navToggle.getAttribute('aria-expanded');
        const newVisibility = visibility === "false" ? "true" : "false";
        
        // Update aria-expanded attribute
        navToggle.setAttribute('aria-expanded', newVisibility);
        
        // Update mobile nav visibility
        if (newVisibility === "true") {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
    
    // Mobile menu toggle - main toggle
    navToggle.addEventListener('click', toggleNav);
    
    // Mobile menu close toggle - inside mobile nav
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            toggleNav();
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.header-mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleNav();
        });
    });
    
    // Scroll event handler for header
    function handleScroll() {
        const scrollY = window.scrollY;
        const scrollUpBtn = document.querySelector('.header-scroll-up-btn');
        
        // Check if we're on a page where sticky header should be applied
        const shouldApplySticky = document.body.classList.contains('sticky-header-enabled');
        
        // Apply sticky header only on pages where it's enabled
        if (shouldApplySticky) {
            header.classList.toggle("sticky", scrollY > 20);
        }
        
        // Show scroll-up button (this will work on all pages)
        scrollUpBtn.classList.toggle("show", scrollY > 500);
    }
    
    // Scroll to top function
    function headerScrollToTop() {
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Add click animation to theme toggle
    function addThemeToggleAnimation(toggleElement) {
        if (toggleElement) {
            toggleElement.addEventListener('click', function() {
                // Add click animation
                this.classList.add('clicked');
                setTimeout(() => {
                    this.classList.remove('clicked');
                }, 400);
                
                // Call the changeColor function
                headerChangeColor();
            });
        }
    }
    
    // Apply animation to both desktop and mobile theme toggles
    addThemeToggleAnimation(themeToggle);
    addThemeToggleAnimation(themeToggleMobile);
    
    // Event listeners for header
    window.addEventListener("scroll", handleScroll);
    
    // Make headerScrollToTop globally accessible
    window.headerScrollToTop = headerScrollToTop;
}

// ===================== END OF HEADER SPECIFIC FUNCTIONS =====================

// ===================== THEME TOGGLE FUNCTION (DEPENDENT ON HEADER) =====================
// This function depends on header elements but controls theme for the entire page
// Can be modified to work independently if needed

function headerChangeColor() {
    const element = document.getElementById("header-dark-light");
    const elementMobile = document.getElementById("header-dark-light-mobile");
    const toggle = document.getElementById("header-theme-toggle");
    const toggleMobile = document.getElementById("header-theme-toggle-mobile");
    const body = document.body;
    const isDarkMode = element.classList.contains("fa-moon");
    
    // Toggle body theme
    body.classList.toggle("dark-body");
    body.classList.toggle("white-body");
    // Toggle theme toggle classes
    if (toggle) {
        toggle.classList.toggle("light", !isDarkMode);
    }
    if (toggleMobile) {
        toggleMobile.classList.toggle("light", !isDarkMode);
    }
    
    // Theme elements configuration (from original code)
    const themeElements = [
        { elements: document.getElementsByClassName("video-ques-div"), dark: "dark", light: "white" },
        { elements: document.getElementsByClassName("card"), dark: "dark-card", light: "white-card" },
        { elements: document.getElementsByClassName("work-data"), dark: "dark-work-data", light: "white-work-data" },
        { elements: document.getElementsByClassName("case_study_card"), dark: "dark-case-study", light: "white-case-study" },
        { elements: document.getElementsByClassName("edu-data"), dark: "dark-edu-data", light: "white-edu-data" },
        { elements: document.getElementsByClassName("sub-title"), dark: "dark-sub-title", light: "white-sub-title" },
        { elements: document.getElementsByClassName("input-span"), dark: "dark-input-span", light: "white-input-span" },
        { elements: document.getElementsByClassName("input"), dark: "dark-input", light: "white-input" },
        { elements: document.getElementById("certificates"), dark: "dark-certificate", light: "white-certificate" },
        { elements: document.getElementById("contact-title"), dark: "title-black", light: "title-white" },
        { elements: document.getElementById("project-title"), dark: "title-black", light: "title-white" },
        { elements: document.getElementById("work-title"), dark: "title-black", light: "title-white" },
        { elements: document.getElementById("edu-title"), dark: "title-black", light: "title-white" },
        { elements: document.getElementById("case-title"), dark: "title-black", light: "title-white" },
        { elements: document.getElementById("certification-title"), dark: "title-black", light: "title-white" },
        { elements: document.getElementById("about-title"), dark: "title-black", light: "title-white" },
        { elements: document.getElementById("skill-title"), dark: "title-black", light: "title-white" },
        { elements: document.getElementById("publication-title"), dark: "title-black", light: "title-white" },
    ];
    
    themeElements.forEach(({ elements, dark, light }) => {
        if (elements) {
            if (elements instanceof Element) {
                elements.classList.toggle(dark, isDarkMode);
                elements.classList.toggle(light, !isDarkMode);
            } else {
                Array.from(elements).forEach(el => {
                    el.classList.toggle(dark, isDarkMode);
                    el.classList.toggle(light, !isDarkMode);
                });
            }
        }
    });
    
    // Toggle icon
    element.classList.toggle("fa-moon", !isDarkMode);
    element.classList.toggle("fa-lightbulb", isDarkMode);
    
    if (elementMobile) {
        elementMobile.classList.toggle("fa-moon", !isDarkMode);
        elementMobile.classList.toggle("fa-lightbulb", isDarkMode);
    }
}

// ===================== END OF THEME TOGGLE FUNCTION =====================

// ===================== INDEPENDENT FUNCTIONS (Not affected by header changes) =====================
// These functions work independently of the header and can be moved to a separate file

// Initialize Typed.js for typing animations
function initTyped() {
    if (typeof Typed !== 'undefined') {
        new Typed(".typing", {
            strings: ["an Engineer.", "a Researcher.", "a Developer.", "a Designer."],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true
        });
        new Typed(".typing-2", {
            strings: ["an Engineer.", "a Researcher.", "a Developer.", "a Designer."],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }
}

// Reveal animations on scroll
let flagbar = false;
let flagABcount = false;
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            if (reveal.classList.contains('TTB')) {
                reveal.classList.add("activeTTB");
            } else if (reveal.classList.contains('BTT')) {
                reveal.classList.add("activeBTT");
                if (reveal.classList.contains('about-count') && !flagABcount) {
                    flagABcount = true;
                    countABAnimation(".count-pro", 25);
                    countABAnimation(".count-exp", 0);
                    countABAnimation(".count-comp", 3);
                }
            } else if (reveal.classList.contains('LTR')) {
                reveal.classList.add("activeLTR");
                if (reveal.classList.contains('show-percent') && !flagbar) {
                    flagbar = true;
                    barAnimation(".c", ".c-text", 95);
                    barAnimation(".cpp", ".cpp-text", 90);
                    barAnimation(".cs", ".cs-text", 85);
                    barAnimation(".java", ".java-text", 80);
                    barAnimation(".py", ".py-text", 60);
                    barAnimation(".html", ".html-text", 98);
                    barAnimation(".css", ".css-text", 95);
                    barAnimation(".js", ".js-text", 80);
                    barAnimation(".php", ".php-text", 85);
                    barAnimation(".mysql", ".mysql-text", 75);
                    barAnimation(".aspnet", ".aspnet-text", 80);
                    barAnimation(".sqlserver", ".sqlserver-text", 70);
                }
            } else if (reveal.classList.contains('RTL')) {
                reveal.classList.add("activeRTL");
            }
        } else {
            if (reveal.classList.contains('show-percent') && flagbar) flagbar = false;
            if (reveal.classList.contains('about-count') && flagABcount) flagABcount = false;
            reveal.classList.remove("activeTTB", "activeBTT", "activeLTR", "activeRTL");
        }
    });
}

// Bar animation for skills
function barAnimation(line, text, percent) {
    const elem = document.querySelector(line);
    const elemText = document.querySelector(text);
    if (!elem || !elemText) return;
    
    let width = 1;
    const id = setInterval(() => {
        if (width >= percent) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + "%";
            elemText.innerHTML = width + "%";
        }
    }, 30);
}

// Count animation for about section
function countABAnimation(text, num) {
    const c = document.querySelector(text);
    if (!c) return;
    
    let x = 1;
    const id = setInterval(() => {
        if (x >= num) {
            clearInterval(id);
        } else {
            x++;
            c.innerHTML = x;
        }
    }, 100);
}

// Form submission
function submitForm() {
    const successContainer = document.getElementById("success-container");
    const htmlMain = document.getElementById("html-main");
    const successMsg = document.getElementById("success-message");
    
    if (successContainer && htmlMain && successMsg) {
        successContainer.style.display = 'flex';
        htmlMain.classList.add("stop-scroll");
        successMsg.classList.add("start-scroll");
        
        const form = document.querySelector('.my-form');
        if (form) {
            const formData = new FormData(form);
            const url = "https://formsubmit.io/send/3d570815-9c63-444a-b736-63cc759338a9";
            fetch(url, {
                method: 'POST',
                body: formData
            }).then(response => {
                console.log('Form submitted successfully');
            }).catch(error => {
                console.error('Form submission error:', error);
            });
        }
    }
    return false;
}

// Show more certificates
function showmore() {
    const showMoreBtn = document.getElementById("showmore");
    const certificates = document.getElementById("certificates");
    const hideCertificates = document.getElementById("hide-certificates");
    
    if (showMoreBtn && certificates && hideCertificates) {
        const buttonmsg = showMoreBtn.innerHTML;
        if (buttonmsg === "Show More") {
            while (hideCertificates.firstChild) {
                certificates.appendChild(hideCertificates.firstChild);
            }
            showMoreBtn.innerHTML = "Show Less";
        } else {
            const items = certificates.children;
            while (items.length > 3) {
                hideCertificates.appendChild(items[3]);
            }
            showMoreBtn.innerHTML = "Show More";
            window.location.href = "#experience";
        }
    }
}

// Show certificate
function showcertificate(name) {
    const certificateContainer = document.getElementById("certificate-container");
    const certificateGif = document.getElementById("certificate-gif");
    const htmlMain = document.getElementById("html-main");
    const certificateMsg = document.getElementById("certificate-message");
    
    if (certificateContainer && certificateGif && htmlMain && certificateMsg) {
        certificateContainer.style.display = 'flex';
        certificateGif.src = `../resources/certificates/${name}.jpg`;
        htmlMain.classList.add("stop-scroll");
        certificateMsg.classList.add("start-scroll");
    }
}

// Back to certificates
function backtocertificate() {
    const certificateContainer = document.getElementById("certificate-container");
    const htmlMain = document.getElementById("html-main");
    const certificateMsg = document.getElementById("certificate-message");
    
    if (certificateContainer && htmlMain && certificateMsg) {
        certificateContainer.style.display = 'none';
        htmlMain.classList.remove("stop-scroll");
        certificateMsg.classList.remove("start-scroll");
    }
}

// ===================== END OF INDEPENDENT FUNCTIONS =====================

// Initialize independent functions
document.addEventListener("DOMContentLoaded", () => {
    initTyped();
    window.addEventListener("scroll", reveal);
    
    // Initialize Owl Carousel if available
    if (typeof $ !== 'undefined' && $.fn.owlCarousel) {
        $(".carousel").owlCarousel({
            margin: 20,
            rewind: true,
            autoplay: true,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            mouseDrag: true,
            touchDrag: true,
            mergeFit: true,
            lazyLoad: true,
            video: true,
            checkVisible: false,
            responsive: {
                0: { items: 1, nav: false },
                600: { items: 2, nav: false },
                1000: { items: 3, nav: false }
            }
        });
    }
});