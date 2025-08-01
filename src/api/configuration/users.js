// src/api/users.js
import { API_ENDPOINTS } from '../../config/api';

export async function userListRequest() {
    const response = await fetch(API_ENDPOINTS.user.find);
    if (!response.ok) throw new Error('Gagal fetch data user');
    return await response.json();
}

export function userCreateRequest(data) {
    return fetch(API_ENDPOINTS.user.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function userUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.user.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function userDeleteRequest(id) {
    return fetch(API_ENDPOINTS.user.delete(id), {
        method: 'DELETE'
    });
}
