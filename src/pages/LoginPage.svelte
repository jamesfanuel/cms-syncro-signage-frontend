<script>
    import LoginForm from "../components/forms/LoginForm.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function handleLogin(event) {
        dispatch("login", event.detail); // teruskan ke App.svelte
    }
</script>

<section
    class="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-100 text-[#5E6B75]"
>
    <!-- Static Gradient Background -->
    <div class="absolute inset-0 z-0 bg-titanium-static" />

    <!-- Login Form -->
    <div
        class="relative z-20 bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
    >
        <LoginForm on:login={handleLogin} />
    </div>
</section>

<style>
    .bg-titanium-static {
        background: linear-gradient(to right, #5e6b75, #e3e7ea, #ffffff);
    }
</style>
