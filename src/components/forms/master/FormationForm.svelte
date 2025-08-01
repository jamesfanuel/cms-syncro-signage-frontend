<!-- src/components/forms/FormationForm.svelte -->
<script>
    export let form;
    export let onCancel;
    export let onSubmit;
</script>

<div class="space-y-4">
    <div>
        <label class="block text-sm mb-1 font-medium">TV Code</label>
        <input
            type="text"
            bind:value={form.code}
            class="w-full border px-3 py-2 rounded"
        />
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">TV Name</label>
        <input
            type="text"
            bind:value={form.name}
            class="w-full border px-3 py-2 rounded"
        />
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Location</label>
        <input
            type="text"
            bind:value={form.location}
            class="w-full border px-3 py-2 rounded"
        />
    </div>

    <div>
        <label class="block text-sm mb-1 font-medium">Client</label>
        <input
            type="text"
            bind:value={form.client}
            class="w-full border px-3 py-2 rounded"
        />
    </div>

    <div class="flex justify-end gap-2 mt-4">
        <button
            class="px-4 py-2 rounded border border-gray-400"
            on:click={onCancel}
        >
            Cancel
        </button>
        <button
            class="px-4 py-2 rounded bg-[#5E6B75] text-white hover:bg-[#4c5962]"
            on:click={onSubmit}
        >
            {form.code ? "Save" : "Add"}
        </button>
    </div>
</div>
