<script>
    import { createEventDispatcher, onMount } from "svelte";

    export let selectedUser = null;

    const dispatch = createEventDispatcher();

    const currentUser = localStorage.getItem("user_name");

    export let customers = [];

    let formData = {
        id: null,
        user_name: "",
        password: "",
        email: "",
        customer_id: "",
        is_admin: "",
        expired_at: "",
        created_by: currentUser || "unknown",
    };

    $: if (selectedUser && selectedUser.id !== formData.id) {
        formData = {
            id: selectedUser.id,
            user_name: selectedUser.user_name,
            password: selectedUser.password,
            email: selectedUser.email,
            customer_id: parseInt(selectedUser.customer_id) || null,
            is_admin:
                selectedUser.is_admin === true || selectedUser.is_admin === 1
                    ? "admin"
                    : "customer",
            expired_at: selectedUser.expired_at,
            created_by: selectedUser.created_by,
        };
    } else if (!selectedUser && formData.id !== null) {
        formData = {
            id: null,
            user_name: "",
            password: "",
            email: "",
            customer_id: "",
            is_admin: "",
            expired_at: "",
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
        {selectedUser ? "Edit User" : "Add New User"}
    </h2>

    <!-- Username -->
    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1"
            >User Name</label
        >
        <input
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.user_name}
        />
    </div>

    <!-- Role Dropdown -->
    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1">Role</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.is_admin}
        >
            <option value="" disabled>Pilih Role</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
        </select>
    </div>

    <!-- Conditional Dropdown: Customer Name -->
    {#if formData.is_admin === "customer"}
        <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-1"
                >Customer Name</label
            >
            <select
                class="w-full px-3 py-2 border rounded"
                on:change={(e) =>
                    (formData.customer_id = parseInt(e.target.value))}
            >
                <option value="" disabled>Pilih Customer</option>
                {#each customers as customer}
                    <option value={customer.customer_id}>
                        {customer.customer_name}
                    </option>
                {/each}
            </select>
        </div>
    {/if}

    <!-- Expired Date -->
    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1"
            >Expired At</label
        >
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.expired_at}
        />
    </div>

    <!-- Action Buttons -->
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
            {selectedUser ? "Update" : "Add"}
        </button>
    </div>
</div>
