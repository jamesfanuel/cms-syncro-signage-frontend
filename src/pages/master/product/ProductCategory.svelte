<script>
    import PageLayout from "../../../components/layout/PageLayout.svelte";
    import ProductCategoryForm from "../../../components/forms/master/product/ProductCategoryForm.svelte";
    import ProductCategoryTable from "../../../components/tables/master/product/ProductCategoryTable.svelte";
    import Modal from "../../../components/ui/Modal.svelte";
    import { onMount } from "svelte";

    import {
        fetchProductCategories,
        createProductCategory,
        updateProductCategory,
        deleteProductCategory,
    } from "../../../../usecases/master/product.js";

    let productCategories = [];
    let filteredProductCategories = [];
    let searchText = "";
    let isOpen = false;
    let selectedCategory = null;

    async function loadProductCategories() {
        const customerId = localStorage.getItem("customer_id");

        if (!customerId) {
            console.warn("customer_id not found in localStorage");
            return;
        }

        productCategories = await fetchProductCategories(Number(customerId));
        if (!searchText) {
            filteredProductCategories = productCategories;
        } else {
            filterProductCategories();
        }
    }

    function filterProductCategories() {
        if (
            !Array.isArray(productCategories) ||
            productCategories.length === 0
        ) {
            filteredProductCategories = [];
            return;
        }

        const q = searchText.toLowerCase();
        if (!q) {
            filteredProductCategories = productCategories;
            return;
        }

        filteredProductCategories = productCategories.filter((c) =>
            c.category_name?.toLowerCase().includes(q),
        );
    }

    function handleSearchChange(value) {
        searchText = value;
        filterProductCategories();
    }

    function openAddForm() {
        selectedCategory = null;
        isOpen = true;
    }

    function openEditForm(productCategory) {
        selectedCategory = productCategory;
        isOpen = true;
    }

    async function handleDelete({ detail: { id } }) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this productCategory?",
        );
        if (!confirmed) return;

        try {
            await deleteProductCategory(id);
            await loadProductCategories();
        } catch (error) {
            console.error("Failed to delete productCategory:", error);
            alert("Failed to delete productCategory.");
        }
    }

    async function handleFormSubmit(data) {
        if (selectedCategory) {
            await updateProductCategory(selectedCategory.category_id, data);
        } else {
            await createProductCategory(data);
        }
        await loadProductCategories();
        isOpen = false;
    }

    function handleCloseForm() {
        isOpen = false;
    }

    onMount(() => {
        loadProductCategories();
    });
</script>

<PageLayout
    title="Product Category"
    icon="🏢"
    bind:searchText
    onSearchChange={handleSearchChange}
    onAdd={openAddForm}
>
    <div class="px-6">
        <ProductCategoryTable
            productCategories={filteredProductCategories || []}
            on:edit={(e) => openEditForm(e.detail)}
            on:delete={handleDelete}
        />
    </div>

    {#if isOpen}
        <Modal
            title={selectedCategory
                ? "Edit Product Category"
                : "Add Product Category"}
            onClose={handleCloseForm}
        >
            <ProductCategoryForm
                {selectedCategory}
                on:submit={(e) => handleFormSubmit(e.detail)}
                on:close={handleCloseForm}
            />
        </Modal>
    {/if}
</PageLayout>
