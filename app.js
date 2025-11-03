// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Scroll functionality
    initScrollFeatures();
    
    // Skills animation
    initSkillsAnimation();
    
    // Contact form
    initContactForm();
    
    // Mobile menu
    initMobileMenu();
    
    // Smooth scrolling for all links
    initSmoothScrolling();
    
    // Loading animations
    initLoadingAnimations();
    
    // Form validation
    initFormValidation();
    
    // Advanced animations
    initAdvancedAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(19, 52, 59, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(19, 52, 59, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active navigation link
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
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
}

// Scroll features (progress bar and back to top)
function initScrollFeatures() {
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        // Scroll progress
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
        
        // Back to top button
        if (scrollTop > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Back to top click - Fixed functionality
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skills animation
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    // Intersection Observer for skills animation
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkills();
                skillsAnimated = true;
            }
        });
    }, {
        threshold: 0.5
    });
    
    observer.observe(skillsSection);
    
    function animateSkills() {
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }, index * 100);
        });
    }
}

// Contact form functionality - Fixed with better feedback
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form first
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showMessage('Please fix the errors above', 'error');
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Create mailto link
            const mailtoLink = `mailto:ikkujoel5501@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.open(mailtoLink, '_blank');
            
            // Reset form and show success
            contactForm.reset();
            submitButton.textContent = 'Message Sent Successfully!';
            submitButton.style.background = 'var(--color-success)';
            
            // Clear all field errors
            const errorElements = contactForm.querySelectorAll('.field-error');
            errorElements.forEach(error => error.remove());
            
            // Show success message
            showMessage('Thank you! Your message has been sent. I\'ll get back to you soon.', 'success');
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Mobile menu functionality - Fixed
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Ensure mobile menu toggle is visible
    if (window.innerWidth <= 768) {
        navToggle.style.display = 'flex';
    }
    
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.style.display = 'none';
        } else {
            navToggle.style.display = 'flex';
        }
    });
}

// Smooth scrolling for navigation links - Fixed
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navToggle = document.getElementById('nav-toggle');
                const navMenu = document.getElementById('nav-menu');
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// Loading animations and scroll-triggered animations
function initLoadingAnimations() {
    // Animate elements on scroll
    const animateOnScroll = document.querySelectorAll('.project-card, .testimonial-card, .education-item, .skill-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide elements and set transform
    animateOnScroll.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // Stagger animation for skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
}

// Form validation enhancements
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove existing error styling
    clearFieldError(field);
    
    // Validation rules
    if (!value) {
        showFieldError(field, `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
        return false;
    }
    
    if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    if (fieldName === 'message' && value.length < 10) {
        showFieldError(field, 'Message must be at least 10 characters long');
        return false;
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = 'var(--color-error)';
    
    // Create or update error message
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = 'var(--color-error)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--space-4)';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Show message function for form feedback
function showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.style.cssText = `
        padding: var(--space-12) var(--space-16);
        margin-top: var(--space-16);
        border-radius: var(--radius-base);
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-medium);
        ${type === 'success' ? 
            'background: rgba(var(--color-success-rgb), 0.1); color: var(--color-success); border: 1px solid rgba(var(--color-success-rgb), 0.3);' :
            'background: rgba(var(--color-error-rgb), 0.1); color: var(--color-error); border: 1px solid rgba(var(--color-error-rgb), 0.3);'
        }
    `;
    messageElement.textContent = message;
    
    // Add to form
    const contactForm = document.getElementById('contactForm');
    contactForm.appendChild(messageElement);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageElement && messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// Enhanced scroll animations with intersection observer
function initAdvancedAnimations() {
    // Animate stats counter
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element) {
        const target = parseFloat(element.textContent);
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = element.textContent.includes('.') ? target.toFixed(2) : Math.ceil(target);
                clearInterval(timer);
            } else {
                element.textContent = element.textContent.includes('.') ? current.toFixed(2) : Math.ceil(current);
            }
        }, 40);
    }
}

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Enhanced click interaction
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on links
            if (e.target.closest('a')) return;
            
            // Add click effect
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }, 150);
        });
    });
});

// Enhanced testimonial cards
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Performance optimization - lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', initLazyLoading);

/* ==== AUTO‑SET PROJECT LOGOS BY TITLE (non‑breaking addition) ==== */
document.addEventListener('DOMContentLoaded', initProjectIcons);

function initProjectIcons() {
    // Map title keywords -> Font Awesome icon classes
    const rules = [
        { match: /real[-\s]?estate|property|marketplace|e-?commerce/i, icon: 'fas fa-building' },
        { match: /bitcoin|btc|crypto|blockchain/i,                    icon: 'fab fa-bitcoin' },
        { match: /movie|film|recommend/i,                             icon: 'fas fa-film' },
        { match: /dashboard|bi|analytics|report/i,                    icon: 'fas fa-chart-line' },
        { match: /chatbot|bot|nlp/i,                                  icon: 'fas fa-robot' },
        { match: /portfolio|website|landing|web/i,                    icon: 'fas fa-globe' },
        { match: /forecast|prediction|predict/i,                      icon: 'fas fa-chart-line' },
        { match: /ml|machine learning|ai/i,                           icon: 'fas fa-brain' }
    ];

    document.querySelectorAll('.project-card').forEach(card => {
        const titleEl = card.querySelector('.project-title');
        const placeholder = card.querySelector('.project-placeholder');
        if (!titleEl || !placeholder) return;

        const title = titleEl.textContent.trim();
        // Allow manual override per card: <div class="project-card" data-icon="fas fa-laptop-code">
        let iconClass = card.dataset.icon || 'fas fa-code';

        if (!card.dataset.icon && title) {
            for (const r of rules) {
                if (r.match.test(title)) { iconClass = r.icon; break; }
            }
        }

        placeholder.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i>`;
        placeholder.setAttribute('aria-label', `Project icon for ${title}`);
        placeholder.setAttribute('title', title);
    });
}