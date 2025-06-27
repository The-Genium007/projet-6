import { banner } from '../components/banner.js';
import { getPhotographers } from '../components/fetch.js';
import { gallery } from '../components/gallery.js';
import { popularity, date, title } from '../components/filter.js';


export let photographer = null;
export let medias = [];
export let mediasOrder = medias;

// Récupère l'id via l'url
const urlParams = new URLSearchParams(window.location.search);
const urlId = parseInt(urlParams.get("id"));

function header(photographer) {
    if (photographer) {
        const container = document.querySelector('.photograph-header')
        const info = document.createElement('div')
        container.insertBefore(info, container.firstChild)

        const h1 = document.createElement('h1');
        h1.textContent = photographer.name;
        info.appendChild(h1);

        const location = document.createElement('p');
        location.textContent = photographer.city + ", " + photographer.country;
        location.classList.add('location')
        info.appendChild(location)

        const tag = document.createElement('p');
        tag.textContent = photographer.tagline;
        tag.classList.add('tag')
        info.appendChild(tag);

        const picture = `assets/photographers/${photographer.portrait}`;
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', photographer.name);
        container.appendChild(img)
    } else {
        console.log("Aucun utilisateur avec cet ID.");
    }
}

document.getElementById('sort-select').addEventListener('change', (e) => {
    let sortedMedias;
    if (e.target.value === 'popularity') {
        sortedMedias = popularity(photographer, medias);
    } else if (e.target.value === 'date') {
        sortedMedias = date(photographer, medias);
    } else if (e.target.value === 'title') {
        sortedMedias = title(photographer, medias);
    }
    if (sortedMedias) {
        // Supprime l'ancienne galerie
        document.querySelectorAll('.gallery').forEach(el => el.remove());
        // Affiche la nouvelle galerie triée
        gallery(photographer, sortedMedias);
    }
})

async function init() {
    const { photographers, media } = await getPhotographers();
    photographer = photographers.find((e) => e.id === urlId);
    medias = media.filter((e) => e.photographerId === urlId);

    header(photographer);
    banner(photographer, medias);
    gallery(photographer, medias);
}

init();