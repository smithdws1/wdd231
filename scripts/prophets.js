// Declare constants
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// Fetch prophet data
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets); // Commented out after testing
  displayProphets(data.prophets); // Pass the prophets array, not the entire data object
}

// Define displayProphets function
const displayProphets = (prophets) => {
  // Clear existing cards
  cards.innerHTML = '';

  prophets.forEach((prophet) => {
    // Create elements
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let portrait = document.createElement('img');

    // Populate full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Build image with enhanced alt text
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} – ${prophet.order}${getOrdinalSuffix(prophet.order)} Latter-day President`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append elements to card
    card.appendChild(fullName);
    card.appendChild(portrait);

    // Append card to cards container
    cards.appendChild(card);
  });
};

// Helper function for ordinal suffixes (e.g., 1st, 2nd, 3rd)
function getOrdinalSuffix(number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const value = number % 100;
  return suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0];
}

// Filter functions
function filterUtahBorn(prophets) {
  return prophets.filter(prophet => prophet.birthplace === 'Utah');
}

function filterBornOutsideUS(prophets) {
  return prophets.filter(prophet => prophet.birthplace !== 'Utah' && prophet.birthplace !== 'Vermont' && prophet.birthplace !== 'Connecticut' && prophet.birthplace !== 'Ohio' && prophet.birthplace !== 'Missouri' && prophet.birthplace !== 'Idaho');
}

function filterLived95Plus(prophets) {
  return prophets.filter(prophet => {
    const birthYear = new Date(prophet.birthdate).getFullYear();
    const deathYear = prophet.death ? new Date(prophet.death).getFullYear() : new Date().getFullYear();
    return (deathYear - birthYear) >= 95;
  });
}

function filterTenPlusChildren(prophets) {
  return prophets.filter(prophet => prophet.numofchildren >= 10);
}

function filterServed15Plus(prophets) {
  return prophets.filter(prophet => prophet.length >= 15);
}

// Event listeners for filter buttons
document.addEventListener('DOMContentLoaded', () => {
  let allProphets = []; // Store fetched data globally

  // Fetch data once and store it
  async function init() {
    const response = await fetch(url);
    const data = await response.json();
    allProphets = data.prophets;
    displayProphets(allProphets); // Display all prophets initially
  }

  init();

  // Add button event listeners
  document.getElementById('utahBorn').addEventListener('click', () => displayProphets(filterUtahBorn(allProphets)));
  document.getElementById('outsideUS').addEventListener('click', () => displayProphets(filterBornOutsideUS(allProphets)));
  document.getElementById('lived95Plus').addEventListener('click', () => displayProphets(filterLived95Plus(allProphets)));
  document.getElementById('tenPlusChildren').addEventListener('click', () => displayProphets(filterTenPlusChildren(allProphets)));
  document.getElementById('served15Plus').addEventListener('click', () => displayProphets(filterServed15Plus(allProphets)));
  document.getElementById('reset').addEventListener('click', () => displayProphets(allProphets));
});