<script>
    import { createEventDispatcher } from "svelte";

    export let customers = [];

    const dispatch = createEventDispatcher();
    let search = "";

    $: filteredCustomers = (Array.isArray(customers) ? customers : []).filter(
        (c) =>
            (c.customer_name ?? "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            (c.email ?? "").toLowerCase().includes(search.toLowerCase()),
    );

    function handleEdit(customer) {
        dispatch("edit", customer);
    }

    function handleDelete(customer) {
        if (
            confirm(
                `Are you sure you want to delete "${customer.customer_name}"?`,
            )
        ) {
            dispatch("delete", { id: customer.customer_id });
        }
    }
</script>

<div class="mb-4 flex justify-between items-center">
    <input
        type="text"
        placeholder="🔍 Search customer..."
        bind:value={search}
        class="border border-gray-300 rounded px-3 py-2 w-full max-w-sm"
    />
</div>

<table class="min-w-full bg-white rounded shadow">
    <thead class="bg-gray-100 text-left text-sm font-semibold">
        <tr>
            <th class="p-2">Customer Name</th>
            <th class="p-2">Email</th>
            <th class="p-2">Licence Date</th>
            <th class="p-2">Created At</th>
            <th class="p-2">Created By</th>
            <th class="p-2 text-center">Actions</th>
        </tr>
    </thead>
    <tbody>
        {#if filteredCustomers.length > 0}
            {#each filteredCustomers as customer}
                <tr class="border-b hover:bg-gray-50 text-sm">
                    <td class="p-2">{customer.customer_name}</td>
                    <td class="p-2">{customer.email}</td>
                    <td class="p-2">{customer.licence_date}</td>
                    <td class="p-2">{customer.created_at}</td>
                    <td class="p-2">{customer.created_by}</td>
                    <td class="p-2 text-center space-x-1">
                        <button
                            class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs"
                            on:click={() => handleEdit(customer)}
                        >
                            ✏️ Edit
                        </button>
                        <button
                            class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs"
                            on:click={() => handleDelete(customer)}
                        >
                            🗑️ Delete
                        </button>
                    </td>
                </tr>
            {/each}
        {:else}
            <tr>
                <td colspan="6" class="p-4 text-center text-gray-500 text-sm">
                    No customers found.
                </td>
            </tr>
        {/if}
    </tbody>
</table>
