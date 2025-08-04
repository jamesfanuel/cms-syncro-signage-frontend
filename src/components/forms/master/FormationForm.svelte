<script>
    import { createEventDispatcher } from "svelte";

    export let selectedFormation = null;

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name") || "unknown";
    const customerId = localStorage.getItem("customer_id") || "unknown";

    export let outlets = [];

    let formData = {
        screen_id: null,
        outlet_id: null,
        screen_name: "",
        screen_description: "",
        screen_function: "",
        customer_id: customerId,
        created_by: currentUser,
    };

    // Reaktif terhadap perubahan selectedFormation
    $: if (
        selectedFormation &&
        selectedFormation.screen_id !== formData.screen_id
    ) {
        formData = {
            screen_id: selectedFormation.screen_id,
            outlet_id: selectedFormation.outlet_id,
            screen_name: selectedFormation.screen_name,
            screen_description: selectedFormation.screen_description,
            screen_function: selectedFormation.screen_function,
            customer_id: parseInt(selectedFormation.customer_id) || null,
            created_by: selectedFormation.created_by || currentUser,
        };
    } else if (!selectedFormation && formData.screen_id !== null) {
        formData = {
            screen_id: null,
            outlet_id: null,
            screen_name: "",
            screen_description: "",
            screen_function: "",
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
        <label class="block text-sm mb-1 font-medium">Outlet Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.outlet_id}
        >
            <option value="" disabled>Pilih Outlet</option>
            {#each outlets as outlet}
                <option value={+outlet.outlet_id}>
                    {outlet.outlet_name}
                </option>
            {/each}
        </select>
    </div>
    <div>
        <label class="block text-sm mb-1 font-medium">Screen Name</label>
        <input
            type="text"
            bind:value={formData.screen_name}
            class="w-full border px-3 py-2 rounded"
        />
    </div>
    <div>
        <label class="block text-sm mb-1 font-medium">Screen Description</label>
        <input
            type="text"
            bind:value={formData.screen_description}
            class="w-full border px-3 py-2 rounded"
        />
    </div>
    <div>
        <label class="block text-sm mb-1 font-medium">Screen Function</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.screen_function}
        >
            <option value="" disabled>Pilih Screen Function</option>
            <option value="menu"> Menu </option>
            <option value="iklan"> Iklan </option>
        </select>
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
            {formData.screen_id ? "Save" : "Add"}
        </button>
    </div>
</div>
