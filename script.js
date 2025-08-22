function toggleMenu() {
    const navMenu = document.getElementById('main-nav');
    if (navMenu) {
        navMenu.classList.toggle('visible');
    }
}

// Attach to menu toggle button
document.getElementById('menu-toggle').addEventListener('click', toggleMenu);

// Smooth scrolling for navigation links
document.querySelectorAll('#main-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Filter projects by category
function filterProjects(category) {
    document.querySelectorAll('.projects-list article').forEach(article => {
        if (category === 'all' || article.dataset.category === category) {
            article.style.display = '';
        } else {
            article.style.display = 'none';
        }
    });
}

// Lightbox effect for project images
function openLightbox(imgSrc, altText) {
    let lightbox = document.getElementById('lightbox-modal');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox-modal';
        lightbox.style.position = 'fixed';
        lightbox.style.top = 0;
        lightbox.style.left = 0;
        lightbox.style.width = '100vw';
        lightbox.style.height = '100vh';
        lightbox.style.background = 'rgba(0,0,0,0.8)';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.zIndex = 2000;
        lightbox.innerHTML = `
            <div style="position:relative;">
                <img id="lightbox-img" src="" alt="" style="max-width:90vw;max-height:80vh;border-radius:8px;box-shadow:0 2px 16px #000;">
                <button id="lightbox-close" aria-label="Close" style="position:absolute;top:-16px;right:-16px;background:#fff;border:none;border-radius:50%;width:32px;height:32px;font-size:1.5em;cursor:pointer;">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
        document.getElementById('lightbox-close').onclick = () => lightbox.remove();
        lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.remove(); };
    }
    document.getElementById('lightbox-img').src = imgSrc;
    document.getElementById('lightbox-img').alt = altText;
    lightbox.style.display = 'flex';
}

// Attach lightbox to project images
document.querySelectorAll('.projects-list img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
        openLightbox(this.src, this.alt);
    });
});

// Contact form validation and real-time feedback
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');

    // Helper to show error
    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains('form-error')) {
            error = document.createElement('div');
            error.className = 'form-error';
            error.style.color = '#d32f2f';
            error.style.fontSize = '0.95em';
            error.style.marginTop = '0.2em';
            input.parentNode.insertBefore(error, input.nextSibling);
        }
        error.textContent = message;
    }

    // Helper to clear error
    function clearError(input) {
        let error = input.nextElementSibling;
        if (error && error.classList.contains('form-error')) {
            error.textContent = '';
        }
    }

    // Real-time validation
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() === '') {
                showError(input, 'This field is required.');
            } else if (input === emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                showError(input, 'Please enter a valid email address.');
            } else {
                clearError(input);
            }
        });
    });

    // On submit
    contactForm.addEventListener('submit', function(e) {
        let valid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            valid = false;
        }
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address.');
            valid = false;
        }
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required.');
            valid = false;
        }

        if (!valid) {
            e.preventDefault();
        }
    });
}