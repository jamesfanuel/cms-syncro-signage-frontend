<script>
  export let onLogout;

  let isDropdownOpen = false;

  function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen;
  }

  function logout() {
    isDropdownOpen = false;
    onLogout();
  }

  function viewProfile() {
    alert("Fitur Profile belum tersedia.");
    isDropdownOpen = false;
  }
</script>

<header class="fixed top-0 left-0 right-0 h-[60px] bg-white shadow flex items-center justify-end px-6 z-10">
  <div class="relative">
    <img
      src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
      alt="Profile"
      class="w-9 h-9 rounded-full cursor-pointer"
      on:click={toggleDropdown}
    />
    {#if isDropdownOpen}
      <div class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded border z-50">
        <button class="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm" on:click={viewProfile}>👤 Profile</button>
        <button class="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-500" on:click={logout}>🚪 Logout</button>
      </div>
    {/if}
  </div>
</header>
