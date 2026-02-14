document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    // Reset hamburger bars
                    bars.forEach(bar => bar.style.backgroundColor = 'var(--text-primary)');
                }
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const bars = document.querySelectorAll('.bar');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active'); // Add animation class if needed

        // toggle z-index or visibility stuff if complex
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // Observe other elements for fade-up effect can be added here
    // For example, adding 'hidden' class in CSS and toggling 'show'

    // Project Slider Logic
    document.querySelectorAll('.slider-container').forEach(slider => {
        const wrapper = slider.querySelector('.slider-wrapper');
        const slides = wrapper.querySelectorAll('img');
        const nextBtn = slider.querySelector('.next-btn');
        const prevBtn = slider.querySelector('.prev-btn');
        let currentIndex = 0;

        function updateSlider() {
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlider();
        });

        // Auto-slide functionality
        let slideInterval = setInterval(() => {
            nextBtn.click();
        }, 2000);

        // Pause on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                nextBtn.click();
            }, 2000);
        });
    });

    // Project Title Click Interaction
    document.querySelectorAll('.project-info h3').forEach(title => {
        title.addEventListener('click', () => {
            title.classList.toggle('active-title');
        });
    });
});
