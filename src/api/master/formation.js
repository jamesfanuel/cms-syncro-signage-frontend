// src/api/formation.js
import { API_ENDPOINTS } from '../../config/api';

export async function formationListRequest(customer_id) {
    const response = await fetch(API_ENDPOINTS.formation.find(customer_id));
    if (!response.ok) throw new Error('Gagal fetch data formation');
    return await response.json();
}

export function formationCreateRequest(data) {
    return fetch(API_ENDPOINTS.formation.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function formationUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.formation.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function formationDeleteRequest(id) {
    return fetch(API_ENDPOINTS.formation.delete(id), {
        method: 'DELETE'
    });
}