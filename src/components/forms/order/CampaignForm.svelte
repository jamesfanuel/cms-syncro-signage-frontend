<script>
    import { createEventDispatcher } from "svelte";

    export let selectedCampaign = null;
    export let clients = [];

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name") || "unknown";
    const customerId = localStorage.getItem("customer_id") || "unknown";

    let formData = {
        campaign_id: null,
        campaign_name: "",
        client_id: "",
        start_date: "",
        end_date: "",
        customer_id: customerId,
        created_by: currentUser,
    };

    // sinkron edit / reset add baru
    $: if (
        selectedCampaign &&
        selectedCampaign.campaign_id !== formData.campaign_id
    ) {
        formData = {
            campaign_id: selectedCampaign.campaign_id,
            campaign_name: selectedCampaign.campaign_name || "",
            client_id: selectedCampaign.client_id || "",
            start_date: selectedCampaign.start_date || "",
            end_date: selectedCampaign.end_date || "",
            customer_id: selectedCampaign.customer_id || customerId,
            created_by: selectedCampaign.created_by || currentUser,
        };
    } else if (!selectedCampaign && formData.campaign_id !== null) {
        formData = {
            campaign_id: null,
            campaign_name: "",
            client_id: "",
            start_date: "",
            end_date: "",
            customer_id: customerId,
            created_by: currentUser,
        };
    }

    function handleSubmit() {
        dispatch("submit", formData);
    }

    function handleClose() {
        dispatch("close");
    }

    // ✅ cek kelengkapan + validasi end date > start date
    $: isEndDateValid =
        formData.start_date &&
        formData.end_date &&
        new Date(formData.end_date) > new Date(formData.start_date);

    $: isFormValid =
        formData.campaign_name.trim() &&
        formData.client_id &&
        formData.start_date &&
        formData.end_date &&
        isEndDateValid;
</script>

<div class="space-y-4">
    <!-- Campaign Name -->
    <div>
        <label class="block text-sm mb-1 font-medium">Campaign Name</label>
        <input
            type="text"
            bind:value={formData.campaign_name}
            class="w-full border px-3 py-2 rounded"
        />
    </div>

    <!-- Client -->
    <div>
        <label class="block text-sm mb-1 font-medium">Client Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.client_id}
        >
            <option value="" disabled>Pilih Client</option>
            {#each clients as client}
                <option value={client.client_id}>
                    {client.client_name}
                </option>
            {/each}
        </select>
    </div>

    <!-- Start Date -->
    <div>
        <label class="block text-sm font-medium mb-1">Start Date</label>
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.start_date}
        />
    </div>

    <!-- End Date -->
    <div>
        <label class="block text-sm font-medium mb-1">End Date</label>
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.end_date}
        />
        {#if formData.start_date && formData.end_date && !isEndDateValid}
            <p class="text-red-500 text-sm mt-1">
                End Date harus lebih besar dari Start Date
            </p>
        {/if}
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-2 mt-4">
        <button
            class="px-4 py-2 rounded border border-gray-400"
            on:click={handleClose}
            type="button"
        >
            Cancel
        </button>
        <button
            class="px-4 py-2 rounded bg-[#5E6B75] text-white hover:bg-[#4c5962] disabled:opacity-50 disabled:cursor-not-allowed"
            on:click={handleSubmit}
            type="button"
            disabled={!isFormValid}
        >
            {formData.campaign_id ? "Save" : "Add"}
        </button>
    </div>
</div>
