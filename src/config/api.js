// src/config/api.js

const BASE_URL = '/api'; // lewat proxy

export const API_ENDPOINTS = {
    auth: {
        login: `${BASE_URL}/auth/login`,
    },
    customer: {
        find: `${BASE_URL}/customer/get`,
        findById: (id) => `${BASE_URL}/customer/get/${id}`,
        create: `${BASE_URL}/customer/create`,
        update: (id) => `${BASE_URL}/customer/update/${id}`,
        delete: (id) => `${BASE_URL}/customer/delete/${id}`,
    },
    user: {
        find: `${BASE_URL}/auth/get`,
        findById: (id) => `${BASE_URL}/auth/get/${id}`,
        create: `${BASE_URL}/auth/register`,
        update: (id) => `${BASE_URL}/auth/update/${id}`,
        delete: (id) => `${BASE_URL}/auth/delete/${id}`,
    },
    client: {
        find: (customer_id) => `${BASE_URL}/customer/${customer_id}/clients`,
        findById: (id) => `${BASE_URL}/client/get/${id}`,
        create: `${BASE_URL}/client/create`,
        update: (id) => `${BASE_URL}/client/update/${id}`,
        delete: (id) => `${BASE_URL}/client/delete/${id}`,
    },
    productCategory: {
        find: (customer_id) => `${BASE_URL}/customer/${customer_id}/categories`,
        findById: (id) => `${BASE_URL}/product/category/get/${id}`,
        create: `${BASE_URL}/product/category/create`,
        update: (id) => `${BASE_URL}/product/category/update/${id}`,
        delete: (id) => `${BASE_URL}/product/category/delete/${id}`,
    },
    productItem: {
        find: (customer_id) => `${BASE_URL}/customer/${customer_id}/products`,
        findById: (id) => `${BASE_URL}/product/item/get/${id}`,
        create: `${BASE_URL}/product/item/create`,
        update: (id) => `${BASE_URL}/product/item/update/${id}`,
        delete: (id) => `${BASE_URL}/product/item/delete/${id}`,
    },
    productVersion: {
        find: (customer_id, product_id) => `${BASE_URL}/customer/${customer_id}/product/${product_id}/versions`,
        findById: (id) => `${BASE_URL}/product/version/get/${id}`,
        create: `${BASE_URL}/product/version/create`,
        update: (id) => `${BASE_URL}/product/version/update/${id}`,
        delete: (id) => `${BASE_URL}/product/version/delete/${id}`,
        upload: (id) => `${BASE_URL}/product/version/${id}/upload`,
    },
    outlet: {
        find: (customer_id) => `${BASE_URL}/customer/${customer_id}/outlets`,
        findById: (id) => `${BASE_URL}/outlet/get/${id}`,
        create: `${BASE_URL}/outlet/create`,
        update: (id) => `${BASE_URL}/outlet/update/${id}`,
        delete: (id) => `${BASE_URL}/outlet/delete/${id}`,
    },
    formation: {
        find: (customer_id) => `${BASE_URL}/customer/${customer_id}/formations`,
        findById: (id) => `${BASE_URL}/formation/get/${id}`,
        findByOutlet: (outlet_id) => `${BASE_URL}/outlet/${outlet_id}/formations`,
        create: `${BASE_URL}/formation/create`,
        update: (id) => `${BASE_URL}/formation/update/${id}`,
        delete: (id) => `${BASE_URL}/formation/delete/${id}`,
    },
    campaign: {
        find: (customer_id) => `${BASE_URL}/customer/${customer_id}/campaigns`,
        findById: (id) => `${BASE_URL}/campaign/get/${id}`,
        create: `${BASE_URL}/campaign/create`,
        update: (id) => `${BASE_URL}/campaign/update/${id}`,
        delete: (id) => `${BASE_URL}/campaign/delete/${id}`,
    },
    order: {
        find: (customer_id) => `${BASE_URL}/customer/${customer_id}/orders`,
        findById: (id) => `${BASE_URL}/order/get/${id}`,
        create: `${BASE_URL}/order/create`,
        update: (id) => `${BASE_URL}/order/update/${id}`,
        delete: (id) => `${BASE_URL}/order/delete/${id}`,
    },
    orderItem: {
        find: (customer_id, order_id) => `${BASE_URL}/customer/${customer_id}/orders/${order_id}/items`,
        findById: (id) => `${BASE_URL}/order/item/get/${id}`,
        create: `${BASE_URL}/order/item/create`,
        update: (id) => `${BASE_URL}/order/item/update/${id}`,
        delete: (id) => `${BASE_URL}/order/item/delete/${id}`,
    },
    playlist: {
        find: (customer_id, outlet_id) => `${BASE_URL}/playlist/get/${customer_id}/${outlet_id}`,
        create: `${BASE_URL}/playlist/create`,
    },
};

