// src/api/product.js
import { API_ENDPOINTS } from '../../config/api';

/** PRODUCT CATEGORY */
export async function productCategoryListRequest(customer_id) {
    const response = await fetch(API_ENDPOINTS.productCategory.find(customer_id));
    if (!response.ok) throw new Error('Gagal fetch data product');
    return await response.json();
}

export function productCategoryCreateRequest(data) {
    return fetch(API_ENDPOINTS.productCategory.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function productCategoryUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.productCategory.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function productCategoryDeleteRequest(id) {
    return fetch(API_ENDPOINTS.productCategory.delete(id), {
        method: 'DELETE'
    });
}

/** PRODUCT ITEM */

export async function productItemListRequest(customer_id, category_id) {
    const response = await fetch(API_ENDPOINTS.productItem.find(customer_id, category_id));
    if (!response.ok) throw new Error('Gagal fetch data product item');
    return await response.json();
}

export function productItemCreateRequest(data) {
    return fetch(API_ENDPOINTS.productItem.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function productItemUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.productItem.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function productItemDeleteRequest(id) {
    return fetch(API_ENDPOINTS.productItem.delete(id), {
        method: 'DELETE'
    });
}

/** PRODUCT VERSIONS */

export async function productVersionListRequest(customer_id, product_id) {
    const response = await fetch(API_ENDPOINTS.productVersion.find(customer_id, product_id));
    if (!response.ok) throw new Error('Gagal fetch data product version');
    return await response.json();
}

export function productVersionCreateRequest(data) {
    return fetch(API_ENDPOINTS.productVersion.create, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function productVersionUpdateRequest(id, data) {
    return fetch(API_ENDPOINTS.productVersion.update(id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export function productVersionDeleteRequest(id) {
    return fetch(API_ENDPOINTS.productVersion.delete(id), {
        method: 'DELETE'
    });
}

export function productVersionUploadRequest(id, formData) {
    return fetch(API_ENDPOINTS.productVersion.upload(id), {
        method: 'POST',
        body: formData
    });
}
