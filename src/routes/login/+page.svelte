<script lang="ts">
  import Autentificate from "$lib/components/Autentificate.svelte";
  import { user, userData } from "$lib/firebase";
</script>

<Autentificate>
  {#if $userData?.username}
  <h2 class="card-title mb-4">Hola, {$userData.username}</h2>
  <p><span class="text-sm text-success">Estás conectado</span></p>
  <a href="/login/username" class="btn mt-4 btn-success btn-outline"
    >Siguiente</a
  >
  <div class="flex-row mt-4 space-x-4">
  <a href="/{$userData?.username}/edit" class="btn btn-info btn-outline"
    >Mis links</a
  >
  <a href="/{$userData?.username}/bio" class="btn btn-info btn-outline"
    >Mi biografía</a
  >
  </div>
  {:else}
  <h2 class="card-title mb-4">Hola, {$user.displayName}</h2>
  <p><span class="text-sm text-success">Estás conectado</span></p>
  <a href="/login/username" class="btn mt-4 btn-success btn-outline"
    >Siguiente</a
  >
  {/if}
</Autentificate>
