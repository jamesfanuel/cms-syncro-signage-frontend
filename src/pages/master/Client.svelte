<script>
  import PageLayout from "../../components/layout/PageLayout.svelte";
  import ClientForm from "../../components/forms/master/ClientForm.svelte";
  import ClientTable from "../../components/tables/master/ClientTable.svelte";
  import Modal from "../../components/ui/Modal.svelte";
  import { onMount } from "svelte";

  import {
    fetchClients,
    createClient,
    updateClient,
    deleteClient,
  } from "../../../usecases/master/client.js";

  let clients = [];
  let filteredClients = [];
  let searchText = "";
  let isOpen = false;
  let selectedClient = null;

  async function loadClients() {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      console.warn("customer_id not found in localStorage");
      return;
    }

    clients = await fetchClients(Number(customerId));

    if (!searchText) {
      filteredClients = clients;
    } else {
      filterClients();
    }
  }

  function filterClients() {
    if (!Array.isArray(clients) || clients.length === 0) {
      filteredClients = [];
      return;
    }

    const q = searchText.toLowerCase();
    if (!q) {
      filteredClients = clients;
      return;
    }

    filteredClients = clients.filter(
      (c) =>
        c.client_code?.toLowerCase().includes(q) ||
        c.client_name?.toLowerCase().includes(q),
    );
  }

  function handleSearchChange(value) {
    searchText = value;
    filterClients();
  }

  function openAddForm() {
    selectedClient = null;
    isOpen = true;
  }

  function openEditForm(client) {
    selectedClient = client;
    isOpen = true;
  }

  async function handleDelete({ detail: { id } }) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this client?",
    );
    if (!confirmed) return;

    try {
      await deleteClient(id);
      await loadClients();
    } catch (error) {
      console.error("Failed to delete client:", error);
      alert("Failed to delete client.");
    }
  }

  async function handleFormSubmit(data) {
    if (selectedClient) {
      await updateClient(selectedClient.client_id, data);
    } else {
      await createClient(data);
    }
    await loadClients();
    isOpen = false;
  }

  function handleCloseForm() {
    isOpen = false;
  }

  onMount(() => {
    loadClients();
  });
</script>

<PageLayout
  title="Client"
  icon="🏢"
  bind:searchText
  onSearchChange={handleSearchChange}
  onAdd={openAddForm}
>
  <div class="px-6">
    <ClientTable
      clients={filteredClients || []}
      on:edit={(e) => openEditForm(e.detail)}
      on:delete={handleDelete}
    />
  </div>

  {#if isOpen}
    <Modal
      title={selectedClient ? "Edit Client" : "Add Client"}
      onClose={handleCloseForm}
    >
      <ClientForm
        {selectedClient}
        on:submit={(e) => handleFormSubmit(e.detail)}
        on:close={handleCloseForm}
      />
    </Modal>
  {/if}
</PageLayout>
