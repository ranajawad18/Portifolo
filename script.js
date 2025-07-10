document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom',
    });

    // Smooth scroll for all anchor links in the navbar
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            if (targetElement) {
                let headerOffset = document.querySelector('.site-header').offsetHeight || 70; // Default to 70 if not found
                let elementPosition = targetElement.getBoundingClientRect().top;
                let offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarToggler && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Change header background on scroll
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Dynamic Background Glows based on Section
    const sections = document.querySelectorAll('section.page-section');
    const dynamicGlowsDiv = document.getElementById('dynamic-glows');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40% 0px', // Trigger when section is 40% from bottom of viewport
        threshold: 0.4 // At least 40% of the section is visible
    };

    const glowObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                dynamicGlowsDiv.className = 'common-glows'; // Reset to base
                
                if (sectionId === 'hero') dynamicGlowsDiv.classList.add('glows-hero');
                else if (sectionId === 'about') dynamicGlowsDiv.classList.add('glows-about');
                else if (sectionId === 'education') dynamicGlowsDiv.classList.add('glows-education');
                else if (sectionId === 'experience') dynamicGlowsDiv.classList.add('glows-experience');
                else if (sectionId === 'projects') dynamicGlowsDiv.classList.add('glows-projects');
                else if (sectionId === 'contact') dynamicGlowsDiv.classList.add('glows-contact');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        glowObserver.observe(section);
    });

    // Bootstrap Scrollspy manual initialization (optional, as data attributes should work)
    // var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    //     target: '#mainNavbar',
    //     offset: 100 // Adjust as needed
    // });
});