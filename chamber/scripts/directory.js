document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display members
    const memberContainer = document.getElementById("member-container");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    async function fetchMembers() {
        try {
            const response = await fetch("data/members.json");
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members) {
        memberContainer.innerHTML = "";
        members.forEach(member => {
            const memberCard = document.createElement("article");
            memberCard.classList.add("member-card");

            const membershipLabel = member.membershipLevel === 3 ? "Gold" : member.membershipLevel === 2 ? "Silver" : "Member";

            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                <p>Membership: ${membershipLabel}</p>
                <p>${member.description}</p>
            `;

            memberContainer.appendChild(memberCard);
        });
    }

    // Toggle between grid and list view
    gridViewBtn.addEventListener("click", () => {
        memberContainer.classList.remove("list-view");
        memberContainer.classList.add("grid-view");
        gridViewBtn.classList.add("active");
        listViewBtn.classList.remove("active");
    });

    listViewBtn.addEventListener("click", () => {
        memberContainer.classList.remove("grid-view");
        memberContainer.classList.add("list-view");
        listViewBtn.classList.add("active");
        gridViewBtn.classList.remove("active");
    });

    // Initial fetch
    fetchMembers();
});