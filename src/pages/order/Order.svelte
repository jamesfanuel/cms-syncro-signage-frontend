<script>
    import PageLayout from "../../components/layout/PageLayout.svelte";
    import OrderForm from "../../components/forms/order/OrderForm.svelte";
    import OrderItemForm from "../../components/forms/order/OrderItemForm.svelte";
    import OrderTable from "../../components/tables/order/OrderTable.svelte";
    import Modal from "../../components/ui/Modal.svelte";
    import { onMount } from "svelte";

    import {
        fetchOrders,
        createOrder,
        updateOrder,
        deleteOrder,
        fetchOrderItems,
        createOrderItem,
        updateOrderItem,
        deleteOrderItem,
    } from "../../../usecases/order/order.js";

    import { fetchCampaigns } from "../../../usecases/order/campaign.js";
    import { fetchOutlets } from "../../../usecases/master/outlet.js";
    import { fetchProductVersions } from "../../../usecases/master/product.js";

    let orders = [];
    let filteredOrders = [];
    let searchText = "";
    let isOpen = false;
    let isOpenItem = false;
    let selectedOrder = null;
    let selectedOrderItem = null;

    async function loadOrders() {
        const customerId = localStorage.getItem("customer_id");
        if (!customerId) {
            console.warn("customer_id not found in localStorage");
            return;
        }

        orders = await fetchOrders(Number(customerId));

        if (!searchText) {
            filteredOrders = orders;
        } else {
            filterOrders();
        }
    }

    function filterOrders() {
        if (!Array.isArray(orders) || orders.length === 0) {
            filteredOrders = [];
            return;
        }

        const q = searchText.toLowerCase();
        if (!q) {
            filteredOrders = orders;
            return;
        }

        filteredOrders = orders.filter(
            (c) =>
                c.client_name?.toLowerCase().includes(q) ||
                c.order_name?.toLowerCase().includes(q),
        );
    }

    function handleSearchChange(value) {
        searchText = value;
        filterOrders();
    }

    function openAddForm() {
        selectedOrder = null;
        isOpen = true;
    }

    function openEditForm(order) {
        selectedOrder = order;
        console.log(selectedOrder);
        isOpen = true;
    }

    function openAddItemForm(order) {
        selectedOrder = order;
        selectedOrderItem = null;
        isOpenItem = true;
        loadOutlets();
        loadVersions();
    }

    function openEditItemForm(order, orderItem) {
        selectedOrder = order;
        selectedOrderItem = orderItem;
        isOpenItem = true;
    }

    async function handleDelete({ detail: { id } }) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this order?",
        );
        if (!confirmed) return;

        try {
            await deleteOrder(id);
            await loadOrders();
        } catch (error) {
            console.error("Failed to delete order:", error);
            alert("Failed to delete order.");
        }
    }

    async function handleFormSubmit(data) {
        if (selectedOrder) {
            await updateOrder(selectedOrder.order_id, data);
        } else {
            await createOrder(data);
        }
        await loadOrders();
        isOpen = false;
    }

    async function handleItemFormSubmit(data) {
        if (selectedOrderItem) {
            await updateOrderItem(selectedOrderItem.order_item_id, data);
        } else {
            await createOrderItem(data);
        }

        await loadOrders();
        isOpenItem = false;
    }

    let campaigns = [];
    async function loadCampaigns() {
        const customerId = localStorage.getItem("customer_id");
        if (!customerId) {
            console.warn("customer_id not found in localStorage");
            return;
        }

        campaigns = await fetchCampaigns(Number(customerId));
    }

    let outlets = [];
    async function loadOutlets() {
        const customerId = localStorage.getItem("customer_id");
        if (!customerId) {
            console.warn("customer_id not found in localStorage");
            return;
        }

        outlets = await fetchOutlets(Number(customerId));
    }

    let versions = [];
    async function loadVersions() {
        const customerId = localStorage.getItem("customer_id");
        if (!customerId) {
            console.warn("customer_id not found in localStorage");
            return;
        }

        versions = await fetchProductVersions(Number(customerId));
    }

    function handleCloseForm() {
        isOpen = false;
    }

    function handleItemCloseForm() {
        isOpenItem = false;
        loadOrders();
    }

    onMount(() => {
        loadOrders();
        loadCampaigns();
    });
</script>

<PageLayout
    title="Order"
    icon="🏢"
    bind:searchText
    onSearchChange={handleSearchChange}
    onAdd={openAddForm}
>
    <div class="px-6">
        <OrderTable
            orders={filteredOrders || []}
            on:edit={(e) => openEditForm(e.detail)}
            on:delete={handleDelete}
            on:addItem={(e) => openAddItemForm(e.detail)}
            on:reload={loadOrders}
        />
    </div>

    {#if isOpen}
        <Modal
            title={selectedOrder ? "Edit Order" : "Add Order"}
            onClose={handleCloseForm}
        >
            <OrderForm
                {selectedOrder}
                {campaigns}
                on:submit={(e) => handleFormSubmit(e.detail)}
                on:close={handleCloseForm}
            />
        </Modal>
    {/if}

    {#if isOpenItem}
        <Modal
            title={selectedOrderItem ? "Edit Order Item" : "Add Order Item"}
            onClose={handleItemCloseForm}
        >
            <OrderItemForm
                {selectedOrder}
                {selectedOrderItem}
                {versions}
                {outlets}
                on:edit={(e) => openEditItemForm(e.detail)}
                on:submit={(e) => handleItemFormSubmit(e.detail)}
                on:close={handleItemCloseForm}
            />
        </Modal>
    {/if}
</PageLayout>
