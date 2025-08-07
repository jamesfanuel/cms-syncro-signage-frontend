<script>
    import LicenseForm from "../../components/forms/configuration/LicenseForm.svelte";
    import LicenseTable from "../../components/tables/configuration/LicenseTable.svelte";
    import { onMount } from "svelte";

    import {
        fetchLicenses,
        createLicense,
        updateLicense,
        deleteLicense,
    } from "../../../usecases/configuration/license.js";

    import { fetchCustomers } from "../../../usecases/configuration/customer.js";
    import { fetchOutlets } from "../../../usecases/master/outlet.js";
    import { fetchFormationsByOutlet } from "../../../usecases/master/formation.js";

    let licenses = [];
    let customers = [];
    let outlets = [];
    let screens = [];
    let isOpen = false;
    let selectedLicense = null;

    async function loadCustomers() {
        customers = await fetchCustomers();
    }

    async function loadLicenses() {
        licenses = await fetchLicenses();
    }

    function openAddForm() {
        selectedLicense = null;
        isOpen = true;
        loadCustomers();
    }

    function openEditForm(license) {
        selectedLicense = license;
        isOpen = true;
    }

    async function handleDelete({ detail: { id } }) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this license?",
        );
        if (!confirmed) return;

        try {
            await deleteLicense(id);
            await loadLicenses();
        } catch (error) {
            console.error("Failed to delete license:", error);
            alert("Failed to delete license.");
        }
    }

    async function handleFormSubmit(data) {
        try {
            if (selectedLicense && selectedLicense.license_id) {
                await updateLicense(selectedLicense.license_id, data);
            } else {
                await createLicense(data);
            }
            await loadLicenses();
            isOpen = false;
        } catch (error) {
            console.error("Failed to submit form:", error);
            alert("Failed to save license.");
        }
    }

    function handleCloseForm() {
        isOpen = false;
    }

    async function handleCustomerChange(event) {
        const customerId = event.detail;
        outlets = await fetchOutlets(Number(customerId));

        if (outlets.length === 1) {
            const outletId = outlets[0].outlet_id;
            screens = await fetchFormationsByOutlet(outletId);
        }
    }

    async function handleOutletChange(event) {
        const outletId = event.detail;
        screens = await fetchFormationsByOutlet(Number(outletId));
    }

    onMount(() => {
        loadLicenses();
    });
</script>

<section class="p-6">
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-gray-800">License Management</h1>
        <button
            on:click={openAddForm}
            class="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
            <svg
                class="w-4 h-4 mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path
                    d="M11 9V5a1 1 0 10-2 0v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4z"
                />
            </svg>
            Add New
        </button>
    </div>

    <LicenseTable
        {licenses}
        on:edit={(e) => openEditForm(e.detail)}
        on:delete={handleDelete}
    />

    {#if isOpen && customers.length > 0}
        <div
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <LicenseForm
                {selectedLicense}
                {customers}
                {outlets}
                {screens}
                on:submit={(e) => handleFormSubmit(e.detail)}
                on:close={handleCloseForm}
                on:customerSelected={handleCustomerChange}
                on:outletSelected={handleOutletChange}
            />
        </div>
    {/if}
</section>
