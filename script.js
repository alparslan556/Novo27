document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navbar = document.getElementById('navbar');
    
    if (navToggle && navbar) {
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
                navToggle.setAttribute('aria-label', 'Menü schließen');
            } else {
                icon.className = 'fa-solid fa-bars';
                navToggle.setAttribute('aria-label', 'Menü öffnen');
            }
        });

        // Close mobile nav when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.className = 'fa-solid fa-bars';
                navToggle.setAttribute('aria-label', 'Menü öffnen');
            });
        });
    }

    // --- Navigation Active Link Indicator on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if ((window.scrollY || window.pageYOffset) >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

});
