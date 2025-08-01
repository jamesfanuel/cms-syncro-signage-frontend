// src/usecases/configuration/product.js

import {
    productCategoryListRequest,
    productCategoryCreateRequest,
    productCategoryUpdateRequest,
    productCategoryDeleteRequest,
    productItemListRequest,
    productItemCreateRequest,
    productItemUpdateRequest,
    productItemDeleteRequest,
    productVersionListRequest,
    productVersionCreateRequest,
    productVersionUpdateRequest,
    productVersionDeleteRequest,
    productVersionUploadRequest,
} from '../../src/api/master/product';

/** Ambil list product category*/
export async function fetchProductCategories(customer_id) {
    const json = await productCategoryListRequest(customer_id);
    return json.data;
}

/** Tambah product category */
export async function createProductCategory(data) {
    const res = await productCategoryCreateRequest(data);
    return await res.json();
}

/** Update product category */
export async function updateProductCategory(id, data) {
    const res = await productCategoryUpdateRequest(id, data);
    return await res.json();
}

/** Hapus product category */
export async function deleteProductCategory(id) {
    const res = await productCategoryDeleteRequest(id);
    return await res.json();
}

///////////////////

/** Ambil list product item*/
export async function fetchProductItems(customer_id) {
    const json = await productItemListRequest(customer_id);
    return json.data;
}

/** Tambah product item */
export async function createProductItem(data) {
    const res = await productItemCreateRequest(data);
    return await res.json();
}

/** Update product item */
export async function updateProductItem(id, data) {
    const res = await productItemUpdateRequest(id, data);
    return await res.json();
}

/** Hapus product item */
export async function deleteProductItem(id) {
    const res = await productItemDeleteRequest(id);
    return await res.json();
}

///////////////////

/** Ambil list product item*/
export async function fetchProductVersions(customer_id) {
    const json = await productVersionListRequest(customer_id);
    return json.data;
}

/** Tambah product item */
export async function createProductVersion(data) {
    const res = await productVersionCreateRequest(data);
    return await res.json();
}

/** Update product item */
export async function updateProductVersion(id, data) {
    const res = await productVersionUpdateRequest(id, data);
    return await res.json();
}

/** Hapus product item */
export async function deleteProductVersion(id) {
    const res = await productVersionDeleteRequest(id);
    return await res.json();
}

/////////////////

export async function upload({ file, chunkIndex, totalChunks, fileName, versionId }) {
    const chunkSize = 5 * 1024 * 1024;
    const start = chunkIndex * chunkSize;
    const end = Math.min(file.size, start + chunkSize);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('chunk_index', chunkIndex);
    formData.append('total_chunks', totalChunks);
    formData.append('file_name', fileName);
    formData.append('version_id', versionId);

    const res = await productVersionUploadRequest(versionId, formData);

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
}
