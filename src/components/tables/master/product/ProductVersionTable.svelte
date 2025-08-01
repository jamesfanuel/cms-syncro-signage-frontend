<script>
    import { createEventDispatcher } from "svelte";
    export let productVersions = [];

    const dispatch = createEventDispatcher();

    function handleEdit(productVersion) {
        dispatch("edit", productVersion);
    }

    function handleDelete(productVersion) {
        if (
            confirm(
                `Are you sure you want to delete "${productVersion.version_name}"?`,
            )
        ) {
            dispatch("delete", { id: productVersion.version_id });
        }
    }

    function handleUpload(productVersion) {
        dispatch("upload", productVersion);
    }
</script>

<div class="w-full overflow-x-auto">
    <table
        class="min-w-max bg-white shadow-md rounded-lg border-collapse w-full"
    >
        <thead class="bg-gray-100 text-gray-700 whitespace-nowrap">
            <tr>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-layer-group mr-1 text-[#5E6B75]"></i> Version
                    Name
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-box mr-1 text-[#5E6B75]"></i> Product Name
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-expand-arrows-alt mr-1 text-[#5E6B75]"></i>
                    Resolution
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-file-alt mr-1 text-[#5E6B75]"></i> Origin File
                    Name
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-file-code mr-1 text-[#5E6B75]"></i> File Name
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-database mr-1 text-[#5E6B75]"></i> File Size
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-clock mr-1 text-[#5E6B75]"></i> Duration
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-user mr-1 text-[#5E6B75]"></i> Created By
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-calendar-alt mr-1 text-[#5E6B75]"></i> Created
                    At
                </th>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-tools mr-1 text-[#5E6B75]"></i> Actions
                </th>
            </tr>
        </thead>
        <tbody class="whitespace-nowrap">
            {#each productVersions as productVersion}
                <tr
                    class={`hover:bg-gray-50 border-t transition duration-150 ease-in-out ${
                        !productVersion.file_name
                            ? "bg-yellow-50 text-yellow-700"
                            : ""
                    }`}
                >
                    <td class="px-4 py-2">{productVersion.version_name}</td>
                    <td class="px-4 py-2">{productVersion.product_name}</td>
                    <td class="px-4 py-2">{productVersion.resolution}</td>
                    <td class="px-4 py-2">{productVersion.origin_file_name}</td>
                    <td class="px-4 py-2">{productVersion.file_name}</td>
                    <td class="px-4 py-2">{productVersion.file_size}</td>
                    <td class="px-4 py-2">{productVersion.duration}</td>
                    <td class="px-4 py-2">{productVersion.created_by}</td>
                    <td class="px-4 py-2">{productVersion.created_at}</td>
                    <td class="px-4 py-2">
                        <div class="flex space-x-2">
                            <button
                                class="text-blue-500 hover:text-blue-700 transition"
                                on:click={() => handleEdit(productVersion)}
                                title="Edit"
                            >
                                <i class="fas fa-edit"></i>
                            </button>
                            <button
                                class="text-red-500 hover:text-red-700 transition"
                                on:click={() => handleDelete(productVersion)}
                                title="Delete"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                            <button
                                class="text-green-500 hover:text-green-700"
                                on:click={() => handleUpload(productVersion)}
                                title="Upload"
                            >
                                ⬆️
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
