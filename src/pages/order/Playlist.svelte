<script>
    import PageLayout from "../../components/layout/PageLayout.svelte";
    import PlaylistTable from "../../components/tables/order/PlaylistTable.svelte";
    import { onMount } from "svelte";

    import {
        fetchPlaylists,
        createPlaylist,
    } from "../../../usecases/order/playlist.js";

    import { fetchOutlets } from "../../../usecases/master/outlet.js";

    let playlists = [];
    let outlets = [];
    let selectedOutletId = "";
    let isLoading = false;

    async function generatePlaylists(outlet_id) {
        const customerId = localStorage.getItem("customer_id");
        if (!customerId) {
            console.warn("customer_id not found in localStorage");
            return;
        }

        isLoading = true;

        let formData = {
            customer_id: customerId,
            outlet_id: outlet_id,
        };

        try {
            await createPlaylist(formData);
            console.log("Playlist generated.");
            await loadPlaylists();
        } catch (e) {
            console.error("Failed to generate playlist:", e);
        } finally {
            isLoading = false;
        }
    }

    function handleGenerate() {
        if (!selectedOutletId) {
            alert("Please select an outlet first.");
            return;
        }
        generatePlaylists(selectedOutletId);
    }

    $: if (selectedOutletId) {
        loadPlaylists();
    } else {
        playlists = []; // kosongkan jika belum pilih outlet
    }

    async function loadPlaylists() {
        const customerId = localStorage.getItem("customer_id");
        if (!customerId || !selectedOutletId) return;

        playlists = await fetchPlaylists(Number(customerId), selectedOutletId);
    }

    async function loadOutlets() {
        const customerId = localStorage.getItem("customer_id");
        if (!customerId) {
            console.warn("customer_id not found in localStorage");
            return;
        }

        outlets = await fetchOutlets(Number(customerId));
    }

    onMount(() => {
        loadPlaylists();
        loadOutlets();
    });
</script>

<PageLayout
    title="Playlist"
    icon="fas fa-playlist"
    page="playlist"
    {outlets}
    selectedOutlet={selectedOutletId}
    onOutletChange={(val) => (selectedOutletId = val)}
    onGeneratePlaylist={handleGenerate}
    {isLoading}
>
    <div class="px-6">
        <PlaylistTable {playlists} />
    </div>
</PageLayout>
