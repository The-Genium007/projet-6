let cachedData = null;

export async function getPhotographers() {
    if (cachedData) {
        return cachedData;
    }
    try {
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error(`Erreur de chargement : ${response.status}`)
        }

        const data = await response.json();
        cachedData = data; // Stocke les données pour les prochains appels
        return data;
    } catch (error) {
        console.error('Erreur :', error.message);
    }
}