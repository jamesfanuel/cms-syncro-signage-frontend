<script>
    import { createEventDispatcher } from "svelte";
    import { fade, scale } from "svelte/transition";
    import { X } from "lucide-svelte";

    export let src;
    const dispatch = createEventDispatcher();
</script>

<!-- Background modal -->
<div
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center"
    on:click={() => dispatch("close")}
    transition:fade
>
    <!-- Konten modal -->
    <div
        class="relative bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 sm:mx-8 p-4 flex flex-col items-center"
        on:click|stopPropagation
        transition:scale={{ duration: 200 }}
    >
        <!-- Tombol close -->
        <div class="w-full flex justify-end mb-2">
            <button
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2 shadow"
                on:click={() => dispatch("close")}
                aria-label="Close"
            >
                <X class="w-5 h-5" />
            </button>
        </div>

        <!-- Gambar thumbnail -->
        <img
            {src}
            alt="Thumbnail"
            class="max-h-[60vh] w-auto object-contain rounded"
        />
    </div>
</div>
