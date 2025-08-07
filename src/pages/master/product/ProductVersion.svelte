<script>
    import PageLayout from "../../../components/layout/PageLayout.svelte";
    import ProductVersionForm from "../../../components/forms/master/product/ProductVersionForm.svelte";
    import ProductVersionUploadForm from "../../../components/forms/master/product/ProductVersionUploadForm.svelte";
    import ProductVersionTable from "../../../components/tables/master/product/ProductVersionTable.svelte";
    import Modal from "../../../components/ui/Modal.svelte";
    import { onMount } from "svelte";

    import {
        fetchProductVersions,
        createProductVersion,
        updateProductVersion,
        deleteProductVersion,
        fetchProductItems,
    } from "../../../../usecases/master/product.js";

    let productVersions = [];
    let filteredProductVersions = [];
    let products = [];
    let searchText = "";
    let isOpen = false;
    let isUploadOpen = false;
    let selectedVersion = null;
    let selectedProductId = "";
    let selectedProductName = "";
    let canAdd = false;

    async function loadProductVersions() {
        const customerId = localStorage.getItem("customer_id");

        if (!customerId) {
            console.warn("customer_id not found in localStorage");
            return;
        }

        productVersions = await fetchProductVersions(
            Number(customerId),
            selectedProductId,
        );
        if (!searchText) {
            filteredProductVersions = productVersions;
        } else {
            filterProductVersions();
        }
    }

    function filterProductVersions() {
        if (!Array.isArray(productVersions) || productVersions.length === 0) {
            filteredProductVersions = [];
            return;
        }

        const q = searchText.toLowerCase();
        if (!q) {
            filteredProductVersions = productVersions;
            return;
        }

        filteredProductVersions = productVersions.filter((c) =>
            c.version_name?.toLowerCase().includes(q),
        );
    }

    function handleSearchChange(value) {
        searchText = value;
        filterProductVersions();
    }

    function openAddForm() {
        selectedVersion = null;
        isOpen = true;
    }

    function openEditForm(productVersion) {
        selectedVersion = productVersion;
        isOpen = true;
    }

    function openUploadForm(productVersion) {
        selectedVersion = productVersion;
        isUploadOpen = true;
    }

    async function handleDelete({ detail: { id } }) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product version?",
        );
        if (!confirmed) return;

        try {
            await deleteProductVersion(id);
            await loadProductVersions();
        } catch (error) {
            console.error("Failed to delete product version:", error);
            alert("Failed to delete product version.");
        }
    }

    async function handleFormSubmit(data) {
        if (selectedVersion) {
            await updateProductVersion(selectedVersion.version_id, data);
        } else {
            await createProductVersion(data);
        }
        await loadProductVersions();
        isOpen = false;
    }

    function handleCloseForm() {
        isOpen = false;
    }

    function handleCloseUploadForm() {
        isUploadOpen = false;
        loadProductVersions();
    }

    async function loadProducts() {
        const customerId = localStorage.getItem("customer_id");
        if (!customerId) {
            console.warn("customer_id not found in localStorage");
            return;
        }

        products = await fetchProductItems(Number(customerId));
    }

    $: if (selectedProductId) {
        loadProductVersions();
        canAdd = true;
    } else {
        productVersions = []; // kosongkan jika belum pilih outlet
    }

    onMount(() => {
        loadProducts();
    });
</script>

<PageLayout
    title="Product Version"
    icon="🏢"
    page="product_version"
    {products}
    selectedProduct={selectedProductId}
    onProductChange={(val) => {
        selectedProductId = val.product_id;
        selectedProductName = val.product_name;
    }}
    bind:searchText
    onSearchChange={handleSearchChange}
    onAdd={openAddForm}
    {canAdd}
>
    <div class="px-6">
        <ProductVersionTable
            productVersions={filteredProductVersions || []}
            on:edit={(e) => openEditForm(e.detail)}
            on:delete={handleDelete}
            on:upload={(e) => openUploadForm(e.detail)}
        />
    </div>

    {#if isOpen}
        <Modal
            title={selectedVersion
                ? "Edit Product Version"
                : "Add Product Version"}
            onClose={handleCloseForm}
        >
            <ProductVersionForm
                {selectedVersion}
                {selectedProductId}
                {selectedProductName}
                on:submit={(e) => handleFormSubmit(e.detail)}
                on:close={handleCloseForm}
            />
        </Modal>
    {/if}

    {#if isUploadOpen}
        <Modal title={"Upload Product Version"} onClose={handleCloseUploadForm}>
            <ProductVersionUploadForm
                versionId={selectedVersion?.version_id}
                on:close={handleCloseUploadForm}
            />
        </Modal>
    {/if}
</PageLayout>
