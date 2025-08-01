// src/usecases/configuration/client.js

import {
    clientListRequest,
    clientCreateRequest,
    clientUpdateRequest,
    clientDeleteRequest
} from '../../src/api/master/client';

/** Ambil list client */
export async function fetchClients(customer_id) {
    const json = await clientListRequest(customer_id);
    return json.data;
}

/** Tambah client */
export async function createClient(data) {
    const res = await clientCreateRequest(data);
    return await res.json();
}

/** Update client */
export async function updateClient(id, data) {
    const res = await clientUpdateRequest(id, data);
    return await res.json();
}

/** Hapus client */
export async function deleteClient(id) {
    const res = await clientDeleteRequest(id);
    return await res.json();
}