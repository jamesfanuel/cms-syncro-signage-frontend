// src/api/outlet.js
import { API_ENDPOINTS } from '../../config/api';

export async function outletListRequest(customer_id) {
    const response = await fetch(API_ENDPOINTS.outlet.find(customer_id));
    if (!response.ok) throw new Error('Gagal fetch data outlet');
    return await response.json();
}

export function outletCreateRequest(data) {
    return fetch(API_ENDPOINTS.outlet.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function outletUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.outlet.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function outletDeleteRequest(id) {
    return fetch(API_ENDPOINTS.outlet.delete(id), {
        method: 'DELETE'
    });
}