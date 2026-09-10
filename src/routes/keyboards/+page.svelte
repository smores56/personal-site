<script lang="ts">
  import { onMount } from "svelte";
  import KeyboardCard from "~/components/keyboards/KeyboardCard.svelte";
  import { CLOG_V2_README_URL, DISCORD_NAME, EMAIL, DISCORD_USER_URL } from "~/constants";
  import { ALL_KEYBOARDS } from "./data";

  import EmailIcon from "~/components/icons/EmailIcon.svelte";
  import discordIconUrl from "/images/discord-icon.svg";
  import smoresBoardsUrl from "/images/smoresboards.png";

  // Render the address only after mount: Cloudflare's email obfuscation
  // rewrites SSR'd emails, which breaks Svelte hydration.
  let mounted = $state(false);
  onMount(() => (mounted = true));

  const gimmeBoardHeroId = "gimme-a-board-hero";

  function scrollToGimmeBoardHero() {
    const heroElement = document.getElementById(gimmeBoardHeroId);
    console.log(heroElement);
    heroElement?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<svelte:head>
  <title>S'mores Boards</title>
</svelte:head>

<div class="hero mb-8">
  <div class="hero-content text-center">
    <div class="max-w-md">
      <img src={smoresBoardsUrl} alt="S'mores Boards Logo" />
      <p class="py-6">
        At first I designed keyboards out of need to manage my flaring
        RSI. But I could have stopped a year ago...
      </p>
      <button class="btn btn-primary" onclick={scrollToGimmeBoardHero}>
        How Can I Get One?
      </button>
    </div>
  </div>
</div>

<div class="grid bg-primary">
  <div class="container mx-auto my-8">
    {#each ALL_KEYBOARDS as keyboard}
      <KeyboardCard keyboard={keyboard} />
    {/each}
  </div>
</div>

<div class="hero my-8" id={gimmeBoardHeroId}>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Gimme A Board</h1>
      <p class="py-6">
        I build boards of all shapes and sizes, even stuff I didn't
        design. If you want me to build you a board, or just need some
        advice on where to start, contact me:
      </p>

      <div class="btn-group">
        <a class="btn btn-primary" href={DISCORD_USER_URL}>
          <span class="mr-2 normal-case">{DISCORD_NAME}</span>
          <img width="16" src={discordIconUrl} alt="Discord Icon" />
        </a>
        <a
          class="btn btn-secondary"
          href={mounted ? `mailto:${EMAIL}` : undefined}
        >
          <span class="mr-2 normal-case">{#if mounted}{EMAIL}{/if}</span>
          <EmailIcon />
        </a>
      </div>

      <p class="py-6">
        However, all of these boards are open source and MIT licensed! You
        can just do it yourself, and I won't mind you doing the hard work
        for me. The
        <a class="text-info" href={CLOG_V2_README_URL}>
          Clog V2 README
        </a>
        has instructions on how you can order a board yourself.
      </p>
    </div>
  </div>
</div>
