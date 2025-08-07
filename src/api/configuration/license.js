// src/api/licenses.js
import { API_ENDPOINTS } from '../../config/api';

export async function licenseValidateRequest() {
    const response = await fetch(API_ENDPOINTS.license.validate);
    if (!response.ok) throw new Error('Gagal fetch data license');
    return await response.json();
}

export async function licenseListRequest() {
    const response = await fetch(API_ENDPOINTS.license.find);
    if (!response.ok) throw new Error('Gagal fetch data license');
    return await response.json();
}

export function licenseCreateRequest(data) {
    return fetch(API_ENDPOINTS.license.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function licenseUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.license.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function licenseDeleteRequest(id) {
    return fetch(API_ENDPOINTS.license.delete(id), {
        method: 'DELETE'
    });
}
