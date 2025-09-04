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

    let selectedCategoryId = "";
    let selectedProductId = "";
    let selectedOutletIds = [];
    let selectedScreenIds = [];

    let filteredVersions = [];

    // screensByOutlet bentuknya:
    // [ { outlet_id, outlet_name, screens: [...] } ]
    let screensByOutlet = [];

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

    let errors = {};
    let submitted = false;

    // --- Validasi & submit ---
    function validate() {
        let newErrors = {};
        if (!selectedCategoryId) newErrors.category = "Category harus dipilih.";
        if (!selectedProductId) newErrors.product = "Product harus dipilih.";
        if (!formData.version_id) newErrors.version = "Version harus dipilih.";
        if (selectedOutletIds.length === 0)
            newErrors.outlet = "Outlet harus dipilih.";
        if (selectedScreenIds.length === 0)
            newErrors.screen = "Screen harus dipilih.";
        if (!formData.start_date)
            newErrors.start_date = "Start Date harus diisi.";
        if (!formData.end_date) {
            newErrors.end_date = "End Date harus diisi.";
        } else if (
            formData.start_date &&
            formData.end_date <= formData.start_date
        ) {
            newErrors.end_date = "End Date harus lebih besar dari Start Date.";
        }
        if (!formData.pos_no) newErrors.pos_no = "Pos No harus diisi.";
        return newErrors;
    }

    function handleSubmit() {
        submitted = true;
        errors = validate();
        if (Object.keys(errors).length === 0) {
            // Bentuk ulang outlet + screen
            const outletsWithScreens = screensByOutlet
                .map((group) => {
                    // cari semua screen_id yang kepilih dalam group ini
                    const selectedScreens = group.screens
                        .filter((s) => selectedScreenIds.includes(s.screen_id))
                        .map((s) => s.screen_id);

                    if (selectedScreens.length > 0) {
                        return {
                            outlet_id: group.outlet_id,
                            screen_ids: selectedScreens,
                        };
                    }
                    return null;
                })
                .filter(Boolean); // buang null

            // gabungkan ke payload
            const payload = {
                ...formData,
                outlets: outletsWithScreens,
            };

            // optional: kalau outlet_id & screen_id di formData ga dipakai lagi
            delete payload.outlet_id;
            delete payload.screen_id;

            dispatch("submit", payload);
        }
    }

    function handleClose() {
        dispatch("close");
    }

    async function handleCategoryChange() {
        try {
            products = await fetchProductItems(customerId, +selectedCategoryId);
        } catch (error) {
            console.error("Failed to fetch category:", error);
        }
    }

    async function handleProductChange() {
        formData.version_id = "";
        try {
            versions = await fetchProductVersions(
                customerId,
                +selectedProductId,
            );
            filteredVersions = versions.filter(
                (version) => version.product_id == selectedProductId,
            );
        } catch (error) {
            console.error("Failed to fetch versions:", error);
        }
    }

    // --- Outlet handler ---
    async function handleOutletToggle(outlet_id, checked) {
        if (checked) {
            try {
                const screens = await fetchFormationsByOutlet(outlet_id);
                screensByOutlet = [
                    ...screensByOutlet,
                    {
                        outlet_id,
                        outlet_name: outlets.find(
                            (o) => o.outlet_id === outlet_id,
                        )?.outlet_name,
                        screens,
                    },
                ];
            } catch (err) {
                console.error("Failed to fetch formations:", err);
            }
        } else {
            // hapus outlet dari screensByOutlet
            screensByOutlet = screensByOutlet.filter(
                (o) => o.outlet_id !== outlet_id,
            );
            // hapus screens terkait dari selectedScreenIds
            selectedScreenIds = selectedScreenIds.filter(
                (id) =>
                    !screensByOutlet.find((o) =>
                        o.screens.some((s) => s.screen_id === id),
                    ),
            );
        }
    }

    // Form dianggap valid jika semua field utama terisi
    $: isFormValid =
        selectedCategoryId &&
        selectedProductId &&
        formData.version_id &&
        selectedOutletIds.length > 0 &&
        selectedScreenIds.length > 0 &&
        formData.start_date &&
        formData.end_date &&
        formData.pos_no;
