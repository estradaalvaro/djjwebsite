document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling
    const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Move focus to the target element for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                targetElement.removeAttribute('tabindex');
            }
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target, 1000);
        });
    });

    // Navbar Toggler
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbar = document.querySelector('.navbar');

    // Add ARIA attributes
    navbarToggler.setAttribute('aria-expanded', 'false');
    navbarToggler.setAttribute('aria-controls', 'navbarNav');

    navbarToggler.addEventListener('click', () => {
        const expanded = navbar.classList.toggle('show');
        navbarToggler.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Optional: Close the navbar when a link is clicked
    navbarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('show')) {
                navbar.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close navbar when clicked outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !navbarToggler.contains(e.target)) {
            if (navbar.classList.contains('show')) {
                navbar.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Allow closing the navbar with the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar.classList.contains('show')) {
            navbar.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        }
    });
});
