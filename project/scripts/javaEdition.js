const RCON_API_URL = 'http://192.168.10.6:51000';

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
        const response = await fetch('/data/minecraft-data.json');
        if (!response.ok) throw new Error(`Network error: ${response.statusText}`);
        const data = await response.json();
        console.log('Fetched Minecraft data:', data); // Debug log
        return data;
    } catch (error) {
        console.error('Failed to fetch Minecraft data:', error);
        return { effects: [], tools: [], weapons: [], armor: [], players: [] };
    }
};

export const populateDropdowns = async () => {
    const minecraftData = await fetchMinecraftData();
    console.log('Players from minecraft-data.json:', minecraftData.players); // Debug log

    const players = minecraftData.players || [];
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
            if (players.length === 0) {
                console.warn(`No players found for dropdown ${id}`);
                select.innerHTML += `<option value="" disabled>No players available</option>`;
            }
        } else {
            console.warn(`Dropdown with ID ${id} not found`);
        }
    });

    const dropdowns = [
        { id: 'effects-list', data: minecraftData.effects },
        { id: 'weapon-list', data: minecraftData.weapons },
        { id: 'armor-list', data: minecraftData.armor },
        { id: 'tool-list', data: minecraftData.tools }
    ];
    dropdowns.forEach(({ id, data }) => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = `<option value="">Select...</option>${
                data.map(item => {
                    const displayName = item.maxLevel > 1 ? `${item.name} ${romanize(item.maxLevel)}` : item.name;
                    return `<option value="${JSON.stringify({ command: item.command, level: item.maxLevel })}">${displayName}</option>`;
                }).join('')
            }`;
            console.log(`Populated dropdown ${id} with data:`, data);
        } else {
            console.warn(`Dropdown with ID ${id} not found`);
        }
    });
};

function romanize(num) {
    const lookup = [
        { value: 1000, numeral: 'M' },
        { value: 900, numeral: 'CM' },
        { value: 500, numeral: 'D' },
        { value: 400, numeral: 'CD' },
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' }
    ];
    let roman = '';
    for (let i = 0; i < lookup.length; i++) {
        while (num >= lookup[i].value) {
            roman += lookup[i].numeral;
            num -= lookup[i].value;
        }
    }
    return roman;
}

export const renderDynamicItems = async () => {
    const data = await fetchMinecraftData();
    const container = document.getElementById('dynamic-items');
    const effects = data.effects.slice(0, 15).map((effect, index) => ({
        id: index + 1,
        name: effect.name,
        description: effect.description,
        duration: `${effect.duration} seconds`,
        icon: effect.icon
    }));
    container.innerHTML = effects.map(item => `
        <article class="effect-item">
            <img src="${item.icon}" alt="${item.name}" width="64" height="64" loading="lazy">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p>Duration: ${item.duration}</p>
        </article>
    `).join('');
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
        const { command, level } = JSON.parse(value);
        const displayName = type === 'effect' ? command : `${command} ${romanize(level)}`;
        showModal(`${type.charAt(0).toUpperCase() + type.slice(1)} "${displayName}" applied to ${player}!`);
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
    renderDynamicItems();
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