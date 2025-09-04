<script>
    import { createEventDispatcher } from "svelte";

    export let selectedVersion = null;

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name");
    const customerId = localStorage.getItem("customer_id") || "unknown";

    export let selectedProductId;
    export let selectedProductName;

    let formData = {
        version_id: null,
        product_id: selectedProductId,
        version_name: "",
        resolution: "",
        file_path: "",
        origin_file_name: "",
        file_name: "",
        file_size: 0,
        duration: 0,
        md5: "",
        thumbnail: "",
        created_at: new Date().toISOString(),
        created_by: currentUser || "unknown",
        is_deleted: false,
        customer_id: customerId,
    };

    let errors = {};
    let isSubmitted = false;

    // sinkron edit / reset add baru
    $: if (
        selectedVersion &&
        selectedVersion.version_id !== formData.version_id
    ) {
        formData = {
            version_id: selectedVersion.version_id,
            product_id: selectedProductId,
            version_name: selectedVersion.version_name || "",
            resolution: selectedVersion.resolution || "",
            file_path: selectedVersion.file_path || "",
            origin_file_name: selectedVersion.origin_file_name || "",
            file_name: selectedVersion.file_name || "",
            file_size: selectedVersion.file_size || 0,
            duration: selectedVersion.duration || 0,
            md5: selectedVersion.md5 || "",
            thumbnail: selectedVersion.thumbnail || "",
            created_at: selectedVersion.created_at || new Date().toISOString(),
            created_by: selectedVersion.created_by || currentUser || "unknown",
            is_deleted: !!selectedVersion.is_deleted,
            customer_id: parseInt(selectedVersion.customer_id) || customerId,
        };
        isSubmitted = false;
        errors = {};
    } else if (!selectedVersion && formData.version_id !== null) {
        formData = {
            version_id: null,
            product_id: selectedProductId,
            version_name: "",
            resolution: "",
            file_path: "",
            origin_file_name: "",
            file_name: "",
            file_size: 0,
            duration: 0,
            md5: "",
            thumbnail: "",
            created_at: new Date().toISOString(),
            created_by: currentUser || "unknown",
            is_deleted: false,
            customer_id: customerId,
        };
        isSubmitted = false;
        errors = {};
    }

    function validateForm() {
        const newErrors = {};
        if (!formData.version_name.trim()) {
            newErrors.version_name = "Version Name is required";
        }
        if (!formData.resolution) {
            newErrors.resolution = "Resolution is required";
        }
        if (!formData.duration || +formData.duration <= 0) {
            newErrors.duration = "Duration must be greater than 0";
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

    // 🔥 real-time validate setelah pernah submit
    $: if (isSubmitted) {
        errors = validateForm();
    }

    // 🚀 computed valid form untuk enable/disable tombol
    $: isFormValid =
        formData.version_name.trim() &&
        formData.resolution &&
        formData.duration > 0;
</script>

<div class="space-y-4">
    <!-- Product (readonly) -->
    <div>
        <label class="block text-sm mb-1 font-medium">Product Name</label>
        <input type="hidden" bind:value={formData.product_id} />
        <input
            type="text"
            class="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
            value={selectedProductName}
            readonly
        />
    </div>

    <!-- Version Name -->
    <div>
        <label class="block text-sm mb-1 font-medium">Version Name</label>
        <input
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.version_name}
            placeholder="v1.0"
        />
        {#if isSubmitted && errors.version_name}
            <p class="text-red-500 text-sm mt-1">{errors.version_name}</p>
        {/if}
    </div>

    <!-- Resolution -->
    <div>
        <label class="block text-sm mb-1 font-medium">Resolution</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.resolution}
        >
            <option value="" disabled>Pilih Resolusi</option>
            <option value="1920x1080">1920x1080</option>
            <option value="3840x2160">3840x2160</option>
        </select>
        {#if isSubmitted && errors.resolution}
            <p class="text-red-500 text-sm mt-1">{errors.resolution}</p>
        {/if}
    </div>

    <!-- Duration -->
    <div>
        <label class="block text-sm mb-1 font-medium">Duration (seconds)</label>
        <input
            class="w-full px-3 py-2 border rounded"
            type="number"
            bind:value={formData.duration}
            placeholder="Contoh: 120"
            min="1"
        />
        {#if isSubmitted && errors.duration}
            <p class="text-red-500 text-sm mt-1">{errors.duration}</p>
        {/if}
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-2 mt-4">
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
            {selectedVersion ? "Save" : "Add"}
        </button>
    </div>
</div>
