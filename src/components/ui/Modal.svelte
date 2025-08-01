<script>
    export let title = "";
    export let onClose;
</script>

<div
    class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
>
    <div
        class="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative animate-fade-in border border-gray-100"
    >
        <!-- Header -->
        <div class="flex justify-between items-center mb-4 border-b pb-2">
            <h2
                class="text-lg font-semibold text-[#5E6B75] flex items-center gap-2"
            >
                <slot name="icon">📝</slot>
                {title}
            </h2>
            <button
                class="text-gray-400 hover:text-red-600 transition text-xl leading-none font-semibold"
                on:click={onClose}
                aria-label="Close"
            >
                ×
            </button>
        </div>

        <!-- Body -->
        <div class="modal-body text-gray-700 text-sm">
            <slot />
        </div>
    </div>
</div>

<style>
    @keyframes fade-in {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .animate-fade-in {
        animation: fade-in 0.2s ease-out;
    }
</style>
