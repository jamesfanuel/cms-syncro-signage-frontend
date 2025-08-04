// src/usecases/order/order.js

import {
    orderListRequest,
    orderCreateRequest,
    orderUpdateRequest,
    orderDeleteRequest,
    orderItemListRequest,
    orderItemCreateRequest,
    orderItemUpdateRequest,
    orderItemDeleteRequest
} from '../../src/api/order/order';

/** Ambil list order */
export async function fetchOrders(customer_id) {
    const json = await orderListRequest(customer_id);
    return json.data;
}

/** Tambah order */
export async function createOrder(data) {
    const res = await orderCreateRequest(data);
    return await res.json();
}

/** Update order */
export async function updateOrder(id, data) {
    const res = await orderUpdateRequest(id, data);
    return await res.json();
}

/** Hapus order */
export async function deleteOrder(id) {
    const res = await orderDeleteRequest(id);
    return await res.json();
}

///////////////

/** Ambil list order */
export async function fetchOrderItems(customer_id, order_id) {
    const json = await orderItemListRequest(customer_id, order_id);
    return json.data;
}

/** Tambah order */
export async function createOrderItem(data) {
    const res = await orderItemCreateRequest(data);
    return await res.json();
}

/** Update order */
export async function updateOrderItem(id, data) {
    const res = await orderItemUpdateRequest(id, data);
    return await res.json();
}

/** Hapus order */
export async function deleteOrderItem(id) {
    const res = await orderItemDeleteRequest(id);
    return await res.json();
}