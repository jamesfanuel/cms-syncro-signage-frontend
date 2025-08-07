// src/usecases/configuration/license.js

import {
    licenseListRequest,
    licenseValidateRequest,
    licenseCreateRequest,
    licenseUpdateRequest,
    licenseDeleteRequest
} from '../../src/api/configuration/license';

/** Ambil list license */
export async function fetchLicenses() {
    const json = await licenseListRequest();
    return json.data;
}

/** Ambil list license */
export async function validateLicenses() {
    const json = await licenseValidateRequest();
    return json.data;
}

/** Tambah license */
export async function createLicense(data) {
    const res = await licenseCreateRequest(data);
    return await res.json();
}

/** Update license */
export async function updateLicense(id, data) {
    const res = await licenseUpdateRequest(id, data);
    return await res.json();
}

/** Hapus license */
export async function deleteLicense(id) {
    const res = await licenseDeleteRequest(id);
    return await res.json();
}
