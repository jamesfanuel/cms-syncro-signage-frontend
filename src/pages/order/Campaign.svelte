<script>
  import PageLayout from "../../components/layout/PageLayout.svelte";
  import CampaignForm from "../../components/forms/order/CampaignForm.svelte";
  import CampaignTable from "../../components/tables/order/CampaignTable.svelte";
  import Modal from "../../components/ui/Modal.svelte";
  import { onMount } from "svelte";

  import {
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  } from "../../../usecases/order/campaign.js";

  import { fetchClients } from "../../../usecases/master/client.js";

  let campaigns = [];
  let filteredCampaigns = [];
  let searchText = "";
  let isOpen = false;
  let selectedCampaign = null;
  let clients = [];

  async function loadCampaigns() {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      console.warn("customer_id not found in localStorage");
      return;
    }

    campaigns = await fetchCampaigns(Number(customerId));

    if (!searchText) {
      filteredCampaigns = campaigns;
    } else {
      filterCampaigns();
    }
  }

  function filterCampaigns() {
    if (!Array.isArray(campaigns) || campaigns.length === 0) {
      filteredCampaigns = [];
      return;
    }

    const q = searchText.toLowerCase();
    if (!q) {
      filteredCampaigns = campaigns;
      return;
    }

    filteredCampaigns = campaigns.filter(
      (c) =>
        c.client_name?.toLowerCase().includes(q) ||
        c.campaign_name?.toLowerCase().includes(q)
    );
  }

  function handleSearchChange(value) {
    searchText = value;
    filterCampaigns();
  }

  function openAddForm() {
    selectedCampaign = null;
    isOpen = true;
  }

  function openEditForm(campaign) {
    selectedCampaign = campaign;
    isOpen = true;
  }

  async function handleDelete({ detail: { id } }) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this campaign?",
    );
    if (!confirmed) return;

    try {
      await deleteCampaign(id);
      await loadCampaigns();
    } catch (error) {
      console.error("Failed to delete campaign:", error);
      alert("Failed to delete campaign.");
    }
  }

  async function handleFormSubmit(data) {
    if (selectedCampaign) {
      await updateCampaign(selectedCampaign.campaign_id, data);
    } else {
      await createCampaign(data);
    }
    await loadCampaigns();
    isOpen = false;
  }

  async function loadOutlets() {
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      console.warn("customer_id not found in localStorage");
      return;
    }

    clients = await fetchClients(Number(customerId));
  }

  function handleCloseForm() {
    isOpen = false;
  }

  onMount(() => {
    loadCampaigns();
    loadOutlets();
  });
</script>

<PageLayout
  title="Campaign"
  icon="🏢"
  bind:searchText
  onSearchChange={handleSearchChange}
  onAdd={openAddForm}
>
  <div class="px-6">
    <CampaignTable
      campaigns={filteredCampaigns || []}
      on:edit={(e) => openEditForm(e.detail)}
      on:delete={handleDelete}
    />
  </div>

  {#if isOpen}
    <Modal
      title={selectedCampaign ? "Edit Campaign" : "Add Campaign"}
      onClose={handleCloseForm}
    >
      <CampaignForm
        {selectedCampaign}
        {clients}
        on:submit={(e) => handleFormSubmit(e.detail)}
        on:close={handleCloseForm}
      />
    </Modal>
  {/if}
</PageLayout>
