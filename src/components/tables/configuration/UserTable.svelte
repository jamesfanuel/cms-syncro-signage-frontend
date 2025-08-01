<script>
    import { createEventDispatcher } from "svelte";

    export let users = [];

    const dispatch = createEventDispatcher();
    let search = "";

    $: filteredUsers = (Array.isArray(users) ? users : []).filter(
        (u) =>
            (u.user_name ?? "").toLowerCase().includes(search.toLowerCase()) ||
            (u.email ?? "").toLowerCase().includes(search.toLowerCase()),
    );

    function handleEdit(user) {
        dispatch("edit", user);
    }

    function handleDelete(user) {
        if (confirm(`Are you sure you want to delete "${user.user_name}"?`)) {
            dispatch("delete", { id: user.user_id });
        }
    }
</script>

<div class="mb-4 flex justify-between items-center">
    <input
        type="text"
        placeholder="🔍 Search user..."
        bind:value={search}
        class="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
    />
</div>

<table class="min-w-full bg-white rounded shadow">
    <thead class="bg-gray-100 text-left text-sm font-semibold">
        <tr>
            <th class="p-2">User Name</th>
            <th class="p-2">Email</th>
            <th class="p-2">Customer ID</th>
            <th class="p-2">Created At</th>
            <th class="p-2">Created By</th>
            <th class="p-2">Expired At</th>
            <th class="p-2">Is Admin</th>
            <th class="p-2 text-center">Actions</th>
        </tr>
    </thead>
    <tbody>
        {#if filteredUsers.length > 0}
            {#each filteredUsers as user}
                <tr class="border-b hover:bg-gray-50 text-sm">
                    <td class="p-2">{user.user_name}</td>
                    <td class="p-2">{user.email}</td>
                    <td class="p-2">{user.customer_id ?? "-"}</td>
                    <td class="p-2">{user.created_at}</td>
                    <td class="p-2">{user.created_by}</td>
                    <td class="p-2">{user.expired_at ?? "-"}</td>
                    <td class="p-2">{user.is_admin === 1 ? "Yes" : "No"}</td>
                    <td class="p-2 text-center space-x-1">
                        <button
                            class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                            on:click={() => handleEdit(user)}
                        >
                            ✏️ Edit
                        </button>
                        <button
                            class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                            on:click={() => handleDelete(user)}
                        >
                            🗑️ Delete
                        </button>
                    </td>
                </tr>
            {/each}
        {:else}
            <tr>
                <td colspan="8" class="p-4 text-center text-gray-500 text-sm">
                    No users found.
                </td>
            </tr>
        {/if}
    </tbody>
</table>
