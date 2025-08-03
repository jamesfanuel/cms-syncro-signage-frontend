<script>
  import PageLayout from "../../components/layout/PageLayout.svelte";
  import OutletForm from "../../components/forms/master/OutletForm.svelte";
  import OutletTable from "../../components/tables/master/OutletTable.svelte";
  import Modal from "../../components/ui/Modal.svelte";
  import { onMount } from "svelte";

  import {
    fetchOutlets,
    createOutlet,
    updateOutlet,
    deleteOutlet,
  } from "../../../usecases/master/outlet.js";

  let outlets = [];
  let filteredOutlets = [];
  let searchText = "";
  let isOpen = false;
  let selectedOutlet = null;

  async function loadOutlets() {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      console.warn("customer_id not found in localStorage");
      return;
    }

    outlets = await fetchOutlets(Number(customerId));

    if (!searchText) {
      filteredOutlets = outlets;
    } else {
      filterOutlets();
    }
  }

  function filterOutlets() {
    if (!Array.isArray(outlets) || outlets.length === 0) {
      filteredOutlets = [];
      return;
    }

    const q = searchText.toLowerCase();
    if (!q) {
      filteredOutlets = outlets;
      return;
    }

    filteredOutlets = outlets.filter(
      (c) =>
        c.outlet_code?.toLowerCase().includes(q) ||
        c.outlet_name?.toLowerCase().includes(q),
    );
  }

  function handleSearchChange(value) {
    searchText = value;
    filterOutlets();
  }

  function openAddForm() {
    selectedOutlet = null;
    isOpen = true;
  }

  function openEditForm(outlet) {
    selectedOutlet = outlet;
    isOpen = true;
  }

  async function handleDelete({ detail: { id } }) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this outlet?",
    );
    if (!confirmed) return;

    try {
      await deleteOutlet(id);
      await loadOutlets();
    } catch (error) {
      console.error("Failed to delete outlet:", error);
      alert("Failed to delete outlet.");
    }
  }

  async function handleFormSubmit(data) {
    if (selectedOutlet) {
      await updateOutlet(selectedOutlet.outlet_id, data);
    } else {
      await createOutlet(data);
    }
    await loadOutlets();
    isOpen = false;
  }

  function handleCloseForm() {
    isOpen = false;
  }

  onMount(() => {
    loadOutlets();
  });
</script>

<PageLayout
  title="Outlet"
  icon="🏢"
  bind:searchText
  onSearchChange={handleSearchChange}
  onAdd={openAddForm}
>
  <div class="px-6">
    <OutletTable
      outlets={filteredOutlets || []}
      on:edit={(e) => openEditForm(e.detail)}
      on:delete={handleDelete}
    />
  </div>

  {#if isOpen}
    <Modal
      title={selectedOutlet ? "Edit Outlet" : "Add Outlet"}
      onClose={handleCloseForm}
    >
      <OutletForm
        {selectedOutlet}
        on:submit={(e) => handleFormSubmit(e.detail)}
        on:close={handleCloseForm}
      />
    </Modal>
  {/if}
</PageLayout>
