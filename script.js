document.addEventListener('DOMContentLoaded', () => {
    // Rotating words animation
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
                const projectId = card.getAttribute('data-project');
                fetch(`${projectId}.html`)
                    .then(response => response.text())
                    .then(data => {
                        modalContent.innerHTML = data;
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
            // For now, we'll just log it to the console
            console.log('Form submitted');
            contactForm.reset();
            alert('Thank you for your message. I\'ll get back to you soon!');
        });
    }
});