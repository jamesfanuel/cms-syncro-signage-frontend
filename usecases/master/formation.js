// src/usecases/configuration/formation.js

import {
    formationListRequest,
    formationCreateRequest,
    formationUpdateRequest,
    formationDeleteRequest
} from '../../src/api/master/formation';

/** Ambil list formation */
export async function fetchFormations(customer_id) {
    const json = await formationListRequest(customer_id);
    return json.data;
}

/** Tambah formation */
export async function createFormation(data) {
    const res = await formationCreateRequest(data);
    return await res.json();
}

/** Update formation */
export async function updateFormation(id, data) {
    const res = await formationUpdateRequest(id, data);
    return await res.json();
}

/** Hapus formation */
export async function deleteFormation(id) {
    const res = await formationDeleteRequest(id);
    return await res.json();
}