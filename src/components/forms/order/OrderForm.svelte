<script>
    import { createEventDispatcher } from "svelte";

    export let selectedOrder = null;

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name") || "unknown";
    const customerId = localStorage.getItem("customer_id") || "unknown";

    export let campaigns = [];

    let formData = {
        campaign_id: null,
        order_id: null,
        order_name: "",
        duration: null,
        customer_id: customerId,
        created_by: currentUser,
    };

    // Reaktif terhadap perubahan selectedOrder
    $: if (selectedOrder && selectedOrder.order_id !== formData.order_id) {
        formData = {
            campaign_id: +selectedOrder.campaign_id,
            order_id: selectedOrder.order_id,
            order_name: selectedOrder.order_name,
            duration: selectedOrder.duration,
            customer_id: parseInt(selectedOrder.customer_id) || null,
            created_by: selectedOrder.created_by || currentUser,
        };
    } else if (!selectedOrder && formData.order_id !== null) {
        formData = {
            campaign_id: null,
            order_id: null,
            order_name: "",
            duration: null,
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
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.campaign_id}
        >
            <option value="" disabled>Pilih Campaign</option>
            {#each campaigns as campaign}
                <option value={+campaign.campaign_id}>
                    {campaign.campaign_name}
                </option>
            {/each}
        </select>
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Order Name</label>
        <input
            type="text"
            bind:value={formData.order_name}
            class="w-full border px-3 py-2 rounded"
        />
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Duration</label>
        <input
            type="number"
            bind:value={formData.duration}
            class="w-full border px-3 py-2 rounded"
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
