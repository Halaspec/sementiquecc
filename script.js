document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const menuLinks = document.querySelectorAll('.menu a');
    const contentSections = document.querySelectorAll('.content');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const projectTitles = document.querySelectorAll('.project-title');
    const logo = document.querySelector('.logo');

    // Modal elements
    const contactModal = document.getElementById('contactModal');
    const closeButton = document.querySelector('.close-button');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            if (targetId === 'contact') {
                contactModal.style.display = 'flex';
            } else {
                contentSections.forEach(section => {
                    if (section.id === targetId) {
                        section.classList.add('active');
                    } else {
                        section.classList.remove('active');
                    }
                });
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    logo.addEventListener('click', () => {
        contentSections.forEach(section => {
            if (section.id === 'home') {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
    });

    closeButton.addEventListener('click', () => {
        contactModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.style.display = 'none';
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (validateEmail(email) && message.trim() !== "") {
            formMessage.textContent = "Thank you for your message!";
            formMessage.style.color = 'green';
            formMessage.style.display = 'block';
            contactForm.reset();

            setTimeout(() => {
                formMessage.style.display = 'none';
                contactModal.style.display = 'none';
            }, 3000);
        } else {
            formMessage.textContent = "Please enter a valid email and message.";
            formMessage.style.color = 'red';
            formMessage.style.display = 'block';
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    projectTitles.forEach(title => {
        title.addEventListener('click', () => {
            const targetId = title.getAttribute('data-target');
            const description = document.getElementById(targetId);
            description.style.display = description.style.display === 'block' ? 'none' : 'block';
        });
    });
});
