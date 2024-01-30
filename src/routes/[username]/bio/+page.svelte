<script lang="ts">
    import type { PageData } from "./$types";
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import Autentificate from "$lib/components/Autentificate.svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import { user, userData, db } from "$lib/firebase";

    export let data: PageData;
</script>

<AuthCheck>
  <Autentificate>
    <main class="max-w-lg prose text-center mx-auto my-6">
      <h1 class="text-3xl text-info mb-4">
        @{$userData?.username}
      </h1>
      <p class="mt-8 text-lg">Biografía actual: </p>
      <p class="mt-4 mb-8 text-info text-xl">{data.bio}</p>
    
      <p>Código del estado: {$page.status}</p>
      <p class="mb-2 text-error">{$page.form?.problem ?? ""}</p>
    
      <form method="POST" use:enhance>
        <div class="form-control">
          <!-- <textarea
            name="bio"
            class="textarea textarea-bordered textarea-accent"
            value={data.bio}
          /> -->
          <textarea
            name="bio"
            class="textarea textarea-bordered textarea-accent"
            placeholder="Escribe aquí"
          />
        </div>
        <button class="btn btn-primary my-5">Actualiza tu biografía</button>
      </form>
    </main>
  </Autentificate>
</AuthCheck>
