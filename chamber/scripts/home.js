document.addEventListener("DOMContentLoaded", () => {
    // Navigation toggle for mobile
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const isExpanded = navMenu.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isExpanded);
        menuToggle.textContent = isExpanded ? "✖" : "☰";
    });

    // Spotlights Section
    const spotlightContainer = document.getElementById("spotlight-container");

    async function fetchSpotlights() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            displaySpotlights(members);
        } catch (error) {
            console.error("Error fetching spotlights:", error);
        }
    }

    function displaySpotlights(members) {
        const eligibleMembers = members.filter(member => member.membershipLevel === 3 || member.membershipLevel === 2);

        const isMobile = window.innerWidth <= 320;
        const numberToShow = isMobile ? 2 : 3;

        // Randomly select members
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, numberToShow);

        spotlightContainer.innerHTML = "";
        selectedMembers.forEach(member => {
            const spotlightCard = document.createElement("article");
            spotlightCard.classList.add("spotlight-card", "card");

            const membershipLabel = member.membershipLevel === 3 ? "Gold" : "Silver";

            spotlightCard.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                <p>Membership: ${membershipLabel}</p>
            `;

            spotlightContainer.appendChild(spotlightCard);
        });
    }

    fetchSpotlights();

    // Update spotlights on window resize
    window.addEventListener("resize", () => {
        fetchSpotlights();
    });
});