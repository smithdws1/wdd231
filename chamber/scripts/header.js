document.addEventListener("DOMContentLoaded", () => {
    // Navigation toggle for mobile view
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const isExpanded = navMenu.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", isExpanded);
            menuToggle.textContent = isExpanded ? "✖" : "☰";
        });
    }
});