<!-- src/components/tables/PlaylistTable.svelte -->
<script>
    export let playlists = [];
    export let onEdit;
    export let onDelete;
</script>

<table class="w-full text-sm">
    <thead class="bg-gradient-to-r from-gray-100 via-white to-white">
        <tr>
            <th class="px-4 py-2 text-left text-[#5E6B75] font-semibold"
                >Code</th
            >
            <th class="px-4 py-2 text-left text-[#5E6B75] font-semibold"
                >Name</th
            >
            <th class="px-4 py-2 text-left text-[#5E6B75] font-semibold"
                >Client</th
            >
            <th class="px-4 py-2 text-left text-[#5E6B75] font-semibold"
                >Duration</th
            >
            <th class="px-4 py-2 text-left text-[#5E6B75] font-semibold"
                >Total Items</th
            >
            <th class="px-4 py-2 text-left text-[#5E6B75] font-semibold"
                >Actions</th
            >
        </tr>
    </thead>
    <tbody>
        {#each playlists as playlist, index}
            <tr class="border-t">
                <td class="px-4 py-2">{playlist.code}</td>
                <td class="px-4 py-2">{playlist.name}</td>
                <td class="px-4 py-2">{playlist.client}</td>
                <td class="px-4 py-2">{playlist.duration}</td>
                <td class="px-4 py-2">{playlist.totalItems}</td>
                <td class="px-4 py-2 space-x-2">
                    <button
                        on:click={() => onEdit(index)}
                        class="text-blue-600 hover:text-blue-800"
                    >
                        <i class="fas fa-edit"></i>
                    </button>
                    <button
                        on:click={() => onDelete(index)}
                        class="text-red-600 hover:text-red-800"
                    >
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        {/each}
    </tbody>
</table>
