<script>
    import { upload } from "../../../../../usecases/master/product.js";
    export let versionId;

    let file = null;
    let progress = 0;
    let uploading = false;
    let message = "";
    const chunkSize = 5 * 1024 * 1024;

    async function uploadFile() {
        if (!file || !versionId) {
            message = "File atau Version ID belum tersedia";
            return;
        }

        uploading = true;
        message = "";
        const totalChunks = Math.ceil(file.size / chunkSize);

        for (let i = 0; i < totalChunks; i++) {
            try {
                const response = await upload({
                    file,
                    chunkIndex: i,
                    totalChunks,
                    fileName: file.name,
                    versionId,
                });

                if (response.status !== "success") {
                    message = `Gagal upload chunk ${i}`;
                    uploading = false;
                    return;
                }

                progress = Math.round(((i + 1) / totalChunks) * 100);
            } catch (err) {
                message = `Error saat upload chunk ${i}`;
                uploading = false;
                return;
            }
        }

        uploading = false;
        message = "Upload selesai!";
    }
</script>

<div class="p-4 rounded bg-gray-100 shadow-md">
    <input
        type="file"
        class="mb-2"
        on:change={(e) => (file = e.target.files[0])}
    />

    <button
        class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        on:click={uploadFile}
        disabled={uploading || !file}
    >
        {uploading ? "Uploading..." : "Upload"}
    </button>

    {#if uploading}
        <div class="mt-2 w-full bg-gray-300 h-4 rounded overflow-hidden">
            <div class="bg-green-500 h-4" style="width: {progress}%"></div>
        </div>
    {/if}

    {#if message}
        <p class="mt-2 text-sm">{message}</p>
    {/if}
</div>
