// src/usecases/configuration/client.js

import {
    totalScreenRequest,
    totalOrderRequest,
} from '../src/api/dashboard';

export async function fetchTotalScreen(customer_id) {
    const json = await totalScreenRequest(customer_id);
    return json.data;
}

export async function fetchTotalOrder(customer_id) {
    const json = await totalOrderRequest(customer_id);
    return json.data;
}