// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Observe cards
document.querySelectorAll('.certificate-card, .skill-category, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Typing effect for hero title
const heroName = document.querySelector('.hero-name');
const originalText = heroName.textContent;
heroName.textContent = '';
let charIndex = 0;

function typeWriter() {
    if (charIndex < originalText.length) {
        heroName.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .nav-toggle.active .bar:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .nav-toggle.active .bar:nth-child(2) {
        opacity: 0;
    }
    .nav-toggle.active .bar:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Email validation for contact
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Auto-scroll functionality for projects
const projectsGrid = document.querySelector('.projects-grid');
let isScrolling = false;
let scrollDirection = 1;
let scrollInterval;

function startAutoScroll() {
    if (!projectsGrid) return;
    
    scrollInterval = setInterval(() => {
        if (!isScrolling) {
            const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;
            
            if (projectsGrid.scrollLeft >= maxScroll) {
                scrollDirection = -1;
            } else if (projectsGrid.scrollLeft <= 0) {
                scrollDirection = 1;
            }
            
            projectsGrid.scrollBy({
                left: scrollDirection * 1,
                behavior: 'smooth'
            });
        }
    }, 30);
}

function stopAutoScroll() {
    clearInterval(scrollInterval);
}

// Start auto-scroll when projects section is visible
const projectsSection = document.getElementById('projects');
const autoScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
    });
}, { threshold: 0.3 });

if (projectsSection) {
    autoScrollObserver.observe(projectsSection);
}

// Pause auto-scroll on hover
if (projectsGrid) {
    projectsGrid.addEventListener('mouseenter', () => {
        isScrolling = true;
    });
    
    projectsGrid.addEventListener('mouseleave', () => {
        isScrolling = false;
    });
    
    // Touch support for mobile
    projectsGrid.addEventListener('touchstart', () => {
        isScrolling = true;
    });
    
    projectsGrid.addEventListener('touchend', () => {
        setTimeout(() => {
            isScrolling = false;
        }, 2000);
    });
}
