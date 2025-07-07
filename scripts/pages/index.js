import { getPhotographers } from '../data/fetch.js';
import { photographerTemplate } from '../templates/photographer.js';

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        // Crée le modèle du photographe
        const photographerModel = photographerTemplate(photographer);
        // Génère le DOM de la carte
        const userCardDOM = photographerModel.getUserCardDOM();
        // Ajoute la carte à la section
        photographersSection.appendChild(userCardDOM);
    });
}

/**
 * Initialise la page d'accueil :
 * - Récupère les données des photographes
 * - Affiche les cartes
 */
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

// Lance l'initialisation au chargement de la page
init();

