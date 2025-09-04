<script>
    import { createEventDispatcher } from "svelte";

    export let licenses = [];

    const dispatch = createEventDispatcher();
    let search = "";

    $: filteredLicenses = (Array.isArray(licenses) ? licenses : []).filter(
        (c) =>
            (c.license_code ?? "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            (c.email ?? "").toLowerCase().includes(search.toLowerCase()),
    );

    function handleEdit(license) {
        dispatch("edit", license);
    }

    function handleDelete(license) {
        dispatch("delete", { id: license.license_id });
    }
</script>

<div class="mb-4 flex justify-between items-center">
    <input
        type="text"
        placeholder="🔍 Search license..."
        bind:value={search}
        class="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
    />
</div>

<table class="min-w-full bg-white rounded shadow">
    <thead class="bg-gray-100 text-left text-sm font-semibold">
        <tr>
            <th class="p-2">License Code</th>
            <th class="p-2">Customer Name</th>
            <th class="p-2">Outlet Name</th>
            <th class="p-2">Screen Name</th>
            <th class="p-2">Expired At</th>
            <th class="p-2">Created At</th>
            <th class="p-2">Created By</th>
            <th class="p-2 text-center">Actions</th>
        </tr>
    </thead>
    <tbody>
        {#if filteredLicenses.length > 0}
            {#each filteredLicenses as license}
                <tr class="border-b hover:bg-gray-50 text-sm">
                    <td class="p-2">{license.license_code}</td>
                    <td class="p-2">{license.customer_name}</td>
                    <td class="p-2">{license.outlet_name}</td>
                    <td class="p-2">{license.screen_name}</td>
                    <td class="p-2">{license.expired_at}</td>
                    <td class="p-2">{license.created_at}</td>
                    <td class="p-2">{license.created_by}</td>
                    <td class="p-2 text-center space-x-1">
                        <button
                            class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                            on:click={() => handleEdit(license)}
                        >
                            ✏️ Edit
                        </button>
                        <button
                            class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                            on:click={() => handleDelete(license)}
                        >
                            🗑️ Delete
                        </button>
                    </td>
                </tr>
            {/each}
        {:else}
            <tr>
                <td colspan="9" class="p-4 text-center text-gray-500 text-sm">
                    No licenses found.
                </td>
            </tr>
        {/if}
    </tbody>
</table>
