<script lang="ts">
  import "../app.css";
  import Navbar from "~/components/Navbar.svelte";
  import { theme } from "~/theme.svelte.ts";

  const localStorageThemeKey = "darkMode";

  $effect(() => {
    const themeInStorage = localStorage.getItem(localStorageThemeKey) || "false";
    theme.darkMode = JSON.parse(themeInStorage)!!;
  });

  $effect(() => {
    localStorage.setItem(localStorageThemeKey, JSON.stringify(theme.darkMode));
  });

  let { children } = $props();
</script>

<div class="min-h-screen" data-theme={theme.darkMode ? "dark" : "light"}>
  <Navbar />

  {@render children()}
</div>
