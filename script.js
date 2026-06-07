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

    // --- Dynamic Opening Hours Status (Cologne/Germany Timezone) ---
    function updateRestaurantStatus() {
        const statusBadge = document.getElementById('status-badge');
        if (!statusBadge) return;

        try {
            // Get current date/time in Europe/Berlin timezone
            const formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Europe/Berlin',
                hour: 'numeric',
                minute: 'numeric',
                weekday: 'long',
                hour12: false
            });

            const parts = formatter.formatToParts(new Date());
            const timeData = {};
            parts.forEach(p => {
                timeData[p.type] = p.value;
            });

            const weekday = timeData.weekday; // e.g., "Monday"
            const hour = parseInt(timeData.hour, 10);
            const minute = parseInt(timeData.minute, 10);

            // Restaurant hours: Mon - Fri, 10:30 - 21:30
            // Calculate total minutes since midnight
            const currentMinutes = hour * 60 + minute;
            const openMinutes = 10 * 60 + 30; // 10:30 -> 630 min
            const closeMinutes = 21 * 60 + 30; // 21:30 -> 1290 min

            const isWeekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(weekday);
            const isOpenTime = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

            statusBadge.classList.remove('checking');
            if (isWeekday && isOpenTime) {
                statusBadge.innerText = 'Jetzt geöffnet (bis 21:30 Uhr)';
                statusBadge.classList.remove('closed');
                statusBadge.classList.add('open');
            } else {
                statusBadge.innerText = 'Jetzt geschlossen';
                statusBadge.classList.remove('open');
                statusBadge.classList.add('closed');
            }
        } catch (error) {
            console.error('Timezone check error:', error);
            // Fallback status if Intl fails
            statusBadge.innerText = 'Öffnungszeiten: Mo-Fr 10:30-21:30 Uhr';
            statusBadge.classList.remove('checking');
            statusBadge.classList.add('open');
        }
    }

    // Run status check instantly and update every 30 seconds
    updateRestaurantStatus();
    setInterval(updateRestaurantStatus, 30000);
});
