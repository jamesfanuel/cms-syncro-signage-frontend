<script>
    import { createEventDispatcher } from "svelte";
    import { login } from "../../../usecases/auth";

    export let appName;

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
    class={`bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl px-12 pt-10 pb-12 w-full max-w-lg shadow-2xl transition-all duration-300 space-y-8 ${
        isShaking ? "animate-shake" : ""
    }`}
>
    <label class="block text-base font-light text-white/70">
        Sign In To Your Account
    </label>

    <!-- Email Field with Floating Label -->
    <div class="relative">
        <input
            id="username"
            type="text"
            bind:value={username}
            required
            placeholder=" "
            class="peer w-full bg-transparent border-b border-white/40 py-3 text-white placeholder-transparent focus:outline-none focus:border-blue-400"
        />
        <label
            for="username"
            class="absolute left-0 -top-3.5 text-sm text-white/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-400"
        >
            Your email
        </label>
    </div>

    <!-- Password Field -->
    <div class="relative">
        <input
            id="password"
            type="password"
            bind:value={password}
            required
            placeholder=" "
            class="peer w-full bg-transparent border-b border-white/40 py-3 text-white placeholder-transparent focus:outline-none focus:border-blue-400"
        />
        <label
            for="password"
            class="absolute left-0 -top-3.5 text-sm text-white/50 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/50 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-blue-400"
        >
            Your password
        </label>
    </div>

    {#if errorMessage}
        <p class="text-red-400 text-sm">{errorMessage}</p>
    {/if}

    <button
        type="submit"
        class="w-full bg-[#4AB3F4] hover:bg-[#3094d4] transition duration-300 text-white font-semibold py-3 rounded-xl flex items-center justify-center shadow-lg"
        disabled={isLoading}
    >
        {#if isLoading}
            <span
                class="animate-spin mr-2 border-t-2 border-white border-solid rounded-full w-4 h-4"
            ></span>
            Logging in...
        {:else}
            LOG IN
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
