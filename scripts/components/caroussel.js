export function carousselFactory(media, index, photographerMedias, folderName) {
    // État local et méthodes privées
    let currentIndex = index;
    
    function createModal() {
        const modal = document.createElement('div');
        modal.id = 'caroussel-modal';
        modal.classList.add('caroussel-modal');
        modal.setAttribute('aria-label', 'image closeup view');
        return modal;
    }
    
    function createNavigationButtons() {
        // Bouton gauche
        const leftBtn = document.createElement('button');
        leftBtn.textContent = '‹';
        leftBtn.classList.add('caroussel-left');
        leftBtn.setAttribute('aria-label', 'Previous image');
        
        // Bouton droite
        const rightBtn = document.createElement('button');
        rightBtn.textContent = '›';
        rightBtn.classList.add('caroussel-right');
        rightBtn.setAttribute('aria-label', 'Next image');
        
        return { leftBtn, rightBtn };
    }
    
    function createCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.setAttribute('aria-label', 'Close dialog');
        closeBtn.classList.add('close-btn');
        return closeBtn;
    }
    
    function createMediaElement(currentMedia) {
        let mediaNode;
        if (currentMedia.image) {
            mediaNode = document.createElement('img');
            mediaNode.src = `assets/images/${folderName}/${currentMedia.image}`;
            mediaNode.alt = currentMedia.title;
            mediaNode.setAttribute('aria-label', `${media.image.split('.')[0]}`.replace(/_/g, ' '));
        } else if (currentMedia.video) {
            mediaNode = document.createElement('video');
            mediaNode.src = `assets/images/${folderName}/${currentMedia.video}`;
            mediaNode.controls = true;
            mediaNode.setAttribute('aria-label', `${media.video.split('.')[0]}`.replace(/_/g, ' '));
        }
        mediaNode.classList.add('caroussel-media');
        return mediaNode;
    }
    
    function createMediaContainer(currentMedia) {
        const mediaNode = createMediaElement(currentMedia);
        
        // Création du titre sous le média
        const mediaTitle = document.createElement('div');
        mediaTitle.classList.add('caroussel-title');
        mediaTitle.textContent = currentMedia.title;
        
        // Conteneur pour le média et son titre
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('caroussel-media-container');
        mediaContainer.appendChild(mediaNode);
        mediaContainer.appendChild(mediaTitle);
        
        return mediaContainer;
    }
    
    // Objet public avec les méthodes exposées
    return {
        // Méthode principale pour afficher le carousel
        render() {
            // Supprime une ancienne modale si elle existe
            const oldModal = document.getElementById('caroussel-modal');
            if (oldModal) oldModal.remove();
            
            const modal = createModal();
            const { leftBtn, rightBtn } = createNavigationButtons();
            const closeBtn = createCloseButton();
            
            // Création du conteneur colonne droite
            const rightCol = document.createElement('div');
            rightCol.classList.add('control');
            rightCol.appendChild(closeBtn);
            rightCol.appendChild(rightBtn);
            
            // Fonction pour mettre à jour l'affichage
            const updateDisplay = () => {
                const currentMedia = photographerMedias[currentIndex];
                const mediaContainer = createMediaContainer(currentMedia);
                
                // Actualiser le contenu modal
                modal.innerHTML = '';
                modal.appendChild(leftBtn);
                modal.appendChild(mediaContainer);
                modal.appendChild(rightCol);
            };
            
            // Navigation
            leftBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex - 1 + photographerMedias.length) % photographerMedias.length;
                updateDisplay();
            });
            
            rightBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = (currentIndex + 1) % photographerMedias.length;
                updateDisplay();
            });
            
            // Fermeture
            const cleanup = () => {
                document.removeEventListener('keydown', handleKeydown);
                modal.remove();
            };
            
            closeBtn.addEventListener('click', cleanup);
            
            // Navigation clavier
            const handleKeydown = (e) => {
                if (e.key === "ArrowLeft") {
                    currentIndex = (currentIndex - 1 + photographerMedias.length) % photographerMedias.length;
                    updateDisplay();
                } else if (e.key === "ArrowRight") {
                    currentIndex = (currentIndex + 1) % photographerMedias.length;
                    updateDisplay();
                } else if (e.key === "Escape") {
                    cleanup();
                }
            };
            
            document.addEventListener('keydown', handleKeydown);
            
            // Affichage initial
            updateDisplay();
            
            // Ajoute la modale au body
            document.body.appendChild(modal);
            
            // Retourne une référence à la modale et la méthode de nettoyage
            return { modal, cleanup };
        }
    };
}

// Utilisation simplifiée pour remplacer l'ancienne fonction
export function caroussel(media, index, photographerMedias, folderName) {
    carousselFactory(media, index, photographerMedias, folderName).render();
}