<script>
  import { auth } from "./stores/auth";

  import Sidebar from "./components/Sidebar.svelte";
  import Header from "./components/Header.svelte";
  import { logout } from "./../usecases/auth";

  import Dashboard from "./pages/Dashboard.svelte";
  import Client from "./pages/master/Client.svelte";
  import ProductCategory from "./pages/master/product/ProductCategory.svelte";
  import ProductItem from "./pages/master/product/ProductItem.svelte";
  import ProductVersion from "./pages/master/product/ProductVersion.svelte";
  import TVFormation from "./pages/master/Formation.svelte";
  import OutletTV from "./pages/master/Outlet.svelte";
  import Campaign from "./pages/order/Campaign.svelte";
  import Order from "./pages/order/Order.svelte";
  import Playlist from "./pages/order/Playlist.svelte";
  import LoginPage from "./pages/LoginPage.svelte";
  import VideoUploader from "./pages/VideoUploader.svelte";
  import Customer from "./pages/configuration/Customer.svelte";
  import User from "./pages/configuration/User.svelte";

  let selectedMenu = "dashboard";
  let isSidebarOpen = false;

  function handleSelect(menu) {
    selectedMenu = menu;
    isSidebarOpen = false;
  }

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  function handleLogout() {
    logout();
    location.reload(); // atau redirect ke halaman login
  }
</script>

{#if !$auth.isLoggedIn}
  <LoginPage />
{:else}
  {#if !isSidebarOpen}
    <div class="fixed top-4 left-4 z-40">
      <button
        on:click={toggleSidebar}
        class="relative w-10 h-10 focus:outline-none"
        aria-label="Buka Menu"
      >
        <span
          class="block absolute top-[8px] left-[7px] h-0.5 w-6 bg-gray-800"
        />
        <span
          class="block absolute top-[16px] left-[7px] h-0.5 w-6 bg-gray-800"
        />
        <span
          class="block absolute top-[24px] left-[7px] h-0.5 w-6 bg-gray-800"
        />
      </button>
    </div>
  {/if}

  <Sidebar {selectedMenu} bind:isSidebarOpen onSelect={handleSelect} />
  <Header onLogout={handleLogout} />

  <main
    class={`min-h-screen transition-all duration-300 pt-20 px-6 ${isSidebarOpen ? "ml-64" : "ml-0"}`}
  >
    {#if selectedMenu === "dashboard"}
      <Dashboard />
    {:else if selectedMenu === "client" && $auth.userRole !== "admin"}
      <Client />
    {:else if selectedMenu === "product_category" && $auth.userRole !== "admin"}
      <ProductCategory />
    {:else if selectedMenu === "product_item" && $auth.userRole !== "admin"}
      <ProductItem />
    {:else if selectedMenu === "product_version" && $auth.userRole !== "admin"}
      <ProductVersion />
    {:else if selectedMenu === "formation" && $auth.userRole !== "admin"}
      <TVFormation />
    {:else if selectedMenu === "outlet" && $auth.userRole !== "admin"}
      <OutletTV />
    {:else if selectedMenu === "campaign" && $auth.userRole !== "admin"}
      <Campaign />
    {:else if selectedMenu === "orders" && $auth.userRole !== "admin"}
      <Order />
    {:else if selectedMenu === "playlist" && $auth.userRole !== "admin"}
      <Playlist />
    {:else if selectedMenu === "upload" && $auth.userRole !== "admin"}
      <VideoUploader />
    {:else if selectedMenu === "customer"}
      <Customer />
    {:else if selectedMenu === "users"}
      <User />
    {:else}
      <p class="text-center text-gray-600">
        Akses ditolak atau menu tidak ditemukan
      </p>
    {/if}
  </main>
{/if}
