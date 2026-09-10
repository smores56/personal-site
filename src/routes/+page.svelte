<script>
  import { onMount } from "svelte";
  import { EMAIL } from "~/constants";

  // Render the address only after mount: Cloudflare's email obfuscation
  // rewrites SSR'd emails, which breaks Svelte hydration.
  let mounted = $state(false);
  onMount(() => (mounted = true));
</script>

<svelte:head>
  <title>Sam Mohr</title>
</svelte:head>

<div
  class="hero fixed top-2/4 left-2/4"
  style="transform: translate(-50%, -50%)"
>
  <div class="hero-content text-center">
    <div class="max-w-md">
      <h1 class="text-5xl font-bold">Hi, I'm Sam Mohr</h1>
      <p class="py-6">
        I'm a software developer that likes doing things
        right the first time. I also
        <a class="text-info" href="/keyboards"> design keyboards</a>,
        sing, and watch too many movies when I'm free.
      </p>

      <div class="join join-vertical">
        <a class="btn btn-info join-item" href="https://linkedin.com/in/samuel-mohr">
          Check out my LinkedIn
        </a>
        <a class="btn btn-success join-item" href="https://github.com/smores56">
          View my GitHub profile
        </a>
        <a
          class="btn btn-warning join-item"
          href={mounted ? `mailto:${EMAIL}` : undefined}
        >
          Email me at {#if mounted}{EMAIL}{/if}
        </a>
        <a class="btn btn-error join-item" href="https://resume.sammohr.dev">
          Download my resume
        </a>
      </div>
    </div>
  </div>
</div>
