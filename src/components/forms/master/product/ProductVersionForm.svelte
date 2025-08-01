<script>
    import { createEventDispatcher, onMount } from "svelte";

    export let selectedVersion = null;
    console.log("selectedVersion", selectedVersion);

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name");
    const customerId = localStorage.getItem("customer_id") || "unknown";

    export let products = [];

    let formData = {
        version_id: null,
        product_id: null,
        version_name: "",
        resolution: "",
        file_path: "", // akan diisi saat upload
        origin_file_name: "", // akan diisi saat upload
        file_name: "", // akan diisi saat upload
        file_size: 0, // akan diisi saat upload
        duration: 0, // akan diisi saat upload
        md5: "", // bisa diisi nanti dari hash file jika perlu
        thumbnail: "", // akan diisi saat upload
        created_at: new Date().toISOString(), // format ISO string
        created_by: currentUser || "unknown",
        is_deleted: false,
        customer_id: customerId,
    };

    $: if (
        selectedVersion &&
        selectedVersion.version_id !== formData.version_id
    ) {
        formData = {
            version_id: selectedVersion.version_id, // ← SET INI
            product_id: selectedVersion.product_id,
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
    } else if (!selectedVersion && formData.version_id !== null) {
        formData = {
            version_id: null, // ← RESET INI JUGA
            product_id: null,
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
        <label class="block text-sm mb-1 font-medium">Version Name</label>
        <input
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.version_name}
            placeholder="v1.0"
        />
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Product Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.product_id}
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
        <label class="block text-sm mb-1 font-medium">Resolution</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.resolution}
        >
            <option value="" disabled>Pilih Resolusi</option>
            <option value="1920x1080">1920x1080</option>
            <option value="3840x2160">3840x2160</option>
        </select>
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Duration (seconds)</label>
        <input
            class="w-full px-3 py-2 border rounded"
            type="number"
            bind:value={formData.duration}
            placeholder="Contoh: 120"
        />
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-2 mt-4">
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
            {selectedVersion ? "Update" : "Add"}
        </button>
    </div>
</div>
