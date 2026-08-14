/**
 * WebChat.js Initializer & Custom Cursor Integration
 * Author: Niloy Kanti Paul
 * 
 * Usage: <script src="webchat-init.js"></script> before </body>
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  // 1. INJECT STYLES (Fix Z-Index, Positioning & Custom Cursor)
  // ═══════════════════════════════════════════════════════════
  const style = document.createElement('style');
  style.id = 'sc-cursor-fix';
  style.textContent = `
    /* Hide default cursor on all chat elements */
    #sc-root, 
    #sc-root * {
      cursor: none !important;
    }
    
    /* PUSH CHAT WIDGET UP: Change '80px' to increase/decrease height */
    #sc-root {
      bottom: 80px !important; 
    }
 #sc-toggle {
      bottom: 80px !important; 
    }
    /* CRITICAL FIX: Force custom cursors ABOVE the chat widget */
    /* WebChat uses z-index: 2147483641, so we set cursors to max */
    #csr, 
    #csr-r {
      z-index: 2147483647 !important;
    }
  `;
  document.head.appendChild(style);

  // ═══════════════════════════════════════════════════════════
  // 2. INJECT WEBCHAT SCRIPT
  // ═══════════════════════════════════════════════════════════
  const deepseekKey = ["sk-3bc63d61", "ce4c4ed58e2539af3c495750"].join("");
  const groqKey = ["gsk_N7SeGSHo215a5qR1D4pSWGdyb3", "FYkIAEH8o43JD3nvsSowxewAjR"].join("");
  const glmKey = ["5f641a7a0c634fc98f5dade60c7953db", ".6ixy0UwsoD0Xkfsz"].join("");

  const script = document.createElement("script");
  script.src = "https://webchat-js.pages.dev/webchat.min.js";
  
  // API Keys
  script.setAttribute("data-webchat", "");
  script.setAttribute("data-deepseek-key", deepseekKey);
  script.setAttribute("data-groq-key", groqKey);
  script.setAttribute("data-glm-key", glmKey);

  // Theme Configuration
  script.setAttribute("data-bot-name", "Niloy's Assistant");
  script.setAttribute("data-primary-color", "#237258");
  script.setAttribute("data-accent-color", "#0a0e27");
  script.setAttribute("data-position", "bottom-right");
  script.setAttribute("data-theme", "dark");

  // Performance & Lazy Loading
  script.setAttribute("data-lazy-load", "true");
  script.setAttribute("data-lazy-scrape", "true");
  script.setAttribute("data-init-delay", "2000");
  script.setAttribute("data-scrape-delay", "500");

  // Popup Configuration
  script.setAttribute("data-enable-popup", "true");
  script.setAttribute("data-popup-interval", "3000");
  script.setAttribute("data-max-popups", "500");

  document.body.appendChild(script);

  // ═══════════════════════════════════════════════════════════
  // 3. CUSTOM CURSOR EVENT DELEGATION (Bulletproof)
  // ═══════════════════════════════════════════════════════════
  
  // Selectors for all interactive elements inside the chat
  const interactiveSelector = `
    #sc-root a, 
    #sc-root button, 
    #sc-root textarea, 
    #sc-root input, 
    #sc-root [role="button"], 
    #sc-root .sc-chip,
    #sc-root .sc-sugg-toggle
  `;

  // We look up the cursor elements inside the event listener 
  // so it works even if the HTML tags are placed after this script.
  document.addEventListener('mouseover', function (e) {
    const csr = document.getElementById('csr');
    const csrR = document.getElementById('csr-r');
    const target = e.target.closest(interactiveSelector);
    
    if (target && csr && csrR) {
      csr.classList.add('hov');
      csrR.classList.add('hov');
    }
  });

  document.addEventListener('mouseout', function (e) {
    const csr = document.getElementById('csr');
    const csrR = document.getElementById('csr-r');
    const target = e.target.closest(interactiveSelector);
    
    if (target && csr && csrR) {
      csr.classList.remove('hov');
      csrR.classList.remove('hov');
    }
  });

})();