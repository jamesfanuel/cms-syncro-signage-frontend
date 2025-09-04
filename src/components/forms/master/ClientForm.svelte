<script>
    import { createEventDispatcher } from "svelte";

    export let selectedClient = null;

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name") || "unknown";
    const customerId = localStorage.getItem("customer_id") || "unknown";

    let formData = {
        client_id: null,
        client_name: "",
        customer_id: customerId,
        created_by: currentUser,
    };

    let error = "";

    // Reactive: validasi form
    $: isFormValid = formData.client_name.trim();

    // Reaktif terhadap perubahan selectedClient
    $: if (selectedClient && selectedClient.client_id !== formData.client_id) {
        formData = {
            client_id: selectedClient.client_id,
            client_name: selectedClient.client_name,
            customer_id: parseInt(selectedClient.customer_id) || null,
            created_by: selectedClient.created_by || currentUser,
        };
    } else if (!selectedClient && formData.client_id !== null) {
        formData = {
            client_id: null,
            client_name: "",
            customer_id: customerId,
            created_by: currentUser,
        };
    }

    function handleSubmit() {
        if (!isFormValid) {
            error = "Client name is required";
            return;
        }
        error = "";
        dispatch("submit", formData);
    }

    function handleClose() {
        dispatch("close");
    }
</script>

<div class="space-y-4">
    <div>
        <label class="block text-sm mb-1 font-medium">Client Name</label>
        <input
            type="text"
            bind:value={formData.client_name}
            class="w-full border px-3 py-2 rounded"
        />
        {#if error}
            <p class="text-red-500 text-sm mt-1">{error}</p>
        {/if}
    </div>

    <div class="flex justify-end gap-2 mt-4">
        <button
            type="button"
            class="px-4 py-2 rounded border border-gray-400"
            on:click={handleClose}>Cancel</button
        >
        <button
            type="button"
            class="px-4 py-2 rounded bg-[#5E6B75] text-white hover:bg-[#4c5962] disabled:opacity-50 disabled:cursor-not-allowed"
            on:click={handleSubmit}
            disabled={!isFormValid}
        >
            {formData.client_id ? "Save" : "Add"}
        </button>
    </div>
</div>
