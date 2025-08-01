<script>
    export let orders = [];
    export let onEdit;
    export let onDelete;
</script>

<table class="w-full text-sm">
    <thead class="bg-gradient-to-r from-gray-100 via-white to-white">
        <tr>
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >Order ID</th
            >
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >Client</th
            >
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >Start Date</th
            >
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >End Date</th
            >
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >Status</th
            >
            <th class="text-left px-4 py-3 text-[#5E6B75] font-semibold"
                >Action</th
            >
        </tr>
    </thead>
    <tbody>
        {#each orders as order, index}
            <tr class="border-t">
                <td class="px-4 py-2">{order.id}</td>
                <td class="px-4 py-2">{order.client}</td>
                <td class="px-4 py-2">{order.startDate}</td>
                <td class="px-4 py-2">{order.endDate}</td>
                <td class="px-4 py-2">{order.status}</td>
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
