<script>
    import { createEventDispatcher } from "svelte";

    export let selectedCustomer = null;
    const dispatch = createEventDispatcher();

    const currentUser = localStorage.getItem("user_name");

    let formData = {
        customer_id: null,
        customer_name: "",
        email: "",
        licence_date: "",
        created_by: currentUser || "unknown",
    };

    // ✅ hanya update formData saat selectedCustomer berubah, tidak tiap ketikan
    $: if (
        selectedCustomer &&
        selectedCustomer.customer_id !== formData.customer_id
    ) {
        formData = {
            customer_id: selectedCustomer.customer_id,
            customer_name: selectedCustomer.customer_name,
            email: selectedCustomer.email,
            licence_date: selectedCustomer.licence_date,
            created_by: selectedCustomer.created_by,
        };
    } else if (!selectedCustomer && formData.customer_id !== null) {
        formData = {
            customer_id: null,
            customer_name: "",
            email: "",
            licence_date: "",
            created_by: currentUser || "unknown",
        };
    }

    function handleSubmit() {
        dispatch("submit", formData);
    }

    function handleClose() {
        dispatch("close");
    }
</script>

<div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-xl font-semibold mb-4 text-gray-700">
        {selectedCustomer ? "Edit Customer" : "Add New Customer"}
    </h2>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1">
            Customer Name
        </label>
        <input
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.customer_name}
        />
    </div>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1">Email</label
        >
        <input
            class="w-full px-3 py-2 border rounded"
            type="email"
            bind:value={formData.email}
        />
    </div>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1">
            Licence Date
        </label>
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.licence_date}
        />
    </div>

    <div class="flex justify-end gap-2">
        <button
            on:click={handleClose}
            type="button"
            class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
            Cancel
        </button>
        <button
            on:click={handleSubmit}
            type="button"
            class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
            {selectedCustomer ? "Update" : "Add"}
        </button>
    </div>
</div>
