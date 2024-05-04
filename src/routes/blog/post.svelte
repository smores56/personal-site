<script lang="ts">
  import Hero from "~/components/Hero.svelte";
  import type { Snippet } from "svelte";
  import { formatDate } from "~/utils";
  import { theme } from "~/theme.svelte.ts";

  let { title, date, children }: { title: string, date: string, children: Snippet } = $props();
</script>

<svelte:head>
  {#if theme.darkMode}
  	<link rel="stylesheet" href="/css/prism-rose-pine-moon.css" />
  {:else}
    <link rel="stylesheet" href="/css/prism-rose-pine-dawn.css" />
  {/if}
</svelte:head>

<div class="hero pb-24">
  <div class="hero-content">
    <div class="max-w-2xl">
      <div class="text-center">
        <h1 class="text-5xl font-bold">{title}</h1>
        <p class="pt-2 pb-12">
          Written on: <i>{formatDate(date)}</i>
        </p>
      </div>

      <div class="prose">
        {@render children()}
      </div>
    </div>
  </div>
</div>
