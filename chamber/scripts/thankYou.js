document.addEventListener("DOMContentLoaded", () => {
    // Display submitted form data
    const urlParams = new URLSearchParams(window.location.search);
    const infoContainer = document.getElementById("submitted-info");
    infoContainer.innerHTML = `
        <p><strong>First Name:</strong> ${urlParams.get("firstname") || "N/A"}</p>
        <p><strong>Last Name:</strong> ${urlParams.get("lastname") || "N/A"}</p>
        <p><strong>Email:</strong> ${urlParams.get("email") || "N/A"}</p>
        <p><strong>Mobile Phone:</strong> ${urlParams.get("phone") || "N/A"}</p>
        <p><strong>Business Name:</strong> ${urlParams.get("businessname") || "N/A"}</p>
        <p><strong>Submitted On:</strong> ${urlParams.get("timestamp") || "N/A"}</p>
    `;
});