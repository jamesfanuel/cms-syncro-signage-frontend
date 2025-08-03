// src/usecases/master/outlet.js

import {
    outletListRequest,
    outletCreateRequest,
    outletUpdateRequest,
    outletDeleteRequest
} from '../../src/api/master/outlet';

/** Ambil list outlet */
export async function fetchOutlets(customer_id) {
    const json = await outletListRequest(customer_id);
    return json.data;
}

/** Tambah outlet */
export async function createOutlet(data) {
    const res = await outletCreateRequest(data);
    return await res.json();
}

/** Update outlet */
export async function updateOutlet(id, data) {
    const res = await outletUpdateRequest(id, data);
    return await res.json();
}

/** Hapus outlet */
export async function deleteOutlet(id) {
    const res = await outletDeleteRequest(id);
    return await res.json();
}