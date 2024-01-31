<script>
    export let icon = 'default';
    export let url = 'foo';
    export let title = 'some cool title';
</script>


<a href={url} class="stack mb-4 w-full max-w-xl bg-base-300 flex p-4 rounded-lg not-prose no-underline">
  <img src={`/${icon}.png`} alt={icon} width="32" height="32" class="w-8" />
  <span class="text-lg text-white font-bold mx-8">{title}</span>
</a>
