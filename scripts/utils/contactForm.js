import { getPhotographers } from '../data/fetch.js';

const modal = document.getElementById('contact_modal')

async function displayModal() {
    // Récupère le photographe correspondant à l'urlId
    const urlParams = new URLSearchParams(window.location.search);
    const urlId = parseInt(urlParams.get("id"));

    const { photographers } = await getPhotographers();
    let photographer = photographers.find((e) => e.id === urlId);

    // Met à jour le nom du photographe à l'ouverture de la modale
    const nameSpan = document.getElementById('photographer-name');
    if (photographer && photographer.name) {
        nameSpan.textContent = photographer.name;
    } else {
        nameSpan.textContent = "Photographe inconnu";
    }
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    modal.setAttribute('aria-label', 'Close contact form');
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-photographer');
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Récupère les valeurs des champs
        const prenom = document.getElementById('prenom').value;
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Affiche dans la console
        console.log("Prénom :", prenom);
        console.log("Nom :", nom);
        console.log("Email :", email);
        console.log("Message :", message);
    });

    const nameSpan = document.getElementById('photographer-name');
    if (nameSpan && window.photographer && window.photographer.name) {
        nameSpan.textContent = window.photographer.name;
    }
});


//la fonction displayModal est déclarée dans un module ES6 (type="module"), donc elle n’est pas accessible dans le scope global pour l’attribut onclick de ton bouton.
window.displayModal = displayModal;
window.closeModal = closeModal;