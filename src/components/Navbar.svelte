<script lang="ts">
  import { navigating } from "$app/stores";

  import BurgerIcon from "~/components/icons/BurgerIcon.svelte";
  import ThemeToggle from "~/components/ThemeToggle.svelte";

  let menuOpen = $state(false);

  const links: [string, string][] = [
    ["Keyboards", "/keyboards"],
    ["Blog", "/blog"],
    ["Sudoku", "/sudoku"]
  ];

  $effect(() => {
    // Close burger on navigation
    if (navigating) {
      menuOpen = false;
    }
  });
</script>

<div class="navbar">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost normal-case text-xl">
      Sam Mohr
    </a>
  </div>
  <div class="flex-none">
    <div
      class="dropdown dropdown-end bg-base-100 md:hidden"
      class:dropdown-open={menuOpen}
    >
      <label
        class="btn btn-ghost m-1"
        onclick={() => menuOpen = !menuOpen}
        onfocusout={() => menuOpen = false}
      >
        <BurgerIcon />
      </label>
      <ul
        onfocusout={() => menuOpen = false}
        onmouseleave={() => menuOpen = false}
        class="dropdown-content bg-base-100 menu p-2 shadow rounded-box w-52"
      >
        {#each links as [name, path]}
          <li><a href="{path}">{name}</a></li>
        {/each}
      </ul>
    </div>

    <ul class="menu menu-horizontal px-1 max-md:hidden">
      <li>
        <ThemeToggle />
      </li>

      {#each links as [name, path]}
        <li><a href="{path}">{name}</a></li>
      {/each}
    </ul>
  </div>
</div>
