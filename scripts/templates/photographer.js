export function photographerTemplate(data) {
    // Déstructure les propriétés du photographe
    const { name, portrait, id, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    /**
     * Génère le DOM de la carte photographe
     * @returns {HTMLElement} - L'élément article représentant la carte
     */
    function getUserCardDOM() {
        const article = document.createElement('article');

        // Lien vers la page du photographe
        const link = document.createElement('a');
        link.href = `photographer.html?id=${id}`;
        link.setAttribute('aria-label', name);

        // Image du photographe
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);

        link.appendChild(img);
        article.appendChild(link);

        // Nom du photographe
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(h2);
        link.appendChild(h2);

        // Localisation (ville, pays)
        const location = document.createElement('p');
        location.textContent = city + ", " + country;
        location.classList.add('location');
        article.appendChild(location);

        // Slogan du photographe
        const info = document.createElement('p');
        info.textContent = tagline;
        info.classList.add('info');
        article.appendChild(info);

        // Tarif journalier
        const cost = document.createElement('p');
        cost.textContent = price + "€/jour";
        cost.classList.add('cost');
        article.appendChild(cost);

        return article;
    }
    // Retourne les infos utiles et la méthode de création du DOM
    return { name, picture, getUserCardDOM }
}