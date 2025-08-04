// src/api/order.js
import { API_ENDPOINTS } from '../../config/api';

export async function orderListRequest(customer_id) {
    const response = await fetch(API_ENDPOINTS.order.find(customer_id));
    if (!response.ok) throw new Error('Gagal fetch data order');
    return await response.json();
}

export function orderCreateRequest(data) {
    return fetch(API_ENDPOINTS.order.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function orderUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.order.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function orderDeleteRequest(id) {
    return fetch(API_ENDPOINTS.order.delete(id), {
        method: 'DELETE'
    });
}

/////////////////

export async function orderItemListRequest(customer_id, order_id) {
    const response = await fetch(API_ENDPOINTS.orderItem.find(customer_id, order_id));
    if (!response.ok) throw new Error('Gagal fetch data orderItem');
    return await response.json();
}

export function orderItemCreateRequest(data) {
    return fetch(API_ENDPOINTS.orderItem.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function orderItemUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.orderItem.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function orderItemDeleteRequest(id) {
    return fetch(API_ENDPOINTS.orderItem.delete(id), {
        method: 'DELETE'
    });
}