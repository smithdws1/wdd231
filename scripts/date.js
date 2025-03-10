document.addEventListener("DOMContentLoaded", () => {
    // Set the current year
    document.getElementById("currentyear").textContent = new Date().getFullYear();

    // Set the last modified date
    document.getElementById("lastModified").textContent = "Last Updated: " + new Date(document.lastModified).toLocaleString();
});