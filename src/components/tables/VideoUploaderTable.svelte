<script>
    import { onMount } from "svelte";
    import {
        videoUseCase,
        keyword,
        sortKey,
        sortAsc,
        filteredVideos,
    } from "../../../usecases/video";

    let selectedVideo = null;

    onMount(() => {
        videoUseCase.load();
    });

    function closeModal() {
        selectedVideo = null;
    }

    function handleOverlayClick(event) {
        if (event.target.classList.contains("modal-overlay")) {
            closeModal();
        }
    }
</script>

<div class="rounded-2xl overflow-hidden shadow-md border border-gray-200">
    <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-gradient-to-r from-[#F1F5F9] to-white text-[#5E6B75]">
            <tr class="text-left">
                <th
                    class="px-4 py-3 font-semibold cursor-pointer"
                    on:click={() => videoUseCase.toggleSort("name")}
                >
                    📁 Nama
                    {#if $sortKey === "name"}
                        <span>{$sortAsc ? "↑" : "↓"}</span>
                    {/if}
                </th>
                <th
                    class="px-4 py-3 font-semibold cursor-pointer"
                    on:click={() => videoUseCase.toggleSort("size")}
                >
                    📦 Ukuran
                    {#if $sortKey === "size"}
                        <span>{$sortAsc ? "↑" : "↓"}</span>
                    {/if}
                </th>
                <th class="px-4 py-3 font-semibold">▶️ Preview</th>
            </tr>
        </thead>
        <tbody>
            {#each $filteredVideos as video}
                <tr
                    class="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                    <td class="px-4 py-3">{video.name}</td>
                    <td class="px-4 py-3"
                        >{(video.size / 1024 / 1024).toFixed(2)} MB</td
                    >
                    <td class="px-4 py-3">
                        <button
                            class="text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
                            on:click={() => (selectedVideo = video)}
                        >
                            <span class="text-lg">▶️</span> <span>Play</span>
                        </button>
                    </td>
                </tr>
            {/each}
            {#if $filteredVideos.length === 0}
                <tr>
                    <td colspan="3" class="text-center text-gray-400 py-6">
                        Tidak ada video ditemukan.
                    </td>
                </tr>
            {/if}
        </tbody>
    </table>
</div>

<!-- Modal -->
{#if selectedVideo}
    <div
        class="modal-overlay fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
        on:click={handleOverlayClick}
    >
        <div
            class="relative bg-white rounded-xl shadow-lg max-w-3xl w-full p-4"
        >
            <!-- Close button -->
            <button
                on:click={closeModal}
                class="absolute -top-4 -right-4 bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
            >
                ❌
            </button>

            <video
                src={selectedVideo.url}
                controls
                autoplay
                muted
                class="w-full rounded-lg"
            ></video>
        </div>
    </div>
{/if}
