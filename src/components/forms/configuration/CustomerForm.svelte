<script>
    import { createEventDispatcher } from "svelte";

    export let selectedCustomer = null;
    const dispatch = createEventDispatcher();

    const currentUser = localStorage.getItem("user_name");

    let formData = {
        customer_id: null,
        customer_name: "",
        // email: "",
        level: 1,
        licence_date: "",
        created_by: currentUser || "unknown",
    };

    // ✅ update formData hanya saat selectedCustomer berubah
    $: if (
        selectedCustomer &&
        selectedCustomer.customer_id !== formData.customer_id
    ) {
        formData = {
            customer_id: selectedCustomer.customer_id,
            customer_name: selectedCustomer.customer_name,
            // email: selectedCustomer.email,
            level: selectedCustomer.level,
            licence_date: selectedCustomer.licence_date,
            created_by: selectedCustomer.created_by,
        };
    } else if (!selectedCustomer && formData.customer_id !== null) {
        formData = {
            customer_id: null,
            customer_name: "",
            // email: "",
            level: 1,
            licence_date: "",
            created_by: currentUser || "unknown",
        };
    }

    // ✅ validasi: semua field wajib
    $: isFormValid =
        formData.customer_name.trim() !== "" &&
        formData.level > 0 &&
        formData.licence_date.trim() !== "";

    function handleSubmit() {
        if (isFormValid) {
            dispatch("submit", formData);
        }
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
            placeholder="Masukkan nama customer"
        />
    </div>

    <!-- Kalau nanti email mau dipakai -->
    <!--
    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1">Email</label>
        <input
            class="w-full px-3 py-2 border rounded"
            type="email"
            bind:value={formData.email}
            placeholder="Masukkan email"
        />
    </div>
    -->

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1">
            Level
        </label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.level}
        >
            <option value={1}>BASIC</option>
            <option value={2}>PLUS</option>
            <option value={3}>PRO</option>
        </select>
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
            class="px-4 py-2 rounded text-white
                   {isFormValid
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'}"
            disabled={!isFormValid}
        >
            {selectedCustomer ? "Update" : "Add"}
        </button>
    </div>
</div>
