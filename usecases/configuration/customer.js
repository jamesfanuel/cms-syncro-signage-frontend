// src/usecases/configuration/customer.js

import {
    customerListRequest,
    customerCreateRequest,
    customerUpdateRequest,
    customerDeleteRequest
} from '../../src/api/configuration/customer';

/** Ambil list customer */
export async function fetchCustomers() {
    const json = await customerListRequest();
    return json.data;
}

/** Tambah customer */
export async function createCustomer(data) {
    const res = await customerCreateRequest(data);
    return await res.json();
}

/** Update customer */
export async function updateCustomer(id, data) {
    const res = await customerUpdateRequest(id, data);
    return await res.json();
}

/** Hapus customer */
export async function deleteCustomer(id) {
    const res = await customerDeleteRequest(id);
    return await res.json();
}
