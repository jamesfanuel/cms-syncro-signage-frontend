<script>
  import PageLayout from "../../components/layout/PageLayout.svelte";
  import FormationForm from "../../components/forms/master/FormationForm.svelte";
  import FormationTable from "../../components/tables/master/FormationTable.svelte";
  import Modal from "../../components/ui/Modal.svelte";
  import { onMount } from "svelte";

  import {
    fetchFormations,
    createFormation,
    updateFormation,
    deleteFormation,
  } from "../../../usecases/master/formation.js";

  import { fetchOutlets } from "../../../usecases/master/outlet.js";

  let formations = [];
  let filteredFormations = [];
  let searchText = "";
  let selectedOutletId = "";
  let isOpen = false;
  let selectedFormation = null;
  let outlets = [];
  let canAdd = false;

  $: if (selectedOutletId) {
    loadFormations();
    canAdd = true;
  } else {
    formations = []; // kosongkan jika belum pilih outlet
  }

  async function loadFormations() {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      console.warn("customer_id not found in localStorage");
      return;
    }

    formations = await fetchFormations(Number(customerId));

    if (!searchText) {
      filteredFormations = formations;
    } else {
      filterFormations();
    }
  }

  function filterFormations() {
    if (!Array.isArray(formations) || formations.length === 0) {
      filteredFormations = [];
      return;
    }

    const q = searchText.toLowerCase();
    if (!q) {
      filteredFormations = formations;
      return;
    }

    filteredFormations = formations.filter(
      (c) =>
        c.outlet_name?.toLowerCase().includes(q) ||
        c.screen_name?.toLowerCase().includes(q),
    );
  }

  function handleSearchChange(value) {
    searchText = value;
    filterFormations();
  }

  function openAddForm() {
    selectedFormation = null;
    isOpen = true;
  }

  function openEditForm(formation) {
    selectedFormation = formation;
    isOpen = true;
  }

  async function handleDelete({ detail: { id } }) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this formation?",
    );
    if (!confirmed) return;

    try {
      await deleteFormation(id);
      await loadFormations();
    } catch (error) {
      console.error("Failed to delete formation:", error);
      alert("Failed to delete formation.");
    }
  }

  async function handleFormSubmit(data) {
    if (selectedFormation) {
      await updateFormation(selectedFormation.screen_id, data);
    } else {
      await createFormation(data);
    }
    await loadFormations();
    isOpen = false;
  }

  async function loadOutlets() {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      console.warn("customer_id not found in localStorage");
      return;
    }

    outlets = await fetchOutlets(Number(customerId));
  }

  function handleCloseForm() {
    isOpen = false;
  }

  onMount(() => {
    loadOutlets();
  });
</script>

<PageLayout
  title="Formation"
  icon="🏢"
  page="formation"
  {outlets}
  selectedOutlet={selectedOutletId}
  onOutletChange={(val) => (selectedOutletId = val)}
  bind:searchText
  onSearchChange={handleSearchChange}
  onAdd={openAddForm}
  {canAdd}
>
  <div class="px-6">
    <FormationTable
      formations={filteredFormations || []}
      on:edit={(e) => openEditForm(e.detail)}
      on:delete={handleDelete}
    />
  </div>

  {#if isOpen}
    <Modal
      title={selectedFormation ? "Edit Formation" : "Add Formation"}
      onClose={handleCloseForm}
    >
      <FormationForm
        {selectedFormation}
        {outlets}
        on:submit={(e) => handleFormSubmit(e.detail)}
        on:close={handleCloseForm}
      />
    </Modal>
  {/if}
</PageLayout>
