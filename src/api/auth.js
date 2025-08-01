// src/api/auth.js
import { API_ENDPOINTS } from '../config/api';

/**
 * Kirim data login ke backend PHP via JSON body
 * @param {string} username - Bisa email atau username
 * @param {string} password
 * @returns {Promise<Object>} data user dan token jika berhasil
 */
export async function loginRequest(username, password) {
    let login = username
    const payload = { login, password };

    const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        // credentials: 'include', // aktifkan jika pakai PHP session
    });

    const result = await safeParseJson(response);

    if (!response.ok || result?.status !== 'success') {
        const message = result?.message || `Login gagal: HTTP ${response.status}`;
        throw new Error(message);
    }

    return result;
}

/**
 * Helper: parse JSON dengan fallback error handling
 */
async function safeParseJson(response) {
    try {
        return await response.json();
    } catch {
        return null;
    }
}
