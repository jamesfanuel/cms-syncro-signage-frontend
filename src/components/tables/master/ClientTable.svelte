<script>
    import { createEventDispatcher } from "svelte";
    export let clients = [];

    const dispatch = createEventDispatcher();

    function handleEdit(client) {
        dispatch("edit", client);
    }

    function handleDelete(client) {
        dispatch("delete", { id: client.client_id });
    }

    // Pagination state
    let currentPage = 1;
    let itemsPerPage = 5;

    $: totalPages = Math.ceil(clients.length / itemsPerPage);

    $: paginatedClients = clients.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    function nextPage() {
        if (currentPage < totalPages) currentPage++;
    }

    function prevPage() {
        if (currentPage > 1) currentPage--;
    }

    function goToPage(page) {
        currentPage = page;
    }
</script>

<table
    class="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden"
>
    <thead class="bg-gray-100 text-gray-700">
        <tr>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-code-branch mr-1 text-[#5E6B75]"></i> Client Code
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-handshake mr-1 text-[#5E6B75]"></i> Client Name
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-user mr-1 text-[#5E6B75]"></i> Created By
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-calendar-alt mr-1 text-[#5E6B75]"></i> Created At
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-cogs mr-1 text-[#5E6B75]"></i> Actions
            </th>
        </tr>
    </thead>

    <tbody>
        {#each paginatedClients as client}
            <tr
                class="hover:bg-gray-50 border-t transition duration-150 ease-in-out"
            >
                <td class="px-4 py-2">{client.client_code}</td>
                <td class="px-4 py-2">{client.client_name}</td>
                <td class="px-4 py-2">{client.created_by}</td>
                <td class="px-4 py-2">{client.created_at}</td>
                <td class="px-4 py-2">
                    <div class="flex space-x-2">
                        <button
                            class="text-blue-500 hover:text-blue-700 transition"
                            on:click={() => handleEdit(client)}
                            title="Edit"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                        <button
                            class="text-red-500 hover:text-red-700 transition"
                            on:click={() => handleDelete(client)}
                            title="Delete"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        {:else}
            <tr>
                <td colspan="5" class="text-center text-gray-500 p-4 text-sm">
                    No data found.
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<!-- Pagination controls -->
<div class="flex justify-center items-center mt-4 space-x-1">
    <!-- Prev Button -->
    <button
        class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition"
        on:click={prevPage}
        disabled={currentPage === 1}
    >
        <i class="fas fa-chevron-left"></i>
    </button>

    <!-- Numbered Pages -->
    {#each Array(totalPages) as _, i}
        <button
            class="px-3 py-1 rounded-md border text-sm transition
                {currentPage === i + 1
                ? 'bg-[#5E6B75] text-white border-[#5E6B75]'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'}"
            on:click={() => goToPage(i + 1)}
        >
            {i + 1}
        </button>
    {/each}

    <!-- Next Button -->
    <button
        class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition"
        on:click={nextPage}
        disabled={currentPage === totalPages}
    >
        <i class="fas fa-chevron-right"></i>
    </button>
</div>
