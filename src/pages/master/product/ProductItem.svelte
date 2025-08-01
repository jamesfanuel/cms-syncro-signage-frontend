<script>
  import PageLayout from "../../../components/layout/PageLayout.svelte";
  import ProductItemForm from "../../../components/forms/master/product/ProductItemForm.svelte";
  import ProductItemTable from "../../../components/tables/master/product/ProductItemTable.svelte";
  import Modal from "../../../components/ui/Modal.svelte";
  import { onMount } from "svelte";

  import {
    fetchProductItems,
    createProductItem,
    updateProductItem,
    deleteProductItem,
    fetchProductCategories,
  } from "../../../../usecases/master/product.js";

  import { fetchClients } from "../../../../usecases/master/client.js";

  let productItems = [];
  let filteredProductItems = [];
  let clients = [];
  let categories = [];
  let searchText = "";
  let isOpen = false;
  let selectedItem = null;

  async function loadProductItems() {
    const customerId = localStorage.getItem("customer_id");

    if (!customerId) {
      console.warn("customer_id not found in localStorage");
      return;
    }

    productItems = await fetchProductItems(Number(customerId));
    if (!searchText) {
      filteredProductItems = productItems;
    } else {
      filterProductItems();
    }
  }

  function filterProductItems() {
    if (!Array.isArray(productItems) || productItems.length === 0) {
      filteredProductItems = [];
      return;
    }

    const q = searchText.toLowerCase();
    if (!q) {
      filteredProductItems = productItems;
      return;
    }

    filteredProductItems = productItems.filter(
      (c) =>
        c.product_code?.toLowerCase().includes(q) ||
        c.product_name?.toLowerCase().includes(q),
    );
  }

  function handleSearchChange(value) {
    searchText = value;
    filterProductItems();
  }

  function openAddForm() {
    selectedItem = null;
    isOpen = true;
  }

  function openEditForm(productItem) {
    selectedItem = productItem;
    isOpen = true;
  }

  async function handleDelete({ detail: { id } }) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product item?",
    );
    if (!confirmed) return;

    try {
      await deleteProductItem(id);
      await loadProductItems();
    } catch (error) {
      console.error("Failed to delete product item:", error);
      alert("Failed to delete product item.");
    }
  }

  async function handleFormSubmit(data) {
    if (selectedItem) {
      await updateProductItem(selectedItem.product_id, data);
    } else {
      await createProductItem(data);
    }
    await loadProductItems();
    isOpen = false;
  }

  function handleCloseForm() {
    isOpen = false;
  }

  async function loadClients() {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      console.warn("customer_id not found in localStorage");
      return;
    }

    clients = await fetchClients(Number(customerId));
  }
  async function loadCategories() {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      console.warn("customer_id not found in localStorage");
      return;
    }
    categories = await fetchProductCategories(Number(customerId));
  }

  onMount(() => {
    loadProductItems();
    loadClients();
    loadCategories();
  });
</script>

<PageLayout
  title="Product Item"
  icon="🏢"
  bind:searchText
  onSearchChange={handleSearchChange}
  onAdd={openAddForm}
>
  <div class="px-6">
    <ProductItemTable
      productItems={filteredProductItems || []}
      on:edit={(e) => openEditForm(e.detail)}
      on:delete={handleDelete}
    />
  </div>

  {#if isOpen}
    <Modal
      title={selectedItem ? "Edit Product Item" : "Add Product Item"}
      onClose={handleCloseForm}
    >
      <ProductItemForm
        {selectedItem}
        {clients}
        {categories}
        on:submit={(e) => handleFormSubmit(e.detail)}
        on:close={handleCloseForm}
      />
    </Modal>
  {/if}
</PageLayout>
