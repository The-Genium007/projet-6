export function caroussel(media, index, photographerMedias, folderName) {
    // Supprime une ancienne modale si elle existe
    const oldModal = document.getElementById('caroussel-modal');
    if (oldModal) oldModal.remove();

    // Création de la modale
    const modal = document.createElement('div');
    modal.id = 'caroussel-modal';
    modal.classList.add('caroussel-modal');

    // Bouton gauche
    const leftBtn = document.createElement('button');
    leftBtn.textContent = '‹';
    leftBtn.classList.add('caroussel-left');
    leftBtn.setAttribute('aria-label', 'Précédent');

    // Bouton droite
    const rightBtn = document.createElement('button');
    rightBtn.textContent = '›';
    rightBtn.classList.add('caroussel-right');
    rightBtn.setAttribute('aria-label', 'Suivant');

    // Bouton de fermeture (croix)
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.setAttribute('aria-label', 'Fermer');
    closeBtn.classList.add('close-btn');
    closeBtn.addEventListener('click', () => modal.remove());

    // Création du conteneur colonne droite (croix + flèche droite)
    const rightCol = document.createElement('div');
    rightCol.classList.add('control');
    rightCol.appendChild(closeBtn);
    rightCol.appendChild(rightBtn);

    // Fonction d'affichage du média courant
    function showMedia(idx) {
        // Supprime l'ancien média si présent
        const oldMedia = modal.querySelector('.caroussel-media');
        if (oldMedia) oldMedia.remove();
        const oldTitle = modal.querySelector('.caroussel-title');
        if (oldTitle) oldTitle.remove();

        const currentMedia = photographerMedias[idx];
        let mediaNode;
        if (currentMedia.image) {
            mediaNode = document.createElement('img');
            mediaNode.src = `assets/images/${folderName}/${currentMedia.image}`;
            mediaNode.alt = currentMedia.title;
        } else if (currentMedia.video) {
            mediaNode = document.createElement('video');
            mediaNode.src = `assets/images/${folderName}/${currentMedia.video}`;
            mediaNode.controls = true;
        }
        mediaNode.classList.add('caroussel-media');

        // Création du titre sous le média
        const mediaTitle = document.createElement('div');
        mediaTitle.classList.add('caroussel-title');
        mediaTitle.textContent = currentMedia.title;

        // Création d'un conteneur pour le média et son titre
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('caroussel-media-container');
        mediaContainer.appendChild(mediaNode);
        mediaContainer.appendChild(mediaTitle);

        // Ajoute dans l'ordre : gauche, (media+title), colonne droite
        modal.innerHTML = '';
        modal.appendChild(leftBtn);
        modal.appendChild(mediaContainer);
        modal.appendChild(rightCol);
    }

    // Navigation boutons
    leftBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let newIndex = index - 1;
        if (newIndex < 0) newIndex = photographerMedias.length - 1;
        caroussel(photographerMedias[newIndex], newIndex, photographerMedias, folderName);
    });

    rightBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let newIndex = index + 1;
        if (newIndex >= photographerMedias.length) newIndex = 0;
        caroussel(photographerMedias[newIndex], newIndex, photographerMedias, folderName);
    });

    // Gestion clavier
    function handleKeydown(e) {
        if (e.key === "ArrowLeft") {
            let newIndex = index - 1;
            if (newIndex < 0) newIndex = photographerMedias.length - 1;
            caroussel(photographerMedias[newIndex], newIndex, photographerMedias, folderName);
        } else if (e.key === "ArrowRight") {
            let newIndex = index + 1;
            if (newIndex >= photographerMedias.length) newIndex = 0;
            caroussel(photographerMedias[newIndex], newIndex, photographerMedias, folderName);
        } else if (e.key === "Escape") {
            modal.remove();
            document.removeEventListener('keydown', handleKeydown);
        }
    }
    document.addEventListener('keydown', handleKeydown);

    // Nettoyage de l'event clavier à la fermeture
    closeBtn.addEventListener('click', () => {
        document.removeEventListener('keydown', handleKeydown);
    });

    // Affiche le média courant
    showMedia(index);

    // Ajoute la modale au body
    document.body.appendChild(modal);
}