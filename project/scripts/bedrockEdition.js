const RCON_API_URL = 'http://192.168.10.6:51000';

export const fetchServerStatus = async () => {
    try {
        const url = `${RCON_API_URL}/api/server-status?edition=bedrock`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const { online } = await response.json();
        return online;
    } catch (error) {
        console.error('Failed to fetch Bedrock status:', error);
        return false;
    }
};

export const updateServerStatus = async () => {
    const statusTile = document.querySelector('.server-status');
    if (statusTile) {
        const status = await fetchServerStatus();
        statusTile.classList.remove('online', 'offline');
        statusTile.classList.add(status ? 'online' : 'offline');
        statusTile.querySelector('.status').textContent = status ? 'Online' : 'Offline';
    }

    const playersTile = document.querySelector('.players-online');
    if (playersTile) {
        playersTile.classList.remove('online', 'offline');
        playersTile.classList.add(status ? 'online' : 'offline');
    }
};

export const updatePlayerList = async () => {
    const playerList = document.querySelector('.player-list');
    if (playerList) {
        // Static list for demonstration
        const players = ["Steve", "Alex"];
        playerList.innerHTML = players.length > 0
            ? players.map(player => `<li>${player}</li>`).join('')
            : '<li>No players online.</li>';
    }
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
    updateServerStatus();
    updatePlayerList();
    handleContactForm();
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.hamburger').addEventListener('click', () => {
        const navLinks = document.getElementById('nav-links');
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        document.querySelector('.hamburger').setAttribute('aria-expanded', isExpanded);
    });
});