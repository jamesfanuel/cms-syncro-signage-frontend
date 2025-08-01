// src/api/client.js
import { API_ENDPOINTS } from '../../config/api';

export async function clientListRequest(customer_id) {
    const response = await fetch(API_ENDPOINTS.client.find(customer_id));
    if (!response.ok) throw new Error('Gagal fetch data client');
    return await response.json();
}

export function clientCreateRequest(data) {
    return fetch(API_ENDPOINTS.client.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function clientUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.client.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function clientDeleteRequest(id) {
    return fetch(API_ENDPOINTS.client.delete(id), {
        method: 'DELETE'
    });
}
