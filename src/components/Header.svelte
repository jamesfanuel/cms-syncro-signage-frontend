<script>
  import { onMount } from "svelte";
  export let onLogout;

  let isDropdownOpen = false;
  let levelLabel = "";
  let showLevel = false;
  let levelClass = "";

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

  onMount(() => {
    const isAdmin = parseInt(localStorage.getItem("is_admin") || "0", 10);
    if (isAdmin === 0) {
      // hanya tampil jika BUKAN admin
      showLevel = true;
      const level = parseInt(localStorage.getItem("level") || "0", 10);
      if (level === 1) {
        levelLabel = "BASIC";
        levelClass = "bg-blue-500/30 text-blue-700";
      } else if (level === 2) {
        levelLabel = "PLUS";
        levelClass = "bg-[#394C38]/30 text-[#394C38]";
      } else if (level === 3) {
        levelLabel = "PRO";
        levelClass = "bg-[#5E6B75]/30 text-[#5E6B75]";
      } else {
        levelLabel = "UNKNOWN";
        levelClass = "bg-gray-500/30 text-gray-700";
      }
    }
  });
</script>

<header
  class="fixed top-0 left-0 right-0 h-[60px] bg-white shadow flex items-center justify-end px-6 z-10"
>
  <div class="flex items-center gap-3">
    {#if showLevel}
      <span
        class={`px-3 py-1 text-sm font-semibold rounded-full backdrop-blur-md ${levelClass}`}
      >
        {levelLabel}
      </span>
    {/if}
    <div class="relative">
      <img
        src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
        alt="Profile"
        class="w-9 h-9 rounded-full cursor-pointer"
        on:click={toggleDropdown}
      />
      {#if isDropdownOpen}
        <div
          class="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded border z-50"
        >
          <button
            class="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
            on:click={viewProfile}>👤 Profile</button
          >
          <button
            class="block w-full px-4 py-2 text-left hover:bg-gray-100 text-sm text-red-500"
            on:click={logout}>🚪 Logout</button
          >
        </div>
      {/if}
    </div>
  </div>
</header>
