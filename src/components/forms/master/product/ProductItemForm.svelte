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

    let errors = {};
    let isSubmitted = false;

    // 🚀 computed valid form (untuk enable/disable tombol)
    $: isFormValid =
        formData.product_name.trim() &&
        formData.client_id &&
        formData.category_id &&
        formData.end_date;

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

    function validateForm() {
        let newErrors = {};
        if (!formData.product_name.trim()) {
            newErrors.product_name = "Item Name is required";
        }
        if (!formData.client_id) {
            newErrors.client_id = "Client is required";
        }
        if (!formData.category_id) {
            newErrors.category_id = "Category is required";
        }
        if (!formData.end_date) {
            newErrors.end_date = "End Date is required";
        }
        return newErrors;
    }

    function handleSubmit() {
        isSubmitted = true;
        errors = validateForm();

        if (Object.keys(errors).length > 0) return;
        dispatch("submit", formData);
    }

    function handleClose() {
        dispatch("close");
    }

    onMount(() => {
        if (!formData.end_date) {
            const date = new Date();
            date.setDate(date.getDate() + 30);
            formData.end_date = date.toISOString().split("T")[0];
        }
    });
</script>

<div class="space-y-4">
    <!-- Category (readonly) -->
    <div>
        <label class="block text-sm mb-1 font-medium">Category Name</label>
        <input type="hidden" bind:value={formData.category_id} />
        <input
            type="text"
            class="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
            value={selectedCategoryName}
            readonly
        />
        {#if isSubmitted && errors.category_id}
            <p class="text-red-500 text-sm mt-1">{errors.category_id}</p>
        {/if}
    </div>

    <!-- Item Name -->
    <div>
        <label class="block text-sm mb-1 font-medium">Item Name</label>
        <input
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.product_name}
        />
        {#if isSubmitted && errors.product_name}
            <p class="text-red-500 text-sm mt-1">{errors.product_name}</p>
        {/if}
    </div>

    <!-- Client -->
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
        {#if isSubmitted && errors.client_id}
            <p class="text-red-500 text-sm mt-1">{errors.client_id}</p>
        {/if}
    </div>

    <!-- End Date -->
    <div>
        <label class="block text-sm mb-1 font-medium">End Date</label>
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.end_date}
        />
        {#if isSubmitted && errors.end_date}
            <p class="text-red-500 text-sm mt-1">{errors.end_date}</p>
        {/if}
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-2">
        <button
            on:click={handleClose}
            type="button"
            class="px-4 py-2 rounded border bg-gray-100 hover:bg-gray-200"
        >
            Cancel
        </button>
        <button
            on:click={handleSubmit}
            type="button"
            disabled={!isFormValid}
            class="px-4 py-2 rounded bg-[#5E6B75] text-white hover:bg-[#4c5962] disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {selectedItem ? "Save" : "Add"}
        </button>
    </div>
</div>
