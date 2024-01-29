<script lang="ts">
    import Autentificate from "$lib/components/Autentificate.svelte";
    import { user, userData } from "$lib/firebase";

</script>

<!-- This is the main layout wrapper using Tailwind CSS classes -->
<div class="flex flex-col justify-center items-center min-h-screen">
    <!-- Welcome message -->
    <h1 class="text-4xl font-bold mb-2">¡Hola!</h1>
    <!-- Container for the content, centered both vertically and horizontally -->
    <div class="text-center p-4 space-x-4">
        <!-- Short description -->
        <p class="mb-4">
            Hazte una cuenta <a
                href="/login"
                class="text-blue-600 hover:text-blue-800 visited:text-purple-600"
                >como esta</a
            > y comparte los links de tus redes sociales
        </p>
        {#if $user}
        <a href="/{$userData?.username}" class="btn btn-primary">Mi perfil</a>
        <a href="/login" class="btn btn-primary">Configurar mi cuenta</a>
        {:else}
            <a href="/login" class="btn btn-primary">Vamos</a>
        {/if}

        <!-- Buttons with DaisyUI classes -->
        <div class="space-x-4 mt-8">
            <!-- Short description -->
            <p class="mb-4 text-xs">
                Si encuentras algún problema, ¡dímelo!
                javigonzalezreigosa@gmail.com
            </p>
        </div>
        <a href="https://kit.svelte.dev" class="btn btn-neutral btn-xs">
            Docs SvelteKit</a
        >
        <a href="https://fireship.io/" class="btn btn-neutral btn-xs">
            Fireship Website</a
        >
    </div>
</div>
