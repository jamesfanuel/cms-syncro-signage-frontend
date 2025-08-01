<!-- src/pages/master/TVFormation.svelte -->
<script>
  import PageLayout from "../../components/layout/PageLayout.svelte";
  import FormationTable from "../../components/tables/master/FormationTable.svelte";
  import FormationForm from "../../components/forms/master/FormationForm.svelte";
  import Modal from "../../components/ui/Modal.svelte";
  import { formationUseCase } from "../../../usecases/master/formation.js";

  const {
    tvs,
    filteredTVs,
    form,
    modal,
    search,
    updateSearch,
    openAdd,
    openEdit,
    deleteItem,
    confirmDelete,
    handleSubmit,
    closeModal,
  } = formationUseCase();

  $: console.log("RAW TVs:", $tvs);
  $: console.log("Filtered TVs:", $filteredTVs);
</script>

<PageLayout
  title="TV Formation"
  icon="📺"
  bind:searchText={$search}
  onSearchChange={updateSearch}
  onAdd={openAdd}
>
  <div class="px-6">
    <FormationTable
      tvs={$filteredTVs}
      onEdit={openEdit}
      onDelete={deleteItem}
    />
  </div>
</PageLayout>

<!-- Add/Edit Modal -->
{#if $modal.show && ($modal.type === "add" || $modal.type === "edit")}
  <Modal
    title={$modal.type === "add" ? "Add TV" : "Edit TV"}
    onClose={closeModal}
  >
    <FormationForm
      bind:form={$form}
      onCancel={closeModal}
      onSubmit={handleSubmit}
    />
  </Modal>
{/if}

<!-- Delete Confirmation Modal -->
{#if $modal.show && $modal.type === "delete"}
  <Modal title="Delete TV" onClose={closeModal}>
    <div class="text-sm text-gray-700">
      Are you sure you want to delete this TV?
    </div>
    <div class="flex justify-end gap-2 mt-4">
      <button
        class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        on:click={closeModal}
      >
        Cancel
      </button>
      <button
        class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        on:click={confirmDelete}
      >
        Delete
      </button>
    </div>
  </Modal>
{/if}
