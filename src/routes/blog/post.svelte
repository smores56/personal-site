<script lang="ts">
  import Hero from "~/components/Hero.svelte";
  import type { Snippet } from "svelte";
  import { formatDate } from "~/utils";
  import { theme } from "~/theme.svelte.ts";

  interface Props {
    title: string;
    subtitle?: string;
    date: string;
    children: Snippet;
  }

  let { title, subtitle, date, children } = $props<Props>();
</script>

<style>
  pre {
    overflow-x: auto;
  }
</style>

<svelte:head>
  <title>{title} - Sam Mohr</title>

  {#if theme.darkMode}
  	<link rel="stylesheet" href="/css/prism-rose-pine-moon.css" />
  {:else}
    <link rel="stylesheet" href="/css/prism-rose-pine-dawn.css" />
  {/if}
</svelte:head>

<div class="hero pb-24">
  <div class="hero-content">
    <div class="max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl">
      <div class="text-center">
        <h1 class="text-5xl font-bold">{title}</h1>
        {#if subtitle}
          <h2 class="text-3xl pt-2 font-italic">{subtitle}</h2>
        {/if}
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
