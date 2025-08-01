<script>
    export let outlets = [];
    export let onEdit;
    export let onDelete;
</script>

<table
    class="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden"
>
    <thead class="bg-gray-100 text-gray-700">
        <tr>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-code-branch mr-1 text-[#5E6B75]"></i> Outlet Code
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-store mr-1 text-[#5E6B75]"></i> Name
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-location-dot mr-1 text-[#5E6B75]"></i> Address
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-city mr-1 text-[#5E6B75]"></i> City
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-handshake mr-1 text-[#5E6B75]"></i> Client
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-cogs mr-1 text-[#5E6B75]"></i> Actions
            </th>
        </tr>
    </thead>

    <tbody>
        {#each outlets as outlet, index}
            <tr
                class="hover:bg-gray-50 border-t transition duration-150 ease-in-out"
            >
                <td class="px-4 py-2">{outlet.code}</td>
                <td class="px-4 py-2">{outlet.name}</td>
                <td class="px-4 py-2">{outlet.address}</td>
                <td class="px-4 py-2">{outlet.city}</td>
                <td class="px-4 py-2">{outlet.client}</td>
                <td class="px-4 py-2">
                    <div class="flex space-x-2">
                        <button
                            class="text-blue-500 hover:text-blue-700 transition"
                            on:click={() => onEdit(index)}
                            title="Edit"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                        <button
                            class="text-red-500 hover:text-red-700 transition"
                            on:click={() => onDelete(index)}
                            title="Delete"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        {:else}
            <tr>
                <td colspan="6" class="text-center text-gray-500 p-4 text-sm">
                    No data found.
                </td>
            </tr>
        {/each}
    </tbody>
</table>
