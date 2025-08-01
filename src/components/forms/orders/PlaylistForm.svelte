<script>
    export let form;
    export let onCancel;
    export let onSubmit;
</script>

<form class="space-y-4" on:submit|preventDefault={() => onSubmit()}>
    <div>
        <label class="text-sm font-semibold text-gray-700">Code</label>
        <input class="input" type="text" bind:value={form.code} required />
    </div>

    <div>
        <label class="text-sm font-semibold text-gray-700">Name</label>
        <input class="input" type="text" bind:value={form.name} required />
    </div>

    <div>
        <label class="text-sm font-semibold text-gray-700">Client</label>
        <input class="input" type="text" bind:value={form.client} />
    </div>

    <div>
        <label class="text-sm font-semibold text-gray-700">Duration</label>
        <input
            class="input"
            type="text"
            bind:value={form.duration}
            placeholder="HH:MM:SS"
        />
    </div>

    <div>
        <label class="text-sm font-semibold text-gray-700">Total Items</label>
        <input
            class="input"
            type="number"
            bind:value={form.totalItems}
            min="0"
        />
    </div>

    <div>
        <label class="text-sm font-semibold text-gray-700">Status</label>
        <select class="input" bind:value={form.status}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
        </select>
    </div>

    <div class="flex justify-end gap-2">
        <button
            type="button"
            class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            on:click={onCancel}
        >
            Cancel
        </button>
        <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Save
        </button>
    </div>
</form>
