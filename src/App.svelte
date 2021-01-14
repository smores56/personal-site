<script lang="ts">
  import { derived } from "svelte/store";
  import { route } from "./route";
  import Resume from "./pages/resume/Resume.svelte";
  import Sudoku from "./pages/sudoku/Sudoku.svelte";
  import Reviews from "./pages/reviews/Reviews.svelte";
  import Recipes from "./pages/recipes/Recipes.svelte";
  import Header from "./components/Header.svelte";

  const resumeTab = derived(route, ($route) =>
    $route.page === "resume" ? $route.tab : "work"
  );
</script>

<main>
  <Header />
  {#if $route.page === 'resume'}
    <Resume tab={$resumeTab} />
  {:else if $route.page === 'sudoku'}
    <Sudoku />
  {:else if $route.page === 'reviews'}
    <Reviews />
  {:else}
    <Recipes />
  {/if}
</main>
