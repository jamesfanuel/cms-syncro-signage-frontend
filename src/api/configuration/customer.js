// src/api/customer.js
import { API_ENDPOINTS } from '../../config/api';

export async function customerListRequest() {
    const response = await fetch(API_ENDPOINTS.customer.find);
    if (!response.ok) throw new Error('Gagal fetch data customer');
    return await response.json();
}

export function customerCreateRequest(data) {
    return fetch(API_ENDPOINTS.customer.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function customerUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.customer.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function customerDeleteRequest(id) {
    return fetch(API_ENDPOINTS.customer.delete(id), {
        method: 'DELETE'
    });
}
