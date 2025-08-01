<script>
    export let form;
    export let onSubmit;
    export let onCancel;

    let localForm = { ...form };

    function handleSubmit() {
        onSubmit(localForm);
    }
</script>

<div class="space-y-4">
    <div>
        <label class="block text-sm font-medium text-gray-700">Code</label>
        <input
            type="text"
            bind:value={localForm.code}
            class="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
        />
    </div>
    <div>
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
            type="text"
            bind:value={localForm.name}
            class="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
        />
    </div>
    <div>
        <label class="block text-sm font-medium text-gray-700">Location</label>
        <input
            type="text"
            bind:value={localForm.location}
            class="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
        />
    </div>

    <div class="flex justify-end gap-2 mt-4">
        <button
            type="button"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
            on:click={onCancel}
        >
            Cancel
        </button>
        <button
            type="button"
            class="px-4 py-2 bg-[#5E6B75] text-white rounded hover:shadow-md text-sm"
            on:click={handleSubmit}
        >
            Save
        </button>
    </div>
</div>
