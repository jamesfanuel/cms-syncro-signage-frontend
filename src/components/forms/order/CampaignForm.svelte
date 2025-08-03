<script>
    import { createEventDispatcher } from "svelte";

    export let selectedCampaign = null;

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name") || "unknown";
    const customerId = localStorage.getItem("customer_id") || "unknown";

    export let clients = [];

    let formData = {
        campaign_id: null,
        campaign_name: "",
        client_id: null,
        start_date: "",
        end_date: "",
        customer_id: customerId,
        created_by: currentUser,
    };

    // Reaktif terhadap perubahan selectedCampaign
    $: if (selectedCampaign && selectedCampaign.campaign_id !== formData.campaign_id) {
        formData = {
            campaign_id: selectedCampaign.campaign_id,
            campaign_name: selectedCampaign.campaign_name,
            client_id: selectedCampaign.client_id,
            start_date: selectedCampaign.start_date,
            end_date: selectedCampaign.end_date,
            customer_id: parseInt(selectedCampaign.customer_id) || null,
            created_by: selectedCampaign.created_by || currentUser,
        };
    } else if (!selectedCampaign && formData.campaign_id !== null) {
        formData = {
            campaign_id: null,
            campaign_name: "",
            client_id: null,
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
</script>

<div class="space-y-4">
    <div>
        <label class="block text-sm mb-1 font-medium">Campaign Name</label>
        <input
            type="text"
            bind:value={formData.campaign_name}
            class="w-full border px-3 py-2 rounded"
        />
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Client Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.client_id}
        >
            <option value="" disabled>Pilih Client</option>
            {#each clients as client}
                <option value={+client.client_id}>
                    {client.client_name}
                </option>
            {/each}
        </select>
    </div>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1"
            >Start Date</label
        >
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.start_date}
        />
    </div>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1"
            >End Date</label
        >
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.end_date}
        />
    </div>

    <div class="flex justify-end gap-2 mt-4">
        <button
            class="px-4 py-2 rounded border border-gray-400"
            on:click={handleClose}>Cancel</button
        >
        <button
            class="px-4 py-2 rounded bg-[#5E6B75] text-white hover:bg-[#4c5962]"
            on:click={handleSubmit}
        >
            {formData.campaign_id ? "Save" : "Add"}
        </button>
    </div>
</div>
