<script lang="ts">
  import Hero from "~/components/Hero.svelte";
  import SudokuGame from "~/components/sudoku/SudokuGame.svelte";

  let confirm = $state(false);
</script>

<svelte:head>
  <title>S'moresdoku</title>
</svelte:head>

<Hero title="Sudoku">
  <p class="pt-6">
    I think that Sudoku needs no explanation. It was fun to implement this
    all by myself, and writing it in TypeScript made my life pretty easy.
    There are 100 random puzzles of varying difficulty, so just hit the
    button and have at it!
  </p>

  {#if !confirm}
    <button class="btn btn-primary mt-4" onclick={() => confirm = true}>
      Let's go!
    </button>
  {/if}
</Hero>

{#if confirm}
  <SudokuGame />
{/if}
