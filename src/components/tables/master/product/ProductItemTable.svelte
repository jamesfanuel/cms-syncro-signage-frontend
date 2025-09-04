<script>
    import { createEventDispatcher } from "svelte";
    export let productItems = [];

    const dispatch = createEventDispatcher();

    function handleEdit(productItem) {
        dispatch("edit", productItem);
    }

    function handleDelete(productItem) {
        dispatch("delete", { id: productItem.product_id });
    }
</script>

<div class="w-full overflow-x-auto">
    <table
        class="min-w-max bg-white shadow-md rounded-lg border-collapse w-full"
    >
        <thead class="bg-gray-100 text-gray-700 whitespace-nowrap">
            <tr>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-barcode mr-1 text-[#5E6B75]"></i> Product Code
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-tag mr-1 text-[#5E6B75]"></i> Product Name
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-building mr-1 text-[#5E6B75]"></i> Client Name
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-folder-tree mr-1 text-[#5E6B75]"></i> Category
                    Name
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-calendar-times mr-1 text-[#5E6B75]"></i> End
                    Date
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-user mr-1 text-[#5E6B75]"></i> Created By
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-calendar-alt mr-1 text-[#5E6B75]"></i> Created
                    At
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-cogs mr-1 text-[#5E6B75]"></i> Actions
                </th>
            </tr>
        </thead>
        <tbody class="whitespace-nowrap">
            {#each productItems as productItem}
                <tr
                    class="hover:bg-gray-50 border-t transition duration-150 ease-in-out"
                >
                    <td class="px-4 py-2">{productItem.product_code}</td>
                    <td class="px-4 py-2">{productItem.product_name}</td>
                    <td class="px-4 py-2">{productItem.client_name}</td>
                    <td class="px-4 py-2">{productItem.category_name}</td>
                    <td class="px-4 py-2">{productItem.end_date}</td>
                    <td class="px-4 py-2">{productItem.created_by}</td>
                    <td class="px-4 py-2">{productItem.created_at}</td>
                    <td class="px-4 py-2">
                        <div class="flex space-x-2">
                            <button
                                class="text-blue-500 hover:text-blue-700 transition"
                                on:click={() => handleEdit(productItem)}
                                title="Edit"
                            >
                                <i class="fas fa-edit"></i>
                            </button>
                            <button
                                class="text-red-500 hover:text-red-700 transition"
                                on:click={() => handleDelete(productItem)}
                                title="Delete"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            {:else}
                <tr>
                    <td
                        colspan="8"
                        class="text-center text-gray-500 p-4 text-sm"
                    >
                        No data found.
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
