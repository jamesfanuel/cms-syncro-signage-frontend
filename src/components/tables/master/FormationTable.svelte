<script>
    export let tvs = [];
    export let onEdit;
    export let onDelete;
</script>

<table class="min-w-full text-sm border">
    <thead class="bg-gradient-to-r from-gray-100 via-white to-white">
        <tr>
            <th
                class="text-left px-4 py-3 text-[#5E6B75] font-semibold text-sm"
            >
                <i class="fas fa-tv mr-1 text-[#5E6B75]"></i> TV Code
            </th>
            <th
                class="text-left px-4 py-3 text-[#5E6B75] font-semibold text-sm"
            >
                <i class="fas fa-heading mr-1 text-[#5E6B75]"></i> TV Name
            </th>
            <th
                class="text-left px-4 py-3 text-[#5E6B75] font-semibold text-sm"
            >
                <i class="fas fa-map-marker-alt mr-1 text-[#5E6B75]"></i> Location
            </th>
            <th
                class="text-left px-4 py-3 text-[#5E6B75] font-semibold text-sm"
            >
                <i class="fas fa-user-tag mr-1 text-[#5E6B75]"></i> Client
            </th>
            <th
                class="px-4 py-3 text-[#5E6B75] font-semibold text-sm text-center w-28"
            >
                Actions
            </th>
        </tr>
    </thead>
    <tbody>
        {#each tvs as tv}
            <tr class="border-t hover:bg-gray-50">
                <td class="px-4 py-2">{tv.code}</td>
                <td class="px-4 py-2">{tv.name}</td>
                <td class="px-4 py-2">{tv.location}</td>
                <td class="px-4 py-2">{tv.client}</td>
                <td class="px-4 py-2 text-center">
                    <button
                        class="text-blue-500 hover:text-blue-700 mr-2"
                        on:click={() => onEdit(tv)}
                        title="Edit"
                    >
                        <i class="fas fa-edit"></i>
                    </button>
                    <button
                        class="text-red-500 hover:text-red-700"
                        on:click={() => onDelete(tv)}
                        title="Delete"
                    >
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
