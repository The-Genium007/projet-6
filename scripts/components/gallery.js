import { caroussel } from "./caroussel.js";

export function gallery(photographer, medias) {
    const main = document.querySelector('main');
    const galleryContainer = document.createElement('div');
    galleryContainer.classList.add('gallery');

    // Filtrer les médias du photographe courant
    const photographerMedias = medias.filter(media => media.photographerId === photographer.id);

    photographerMedias.forEach((media, index) => {
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-item');

        // Affichage image ou vidéo selon le type
        let mediaNode;
        if (media.image) {
            mediaNode = document.createElement('img');
            mediaNode.src = `assets/images/${photographer.name.split(' ')[0]}/${media.image}`;
            mediaNode.alt = media.title;
        } else if (media.video) {
            mediaNode = document.createElement('video');
            mediaNode.src = `assets/images/${photographer.name.split(' ')[0]}/${media.video}`;
            mediaNode.controls = true;
        }

        // Rendre le média cliquable
        if (mediaNode) {
            mediaNode.style.cursor = "pointer";
            mediaNode.addEventListener('click', () => {
                caroussel(media, index, photographerMedias, photographer.name.split(' ')[0]);
            });
            mediaElement.appendChild(mediaNode);
        }

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('media-title');

        const titleP = document.createElement('p');
        titleP.textContent = media.title;
        titleDiv.appendChild(titleP);

        // Création de la div pour les likes et le coeur
        const mediaLikeDiv = document.createElement('div');
        mediaLikeDiv.classList.add('media-like');

        // création du paragraphe des likes
        const likesP = document.createElement('p');
        likesP.textContent = media.likes;

        // Création du SVG coeur
        const likeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        likeSvg.innerHTML = `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#901C1C"/>`;
        likeSvg.classList.add('like-svg');

        // Ajoute l'event pour incrémenter les likes
        likeSvg.style.cursor = "pointer";
        likeSvg.addEventListener('click', () => {
            media.likes += 1;
            likesP.textContent = media.likes;

            // Met à jour le total dans la bannière
            const totalLikesElem = document.querySelector('.likes-total');
            if (totalLikesElem) {
                // Additionne tous les likes affichés dans la galerie
                const total = document.querySelectorAll('.media-like p');
                let sum = 0;
                total.forEach(p => sum += parseInt(p.textContent, 10));
                totalLikesElem.childNodes[0].nodeValue = sum; // garde le SVG à côté
            }
        });

        mediaLikeDiv.appendChild(likesP);
        mediaLikeDiv.appendChild(likeSvg);

        titleDiv.appendChild(mediaLikeDiv);

        mediaElement.appendChild(titleDiv);
        galleryContainer.appendChild(mediaElement);
    });

    main.appendChild(galleryContainer);
};