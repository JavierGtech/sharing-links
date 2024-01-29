<script lang="ts">
  import { auth, user, userData } from "$lib/firebase";
  import { goto } from "$app/navigation";

  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);

    const idToken = await credential.user.getIdToken();

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'CSRF-Token': csrfToken  // HANDLED by sveltekit automatically
      },
      body: JSON.stringify({ idToken }),
    });
  }

  async function signOutSSR() {
    const res = await fetch("/api/signin", { method: "DELETE" });
    await signOut(auth);
  }
</script>

{#if $user}
  <slot />
  <div class = "divider"> </div>
  <div class="flex-row space-x-4 text-center">
    <a href="/{$userData?.username}" class="btn btn-sm btn-primary">Ir a mi perfil</a>
    <button class="btn btn-sm" on:click={() => signOutSSR()}>Cierra sesión</button>
  </div>
{:else}
  <button class="btn btn-primary" on:click={signInWithGoogle}
    >Conéctate con Google</button
  >
{/if}
