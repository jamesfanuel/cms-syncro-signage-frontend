<script>
    import { createEventDispatcher } from "svelte";
    export let productVersions = [];
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    let showModal = false;
    let previewPath = "";

    const dispatch = createEventDispatcher();

    function handleEdit(productVersion) {
        dispatch("edit", productVersion);
    }

    function handleDelete(productVersion) {
        dispatch("delete", { id: productVersion.version_id });
    }

    function handleUpload(productVersion) {
        dispatch("upload", productVersion);
        dispatch("close");
    }

    function openPreviewModal(filePath) {
        previewPath = filePath;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
        previewPath = "";
    }
</script>

<div class="w-full overflow-x-auto">
    <table
        class="min-w-max bg-white shadow-md rounded-lg border-collapse w-full"
    >
        <thead class="bg-gray-100 text-gray-700 whitespace-nowrap">
            <tr>
                <th class="px-4 py-2 text-left">
                    <i class="fas fa-clock mr-1 text-[#5E6B75]"></i> Preview
                </th>
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
                    <td class="px-4 py-2">
                        {#if productVersion.file_path}
                            <button
                                class="text-blue-600 hover:underline"
                                on:click={() =>
                                    openPreviewModal(
                                        `${baseUrl}${productVersion.file_path}`,
                                    )}
                            >
                                Preview
                            </button>
                        {:else}
                            <span class="text-gray-400 italic">No file</span>
                        {/if}
                    </td>
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

{#if showModal}
    <div
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div
            class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative"
        >
            <button
                class="absolute top-2 right-2 text-gray-600 hover:text-black"
                on:click={closeModal}
                title="Close"
            >
                ✖
            </button>
            <h2 class="text-lg font-semibold mb-4 text-gray-800">
                Preview Video
            </h2>
            <video src={previewPath} controls autoplay class="w-full rounded">
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
{/if}
