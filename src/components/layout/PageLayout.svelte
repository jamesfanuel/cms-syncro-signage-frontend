<script>
    export let title = "";
    export let icon = "";
    export let searchText = "";
    export let onSearchChange = () => {};
    export let onAdd = null;
    export let page = "";
    export let outlets = [];
    export let products = [];
    export let selectedOutlet = "";
    export let selectedProduct = "";
    export let onOutletChange = () => {};
    export let onProductChange = () => {};
    export let onGeneratePlaylist = null;
    export let isLoading = false;
    export let canAdd = true;

    function handleInput(e) {
        onSearchChange(e.target.value);
    }

    function handleOutletChange(e) {
        onOutletChange(e.target.value);
        console.log("Selected Outlet:", selectedOutlet);
    }

    function handleProductChange(e) {
        const selectedId = e.target.value;
        const selected = products.find(
            (p) => String(p.product_id) === selectedId,
        );

        if (typeof onProductChange === "function" && selected) {
            onProductChange({
                product_id: selected.product_id,
                product_name: selected.product_name,
            });
        }
    }
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-100 via-white to-white p-6">
    <div class="flex items-center justify-between mb-4">
        <h1
            class="text-xl font-semibold text-[#5E6B75] flex items-center gap-3"
        >
            {#if icon}
                <i class="{icon} text-2xl text-[#5E6B75]"></i>
            {/if}
            <span>{title}</span>
        </h1>

        <div class="flex gap-2 items-center">
            {#if page !== "playlist"}
                <input
                    type="text"
                    placeholder="Search..."
                    class="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E6B75]"
                    value={searchText}
                    on:input={handleInput}
                />
            {/if}

            {#if page === "product_version"}
                <select
                    class="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E6B75]"
                    bind:value={selectedProduct}
                    on:change={handleProductChange}
                >
                    <option value="" disabled>Select Product</option>
                    {#each products as product}
                        <option value={String(product.product_id)}
                            >{product.product_name}</option
                        >
                    {/each}
                </select>
            {/if}

            {#if page === "playlist" || page === "formation"}
                <select
                    class="border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5E6B75]"
                    bind:value={selectedOutlet}
                    on:change={handleOutletChange}
                >
                    <option value="" disabled>Select Outlet</option>
                    {#each outlets as outlet}
                        <option value={String(outlet.outlet_id)}
                            >{outlet.outlet_name}</option
                        >
                    {/each}
                </select>

                {#if onGeneratePlaylist}
                    <button
                        on:click={onGeneratePlaylist}
                        class="bg-[#5E6B75] text-white px-4 py-2 rounded-xl hover:bg-[#4c5962] text-sm shadow-md transition flex items-center gap-2"
                        disabled={isLoading}
                    >
                        {#if isLoading}
                            <i class="fas fa-spinner fa-spin"></i> Generating...
                        {:else}
                            <i class="fas fa-magic"></i> Generate Playlist
                        {/if}
                    </button>
                {/if}
            {/if}

            {#if onAdd && page !== "playlist"}
                <button
                    on:click={onAdd}
                    class="px-4 py-2 rounded-xl text-sm shadow-md transition
                            text-white
                            bg-[#5E6B75] hover:bg-[#4c5962]
                            disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
                    disabled={!canAdd}
                >
                    <i class="fas fa-plus mr-2"></i> Add
                </button>
            {/if}
        </div>
    </div>

    <div class="bg-white p-4 rounded-2xl shadow">
        <slot />
    </div>
</div>
