<script>
    import PageLayout from "../../components/layout/PageLayout.svelte";
    import CampaignTable from "../../components/tables/orders/CampaignTable.svelte";
    import Modal from "../../components/ui/Modal.svelte";
    import CampaignForm from "../../components/forms/orders/CampaignForm.svelte";
    import { campaignUseCase } from "../../../usecases/orders/campaign";

    const {
        filteredCampaigns,
        form,
        modal,
        openAdd,
        openEdit,
        deleteItem: deleteCampaign,
        confirmDelete,
        handleSubmit,
        closeModal,
        search,
        updateSearch,
    } = campaignUseCase();
</script>

<PageLayout
    title="Campaign"
    icon="📢"
    bind:searchText={$search}
    onSearchChange={updateSearch}
    onAdd={openAdd}
>
    <div class="px-6">
        <CampaignTable
            campaigns={$filteredCampaigns}
            onEdit={openEdit}
            onDelete={deleteCampaign}
        />
    </div>
</PageLayout>

<!-- Modal Add/Edit -->
{#if $modal.show && ($modal.type === "add" || $modal.type === "edit")}
    <Modal
        title={$modal.type === "add" ? "Add Campaign" : "Edit Campaign"}
        onClose={closeModal}
    >
        <CampaignForm
            bind:form={$form}
            onCancel={closeModal}
            onSubmit={handleSubmit}
        />
    </Modal>
{/if}

<!-- Modal Delete -->
{#if $modal.show && $modal.type === "delete"}
    <Modal title="Delete Campaign" onClose={closeModal}>
        <div class="text-sm text-gray-700">
            Are you sure you want to delete this campaign?
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
