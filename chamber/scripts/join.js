document.addEventListener("DOMContentLoaded", () => {
    // Navigation toggle (reused from home.js)
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const isExpanded = navMenu.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isExpanded);
        menuToggle.textContent = isExpanded ? "✖" : "☰";
    });

    // Set timestamp
    const timestampField = document.getElementById("timestamp");
    timestampField.value = new Date().toLocaleString();

    // Modal functionality
    const triggers = document.querySelectorAll(".modal-trigger");
    const modals = document.querySelectorAll(".modal");
    const closes = document.querySelectorAll(".modal-close");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute("href").substring(1);
            document.getElementById(modalId).style.display = "block";
        });
    });

    closes.forEach(close => {
        close.addEventListener("click", () => {
            modals.forEach(modal => modal.style.display = "none");
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            modals.forEach(modal => modal.style.display = "none");
        }
    });
});