<script>
    import LoginForm from "../components/forms/LoginForm.svelte";
    import { createEventDispatcher } from "svelte";
    import mainLogo from "../images/main-logo.png"; // logo utama

    export let appName;
    const dispatch = createEventDispatcher();

    function handleLogin(event) {
        dispatch("login", event.detail);
    }
</script>

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
            class="absolute w-[450px] h-[450px] bg-[#5E6B75]/40 blur-[160px] top-10 left-10 rounded-full"
        ></div>
        <div
            class="absolute w-[400px] h-[400px] bg-[#6E757C]/40 blur-[160px] top-40 right-20 rounded-full"
        ></div>
        <div
            class="absolute w-[500px] h-[500px] bg-[#4A4F54]/40 blur-[180px] bottom-20 left-1/2 -translate-x-1/2 rounded-full"
        ></div>
        <div
            class="absolute w-[350px] h-[350px] bg-[#2C2C2E]/40 blur-[150px] bottom-10 right-10 rounded-full"
        ></div>
    </div>

    <!-- Login Glass Card -->
    <div
        class="relative z-20 bg-white/10 backdrop-blur-2xl p-12 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] w-full max-w-lg border border-white/20 animate-fadeIn"
    >
        <!-- Logo -->
        <div class="flex flex-col items-center mb-12">
            <img
                src={mainLogo}
                alt="Main Logo"
                class="w-40 h-40 object-contain drop-shadow-2xl animate-scaleIn"
            />
            <h2 class="mt-8 text-2xl font-semibold tracking-wider">
                {appName}
            </h2>
        </div>

        <!-- Login Form -->
        <LoginForm on:login={handleLogin} />

        <!-- Footer -->
        <div class="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()}
            {appName}. All rights reserved.
        </div>
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

    /* Input style */
    input {
        background: transparent;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        padding: 0.75rem 0;
        width: 100%;
        color: white;
        outline: none;
        font-weight: 400;
        letter-spacing: 0.3px;
        transition: border-color 0.3s;
    }
    input:focus {
        border-color: #8a939a;
    }
    input::placeholder {
        color: rgba(255, 255, 255, 0.5);
        font-weight: 300;
        letter-spacing: 0.3px;
    }

    /* Animasi modern */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    .animate-fadeIn {
        animation: fadeIn 0.8s ease-out forwards;
    }
    .animate-scaleIn {
        animation: scaleIn 0.6s ease-out forwards;
    }
</style>
