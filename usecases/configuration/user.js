// src/usecases/configuration/user.js

import {
    userListRequest,
    userCreateRequest,
    userUpdateRequest,
    userDeleteRequest
} from '../../src/api/configuration/users';

/** Ambil list user */
export async function fetchUsers() {
    const json = await userListRequest();
    return json.data;
}

/** Tambah user */
export async function createUser(data) {
    const res = await userCreateRequest(data);
    return await res.json();
}

/** Update user */
export async function updateUser(id, data) {
    const res = await userUpdateRequest(id, data);
    return await res.json();
}

/** Hapus user */
export async function deleteUser(id) {
    const res = await userDeleteRequest(id);
    return await res.json();
}
