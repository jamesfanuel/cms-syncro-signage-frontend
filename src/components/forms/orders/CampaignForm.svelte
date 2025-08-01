<script>
    export let form;
    export let onCancel;
    export let onSubmit;
</script>

<form class="space-y-4" on:submit|preventDefault={onSubmit}>
    <div>
        <label class="block text-sm font-medium text-gray-700"
            >Campaign Code</label
        >
        <input class="input w-full" bind:value={form.code} />
    </div>
    <div>
        <label class="block text-sm font-medium text-gray-700"
            >Campaign Name</label
        >
        <input class="input w-full" bind:value={form.name} />
    </div>
    <div class="flex gap-4">
        <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700"
                >Start Date</label
            >
            <input
                type="date"
                class="input w-full"
                bind:value={form.startDate}
            />
        </div>
        <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700"
                >End Date</label
            >
            <input type="date" class="input w-full" bind:value={form.endDate} />
        </div>
    </div>
    <div>
        <label class="block text-sm font-medium text-gray-700">Client</label>
        <input class="input w-full" bind:value={form.client} />
    </div>
    <div class="flex justify-end gap-2 mt-4">
        <button
            type="button"
            on:click={onCancel}
            class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
            Cancel
        </button>
        <button
            type="submit"
            class="px-4 py-2 bg-[#5E6B75] text-white rounded hover:bg-opacity-90"
        >
            Save
        </button>
    </div>
</form>
