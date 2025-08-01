<script>
  export let isOpen = false;
  export let onToggle;
</script>

<style>
  .bar {
    @apply w-6 h-0.5 bg-gray-800 my-1 transition-all duration-300;
  }
</style>

<div
  class="z-30 fixed top-4 left-4 transition-all duration-300"
  style="transform: translateX({isOpen ? '260px' : '0'})"
>
  <button on:click={onToggle} class="flex flex-col justify-center items-center w-10 h-10">
    <div class="bar" style="transform: {isOpen ? 'rotate(45deg) translateY(6px)' : 'none'}"></div>
    <div class="bar" style="opacity: {isOpen ? 0 : 1}"></div>
    <div class="bar" style="transform: {isOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'}"></div>
  </button>
</div>
