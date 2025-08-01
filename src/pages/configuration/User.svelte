<script>
    import UserForm from "../../components/forms/configuration/UserForm.svelte";
    import UserTable from "../../components/tables/configuration/UserTable.svelte";
    import { onMount } from "svelte";

    import {
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
    } from "../../../usecases/configuration/user.js";

    import { fetchCustomers } from "../../../usecases/configuration/customer.js";

    let users = [];
    let customers = [];
    let isOpen = false;
    let selectedUser = null;

    async function loadCustomers() {
        customers = await fetchCustomers();
    }
    async function loadUsers() {
        users = await fetchUsers();
    }

    function openAddForm() {
        selectedUser = null;
        isOpen = true;
    }

    function openEditForm(user) {
        selectedUser = user;
        isOpen = true;
    }

    async function handleDelete({ detail: { id } }) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?",
        );
        if (!confirmed) return;

        try {
            await deleteUser(id);
            await loadUsers();
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("Failed to delete user.");
        }
    }

    async function handleFormSubmit(data) {
        try {
            if (selectedUser && selectedUser.id) {
                await updateUser(selectedUser.id, data);
            } else {
                await createUser(data);
            }
            await loadUsers();
            isOpen = false;
        } catch (error) {
            console.error("Failed to submit form:", error);
            alert("Failed to save user.");
        }
    }

    function handleCloseForm() {
        isOpen = false;
    }

    onMount(() => {
        loadUsers();
        loadCustomers();
    });
</script>

<section class="p-6">
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-gray-800">User Management</h1>
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

    <UserTable
        {users}
        on:edit={(e) => openEditForm(e.detail)}
        on:delete={handleDelete}
    />

    {#if isOpen && customers.length > 0}
        <div
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <UserForm
                {selectedUser}
                {customers}
                on:submit={(e) => handleFormSubmit(e.detail)}
                on:close={handleCloseForm}
            />
        </div>
    {/if}
</section>
