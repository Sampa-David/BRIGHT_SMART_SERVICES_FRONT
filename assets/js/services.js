document.addEventListener('DOMContentLoaded', () => {
    // Initialize modals
    initializeServiceModals();
    
    // Initialize language selector
    initializeLanguageSelector();
    
    // Initialize quote form
    initializeQuoteForm();
});

function initializeServiceModals() {
    // Get all service cards with data-service attribute
    const serviceCards = document.querySelectorAll('[data-service]');
    
    serviceCards.forEach(card => {
        const contactBtn = card.querySelector('.contact-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceName = card.getAttribute('data-service');
                openServiceModal(serviceName);
            });
        }
    });

    // Add click event listeners for modal close buttons
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.service-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('service-modal')) {
            closeModal(e.target);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.service-modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

function openServiceModal(serviceName) {
    const modal = document.querySelector(`#modal-${serviceName}`);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function initializeLanguageSelector() {
    const languageSelector = document.querySelector('.language-selector');
    const currentLang = document.querySelector('.current-lang');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    if (languageSelector && currentLang && dropdownItems) {
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = item.getAttribute('data-lang');
                const text = item.textContent;
                
                // Update current language display
                currentLang.textContent = text;
                
                // Here you would typically handle the language change
                // For example, redirecting to a localized version or 
                // triggering a language change event
                handleLanguageChange(lang);
            });
        });
    }
}

function handleLanguageChange(lang) {
    // This function would handle the actual language change
    // For example, you might want to:
    // 1. Save the language preference in localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // 2. Reload the page with the new language parameter
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('lang', lang);
    window.location.href = currentUrl.toString();
}

function initializeQuoteForm() {
    const quoteForm = document.querySelector('#quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic form validation
            if (!validateQuoteForm(quoteForm)) {
                return;
            }

            // Get form data
            const formData = new FormData(quoteForm);
            
            try {
                // Show loading state
                const submitBtn = quoteForm.querySelector('.submit-button');
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Send form data to server
                const response = await submitQuoteForm(formData);
                
                // Handle success
                if (response.success) {
                    showSuccessMessage('Your quote request has been sent successfully!');
                    quoteForm.reset();
                } else {
                    showErrorMessage('There was an error sending your request. Please try again.');
                }
            } catch (error) {
                showErrorMessage('An unexpected error occurred. Please try again later.');
            } finally {
                // Reset button state
                const submitBtn = quoteForm.querySelector('.submit-button');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
}

function validateQuoteForm(form) {
    let isValid = true;
    
    // Clear previous error messages
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Required fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        }
    });
    
    // Email validation
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value && !isValidEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    field.parentNode.appendChild(errorDiv);
}

function showSuccessMessage(message) {
    // Implement your success message UI here
    alert(message); // Replace with your preferred UI feedback
}

function showErrorMessage(message) {
    // Implement your error message UI here
    alert(message); // Replace with your preferred UI feedback
}

async function submitQuoteForm(formData) {
    // Replace with your actual API endpoint
    const response = await fetch('/api/quote-request', {
        method: 'POST',
        body: formData
    });
    
    return await response.json();
}