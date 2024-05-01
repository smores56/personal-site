<script lang="ts">
  import { zipBoardWithCoords } from "$lib/utils";
  import type { Coordinates, SudokuSquareState } from "~/models";
  import SudokuSquare from "~/components/sudoku/SudokuSquare.svelte";

  interface SudokuBoardProps {
    squares: SudokuSquareState[];
    selected: Coordinates | null;
    showMistakes: boolean;
    clickSquare: (coords: Coordinates) => void;
  }

  let { squares, selected, showMistakes, clickSquare }: SudokuBoardProps = $props();

  const oneToNine = Array.from({ length: 9 }, (_, index) => index);
  const coordSquarePairs = $derived(zipBoardWithCoords(squares));
  const rows = $derived(oneToNine.map((rowIndex) =>
    coordSquarePairs.slice(rowIndex * 9, rowIndex * 9 + 9)
  ));
</script>

<div class="w-full items-center border-collapse align-middle relative">
  {#each rows as row}
    <div
      class="flex flex-row justify-around border-t border-b
             first:border-t-4 last:border-b-4 border-primary
             [&:nth-child(4)]:border-t-2 [&:nth-child(7)]:border-t-2
             [&:nth-child(3)]:border-b-2 [&:nth-child(6)]:border-b-2"
    >
      {#each row as sq}
        <SudokuSquare
          square={sq.square}
          coords={sq.coords}
          {selected}
          {showMistakes}
          {clickSquare}
        />
      {/each}
    </div>
  {/each}
</div>
