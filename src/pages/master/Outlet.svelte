<script>
  import PageLayout from "../../components/layout/PageLayout.svelte";
  import OutletTable from "../../components/tables/master/OutletTable.svelte";
  import Modal from "../../components/ui/Modal.svelte";
  import OutletForm from "../../components/forms/master/OutletForm.svelte";
  import { outletUseCase } from "../../../usecases/master/outlet";

  const {
    filteredOutlets,
    form,
    modal,
    openAdd,
    openEdit,
    deleteItem: deleteOutlet,
    confirmDelete,
    handleSubmit,
    closeModal,
    search,
    updateSearch,
  } = outletUseCase();
</script>

<PageLayout
  title="Outlet"
  icon="🏪"
  bind:searchText={$search}
  onSearchChange={updateSearch}
  onAdd={openAdd}
>
  <div class="px-6">
    <OutletTable
      outlets={$filteredOutlets}
      onEdit={openEdit}
      onDelete={deleteOutlet}
    />
  </div>
</PageLayout>

<!-- Modal Add/Edit -->
{#if $modal.show && ($modal.type === "add" || $modal.type === "edit")}
  <Modal
    title={$modal.type === "add" ? "Add Outlet" : "Edit Outlet"}
    onClose={closeModal}
  >
    <OutletForm
      bind:form={$form}
      onCancel={closeModal}
      onSubmit={handleSubmit}
    />
  </Modal>
{/if}

<!-- Modal Delete -->
{#if $modal.show && $modal.type === "delete"}
  <Modal title="Delete Outlet" onClose={closeModal}>
    <div class="text-sm text-gray-700">
      Are you sure you want to delete this outlet?
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
