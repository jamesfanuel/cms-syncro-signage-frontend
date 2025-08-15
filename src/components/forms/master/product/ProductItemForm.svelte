<script>
    import { createEventDispatcher, onMount } from "svelte";

    export let selectedItem = null;

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name");
    const customerId = localStorage.getItem("customer_id") || "unknown";

    export let clients = [];
    export let categories = [];

    export let selectedCategoryId;
    export let selectedCategoryName;

    let formData = {
        product_id: null,
        product_name: "",
        client_id: null,
        category_id: selectedCategoryId,
        end_date: "",
        created_by: currentUser || "unknown",
        customer_id: customerId,
    };

    $: if (selectedItem && selectedItem.product_id !== formData.product_id) {
        formData = {
            product_id: selectedItem.product_id,
            product_name: selectedItem.product_name,
            client_id: parseInt(selectedItem.client_id),
            category_id: selectedCategoryId,
            end_date: selectedItem.end_date,
            customer_id: parseInt(selectedItem.customer_id) || null,
            created_by: selectedItem.created_by,
        };
    } else if (!selectedItem && formData.product_id !== null) {
        formData = {
            product_id: null,
            product_name: "",
            client_id: null,
            category_id: selectedCategoryId,
            end_date: "",
            customer_id: customerId,
            created_by: currentUser || "unknown",
        };
    }

    function handleSubmit() {
        dispatch("submit", formData);
    }

    function handleClose() {
        dispatch("close");
    }

    onMount(() => {
        const date = new Date();
        date.setDate(date.getDate() + 30);

        formData.end_date = date.toISOString().split("T")[0];
    });
</script>

<div class="space-y-4">
    <div>
        <label class="block text-sm mb-1 font-medium">Category Name</label>

        <!-- Hidden input untuk dikirim (ID) -->
        <input
            type="hidden"
            name="product_id"
            bind:value={formData.category_id}
        />

        <!-- Read-only input untuk ditampilkan ke user (Name) -->
        <input
            type="text"
            class="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
            value={selectedCategoryName}
            readonly
        />
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Item Name</label>
        <input
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.product_name}
        />
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Client Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.client_id}
        >
            <option value="" disabled>Pilih Client</option>
            {#each clients as client}
                <option value={+client.client_id}>
                    {client.client_name}
                </option>
            {/each}
        </select>
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">End Date</label>
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.end_date}
        />
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-2">
        <button
            on:click={handleClose}
            type="button"
            class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
            Cancel
        </button>
        <button
            on:click={handleSubmit}
            type="button"
            class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
            {selectedItem ? "Update" : "Add"}
        </button>
    </div>
</div>
