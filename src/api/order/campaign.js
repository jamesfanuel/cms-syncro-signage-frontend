// src/api/campaign.js
import { API_ENDPOINTS } from '../../config/api';

export async function campaignListRequest(customer_id) {
    const response = await fetch(API_ENDPOINTS.campaign.find(customer_id));
    if (!response.ok) throw new Error('Gagal fetch data campaign');
    return await response.json();
}

export function campaignCreateRequest(data) {
    return fetch(API_ENDPOINTS.campaign.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function campaignUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.campaign.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function campaignDeleteRequest(id) {
    return fetch(API_ENDPOINTS.campaign.delete(id), {
        method: 'DELETE'
    });
}