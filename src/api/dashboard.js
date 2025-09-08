// src/api/dashboard.js
import { API_ENDPOINTS } from '../config/api';

export async function totalScreenRequest(customer_id) {
    const response = await fetch(API_ENDPOINTS.dashboard.screen(customer_id));
    if (!response.ok) throw new Error('Gagal fetch data dashboard');
    return await response.json();
}

export async function totalOrderRequest(customer_id) {
    const response = await fetch(API_ENDPOINTS.dashboard.order(customer_id));
    if (!response.ok) throw new Error('Gagal fetch data dashboard');
    return await response.json();
}