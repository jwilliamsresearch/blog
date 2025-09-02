// Enhanced Interactions and Animations
(function() {
    'use strict';
    
    // Configuration - RE-ENABLED
    const config = {
        scrollIndicator: true,
        geometricShapes: false, // Keep disabled to prevent background interference
        revealAnimations: true,
        navbarShrink: true
    };
    
    // Initialize all enhancements
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initEnhancements);
        } else {
            initEnhancements();
        }
    }
    
    function initEnhancements() {
        if (config.scrollIndicator) initScrollIndicator();
        if (config.geometricShapes) initGeometricShapes();
        if (config.revealAnimations) initRevealAnimations();
        if (config.navbarShrink) initNavbarShrink();
        initSmoothScrolling();
        initPageTransitions();
        initButtonEnhancements();
    }
    
    // Scroll progress indicator
    function initScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #3498db, #2ecc71);
            transform-origin: left;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            indicator.style.transform = `scaleX(${scrollPercent})`;
        });
    }
    
    // Geometric background shapes - DISABLED
    function initGeometricShapes() {
        // Disabled to prevent interference with existing backgrounds
    }
    
    // Reveal animations on scroll - EXCLUDES CLIP TEXT
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.card:not(.bibtex_display .card), h3:not(.clip), .lead');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal', 'revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        reveals.forEach(element => {
            element.classList.add('reveal');
            observer.observe(element);
        });
    }
    
    // Navbar shrink on scroll
    function initNavbarShrink() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide navbar on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, { passive: true });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Page transition animations
    function initPageTransitions() {
        const elements = document.querySelectorAll('main > *, .container > .row, .card');
        
        elements.forEach((element, index) => {
            element.classList.add('page-transition');
            if (index < 4) {
                element.classList.add(`page-transition-delay-${index + 1}`);
            }
        });
    }
    
    // Enhanced button interactions
    function initButtonEnhancements() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Ripple effect
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple animation
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize everything
    init();
    
    // Expose some functions globally for debugging
    window.enhancedInteractions = {
        initRevealAnimations,
        initGeometricShapes,
        initScrollIndicator
    };
    
})();
