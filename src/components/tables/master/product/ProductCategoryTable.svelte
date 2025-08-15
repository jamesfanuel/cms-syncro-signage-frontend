<script>
    import Pagination from "./../../../Pagination.svelte";

    import { createEventDispatcher } from "svelte";
    export let productCategories = [];

    const dispatch = createEventDispatcher();

    function handleEdit(productCategory) {
        dispatch("edit", productCategory);
    }

    function handleDelete(productCategory) {
        if (
            confirm(
                `Are you sure you want to delete "${productCategory.category_name}"?`,
            )
        ) {
            dispatch("delete", { id: productCategory.category_id });
        }
    }

    let currentPage = 1;
    const itemsPerPage = 5;

    $: totalPages = Math.ceil(productCategories.length / itemsPerPage);

    $: paginatedCategories = productCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    function onPageChange(event) {
        currentPage = event.detail;
    }
</script>

<table
    class="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden"
>
    <thead class="bg-gray-100 text-gray-700">
        <tr>
            <th class="px-4 py-2 text-left">
                <i class="fas fa-code-branch mr-1 text-[#5E6B75]"></i> Category Name
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
        {#each paginatedCategories as productCategory}
            <tr
                class="hover:bg-gray-50 border-t transition duration-150 ease-in-out"
            >
                <td class="px-4 py-2">{productCategory.category_name}</td>
                <td class="px-4 py-2">{productCategory.created_by}</td>
                <td class="px-4 py-2">{productCategory.created_at}</td>
                <td class="px-4 py-2">
                    <div class="flex space-x-2">
                        <button
                            class="text-blue-500 hover:text-blue-700 transition"
                            on:click={() => handleEdit(productCategory)}
                            title="Edit"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                        <button
                            class="text-red-500 hover:text-red-700 transition"
                            on:click={() => handleDelete(productCategory)}
                            title="Delete"
                        >
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        {:else}
            <tr>
                <td colspan="4" class="text-center text-gray-500 p-4 text-sm">
                    No data found.
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<Pagination
    {currentPage}
    {itemsPerPage}
    totalItems={productCategories.length}
    on:pageChange={onPageChange}
/>
