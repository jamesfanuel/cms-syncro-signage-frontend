<script>
    export let playlists = [];

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    let showModal = false;
    let previewPath = "";

    function openPreviewModal(filePath) {
        previewPath = filePath;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
        previewPath = "";
    }
</script>

<!-- 🧾 Table Orders -->
<table
    class="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden"
>
    <thead class="bg-gray-100 text-gray-700">
        <tr>
            <th class="px-4 py-2 text-left">⏱ Preview</th>
            <th class="px-4 py-2 text-left">📣 Order Name</th>
            <th class="px-4 py-2 text-left">🧾 Outlet Name</th>
            <th class="px-4 py-2 text-left">🧾 Screen Name</th>
            <th class="px-4 py-2 text-left">🧾 Version Name</th>
            <th class="px-4 py-2 text-left">⏱ Duration</th>
        </tr>
    </thead>

    <tbody>
        {#each playlists as playlist, index}
            <tr
                class="hover:bg-gray-50 border-t transition duration-150 ease-in-out"
            >
                <td class="px-4 py-2">
                    {#if playlist.file_path}
                        <button
                            class="text-blue-600 hover:underline"
                            on:click={() =>
                                openPreviewModal(
                                    `${baseUrl}${playlist.file_path}`,
                                )}
                        >
                            Preview
                        </button>
                    {:else}
                        <span class="text-gray-400 italic">No file</span>
                    {/if}
                </td>
                <td class="px-4 py-2">{playlist.order_name}</td>
                <td class="px-4 py-2">{playlist.outlet_name}</td>
                <td class="px-4 py-2">{playlist.screen_name}</td>
                <td class="px-4 py-2">{playlist.version_name}</td>
                <td class="px-4 py-2">{playlist.order_duration}</td>
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
