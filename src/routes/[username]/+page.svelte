<script lang="ts">
  import UserLink from "$lib/components/UserLink.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<svelte:head>
  <title>@{data.username} Links</title>
  <meta name="description" content={data.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-6">
  <h1 class="text-3xl text-info mb-4">
    @{data.username}
  </h1>

  <img
    src={data.photoURL ?? "/user.png"}
    alt="photoURL"
    width="256"
    class="mx-auto"
  />

  <p class="text-lg italic my-8">{data.bio ?? "no bio yet..."}</p>
  <ul class="list-none">
    {#each data.links as item}
      <li>
        <UserLink {...item} />
      </li>
    {/each}
  </ul>
</main>
<div class="divider"></div>
<div class="flex-row space-x-4 text-center">
  <a href="/" class="btn btn-sm btn-neutral mb-8">Inicio</a>
</div>
