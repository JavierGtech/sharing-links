<script lang="ts">
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";
</script>

  <nav class="flex justify-center my-6">
    <ul class="steps">
      <a href="/login" class="step step-primary"> Conéctate a tu cuenta</a>
      <a
        href="/login/username"
        class="step"
        class:step-primary={$page.route.id?.match(/username|photo/g)}
      >
        Elige un nombre de usuario
      </a>
      <a
        href="/login/photo"
        class="step"
        class:step-primary={$page.route.id?.includes("photo")}
      >
        Elige una foto de perfil
      </a>
    </ul>
  </nav>

  <AnimatedRoute>
    <main class="card w-4/6 card-bordered border-primary shadow-xl mx-auto">
      <div class="card-body items-center text-center">
        <slot />
      </div>
      <!-- <a href="/JaviReigosa/bio" class="btn btn-secondary btn-xs"> Test Bio</a>
    <a href="/JaviReigosa/edit" class="btn btn-secondary btn-xs"> Test Edit</a> -->
      <a href="/" class="btn border-primary btn-xs"> Inicio</a>
    </main>
  </AnimatedRoute>
