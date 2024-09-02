document.addEventListener('DOMContentLoaded', () => {
    // Existing code
    const words = ["Developer", "Designer", "Creator"];
    let currentIndex = 0;
    const rotatingElement = document.querySelector('.rotating-words');

    function rotateWords() {
        if (rotatingElement) {
            rotatingElement.textContent = words[currentIndex];
            currentIndex = (currentIndex + 1) % words.length;
        }
    }

    setInterval(rotateWords, 2000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project modal functionality
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-project-content');
    const closeModal = document.querySelector('.close-modal');

    if (projectCards.length > 0 && modal && modalContent && closeModal) {
        projectCards.forEach(card => {
            const viewButton = card.querySelector('.view-project-btn');
            viewButton.addEventListener('click', (e) => {
                e.preventDefault();
                const baseUrl = window.location.pathname.endsWith('/') ? window.location.pathname : window.location.pathname + '/';
                const projectId = card.getAttribute('data-project');
                fetch(`${baseUrl}${projectId}.html`)
                    .then(response => response.text())
                    .then(data => {
                        modalContent.innerHTML = data;
                        modal.style.display = 'block';
                    })
                    .catch(error => {
                        console.error('Error loading project details:', error);
                        modalContent.innerHTML = `
                            <h2>${card.querySelector('h3').textContent}</h2>
                            <p>${card.querySelector('p').textContent}</p>
                            <div class="project-details">
                                <img src="${card.querySelector('img').src}" alt="${card.querySelector('h3').textContent}">
                                <p>This is a placeholder for the detailed project description. In a real scenario, this content would be loaded dynamically from the server.</p>
                            </div>
                        `;
                        modal.style.display = 'block';
                    });

            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Contact form submission (you'll need to implement the server-side handling)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would typically send the form data to your server
            console.log('Form submitted');
            contactForm.reset();
            alert('Thank you for your message. I\'ll get back to you soon!');
        });
    }

// Snowfall effect code
const snowfallContainer = document.getElementById('snowfallContainer');
const heroSection = document.getElementById('hero');
const snowflakes = [];
const numberOfSnowflakes = 400;

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    resetSnowflake(snowflake, true);
    snowfallContainer.appendChild(snowflake);
    snowflakes.push(snowflake);
}

function resetSnowflake(snowflake, initializing = false) {
    const heroWidth = heroSection.offsetWidth;
    const heroHeight = heroSection.offsetHeight;

    // Use heroWidth for positioning to ensure it fits the aspect ratio
    snowflake.style.left = `${Math.random() * heroWidth}px`;
    snowflake.style.top = initializing
        ? `${Math.random() * heroHeight}px`
        : `-${Math.random() * 10}px`; // Start slightly above the container
    snowflake.style.opacity = Math.random() * 0.5 + 0.5;
    snowflake.style.width = `${Math.random() * 3 + 1}px`;
    snowflake.style.height = snowflake.style.width;
    snowflake.speed = Math.random() * 0.5 + 0.2;
}

// Create initial set of snowflakes
for (let i = 0; i < numberOfSnowflakes; i++) {
    createSnowflake();
}

function animateSnowflakes() {
    const heroHeight = heroSection.offsetHeight;

    snowflakes.forEach(snowflake => {
        let yPos = parseFloat(snowflake.style.top);
        yPos += snowflake.speed;

        if (yPos > heroHeight) {
            resetSnowflake(snowflake);
        } else {
            snowflake.style.top = `${yPos}px`;
        }
    });

    requestAnimationFrame(animateSnowflakes);
}

animateSnowflakes();

// Adjust snowfall container size on window resize
function adjustSnowfallContainer() {
    snowfallContainer.style.width = `${heroSection.offsetWidth}px`;
    snowfallContainer.style.height = `${heroSection.offsetHeight}px`;
}

window.addEventListener('resize', adjustSnowfallContainer);

// Adjust snowfall intensity on scroll
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    const intensity = Math.max(0, 1 - (scrollPosition / heroHeight));

    snowfallContainer.style.opacity = intensity;
});

// Initial adjustment to set container size
adjustSnowfallContainer();
});
