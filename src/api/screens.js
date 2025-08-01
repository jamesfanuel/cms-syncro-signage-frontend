// src/api/screens.js

export function fetchScreens() {
    console.log('[API] GET /api/screens');

    // Dummy data layar
    return Promise.resolve([
        { id: 'screen-1', location: 'Lantai 1', type: 'Hisense' },
        { id: 'screen-2', location: 'Lantai 2', type: 'Samsung' },
    ]);
}

export function addScreen(screen) {
    console.log('[API] POST /api/screens', screen);

    // Simulasi kirim data dan berhasil
    return Promise.resolve({ success: true, ...screen });
}
