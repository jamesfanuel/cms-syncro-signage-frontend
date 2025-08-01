<script>
    import { videoUseCase } from "../../usecases/video";
    const { uploadVideo, uploading, progress, keyword, setKeyword } =
        videoUseCase;

    let file = null;

    const handleUpload = async () => {
        if (file) {
            await uploadVideo(file);
            file = null;
        }
    };
</script>

<div class="border border-gray-300 bg-white rounded-xl shadow p-6 mb-6">
    <h3
        class="text-lg font-semibold text-[#5E6B75] mb-4 flex items-center gap-2"
    >
        📤 Upload Video
    </h3>

    <form
        on:submit|preventDefault={handleUpload}
        class="flex flex-col md:flex-row md:items-center md:gap-4 gap-3"
    >
        <!-- Left Side: Upload -->
        <div class="flex flex-1 gap-3 items-center">
            <input
                type="file"
                accept="video/*"
                on:change={(e) => (file = e.target.files[0])}
                class="text-sm text-gray-700 border border-gray-300 rounded px-3 py-2 w-full md:w-auto file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#5E6B75] file:text-white hover:file:bg-[#4A5C66]"
            />
            <button
                type="submit"
                class="bg-[#5E6B75] hover:bg-[#4A5C66] text-white text-sm px-4 py-2 rounded transition disabled:opacity-50"
                disabled={!file || $uploading}
            >
                Upload
            </button>
        </div>

        <!-- Right Side: Search -->
        <div class="flex-1 md:ml-auto w-full md:w-64">
            <input
                type="text"
                bind:value={$keyword}
                on:input={(e) => setKeyword(e.target.value)}
                placeholder="🔍 Cari video..."
                class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#5E6B75] focus:outline-none"
            />
        </div>
    </form>

    {#if $uploading}
        <div class="mt-4 w-full">
            <div class="w-full h-3 bg-gray-200 rounded overflow-hidden">
                <div
                    class="h-full bg-[#5E6B75] transition-all duration-300"
                    style="width: {$progress}%"
                ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">Mengunggah... {$progress}%</p>
        </div>
    {/if}
</div>
