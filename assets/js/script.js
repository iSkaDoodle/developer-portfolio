document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SMOOTH SCROLLING FOR NAV LINKS
    const navLinks = document.querySelectorAll('.nav-links a, .logo');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only handle internal links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calculate header height to offset the scroll
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. INTERSECTION OBSERVER (REVEAL ON SCROLL)
    const revealElements = document.querySelectorAll(
        '.intro-container, .project-card, .edu-card, .about-container, .screen, .socials'
    );

    const observerOptions = {
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal'); // Add the hidden state
        observer.observe(el);
    });
});