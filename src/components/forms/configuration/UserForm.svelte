<script>
    import { createEventDispatcher } from "svelte";

    export let selectedUser = null;
    const dispatch = createEventDispatcher();

    const currentUser = localStorage.getItem("user_name");

    export let customers = [];

    let formData = {
        id: null,
        user_name: "",
        password: "",
        customer_id: "",
        is_admin: "",
        expired_at: "",
        created_by: currentUser || "unknown",
    };

    // Isi data kalau edit user
    $: if (selectedUser && selectedUser.id !== formData.id) {
        formData = {
            id: selectedUser.id,
            user_name: selectedUser.user_name,
            password: "", // kosongkan biar user bisa isi baru kalau mau
            customer_id: parseInt(selectedUser.customer_id) || "",
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
            customer_id: "",
            is_admin: "",
            expired_at: "",
            created_by: currentUser || "unknown",
        };
    }

    // ✅ validasi
    $: isFormValid =
        formData.user_name.trim() !== "" &&
        formData.is_admin !== "" &&
        (formData.is_admin === "admin" || formData.customer_id !== "") &&
        formData.expired_at.trim() !== "";

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

    <!-- Password (opsional kalau edit) -->
    {#if !selectedUser}
        <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-1"
                >Password</label
            >
            <input
                class="w-full px-3 py-2 border rounded"
                type="password"
                bind:value={formData.password}
            />
        </div>
    {/if}

    <!-- Role Dropdown -->
    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1">Role</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.is_admin}
        >
            <option value="" disabled hidden>Pilih Role</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
        </select>
    </div>

    <!-- Customer dropdown kalau role = customer -->
    {#if formData.is_admin === "customer"}
        <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-1"
                >Customer Name</label
            >
            <select
                class="w-full px-3 py-2 border rounded"
                bind:value={formData.customer_id}
            >
                <option value="" disabled hidden>Pilih Customer</option>
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

    <!-- Actions -->
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
            {selectedUser ? "Update" : "Add"}
        </button>
    </div>
</div>
