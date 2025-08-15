<script>
  export let selectedMenu;
  export let isSidebarOpen = false;
  export let onSelect;
  export let appName;

  let showMaster = false;
  let showOrder = false;
  let showConfig = false;
  let showProduct = false;
  let role = localStorage.getItem("role");

  function select(menu) {
    onSelect(menu);
    isSidebarOpen = false;
  }

  function isActive(menu) {
    return selectedMenu === menu ? "bg-blue-100 font-bold" : "";
  }

  function toggle(section) {
    if (section === "master") showMaster = !showMaster;
    if (section === "order") showOrder = !showOrder;
    if (section === "product") showProduct = !showProduct;
    if (section === "config") showConfig = !showConfig;
  }
</script>

{#if isSidebarOpen}
  <aside
    class="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-400 to-white text-gray-800 shadow-xl p-6 z-30 overflow-y-auto"
  >
    <!-- Close Button -->
    <div class="absolute top-4 right-4">
      <button
        on:click={() => (isSidebarOpen = false)}
        class="relative w-8 h-8"
        aria-label="Tutup Menu"
      >
        <span class="block absolute h-0.5 w-6 bg-gray-800 rotate-45 top-2" />
        <span class="block absolute h-0.5 w-6 bg-gray-800 -rotate-45 top-2" />
      </button>
    </div>

    <!-- Title -->
    <h2 class="text-xl font-bold mb-6">{appName}</h2>

    <!-- Dashboard -->
    <button
      on:click={() => select("dashboard")}
      class={`w-full text-left px-3 py-2 rounded hover:bg-gray-200 font-semibold ${isActive("dashboard")}`}
    >
      🏠 Dashboard
    </button>

    <!-- CUSTOMER SECTION (full access) -->
    {#if role === "customer"}
      <!-- Master -->
      <div class="mt-4">
        <button
          on:click={() => toggle("master")}
          class="w-full flex items-center justify-between px-3 py-2 font-semibold hover:bg-gray-200 rounded"
        >
          <span>📦 Master</span>
          <span>{showMaster ? "▲" : "▼"}</span>
        </button>
        {#if showMaster}
          <ul class="pl-4 mt-2 space-y-1 text-sm">
            <li>
              <button
                on:click={() => select("client")}
                class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("client")}`}
                >🏢 Client</button
              >
            </li>
            <li>
              <button
                on:click={() => toggle("product")}
                class="w-full flex items-center justify-between px-2 py-1 font-medium hover:bg-gray-200 rounded"
              >
                <span>📁 Product</span>
                <span>{showProduct ? "▲" : "▼"}</span>
              </button>
              {#if showProduct}
                <ul class="pl-4 mt-1 space-y-1 text-sm">
                  <li>
                    <button
                      on:click={() => select("product_category")}
                      class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("product_category")}`}
                      >📂 Category</button
                    >
                  </li>
                  <li>
                    <button
                      on:click={() => select("product_item")}
                      class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("product_item")}`}
                      >🧱 Item</button
                    >
                  </li>
                  <li>
                    <button
                      on:click={() => select("product_version")}
                      class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("product_version")}`}
                      >🔢 Version</button
                    >
                  </li>
                </ul>
              {/if}
            </li>
            <li>
              <button
                on:click={() => select("outlet")}
                class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("outlet")}`}
                >🏪 Outlet</button
              >
            </li>
            <li>
              <button
                on:click={() => select("formation")}
                class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("formation")}`}
                >📺 TV Formation</button
              >
            </li>
          </ul>
        {/if}
      </div>

      <!-- Order -->
      <div class="mt-4">
        <button
          on:click={() => toggle("order")}
          class="w-full flex items-center justify-between px-3 py-2 font-semibold hover:bg-gray-200 rounded"
        >
          <span>🧾 Order</span>
          <span>{showOrder ? "▲" : "▼"}</span>
        </button>
        {#if showOrder}
          <ul class="pl-4 mt-2 space-y-1 text-sm">
            <li>
              <button
                on:click={() => select("campaign")}
                class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("campaign")}`}
                >📢 Campaign</button
              >
            </li>
            <li>
              <button
                on:click={() => select("orders")}
                class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("orders")}`}
                >📋 Order</button
              >
            </li>
            <li>
              <button
                on:click={() => select("playlist")}
                class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("playlist")}`}
                >🎵 Playlist</button
              >
            </li>
          </ul>
        {/if}
      </div>
    {/if}

    <!-- CONFIG SECTION (admin only) -->
    {#if role === "admin"}
      <div class="mt-4">
        <button
          on:click={() => toggle("config")}
          class="w-full flex items-center justify-between px-3 py-2 font-semibold hover:bg-gray-200 rounded"
        >
          <span>⚙️ Config</span>
          <span>{showConfig ? "▲" : "▼"}</span>
        </button>
        {#if showConfig}
          <ul class="pl-4 mt-2 space-y-1 text-sm">
            <li>
              <button
                on:click={() => select("customer")}
                class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("customer")}`}
                >👥 Customer</button
              >
            </li>
            <li>
              <button
                on:click={() => select("users")}
                class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("users")}`}
                >👤 Users</button
              >
            </li>
            <li>
              <button
                on:click={() => select("license")}
                class={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${isActive("license")}`}
                >👤 License</button
              >
            </li>
          </ul>
        {/if}
      </div>
    {/if}
  </aside>
{/if}
