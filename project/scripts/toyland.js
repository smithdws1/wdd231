const RCON_API_URL = 'http://192.168.10.6:51000';
//Don't forget to change to public before submission
//const RCON_API_URL = 'http://toyland.mynetgear.com:51000';


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
    const bedrockTile = document.querySelector('.bedrock-tile');

    if (javaTile) {
        const javaStatus = await fetchServerStatus('java');
        javaTile.classList.remove('online', 'offline');
        javaTile.classList.add(javaStatus ? 'online' : 'offline');
        javaTile.querySelector('.status').textContent = javaStatus ? 'Online' : 'Offline';
    }

    if (bedrockTile) {
        const bedrockStatus = await fetchServerStatus('bedrock');
        bedrockTile.classList.remove('online', 'offline');
        bedrockTile.classList.add(bedrockStatus ? 'online' : 'offline');
        bedrockTile.querySelector('.status').textContent = bedrockStatus ? 'Online' : 'Offline';
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
});