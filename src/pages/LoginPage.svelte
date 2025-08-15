<script>
    import LoginForm from "../components/forms/LoginForm.svelte";
    import { createEventDispatcher } from "svelte";

    export let appName;
    const dispatch = createEventDispatcher();

    function handleLogin(event) {
        dispatch("login", event.detail);
    }
</script>

<!-- Import font modern -->
<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
    />
</svelte:head>

<section
    class="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#1C1C1E] font-inter text-white"
>
    <!-- Background Titanium Blur -->
    <div class="absolute inset-0 z-0">
        <div
            class="absolute w-96 h-96 bg-[#5E6B75]/50 blur-[150px] top-10 left-10 rounded-full"
        ></div>
        <div
            class="absolute w-96 h-96 bg-[#6E757C]/50 blur-[150px] top-40 right-20 rounded-full"
        ></div>
        <div
            class="absolute w-96 h-96 bg-[#4A4F54]/50 blur-[150px] bottom-20 left-1/2 -translate-x-1/2 rounded-full"
        ></div>
        <div
            class="absolute w-96 h-96 bg-[#2C2C2E]/50 blur-[150px] bottom-10 right-10 rounded-full"
        ></div>
    </div>

    <!-- Login Glass Card -->
    <div
        class="relative z-20 bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20"
    >
        <!-- Logo -->
        <div class="flex flex-col items-center mb-8">
            <div
                class="w-20 h-20 rounded-full bg-gradient-to-br from-[#5E6B75] to-[#8A939A] flex items-center justify-center text-4xl font-semibold shadow-lg text-white tracking-wide"
            >
                D
            </div>
            <h2 class="mt-6 text-lg font-medium tracking-wider">
                {appName}
            </h2>
        </div>

        <!-- Login Form -->
        <LoginForm on:login={handleLogin} />
    </div>
</section>

<style>
    :global(body) {
        font-family:
            "Inter",
            "SF Pro Display",
            -apple-system,
            BlinkMacSystemFont,
            sans-serif;
    }
    input {
        background: transparent;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        padding: 0.5rem 0;
        width: 100%;
        color: white;
        outline: none;
        font-weight: 400;
        letter-spacing: 0.3px;
    }
    input::placeholder {
        color: rgba(255, 255, 255, 0.5);
        font-weight: 300;
        letter-spacing: 0.3px;
    }
</style>
