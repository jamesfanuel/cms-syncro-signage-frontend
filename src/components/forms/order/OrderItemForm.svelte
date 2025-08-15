<script>
    import { createEventDispatcher } from "svelte";
    import {
        fetchProductItems,
        fetchProductVersions,
    } from "../../../../usecases/master/product.js";
    import { fetchFormationsByOutlet } from "../../../../usecases/master/formation.js";

    export let selectedOrder = null;
    export let selectedOrderItem = null;

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name") || "unknown";
    const customerId = localStorage.getItem("customer_id") || "unknown";

    export let categories = [];
    export let products = [];
    export let versions = [];
    export let outlets = [];
    let screens = [];
    let selectedOutletId = "";
    let selectedProductId = "";
    let selectedCategoryId = "";
    let filteredScreens = [];
    let filteredVersions = [];

    let formData = {
        version_id: null,
        order_item_id: null,
        campaign_id: selectedOrder.campaign_id,
        order_id: selectedOrder.order_id,
        outlet_id: null,
        start_date: "",
        end_date: "",
        pos_no: null,
        screen_id: null,
        customer_id: customerId,
        created_by: currentUser,
    };

    // Reaktif terhadap perubahan selectedOrderItem
    $: if (
        selectedOrderItem &&
        selectedOrderItem.order_item_id !== formData.order_item_id
    ) {
        formData = {
            version_id: selectedOrderItem.version_id,
            order_item_id: selectedOrderItem.order_item_id,
            campaign_id: selectedOrder.campaign_id,
            order_id: selectedOrder.order_id,
            outlet_id: selectedOrderItem.outlet_id,
            start_date: selectedOrderItem.start_date,
            end_date: selectedOrderItem.end_date,
            pos_no: selectedOrderItem.pos_no,
            screen_id: selectedOrderItem.screen_id,
            customer_id: parseInt(selectedOrderItem.customer_id) || null,
            created_by: selectedOrderItem.created_by || currentUser,
        };
    } else if (!selectedOrderItem && formData.order_item_id !== null) {
        formData = {
            version_id: null,
            order_item_id: null,
            campaign_id: selectedOrder.campaign_id,
            order_id: selectedOrder.order_id,
            outlet_id: null,
            start_date: "",
            end_date: "",
            pos_no: null,
            screen_id: null,
            customer_id: customerId,
            created_by: currentUser,
        };
    }

    function handleSubmit() {
        dispatch("submit", formData);
    }

    function handleClose() {
        dispatch("close");
    }

    async function handleCategoryChange() {
        // Fetch formations based on selected outlet
        try {
            products = await fetchProductItems(customerId, +selectedCategoryId);

            // Baru filter setelah data diperbarui
            filteredCategories = categories.filter(
                (category) => category.category_id == selectedCategoryId,
            );
        } catch (error) {
            console.error("Failed to fetch category:", error);
        }
    }

    async function handleProductChange() {
        formData.version_id = "";

        // Fetch formations based on selected outlet
        try {
            versions = await fetchProductVersions(
                customerId,
                +selectedProductId,
            );

            // Baru filter setelah data diperbarui
            filteredVersions = versions.filter(
                (version) => version.product_id == selectedProductId,
            );
        } catch (error) {
            console.error("Failed to fetch formations:", error);
        }
    }

    async function handleOutletChange() {
        // Set formData values
        formData.outlet_id = selectedOutletId;
        formData.screen_id = "";

        // Fetch formations based on selected outlet
        try {
            screens = await fetchFormationsByOutlet(+selectedOutletId);

            // Baru filter setelah data diperbarui
            filteredScreens = screens.filter(
                (screen) => screen.outlet_id == selectedOutletId,
            );

            console.log("Filtered Screens:", filteredScreens);
        } catch (error) {
            console.error("Failed to fetch formations:", error);
        }
    }
</script>

<div class="space-y-4">
    <div>
        <label class="block text-sm mb-1 font-medium">Category Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={selectedCategoryId}
            on:change={handleCategoryChange}
        >
            <option value="" disabled>Pilih Category</option>
            {#each categories as category}
                <option value={+category.category_id}>
                    {category.category_name}
                </option>
            {/each}
        </select>
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Product Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={selectedProductId}
            on:change={handleProductChange}
        >
            <option value="" disabled>Pilih Product</option>
            {#each products as product}
                <option value={+product.product_id}>
                    {product.product_name}
                </option>
            {/each}
        </select>
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Version Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.version_id}
        >
            <option value="" disabled>Pilih Version</option>
            {#each filteredVersions as version}
                <option value={version.version_id}>
                    {version.version_name}
                </option>
            {/each}
        </select>
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Outlet Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={selectedOutletId}
            on:change={handleOutletChange}
        >
            <option value="" disabled selected>Pilih Outlet</option>
            {#each outlets as outlet}
                <option value={+outlet.outlet_id}>
                    {outlet.outlet_name}
                </option>
            {/each}
        </select>
    </div>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1"
            >Start Date</label
        >
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.start_date}
        />
    </div>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1"
            >End Date</label
        >
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.end_date}
        />
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Pos No</label>
        <input
            type="number"
            bind:value={formData.pos_no}
            class="w-full border px-3 py-2 rounded"
        />
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Screen Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.screen_id}
        >
            <option value="" disabled>Pilih Screen</option>
            {#each filteredScreens as screen}
                <option value={screen.screen_id}>
                    {screen.screen_name}
                </option>
            {/each}
        </select>
    </div>

    <div class="flex justify-end gap-2 mt-4">
        <button
            class="px-4 py-2 rounded border border-gray-400"
            on:click={handleClose}>Cancel</button
        >
        <button
            class="px-4 py-2 rounded bg-[#5E6B75] text-white hover:bg-[#4c5962]"
            on:click={handleSubmit}
        >
            {formData.order_item_id ? "Save" : "Add"}
        </button>
    </div>
</div>
