// src/usecases/order/playlist.js

import {
    playlistListRequest,
    playlistCreateRequest
} from '../../src/api/order/playlist';

/** Ambil list playlist */
export async function fetchPlaylists(customer_id, outlet_id) {
    const json = await playlistListRequest(customer_id, outlet_id);
    return json.data;
}

/** Tambah playlist */
export async function createPlaylist(data) {
    const res = await playlistCreateRequest(data);
    return await res.json();
}