<script>
    import { writable } from "svelte/store";
    import { keyword, progress, videoUseCase } from "../../../usecases/video";

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    let file = null;
    let uploading = false;

    async function handleUpload() {
        if (!file) return alert("Pilih file terlebih dahulu");

        uploading = true;
        const success = await videoUseCase.uploadChunked(file, BASE_URL);

        uploading = false;

        if (success) {
            videoUseCase.load();
        }
    }
</script>

<!-- Wrapper responsif dengan padding -->
<div class="w-full px-4 md:px-6 mb-4">
    <!-- Flex bar -->
    <div class="flex items-center justify-between w-full flex-wrap gap-2">
        <!-- Upload Section -->
        <div class="flex items-center gap-3 flex-wrap">
            <!-- Input file -->
            <label
                class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer bg-white border border-gray-300 px-4 py-1.5 rounded-xl shadow-sm w-72"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-[#5E6B75]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a2 2 0 002 2h2m4 0h2a2 2 0 002-2v-1m-6 0v-6m0 0L9 10m3-2l3 2m-3 2v6m6 0V9a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-1.414-1.414a1 1 0 00-.707-.293H8a2 2 0 00-2 2v11"
                    />
                </svg>
                <input
                    type="file"
                    class="hidden"
                    on:change={(e) => (file = e.target.files[0])}
                />
                <span class="truncate">
                    {file ? file.name : "Pilih file..."}
                </span>
            </label>

            <!-- Tombol Upload -->
            <button
                on:click={handleUpload}
                class="bg-[#5E6B75] text-white px-4 py-1.5 rounded-xl text-sm hover:bg-[#4b5963] transition disabled:opacity-50"
                disabled={uploading}
            >
                {uploading ? "Mengupload..." : "Upload"}
            </button>
        </div>

        <!-- Search bar -->
        <input
            type="text"
            placeholder="🔍 Cari..."
            bind:value={$keyword}
            class="border border-gray-300 px-3 py-1.5 rounded-xl text-sm w-44 md:w-52 focus:outline-none focus:ring-2 focus:ring-[#5E6B75]"
            on:input={(e) => videoUseCase.setKeyword(e.target.value)}
        />
    </div>
</div>

<!-- Progress bar -->
{#if uploading}
    <div
        class="w-full max-w-4xl mb-4 h-2 bg-gray-200 rounded-full overflow-hidden"
    >
        <div
            class="h-full bg-blue-600 transition-all duration-200"
            style="width: {$progress}%"
        ></div>
    </div>
{/if}
