// src/api/playlist.js
import { API_ENDPOINTS } from '../../config/api';

export async function playlistListRequest(customer_id, outlet_id) {
    const response = await fetch(API_ENDPOINTS.playlist.find(customer_id, outlet_id));
    if (!response.ok) throw new Error('Gagal fetch data playlist');
    return await response.json();
}

export function playlistCreateRequest(data) {
    return fetch(API_ENDPOINTS.playlist.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}