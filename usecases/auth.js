import { loginRequest } from "../src/api/auth";
import { auth } from "../src/stores/auth";

/**
 * Login dan set session ke localStorage + store
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} user data
 */
export async function login(username, password) {
    try {
        const result = await loginRequest(username, password);

        if (!result || result.status !== "success") {
            throw new Error(result.message || "Login gagal");
        }

        const data = result.data;
        const role = data.is_admin === 1 ? "admin" : "customer";

        // Simpan ke localStorage
        setSession({
            token: data.token,
            user_id: data.user_id,
            user_name: data.user_name,
            email: data.email,
            is_admin: data.is_admin,
            customer_id: data.customer_id,
            level: data.level,
            role,
        });

        // Simpan ke store
        auth.set({
            isLoggedIn: true,
            token: data.token,
            user_id: data.user_id,
            user_name: data.user_name,
            email: data.email,
            is_admin: data.is_admin,
            customer_id: data.customer_id,
            level: data.level,
            role,
        });

        return data;
    } catch (error) {
        throw new Error(error.message || "Gagal login");
    }
}

/**
 * Logout, hapus session dan reset store
 */
export function logout() {
    clearSession();
    auth.set({
        isLoggedIn: false,
        token: null,
        user_id: null,
        user_name: null,
        email: null,
        is_admin: null,
        customer_id: null,
        role: null,
        level: null,
    });
}

/**
 * Simpan session ke localStorage
 */
function setSession({ token, user_id, user_name, email, is_admin, role, customer_id, level }) {
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("user_name", user_name);
    localStorage.setItem("email", email);
    localStorage.setItem("is_admin", is_admin);
    localStorage.setItem("role", role);
    localStorage.setItem("customer_id", customer_id);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("level", level);
}

/**
 * Hapus semua session
 */
function clearSession() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("email");
    localStorage.removeItem("is_admin");
    localStorage.removeItem("role");
    localStorage.removeItem("customer_id");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("level");
}

/**
 * Ambil data user dari localStorage (misal untuk onMount App.svelte)
 */
export function getUserSession() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const customer_id = localStorage.getItem("customer_id");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const level = localStorage.getItem("level");

    return {
        isLoggedIn,
        token: token || null,
        role: role || null,
        user_id: localStorage.getItem("user_id") || null,
        user_name: localStorage.getItem("user_name") || null,
        email: localStorage.getItem("email") || null,
        is_admin: localStorage.getItem("is_admin") || null,
        customer_id: localStorage.getItem("customer_id") || null,
        level: localStorage.getItem("level") || null,
    };
}
