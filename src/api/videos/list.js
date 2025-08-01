export async function fetchVideoList() {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const response = await fetch(BASE_URL + '/list-videos.php');

    if (!response.ok) {
        throw new Error('Gagal mengambil daftar video');
    }

    return response.json(); // Pastikan backend merespons dalam format JSON
}
