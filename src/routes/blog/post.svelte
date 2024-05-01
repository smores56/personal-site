<script lang="ts">
  import type { Snippet } from "svelte";

  let { title, date, children }: { title: string, date: string, children: Snippet } = $props();
</script>

<article>
  <h1>{title}</h1>

  <p>Published: {date}</p>

  {@render children()}
</article>
