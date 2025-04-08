// Load discover data
async function loadDiscoverData() {
    try {
        const response = await fetch('data/discover.json');
        const items = await response.json();
        const gallery = document.getElementById('discover-gallery');
        
        items.forEach((item, index) => {
            const card = document.createElement('article');
            card.classList.add('discover-card');
            card.id = `card${index + 1}`;
            card.innerHTML = `
                <h2>${item.name}</h2>
                <figure>
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
                <button class="learn-more" data-url="${item.url}">Learn More</button>
            `;
            gallery.appendChild(card);
        });

        // Click event listeners for learn-more buttons
        document.querySelectorAll('.discover-card .learn-more').forEach(button => {
            button.addEventListener('click', () => {
                const url = button.getAttribute('data-url');
                window.open(url, '_blank', 'noopener');
            });
        });
    } catch (error) {
        console.error('Error loading discover data:', error);
    }
}

// Visit message functionality
function displayVisitMessage() {
    const visitText = document.getElementById('visit-text');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentVisit = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;

    if (!lastVisit) {
        visitText.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const daysSinceLastVisit = Math.floor((currentVisit - lastVisit) / oneDay);
        if (daysSinceLastVisit < 1) {
            visitText.textContent = 'Back so soon! Awesome!';
        } else {
            visitText.textContent = `You last visited ${daysSinceLastVisit} ${daysSinceLastVisit === 1 ? 'day' : 'days'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', currentVisit);
}

// Page load
document.addEventListener('DOMContentLoaded', () => {
    loadDiscoverData();
    displayVisitMessage();
});