<script>
    import { createEventDispatcher } from "svelte";
    import { login } from "../../../usecases/auth";

    const dispatch = createEventDispatcher();

    let username = "";
    let password = "";
    let errorMessage = "";
    let isShaking = false;
    let isLoading = false;

    async function handleLogin() {
        errorMessage = "";
        isLoading = true;

        try {
            const userInfo = await login(username, password);

            // Dispatch event ke LoginPage.svelte
            dispatch("login", userInfo);
        } catch (err) {
            errorMessage = err.message;
            isShaking = true;
            setTimeout(() => (isShaking = false), 500);
        } finally {
            isLoading = false;
        }
    }
</script>

<form
    on:submit|preventDefault={handleLogin}
    class={`bg-white/80 shadow-2xl backdrop-blur-md rounded-xl px-10 pt-8 pb-10 w-full max-w-md border border-gray-300 transition-all duration-300 ${
        isShaking ? "animate-shake" : ""
    }`}
>
    <h2 class="text-2xl font-bold mb-6 text-center text-[#5E6B75]">
        Login CMS
    </h2>

    <div class="mb-4">
        <label
            for="username"
            class="block text-[#5E6B75] text-sm font-medium mb-1"
        >
            Username
        </label>
        <input
            id="username"
            type="text"
            bind:value={username}
            required
            class="border border-gray-300 rounded-md w-full py-2 px-4 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
    </div>

    <div class="mb-5">
        <label
            for="password"
            class="block text-[#5E6B75] text-sm font-medium mb-1"
        >
            Password
        </label>
        <input
            id="password"
            type="password"
            bind:value={password}
            required
            class="border border-gray-300 rounded-md w-full py-2 px-4 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
    </div>

    {#if errorMessage}
        <p class="text-red-600 text-sm mb-4">{errorMessage}</p>
    {/if}

    <button
        type="submit"
        class="w-full bg-[#5E6B75] hover:bg-[#4d5962] transition duration-300 text-white font-semibold py-2 px-4 rounded-md flex items-center justify-center"
        disabled={isLoading}
    >
        {#if isLoading}
            <span
                class="animate-spin mr-2 border-t-2 border-white border-solid rounded-full w-4 h-4"
            ></span>
            Logging in...
        {:else}
            Login
        {/if}
    </button>
</form>

<style>
    @keyframes shake {
        0%,
        100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-6px);
        }
        50% {
            transform: translateX(6px);
        }
        75% {
            transform: translateX(-3px);
        }
    }

    .animate-shake {
        animation: shake 0.4s ease-in-out;
    }
</style>
