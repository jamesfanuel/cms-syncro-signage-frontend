<script>
    export let totalItems = 0;
    export let itemsPerPage = 5;
    export let currentPage = 1;

    // Event to parent on page change
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    $: totalPages = Math.ceil(totalItems / itemsPerPage);

    function goToPage(page) {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            dispatch("pageChange", page);
        }
    }

    function prevPage() {
        goToPage(currentPage - 1);
    }

    function nextPage() {
        goToPage(currentPage + 1);
    }
</script>

{#if totalPages > 1}
    <div class="flex justify-center items-center mt-4 space-x-1">
        <button
            class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition"
            on:click={prevPage}
            disabled={currentPage === 1}
            aria-label="Previous page"
        >
            <i class="fas fa-chevron-left"></i>
        </button>

        {#each Array(totalPages) as _, i}
            <button
                class="px-3 py-1 rounded-md border text-sm transition
        {currentPage === i + 1
                    ? 'bg-[#5E6B75] text-white border-[#5E6B75]'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-100'}"
                on:click={() => goToPage(i + 1)}
                aria-current={currentPage === i + 1 ? "page" : undefined}
            >
                {i + 1}
            </button>
        {/each}

        <button
            class="px-3 py-1 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-white transition"
            on:click={nextPage}
            disabled={currentPage === totalPages}
            aria-label="Next page"
        >
            <i class="fas fa-chevron-right"></i>
        </button>
    </div>
{/if}
