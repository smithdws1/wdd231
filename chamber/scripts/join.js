document.addEventListener("DOMContentLoaded", () => {
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