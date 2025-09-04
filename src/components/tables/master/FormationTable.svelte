<script>
    import { createEventDispatcher } from "svelte";
    export let formations = [];

    const dispatch = createEventDispatcher();

    function handleEdit(formation) {
        dispatch("edit", formation);
    }

    function handleDelete(formation) {
        dispatch("delete", { id: formation.screen_id });
    }
</script>

<table
    class="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden"
>
    <thead class="bg-gray-100 text-gray-700">
        <tr>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-handshake mr-1 text-[#5E6B75]"></i> Screen Name
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-handshake mr-1 text-[#5E6B75]"></i> Screen Description
            </th>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-handshake mr-1 text-[#5E6B75]"></i> Screen Function
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
        {#each formations as formation, index}
            <tr
                class="hover:bg-gray-50 border-t transition duration-150 ease-in-out"
            >
                <td class="px-4 py-2">{formation.screen_name}</td>
                <td class="px-4 py-2">{formation.screen_description}</td>
                <td class="px-4 py-2">{formation.screen_function}</td>
                <td class="px-4 py-2">{formation.created_by}</td>
                <td class="px-4 py-2">{formation.created_at}</td>
                <td class="px-4 py-2">
                    <div class="flex space-x-2">
                        <button
                            class="text-blue-500 hover:text-blue-700 transition"
                            on:click={() => handleEdit(formation)}
                            title="Edit"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                        <button
                            class="text-red-500 hover:text-red-700 transition"
                            on:click={() => handleDelete(formation)}
                            title="Delete"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        {:else}
            <tr>
                <td colspan="8" class="text-center text-gray-500 p-4 text-sm">
                    No data found.
                </td>
            </tr>
        {/each}
    </tbody>
</table>
