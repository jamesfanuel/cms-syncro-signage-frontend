<script>
    import { createEventDispatcher } from "svelte";

    export let selectedCategory = null;

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name") || "unknown";
    const customerId = localStorage.getItem("customer_id") || "unknown";

    let formData = {
        category_id: null,
        category_name: "",
        created_by: currentUser,
        customer_id: customerId,
    };

    // Reaktif terhadap perubahan selectedCategory
    $: if (
        selectedCategory &&
        selectedCategory.category_id !== formData.category_id
    ) {
        formData = {
            category_id: selectedCategory.category_id,
            category_name: selectedCategory.category_name,
            created_by: selectedCategory.created_by || currentUser,
            customer_id: parseInt(selectedCategory.customer_id) || null,
        };
    } else if (!selectedCategory && formData.category_id !== null) {
        formData = {
            category_id: null,
            category_name: "",
            created_by: currentUser,
            customer_id: customerId,
        };
    }

    // Validasi: semua field wajib terisi
    $: isFormValid = formData.category_name.trim().length > 0;

    function handleSubmit() {
        if (!isFormValid) return; // cegah submit kalau belum valid
        dispatch("submit", formData);
    }

    function handleClose() {
        dispatch("close");
    }
</script>

<div class="space-y-4">
    <div>
        <label class="block text-sm mb-1 font-medium">Category Name</label>
        <input
            type="text"
            bind:value={formData.category_name}
            class="w-full border px-3 py-2 rounded"
            placeholder="Enter category name"
        />
    </div>

    <div class="flex justify-end gap-2 mt-4">
        <button
            class="px-4 py-2 rounded border border-gray-400"
            on:click={handleClose}
        >
            Cancel
        </button>
        <button
            class="px-4 py-2 rounded bg-[#5E6B75] text-white hover:bg-[#4c5962] disabled:opacity-50 disabled:cursor-not-allowed"
            on:click={handleSubmit}
            disabled={!isFormValid}
        >
            {formData.category_id ? "Save" : "Add"}
        </button>
    </div>
</div>
