//const RCON_API_URL = 'https://192.168.10.6:51000';
//Don't forget to switch for github submission

const imageList = [
    "pic1.png",
    "pic2.png",
    "pic3.png",
    "pic4.png",
    "pic5.png",
    "pic6.png"
];

// Function to dynamically tile images in cards
export const tileImages = () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        const imageGrid = tile.querySelector('.image-grid');
        if (!imageGrid) return;

        // Select an image from the list based on the tile's index (cycle through the list)
        const imageFile = imageList[index % imageList.length];

        // Clear any existing images
        imageGrid.innerHTML = '';

        // Add 6 images to create a 2x3 grid
        for (let i = 0; i < 6; i++) {
            const img = document.createElement('img');
            img.src = `images/${imageFile}`;
            img.alt = `${imageFile.split('.')[0]} Background`;
            img.width = 128;
            img.height = 128;
            img.loading = 'lazy';
            imageGrid.appendChild(img);
        }
    });
};

export const showModal = (message) => {
    const modal = document.getElementById('apply-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.showModal();
};

export const closeModal = () => {
    const modal = document.getElementById('apply-modal');
    modal.close();
};

export const handleContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            const email = document.getElementById('contact-email').value;

            // Validate phone number
            const phonePattern = /^[+]?[0-9\s()-]*$/;
            if (!phonePattern.test(phone)) {
                showModal('Invalid phone number. Please use only digits, spaces, dashes, plus sign, or parentheses (e.g., +1-123-456-7890).');
                return;
            }

            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({ name, phone, email, timestamp: new Date().toISOString() });
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            showModal(`Message sent! Name: ${name}, Phone: ${phone}, Email: ${email}`);
            contactForm.reset();
        });
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    tileImages();
    handleContactForm();
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.hamburger').addEventListener('click', () => {
        const navLinks = document.getElementById('nav-links');
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        document.querySelector('.hamburger').setAttribute('aria-expanded', isExpanded);
    });
});