// src/usecases/order/campaign.js

import {
    campaignListRequest,
    campaignCreateRequest,
    campaignUpdateRequest,
    campaignDeleteRequest
} from '../../src/api/order/campaign';

/** Ambil list campaign */
export async function fetchCampaigns(customer_id) {
    const json = await campaignListRequest(customer_id);
    return json.data;
}

/** Tambah campaign */
export async function createCampaign(data) {
    const res = await campaignCreateRequest(data);
    return await res.json();
}

/** Update campaign */
export async function updateCampaign(id, data) {
    const res = await campaignUpdateRequest(id, data);
    return await res.json();
}

/** Hapus campaign */
export async function deleteCampaign(id) {
    const res = await campaignDeleteRequest(id);
    return await res.json();
}