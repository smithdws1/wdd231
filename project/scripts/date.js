export const updateDate = () => {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Updated: ${new Date(document.lastModified).toLocaleString()}`;
};

document.addEventListener('DOMContentLoaded', updateDate);