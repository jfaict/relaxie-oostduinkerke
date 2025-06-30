// Vacation Rental Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            
            // Toggle hamburger icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Photo Placeholder Interactions
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            // Add a subtle animation when clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Booking Form Handling
    const bookingForm = document.getElementById('booking-form');
    const bookingSuccess = document.getElementById('booking-success');

    if (bookingForm && bookingSuccess) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        const checkinInput = document.getElementById('checkin');
        const checkoutInput = document.getElementById('checkout');
        
        checkinInput.setAttribute('min', today);
        checkoutInput.setAttribute('min', today);

        // Update checkout minimum date when checkin changes
        checkinInput.addEventListener('change', function() {
            const checkinDate = new Date(this.value);
            const nextDay = new Date(checkinDate);
            nextDay.setDate(nextDay.getDate() + 1);
            
            checkoutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
            
            // Clear checkout if it's before the new minimum
            if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
                checkoutInput.value = '';
            }
        });

        // Form validation and submission
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const checkinDate = new Date(formData.get('checkin'));
            const checkoutDate = new Date(formData.get('checkout'));
            
            // Validate dates
            if (!validateDates(checkinDate, checkoutDate)) {
                return;
            }
            
            // Validate required fields
            if (!validateRequiredFields(formData)) {
                return;
            }
            
            // Validate email format
            if (!validateEmail(formData.get('email'))) {
                showError('Voer een geldig e-mailadres in.');
                return;
            }
            
            // Simulate form submission
            submitBookingForm(formData);
        });
    }

    // Form Validation Functions
    function validateDates(checkinDate, checkoutDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (checkinDate < today) {
            showError('Check-in datum kan niet in het verleden zijn.');
            return false;
        }
        
        if (checkoutDate <= checkinDate) {
            showError('Check-out datum moet na de check-in datum zijn.');
            return false;
        }
        
        return true;
    }
    
    function validateRequiredFields(formData) {
        const requiredFields = ['checkin', 'checkout', 'guests', 'name', 'email', 'phone'];
        
        for (let field of requiredFields) {
            if (!formData.get(field) || formData.get(field).trim() === '') {
                showError(`Het veld "${getFieldLabel(field)}" is verplicht.`);
                return false;
            }
        }
        
        return true;
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function getFieldLabel(fieldName) {
        const labels = {
            'checkin': 'Check-in datum',
            'checkout': 'Check-out datum',
            'guests': 'Aantal gasten',
            'name': 'Naam',
            'email': 'E-mail',
            'phone': 'Telefoon'
        };
        return labels[fieldName] || fieldName;
    }
    
    function showError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background: #ff5757;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
            font-weight: 500;
        `;
        errorDiv.textContent = message;
        
        bookingForm.insertBefore(errorDiv, bookingForm.firstChild);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
        
        // Scroll to error message
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function submitBookingForm(formData) {
        // Show loading state
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Verzenden...';
        submitButton.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Hide form and show success message
            bookingForm.classList.add('hidden');
            bookingSuccess.classList.remove('hidden');
            
            // Reset button state (in case user wants to submit again)
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Scroll to success message
            bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Log form data for debugging (in real app, this would be sent to server)
            console.log('Booking form submitted:', Object.fromEntries(formData));
            
            // Reset form after 10 seconds to allow new bookings
            setTimeout(() => {
                resetBookingForm();
            }, 10000);
            
        }, 2000); // Simulate 2 second delay
    }
    
    function resetBookingForm() {
        bookingForm.classList.remove('hidden');
        bookingSuccess.classList.add('hidden');
        bookingForm.reset();
        
        // Reset date minimums
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('checkin').setAttribute('min', today);
        document.getElementById('checkout').setAttribute('min', today);
    }

    // Animate elements on scroll
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.attraction-card, .detail-card, .contact-item, .photo-placeholder');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add a "back to top" functionality when scrolling
    let backToTopButton = null;
    
    function createBackToTopButton() {
        backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.className = 'back-to-top';
        backToTopButton.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--color-coastal-blue);
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        `;
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(backToTopButton);
    }
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (!backToTopButton) {
            createBackToTopButton();
        }
        
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.attraction-card, .detail-card, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Initialize page
window.addEventListener('load', function() {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    // Preload some interactions
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        setTimeout(() => {
            heroSection.style.transform = 'scale(1)';
        }, 100);
    }
});