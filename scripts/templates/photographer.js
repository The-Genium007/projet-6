export function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        const link = document.createElement('a');
        link.href = `photographer.html?id=${id}`;
        link.setAttribute('aria-label', name);

        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', name);

        link.appendChild(img);
        article.appendChild(link);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(h2);
        link.appendChild(h2)

        const location = document.createElement('p');
        location.textContent = city + ", " + country;
        location.classList.add('location')
        article.appendChild(location)

        const info = document.createElement('p');
        info.textContent = tagline;
        info.classList.add('info')
        article.appendChild(info);

        const cost = document.createElement('p');
        cost.textContent = price + "€/jour";
        cost.classList.add('cost')
        article.appendChild(cost);


        return article;
    }
    return { name, picture, getUserCardDOM }
}