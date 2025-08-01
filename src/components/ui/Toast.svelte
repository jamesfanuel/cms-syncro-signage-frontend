<script>
    import { toast } from "../stores/toast";
    $: currentToast = $toast;
</script>

{#if $toast.show}
    <div
        class={`fixed bottom-4 right-4 px-4 py-2 text-white rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
            $toast.type === "success"
                ? "bg-green-500"
                : $toast.type === "error"
                  ? "bg-red-500"
                  : "bg-blue-500"
        }`}
    >
        {$toast.message}
    </div>
{/if}
