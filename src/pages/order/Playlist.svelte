<!-- src/pages/orders/Playlist.svelte
<script>
    import PageLayout from "../../components/layout/PageLayout.svelte";
    import PlaylistTable from "../../components/tables/orders/PlaylistTable.svelte";
    import Modal from "../../components/ui/Modal.svelte";
    import PlaylistForm from "../../components/forms/orders/PlaylistForm.svelte";
    import { playlistUseCase } from "../../../usecases/orders/playlist";

    const {
        filteredPlaylists,
        form,
        modal,
        openAdd,
        openEdit,
        deleteItem: deletePlaylist,
        confirmDelete,
        handleSubmit,
        closeModal,
        search,
        updateSearch,
    } = playlistUseCase();
</script>

<PageLayout
    title="Playlist"
    icon="🎞️"
    bind:searchText={$search}
    onSearchChange={updateSearch}
    onAdd={openAdd}
>
    <div class="px-6">
        <PlaylistTable
            playlists={$filteredPlaylists}
            onEdit={openEdit}
            onDelete={deletePlaylist}
        />
    </div>
</PageLayout>

{#if $modal.show && ($modal.type === "add" || $modal.type === "edit")}
    <Modal
        title={$modal.type === "add" ? "Add Playlist" : "Edit Playlist"}
        onClose={closeModal}
    >
        <PlaylistForm
            bind:form={$form}
            onCancel={closeModal}
            onSubmit={handleSubmit}
        />
    </Modal>
{/if}

{#if $modal.show && $modal.type === "delete"}
    <Modal title="Delete Playlist" onClose={closeModal}>
        <div class="text-sm text-gray-700">
            Are you sure you want to delete this playlist?
        </div>
        <div class="flex justify-end gap-2 mt-4">
            <button class="px-4 py-2 border rounded" on:click={closeModal}
                >Cancel</button
            >
            <button
                class="px-4 py-2 bg-red-600 text-white rounded"
                on:click={confirmDelete}>Delete</button
            >
        </div>
    </Modal>
{/if} -->
