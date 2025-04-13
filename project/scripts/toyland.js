//const RCON_API_URL = 'https://192.168.10.6:51000';
//Don't forget to switch for github submission
const RCON_API_URL = 'https://toyland.mynetgear.com:51000';

export const fetchServerStatus = async (edition) => {
    try {
        const url = `${RCON_API_URL}/api/server-status?edition=${edition}`;
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
        console.error(`Failed to fetch ${edition} status:`, error);
        return false;
    }
};

export const updateServerTiles = async () => {
    const javaTile = document.querySelector('.java-tile');
    if (javaTile) {
        const status = await fetchServerStatus('java');
        javaTile.classList.remove('online', 'offline');
        javaTile.classList.add(status ? 'online' : 'offline');
        javaTile.querySelector('.status').textContent = status ? 'Online' : 'Offline';
    }

    const bedrockTile = document.querySelector('.bedrock-tile');
    if (bedrockTile) {
        const status = await fetchServerStatus('bedrock');
        bedrockTile.classList.remove('online', 'offline');
        bedrockTile.classList.add(status ? 'online' : 'offline');
        bedrockTile.querySelector('.status').textContent = status ? 'Online' : 'Offline';
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateServerTiles();
    document.querySelector('.hamburger').addEventListener('click', () => {
        const navLinks = document.getElementById('nav-links');
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        document.querySelector('.hamburger').setAttribute('aria-expanded', isExpanded);
    });
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Updated: ${new Date(document.lastModified).toLocaleString()}`;
});