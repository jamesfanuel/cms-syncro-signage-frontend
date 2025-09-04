<script>
    import { createEventDispatcher } from "svelte";

    export let selectedOutlet = null;

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name") || "unknown";
    const customerId = localStorage.getItem("customer_id") || "unknown";

    let formData = {
        outlet_id: null,
        outlet_name: "",
        customer_id: customerId,
        created_by: currentUser,
    };

    let errorMessage = "";

    // reactive check validasi
    $: isFormValid = formData.outlet_name.trim();

    // Reaktif terhadap perubahan selectedOutlet
    $: if (selectedOutlet && selectedOutlet.outlet_id !== formData.outlet_id) {
        formData = {
            outlet_id: selectedOutlet.outlet_id,
            outlet_name: selectedOutlet.outlet_name,
            customer_id: parseInt(selectedOutlet.customer_id) || null,
            created_by: selectedOutlet.created_by || currentUser,
        };
    } else if (!selectedOutlet && formData.outlet_id !== null) {
        formData = {
            outlet_id: null,
            outlet_name: "",
            customer_id: customerId,
            created_by: currentUser,
        };
    }

    function handleSubmit() {
        if (!isFormValid) {
            errorMessage = "Outlet Name wajib diisi.";
            return;
        }
        errorMessage = "";
        dispatch("submit", formData);
    }

    function handleClose() {
        dispatch("close");
    }
</script>

<div class="space-y-4">
    <div>
        <label class="block text-sm mb-1 font-medium">Outlet Name</label>
        <input
            type="text"
            bind:value={formData.outlet_name}
            class="w-full border px-3 py-2 rounded"
        />
        {#if errorMessage}
            <p class="text-red-500 text-sm mt-1">{errorMessage}</p>
        {/if}
    </div>

    <div class="flex justify-end gap-2 mt-4">
        <button
            class="px-4 py-2 rounded border border-gray-400"
            on:click={handleClose}>Cancel</button
        >
        <button
            class="px-4 py-2 rounded bg-[#5E6B75] text-white hover:bg-[#4c5962] disabled:opacity-50 disabled:cursor-not-allowed"
            on:click={handleSubmit}
            disabled={!isFormValid}
        >
            {formData.outlet_id ? "Save" : "Add"}
        </button>
    </div>
</div>
