<script>
    export let form;
    export let onSubmit;
    export let onCancel;
</script>

<form on:submit|preventDefault={() => onSubmit()}>
    <div class="mb-4">
        <label class="block text-sm font-medium">Order ID</label>
        <input
            type="text"
            bind:value={form.id}
            class="w-full p-2 border rounded"
        />
    </div>

    <div class="mb-4">
        <label class="block text-sm font-medium">Client</label>
        <input
            type="text"
            bind:value={form.client}
            class="w-full p-2 border rounded"
        />
    </div>

    <div class="mb-4">
        <label class="block text-sm font-medium">Start Date</label>
        <input
            type="date"
            bind:value={form.startDate}
            class="w-full p-2 border rounded"
        />
    </div>

    <div class="mb-4">
        <label class="block text-sm font-medium">End Date</label>
        <input
            type="date"
            bind:value={form.endDate}
            class="w-full p-2 border rounded"
        />
    </div>

    <div class="mb-4">
        <label class="block text-sm font-medium">Status</label>
        <select bind:value={form.status} class="w-full p-2 border rounded">
            <option value="">-- Select Status --</option>
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
        </select>
    </div>

    <div class="flex justify-end gap-2">
        <button
            type="button"
            class="px-4 py-2 border rounded"
            on:click={onCancel}>Cancel</button
        >
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded"
            >Submit</button
        >
    </div>
</form>
