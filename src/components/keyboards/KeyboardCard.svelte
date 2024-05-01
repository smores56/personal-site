<script lang="ts">
  import type { Keyboard } from "~/models";
  import GitHubIcon from "~/components/icons/GitHubIcon.svelte";

  const { keyboard }: { keyboard: Keyboard } = $props();
</script>

<div class="card lg:card-side bg-neutral shadow-xl m-4">
  <figure class="lg:basis-2/3">
    <img src={keyboard.imageUrl} alt={keyboard.name} />
  </figure>
  <div class="card-body lg:basis-1/3">
    <h1 class="card-title">{keyboard.name}</h1>

    <p class="mb-2">
      {keyboard.description}
    </p>

    <div class="card-actions justify-end">
      <a
        href={keyboard.link}
        class="btn btn-primary"
      >
        <span class="mr-2">On GitHub</span>
        <GitHubIcon />
      </a>
    </div>
  </div>
</div>
