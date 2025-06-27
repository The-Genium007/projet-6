export async function getPhotographers() {
    try {
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error(`Erreur de chargement : ${response.status}`)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur :', error.message);

    }
}