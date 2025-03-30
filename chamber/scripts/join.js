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
            const modal = document.getElementById(modalId);
            modal.showModal();
            modal.querySelector(".modal-close").focus();
        });
    });

    closes.forEach(close => {
        close.addEventListener("click", () => {
            const modal = close.closest(".modal");
            modal.close();
            document.querySelector(`[href='#${modal.id}']`).focus();
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.close();
                document.querySelector(`[href='#${modal.id}']`).focus();
            }
        });
    });

    // Close modal with Esc key
    modals.forEach(modal => {
        modal.addEventListener("close", () => {
            document.querySelector(`[href='#${modal.id}']`).focus();
        });
    });
});