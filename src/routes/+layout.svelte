<script lang="ts">
    import "../app.css";
    import { user, userData } from "$lib/firebase";
    $user;
    $userData;
</script>
<svelte:head>
  <title>Conoce tus links</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-gradient-to-t from-gray-800 to-black">
    <slot />
</div>