<script lang="ts">
  import type { Coordinates, SudokuSquare } from "$lib/models";
  import { zipBoardWithCoords } from "./utils";
  import Square from "./Square.svelte";

  export let squares: SudokuSquare[];
  export let selected: Coordinates | null;
  export let showMistakes: boolean;
  export let clickSquare: (coords: Coordinates) => void;

  const oneToNine = Array.from({ length: 9 }, (_, index) => index);
  $: coordSquarePairs = zipBoardWithCoords(squares);
  $: rows = oneToNine.map((rowIndex) =>
    coordSquarePairs.slice(rowIndex * 9, rowIndex * 9 + 9)
  );
</script>

<style>
  .sudoku-board {
    border-collapse: collapse;
    vertical-align: middle;
    width: 100%;
    position: relative;
    align-items: center;
    margin: 0 auto;
  }

  .sudoku-row {
    padding: 0;
    margin: 0;
    list-style: none;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-flow: row;
    -webkit-flex-flow: row;
    justify-content: space-around;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }

  .sudoku-row:nth-child(4),
  .sudoku-row:nth-child(7) {
    border-top: 2px solid black;
  }

  .sudoku-row:nth-child(3),
  .sudoku-row:nth-child(6) {
    border-bottom: 2px solid black;
  }

  .sudoku-row:nth-child(1) {
    border-top: 4px solid black;
  }

  .sudoku-row:nth-child(9) {
    border-bottom: 4px solid black;
  }
</style>

<div class="sudoku-board">
  {#each rows as row}
    <div class="sudoku-row">
      {#each row as sq}
        <Square
          square={sq.square}
          coords={sq.coords}
          {selected}
          {showMistakes}
          {clickSquare} />
      {/each}
    </div>
  {/each}
</div>
