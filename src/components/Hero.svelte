<script lang="ts">
  import type { Snippet } from "svelte";

  const { title, children }: { title: string, children: Snippet } = $props();
</script>

<div class="hero">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">{title}</h1>
      {@render children()}
    </div>
  </div>
</div>
