<script>
    import CustomerForm from "../../components/forms/configuration/CustomerForm.svelte";
    import CustomerTable from "../../components/tables/configuration/CustomerTable.svelte";
    import { onMount } from "svelte";

    import {
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
    } from "../../../usecases/configuration/customer.js";

    let customers = [];
    let isOpen = false;
    let selectedCustomer = null;

    async function loadCustomers() {
        customers = await fetchCustomers();
    }

    function openAddForm() {
        selectedCustomer = null;
        isOpen = true;
    }

    function openEditForm(customer) {
        selectedCustomer = customer;
        isOpen = true;
    }

    async function handleDelete({ detail: { id } }) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this customer?",
        );
        if (!confirmed) return;

        try {
            await deleteCustomer(id);
            await loadCustomers();
        } catch (error) {
            console.error("Failed to delete customer:", error);
            alert("Failed to delete customer.");
        }
    }

    async function handleFormSubmit(data) {
        if (selectedCustomer) {
            await updateCustomer(selectedCustomer.customer_id, data);
        } else {
            await createCustomer(data);
        }
        await loadCustomers();
        isOpen = false;
    }

    function handleCloseForm() {
        isOpen = false;
    }

    onMount(() => {
        loadCustomers();
    });
</script>

<section class="p-6">
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-gray-800">Customer Management</h1>
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

    <CustomerTable
        {customers}
        on:edit={(e) => openEditForm(e.detail)}
        on:delete={handleDelete}
    />

    {#if isOpen}
        <div
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <CustomerForm
                {selectedCustomer}
                on:submit={(e) => handleFormSubmit(e.detail)}
                on:close={handleCloseForm}
            />
        </div>
    {/if}
</section>