</script>

<div class="space-y-4">
    <!-- Category -->
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
        {#if submitted && errors.category}
            <p class="text-red-500 text-xs">{errors.category}</p>
        {/if}
    </div>

    <!-- Product -->
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
        {#if submitted && errors.product}
            <p class="text-red-500 text-xs">{errors.product}</p>
        {/if}
    </div>

    <!-- Version -->
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
        {#if submitted && errors.version}
            <p class="text-red-500 text-xs">{errors.version}</p>
        {/if}
    </div>

    <!-- Outlet -->
    <div>
        <label class="block text-sm mb-1 font-medium">Outlet Name</label>
        <div class="space-y-2 border p-3 rounded">
            {#each outlets as outlet}
                <label class="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        value={outlet.outlet_id}
                        checked={selectedOutletIds.includes(outlet.outlet_id)}
                        on:change={(e) => {
                            const checked = e.target.checked;
                            if (checked) {
                                selectedOutletIds = [
                                    ...selectedOutletIds,
                                    outlet.outlet_id,
                                ];
                            } else {
                                selectedOutletIds = selectedOutletIds.filter(
                                    (id) => id !== outlet.outlet_id,
                                );
                            }
                            handleOutletToggle(outlet.outlet_id, checked);
                        }}
                    />
                    <span>{outlet.outlet_name}</span>
                </label>
            {/each}
        </div>

        {#if submitted && errors.outlet}
            <p class="text-red-500 text-xs">{errors.outlet}</p>
        {/if}
    </div>

    <!-- Start Date -->
    <div>
        <label class="block text-sm mb-1 font-medium">Start Date</label>
        <input
            type="date"
            bind:value={formData.start_date}
            class="w-full border px-3 py-2 rounded"
        />
        {#if submitted && errors.start_date}
            <p class="text-red-500 text-xs">{errors.start_date}</p>
        {/if}
    </div>

    <!-- End Date -->
    <div>
        <label class="block text-sm mb-1 font-medium">End Date</label>
        <input
            type="date"
            bind:value={formData.end_date}
            class="w-full border px-3 py-2 rounded"
        />
        {#if submitted && errors.end_date}
            <p class="text-red-500 text-xs">{errors.end_date}</p>
        {/if}
    </div>

    <!-- Pos No -->
    <div>
        <label class="block text-sm mb-1 font-medium">Pos No</label>
        <input
            type="number"
            bind:value={formData.pos_no}
            class="w-full border px-3 py-2 rounded"
        />
        {#if submitted && errors.pos_no}
            <p class="text-red-500 text-xs">{errors.pos_no}</p>
        {/if}
    </div>

    <!-- Screen (group by outlet) -->
    <div class="mt-4">
        <label class="block text-sm mb-1 font-medium">Screen Name</label>

        <!-- Tambahin wrapper scrollable di sini -->
        <div class="max-h-64 overflow-y-auto pr-2">
            {#each screensByOutlet as group}
                <div class="border p-3 rounded mb-3 bg-gray-50">
                    <h3 class="font-semibold">{group.outlet_name}</h3>
                    <div class="space-y-2 mt-2">
                        {#each group.screens as screen}
                            <label class="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={screen.screen_id}
                                    bind:group={selectedScreenIds}
                                />
                                <span>{screen.screen_name}</span>
                            </label>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>

        {#if submitted && errors.screen}
            <p class="text-red-500 text-xs">{errors.screen}</p>
        {/if}
    </div>

    <!-- Buttons -->
    <div class="flex justify-end gap-2 mt-4">
        <button
            type="button"
            class="px-4 py-2 rounded border border-gray-400"
            on:click={handleClose}>Cancel</button
        >
        <button
            type="button"
            class="px-4 py-2 rounded bg-[#5E6B75] text-white hover:bg-[#4c5962] disabled:opacity-50"
            on:click={handleSubmit}
            disabled={!isFormValid}
        >
            {formData.order_item_id ? "Save" : "Add"}
        </button>
    </div>
</div>
