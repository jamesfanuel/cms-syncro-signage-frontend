
<script>
    import { addScreen } from '../api/screens.js';

  let screenId = '';
  let location = '';
  let type = '';

  function handleSubmit() {
    if (screenId && location && type) {
      alert(`Data disimpan:\\nID: ${screenId}\\nLokasi: ${location}\\nTipe: ${type}`);
      screenId = '';
      location = '';
      type = '';
    }
  }
</script>

<div class="p-6">
  <h2 class="text-xl font-semibold mb-4">Screen Function</h2>
  <form on:submit|preventDefault={handleSubmit} class="space-y-4 max-w-md">
    <div>
      <label for="screenId" class="block font-medium">Screen ID</label>
      <input id="screenId" type="text" bind:value={screenId} required class="w-full border p-2 rounded" />
    </div>
    <div>
      <label for="location" class="block font-medium">Lokasi</label>
      <input id="location" type="text" bind:value={location} required class="w-full border p-2 rounded" />
    </div>
    <div>
      <label for="type" class="block font-medium">Tipe TV</label>
      <select id="type" bind:value={type} required class="w-full border p-2 rounded">
        <option value="" disabled selected>Pilih tipe</option>
        <option value="Hisense">Hisense</option>
        <option value="Samsung">Samsung</option>
        <option value="LG">LG</option>
      </select>
    </div>
    <button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
      Simpan Data
    </button>
  </form>
</div>
