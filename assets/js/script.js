document.addEventListener('DOMContentLoaded', () => {

    const revealElements = document.querySelectorAll(
        '.intro-container, .project-card, .edu-card, .about-container, .screen, .social-icons'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));

    const navLinks = document.querySelectorAll('.nav-links a, .logo');
    const header = document.querySelector('.header');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offset = header.offsetHeight + 20;
                    const targetPosition = targetElement.offsetTop - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});