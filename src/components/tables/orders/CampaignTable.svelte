<script>
    export let campaigns = [];
    export let onEdit;
    export let onDelete;
</script>

<table class="min-w-full border rounded-xl overflow-hidden shadow text-sm">
    <thead class="bg-gradient-to-r from-gray-100 via-white to-white">
        <tr>
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >📌 Code</th
            >
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >📣 Name</th
            >
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >📅 Start</th
            >
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >✅ End</th
            >
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >🏢 Client</th
            >
            <th class="text-center px-4 py-3 text-[#5E6B75] font-semibold"
                >⚙️ Actions</th
            >
        </tr>
    </thead>
    <tbody>
        {#each campaigns as campaign, index}
            <tr class="border-t hover:bg-gray-50 transition">
                <td class="px-4 py-2">{campaign.code}</td>
                <td class="px-4 py-2">{campaign.name}</td>
                <td class="px-4 py-2">{campaign.startDate}</td>
                <td class="px-4 py-2">{campaign.endDate}</td>
                <td class="px-4 py-2">{campaign.client}</td>
                <td class="px-4 py-2 text-center space-x-2">
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
