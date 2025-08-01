<script>
    import PageLayout from "../../components/layout/PageLayout.svelte";
    import OrderTable from "../../components/tables/orders/OrderTable.svelte";
    import Modal from "../../components/ui/Modal.svelte";
    import OrderForm from "../../components/forms/orders/OrderForm.svelte";
    import { orderUseCase } from "../../../usecases/orders/order";

    const {
        filteredOrders,
        form,
        modal,
        openAdd,
        openEdit,
        deleteItem: deleteOrder,
        confirmDelete,
        handleSubmit,
        closeModal,
        search,
        updateSearch,
    } = orderUseCase();
</script>

<PageLayout
    title="All Orders"
    icon="📄"
    bind:searchText={$search}
    onSearchChange={updateSearch}
    onAdd={openAdd}
>
    <div class="px-6">
        <OrderTable
            orders={$filteredOrders}
            onEdit={openEdit}
            onDelete={deleteOrder}
        />
    </div>
</PageLayout>

{#if $modal.show && ($modal.type === "add" || $modal.type === "edit")}
    <Modal
        title={$modal.type === "add" ? "Add Order" : "Edit Order"}
        onClose={closeModal}
    >
        <OrderForm
            bind:form={$form}
            onCancel={closeModal}
            onSubmit={handleSubmit}
        />
    </Modal>
{/if}

{#if $modal.show && $modal.type === "delete"}
    <Modal title="Delete Order" onClose={closeModal}>
        <div class="text-sm text-gray-700">
            Are you sure you want to delete this order?
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
