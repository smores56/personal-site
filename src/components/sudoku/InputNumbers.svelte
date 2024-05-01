<script lang="ts">
  import EraseIcon from "~/components/icons/EraseIcon.svelte";

  interface InputSquareProps {
    num?: number;
    onclick: () => void;
  }

  let { clickNumber, clearSquare }: { clickNumber: (num: number) => void, clearSquare: () => void } = $props();

  const oneToNine = Array.from({ length: 9 }, (_, index) => index + 1);
</script>

{#snippet inputSquare({ onclick, num }: InputSquareProps)}
  <div
    {onclick}
    class="flex-1 font-bold text-center align-middle border-2 border-t-4 border-b-4
         first:border-l-4 last:border-r-4 text-5xl border-primary"
  >
    <b>
      {#if num !== undefined}
        {num}
      {:else}
        <EraseIcon />
      {/if}
    </b>
  </div>
{/snippet}

<div class="sudoku-board">
  <div class="flex flex-row place-content-around">
    {#each oneToNine as num}
      {@render inputSquare({ onclick: () => clickNumber(num), num })}
    {/each}
    {@render inputSquare({ onclick: clearSquare })}
  </div>
</div>
