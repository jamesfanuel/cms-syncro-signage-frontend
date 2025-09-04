<script>
    import { createEventDispatcher, onMount } from "svelte";

    export let selectedOrder = null;
    export let campaigns = [];
    export let level;

    const dispatch = createEventDispatcher();
    const currentUser = localStorage.getItem("user_name") || "unknown";
    const customerId = localStorage.getItem("customer_id") || "unknown";

    let formData = {
        campaign_id: null,
        order_id: null,
        order_name: "",
        duration: null,
        customer_id: customerId,
        created_by: currentUser,
        is_timed: 0, // 0 = NO, 1 = YES
        start_time: "",
        stop_time: "",
    };

    let touched = false;

    // update saat edit
    $: if (selectedOrder && selectedOrder.order_id !== formData.order_id) {
        formData = {
            campaign_id: +selectedOrder.campaign_id,
            order_id: selectedOrder.order_id,
            order_name: selectedOrder.order_name,
            duration: selectedOrder.duration,
            customer_id: parseInt(selectedOrder.customer_id) || null,
            created_by: selectedOrder.created_by || currentUser,
            is_timed:
                selectedOrder.start_time && selectedOrder.stop_time ? 1 : 0,
            start_time: selectedOrder.start_time || "",
            stop_time: selectedOrder.stop_time || "",
        };
    }

    // reset saat tambah baru
    $: if (!selectedOrder && formData.order_id !== null) {
        formData = {
            campaign_id: null,
            order_id: null,
            order_name: "",
            duration: null,
            customer_id: customerId,
            created_by: currentUser,
            is_timed: 0,
            start_time: "",
            stop_time: "",
        };
    }

    let showTimeFields = false;
    onMount(() => {
        showTimeFields = level > 1;
    });

    // validasi waktu
    function isValidStart() {
        if (formData.is_timed == 0 || !formData.start_time) return true;
        const now = new Date();
        const today = now.toISOString().split("T")[0];
        const start = new Date(`${today}T${formData.start_time}`);
        return start > now;
    }

    function isValidStop() {
        if (
            formData.is_timed == 0 ||
            !formData.stop_time ||
            !formData.start_time
        )
            return true;
        const today = new Date().toISOString().split("T")[0];
        const start = new Date(`${today}T${formData.start_time}`);
        const stop = new Date(`${today}T${formData.stop_time}`);
        return stop > start;
    }

    $: invalidStart = !isValidStart();
    $: invalidStop = !isValidStop();

    // reset time saat pilih NO
    $: if (formData.is_timed == 0) {
        formData.start_time = "";
        formData.stop_time = "";
    }

    // Cek apakah semua field wajib terisi
    $: allRequiredFilled =
        formData.campaign_id &&
        formData.order_name.trim() &&
        formData.duration !== null;

    function handleSubmit() {
        touched = true;
        if (!allRequiredFilled) return;
        dispatch("submit", formData);
    }

    function handleClose() {
        dispatch("close");
    }
</script>

<div class="space-y-4">
    <!-- Campaign -->
    <div>
        <label class="block text-sm mb-1 font-medium">Campaign Name</label>
        <select
            class="w-full px-3 py-2 border rounded"
            bind:value={formData.campaign_id}
            on:change={() => (touched = true)}
        >
            <option value="" disabled>Pilih Campaign</option>
            {#each campaigns as campaign}
                <option value={+campaign.campaign_id}
                    >{campaign.campaign_name}</option
                >
            {/each}
        </select>
    </div>

    <!-- Order -->
    <div>
        <label class="block text-sm mb-1 font-medium">Order Name</label>
        <input
            type="text"
            bind:value={formData.order_name}
            class="w-full border px-3 py-2 rounded"
            on:input={() => (touched = true)}
        />
    </div>

    <!-- Duration -->
    <div>
        <label class="block text-sm mb-1 font-medium">Duration</label>
        <input
            type="number"
            bind:value={formData.duration}
            class="w-full border px-3 py-2 rounded"
            on:input={() => (touched = true)}
        />
    </div>

    {#if showTimeFields}
        <!-- Is Timed -->
        <div>
            <label class="block text-sm mb-1 font-medium">Is Timed</label>
            <select
                class="w-full px-3 py-2 border rounded"
                bind:value={formData.is_timed}
                on:change={() => (touched = true)}
            >
                <option value={0}>NO</option>
                <option value={1}>YES</option>
            </select>
        </div>

        {#if formData.is_timed == 1}
            <!-- Time Start -->
            <div>
                <label class="block text-sm mb-1 font-medium">Time Start</label>
                <input
                    type="time"
                    bind:value={formData.start_time}
                    class="w-full border px-3 py-2 rounded"
                    on:input={() => (touched = true)}
                />
                {#if touched && invalidStart}
                    <p class="text-red-500 text-xs mt-1">
                        Time Start harus lebih besar dari jam sekarang
                    </p>
                {/if}
            </div>

            <!-- Time Stop -->
            <div>
                <label class="block text-sm mb-1 font-medium">Time Stop</label>
                <input
                    type="time"
                    bind:value={formData.stop_time}
                    class="w-full border px-3 py-2 rounded"
                    on:input={() => (touched = true)}
                />
                {#if touched && invalidStop}
                    <p class="text-red-500 text-xs mt-1">
                        Time Stop harus lebih besar dari Time Start
                    </p>
                {/if}
            </div>
        {/if}
    {/if}

    <!-- Buttons -->
    <div class="flex justify-end gap-2 mt-4">
        <button
            type="button"
            class="px-4 py-2 rounded border border-gray-400"
            on:click={handleClose}
        >
            Cancel
        </button>
        <button
            type="button"
            class="px-4 py-2 rounded bg-[#5E6B75] text-white hover:bg-[#4c5962] disabled:opacity-50 disabled:cursor-not-allowed"
            on:click={handleSubmit}
            disabled={!allRequiredFilled}
        >
            {formData.order_id ? "Save" : "Add"}
        </button>
    </div>
</div>
