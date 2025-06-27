export function banner(photographer, medias) {
    const main = document.querySelector('body');
    const container = document.createElement('div');
    container.classList.add('banner');
    main.appendChild(container);

    const div1 = document.createElement('div');
    const p1 = document.createElement('p');
    p1.classList.add('likes-total');
    div1.appendChild(p1);
    const totalLikes = medias
        .filter(media => media.photographerId === photographer.id)
        .reduce((acc, media) => acc + media.likes, 0);
    p1.textContent = totalLikes;

    // SVG coeur accessible et stylisé
    const likeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    likeSvg.innerHTML = `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#312E2E"/>`;
    likeSvg.classList.add('like-svg');
    p1.appendChild(likeSvg);

    container.appendChild(div1);

    const div2 = document.createElement('div');
    const p2 = document.createElement('p');
    div2.appendChild(p2);
    p2.textContent = photographer.price + '€ / jour';
    container.appendChild(div2);
}