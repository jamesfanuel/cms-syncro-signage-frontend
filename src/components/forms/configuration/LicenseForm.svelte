<script>
    import { createEventDispatcher } from "svelte";

    export let selectedLicense = null;
    const dispatch = createEventDispatcher();

    const currentUser = localStorage.getItem("user_id");

    export let customers = [];
    export let outlets = [];
    export let screens = [];

    let formData = {
        customer_id: null,
        outlet_id: null,
        screen_id: null,
        expired_at: "",
        created_by: currentUser,
    };

    $: if (
        selectedLicense &&
        selectedLicense.license_id !== formData.license_id
    ) {
        formData = {
            license_id: selectedLicense.license_id,
            license_code: selectedLicense.license_code,
            customer_id: selectedLicense.customer_id,
            outlet_id: Number(selectedLicense.outlet_id),
            screen_id: Number(selectedLicense.screen_id),
            expired_at: selectedLicense.expired_at,
            created_by: selectedLicense.created_by,
        };
    } else if (!selectedLicense && formData.license_id !== null) {
        formData = {
            license_id: null,
            customer_id: null,
            outlet_id: null,
            screen_id: null,
            expired_at: "",
            created_by: currentUser || "unknown",
        };
    }

    function handleSubmit() {
        dispatch("submit", formData);
    }

    function handleClose() {
        dispatch("close");
    }

    function handleCustomerChange(event) {
        const selectedId = parseInt(event.target.value);
        formData.customer_id = selectedId;
        screens = [];
        dispatch("customerSelected", selectedId);
    }

    function handleOutletChange(event) {
        const outletId = parseInt(event.target.value);
        formData.outlet_id = outletId;
        dispatch("outletSelected", outletId);
    }

    $: if (
        formData.customer_id &&
        outlets.length === 1 &&
        !formData.outlet_id
    ) {
        formData.outlet_id = outlets[0].outlet_id;
    }
</script>

<div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-xl font-semibold mb-4 text-gray-700">
        {selectedLicense ? "Edit License" : "Add New License"}
    </h2>

    {#if selectedLicense}
        <div class="mb-4">
            <label class="block text-gray-600 text-sm font-medium mb-1">
                License Code
            </label>
            <input
                class="w-full px-3 py-2 border rounded bg-gray-100 cursor-not-allowed"
                bind:value={formData.license_code}
                readonly
            />
        </div>
    {/if}

    <!-- Customer Select -->
    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1"
            >Customer Name</label
        >
        <select
            class="w-full px-3 py-2 border rounded"
            on:change={handleCustomerChange}
            bind:value={formData.customer_id}
        >
            <option value="" disabled hidden>Pilih Customer</option>
            {#each customers as customer}
                <option value={+customer.customer_id}
                    >{customer.customer_name}</option
                >
            {/each}
        </select>
    </div>

    <!-- Outlet Select (disabled if no customer) -->
    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1"
            >Outlet Name</label
        >
        <select
            class="w-full px-3 py-2 border rounded"
            on:change={handleOutletChange}
            bind:value={formData.outlet_id}
            disabled={!formData.customer_id}
        >
            <option value="" disabled hidden>Pilih Outlet</option>
            {#each outlets as outlet}
                <option value={+outlet.outlet_id}>{outlet.outlet_name}</option>
            {/each}
        </select>
    </div>

    <!-- Screen Select (disabled if no outlet) -->
    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1"
            >Screen Name</label
        >
        <select
            class="w-full px-3 py-2 border rounded"
            on:change={(e) => (formData.screen_id = parseInt(e.target.value))}
            bind:value={formData.screen_id}
            disabled={!formData.outlet_id}
        >
            <option value="" disabled hidden>Pilih Screen</option>
            {#each screens as screen}
                <option value={+screen.screen_id}>{screen.screen_name}</option>
            {/each}
        </select>
    </div>

    <div class="mb-4">
        <label class="block text-gray-600 text-sm font-medium mb-1"
            >Expired At</label
        >
        <input
            class="w-full px-3 py-2 border rounded"
            type="date"
            bind:value={formData.expired_at}
        />
    </div>

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
            {selectedLicense ? "Update" : "Add"}
        </button>
    </div>
</div>
