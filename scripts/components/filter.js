import { mediasOrder } from '../pages/photographer.js';

export function popularity(photographer, medias) {
    // Trie les médias par likes décroissants
    const sorted = medias
        .filter(media => media.photographerId === photographer.id)
        .sort((a, b) => b.likes - a.likes);
    mediasOrder.length = 0;
    mediasOrder.push(...sorted);
    return sorted;
}

export function date(photographer, medias) {
    // Trie les médias par date décroissante (plus récente en premier)
    const sorted = medias
        .filter(media => media.photographerId === photographer.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    mediasOrder.length = 0;
    mediasOrder.push(...sorted);
    return sorted;
}

export function title(photographer, medias) {
    // Trie les médias par titre (ordre alphabétique)
    const sorted = medias
        .filter(media => media.photographerId === photographer.id)
        .sort((a, b) => a.title.localeCompare(b.title));
    mediasOrder.length = 0;
    mediasOrder.push(...sorted);
    return sorted;
}