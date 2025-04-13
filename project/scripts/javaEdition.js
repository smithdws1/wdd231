//const RCON_API_URL = 'https://192.168.10.6:51000';
//Don't forget to switch for github submission
const RCON_API_URL = 'https://toyland.mynetgear.com:51000';

// List of available images for tiling
const imageList = [
    "pic1.png",
    "pic2.png",
    "pic3.png",
    "pic4.png",
    "pic5.png",
    "pic6.png"
];

export const fetchServerStatus = async () => {
    try {
        const response = await fetch(`${RCON_API_URL}/api/server-status?edition=java`);
        if (!response.ok) throw new Error('Network error');
        const { online } = await response.json();
        return online;
    } catch (error) {
        console.error('Failed to fetch server status:', error);
        return false;
    }
};

export const fetchMinecraftData = async () => {
    try {
        console.log('Attempting to fetch ./data/minecraft-data.json');
        const response = await fetch('./data/minecraft-data.json');
        if (!response.ok) throw new Error(`Network error: ${response.statusText}`);
        const data = await response.json();
        console.log('Fetched Minecraft data:', data);
        return data;
    } catch (error) {
        console.error('Failed to fetch Minecraft data:', error);
        throw error;
    }
};

// Function to dynamically tile images in cards
export const tileImages = () => {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, index) => {
        const imageGrid = tile.querySelector('.image-grid');
        if (!imageGrid) return;

        // Select an image from the list based on the tile's index and cycle through the list
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

export const populatePlayerDropdowns = async (minecraftData) => {
    const players = minecraftData.players || [];
    console.log('Players to populate:', players);

    if (!Array.isArray(players)) {
        console.error('Players is not an array:', players);
        return;
    }

    const playerSelects = [
        'player-list-effects',
        'player-list-weapon',
        'player-list-armor',
        'player-list-tool'
    ];
    playerSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = `<option value="">Select Player...</option>${
                players.map(player => `<option value="${player}">${player}</option>`).join('')
            }`;
            console.log(`Populated player dropdown ${id} with:`, players);
            if (players.length === 0) {
                console.warn(`No players found for dropdown ${id}`);
                select.innerHTML += `<option value="" disabled>No players available</option>`;
            }
        } else {
            console.warn(`Dropdown with ID ${id} not found`);
        }
    });
};

export const populateDropdowns = async () => {
    const minecraftData = await fetchMinecraftData();

    // Populate player dropdowns first
    await populatePlayerDropdowns(minecraftData);

    // Populate effects and enchantments dropdowns
    const dropdowns = [
        { id: 'effects-list', data: minecraftData.effects, type: 'effect' },
        { id: 'weapon-list', data: minecraftData.weapons, type: 'weapon' },
        { id: 'armor-list', data: minecraftData.armor, type: 'armor' },
        { id: 'tool-list', data: minecraftData.tools, type: 'tool' }
    ];
    dropdowns.forEach(({ id, data, type }) => {
        console.log(`Processing dropdown ${id} with data:`, data);
        const select = document.getElementById(id);
        if (select) {
            if (!Array.isArray(data)) {
                console.error(`Data for ${id} is not an array:`, data);
                select.innerHTML = `<option value="">Select...</option><option value="" disabled>No options available</option>`;
                return;
            }
            select.innerHTML = `<option value="">Select...</option>${
                data.map(item => {
                    try {
                        return `<option value="${JSON.stringify({ command: item.command, type })}">${item.name}</option>`;
                    } catch (error) {
                        console.error(`Error processing item in ${id}:`, item, error);
                        return '';
                    }
                }).filter(option => option).join('')
            }`;
            console.log(`Populated dropdown ${id} with options:`, Array.from(select.options).map(opt => opt.text));
            if (data.length === 0) {
                console.warn(`No data found for dropdown ${id}`);
                select.innerHTML += `<option value="" disabled>No options available</option>`;
            }
        } else {
            console.warn(`Dropdown with ID ${id} not found`);
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

export const applyAction = async (type, player, value) => {
    try {
        const { command, type: actionType } = JSON.parse(value);
        showModal(`${actionType.charAt(0).toUpperCase() + actionType.slice(1)} "${command}" applied to ${player}!`);
    } catch (error) {
        console.error(`Failed to apply ${type}:`, error);
        showModal(`Error applying ${type} to ${player}. Please try again.`);
    }
};

export const handleForms = () => {
    document.querySelectorAll('.picker').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = form.querySelector('.action-btn').dataset.type;
            const playerSelect = form.querySelector('select[id$="list-' + type + '"]');
            const valueSelect = form.querySelector('select[id$="-list"]');
            const player = playerSelect?.value;
            const value = valueSelect?.value;

            if (!player || !value) {
                showModal('Please select a player and an option.');
                return;
            }
            applyAction(type, player, value);
        });
    });

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

export const handleServerReboot = () => {
    const rebootBtn = document.querySelector('.server-reboot .action-btn');
    if (rebootBtn) {
        rebootBtn.addEventListener('click', () => {
            showModal('Server rebooted!');
        });
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns();
    tileImages();
    handleForms();
    handleServerReboot();
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.hamburger').addEventListener('click', () => {
        const navLinks = document.getElementById('nav-links');
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        document.querySelector('.hamburger').setAttribute('aria-expanded', isExpanded);
    });
});