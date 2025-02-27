// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? null : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon-o');
        icon.classList.add('fa-sun-o');
    } else {
        icon.classList.remove('fa-sun-o');
        icon.classList.add('fa-moon-o');
    }
}

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.querySelector('.navbar');

mobileMenuBtn.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

function setupCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const carouselInner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = carousel.querySelectorAll('.carousel-indicators li');
    const prevBtn = carousel.querySelector('.carousel-control-prev');
    const nextBtn = carousel.querySelector('.carousel-control-next');
    
    let currentIndex = 0;
    const itemCount = items.length;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.toggle("active", index === currentIndex);
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
        });
    });

    let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }, 5000);

    carousel.addEventListener("mouseenter", () => clearInterval(interval));
    carousel.addEventListener("mouseleave", () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }, 5000);
    });

    updateCarousel();
}

setupCarousel("mainCarousel");


// Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    elements.forEach(element => {
        observer.observe(element);
    });
});

// Parallax Effect using requestAnimationFrame
document.addEventListener('DOMContentLoaded', () => {
    const parallaxSections = document.querySelectorAll('.parallax-section');

    function parallaxEffect() {
        let scrollY = window.scrollY;
        
        parallaxSections.forEach(section => {
            const offsetTop = section.offsetTop;
            const parallaxBg = section.querySelector('.parallax-bg');
            const parallaxMid = section.querySelector('.parallax-mid');

            let distance = scrollY - offsetTop;

            if (parallaxBg) {
                parallaxBg.style.transform = `translateY(${distance * 0.3}px) scale(1.2)`;
            }
            if (parallaxMid) {
                parallaxMid.style.transform = `translateY(${distance * 0.2}px)`;
            }
        });

        requestAnimationFrame(parallaxEffect);
    }

    requestAnimationFrame(parallaxEffect);
});

let index = 0;

function moveSlide(step) {
    const testimonials = document.querySelectorAll('.test-carousel-item');
    const track = document.querySelector('.test-carousel-inner');

    testimonials[index].classList.remove('active');
    index = (index + step + testimonials.length) % testimonials.length;
    testimonials[index].classList.add('active');
    
    track.style.transform = `translateX(-${index * 100}%)`;
}

// Auto-slide every 5 seconds
setInterval(() => moveSlide(1), 5000);

