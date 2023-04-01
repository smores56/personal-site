<script lang="ts">
  import type { SudokuSquare, Coordinates } from "./models";
  import { coordsAreEqual } from "./utils";

  export let square: SudokuSquare;
  export let coords: Coordinates;
  export let selected: Coordinates | null;
  export let showMistakes: boolean;
  export let clickSquare: (coords: Coordinates) => void;

  $: visiblyWrong =
    square.current.type === "filled" &&
    square.current.value !== square.expected &&
    showMistakes;
  $: isSelected = selected && coordsAreEqual(selected, coords);
  $: backgroundColor =
    square.current.type === "pre-filled"
      ? "#ebebeb"
      : visiblyWrong
      ? isSelected
        ? "#d98282"
        : "#e8aeae"
      : isSelected
      ? "#adadad"
      : "#ffffff";
</script>

<style>
  .sudoku-square {
    font-weight: bold;
    font-size: 6.66vw;
    text-align: center;
    vertical-align: middle;
    flex: 1 0 0px;
    height: 0px;
    width: calc(100% / 9);
    padding-bottom: calc(100% / 9);
    font-family: sans-serif;
    border-left: 1px solid black;
    border-right: 1px solid black;
  }

  @media (min-width: 768px) {
    .sudoku-square {
      font-size: 37px;
    }
  }

  .sudoku-note {
    font-size: 0.45em;
  }

  .sudoku-square:nth-child(4),
  .sudoku-square:nth-child(7) {
    border-left: 2px solid black;
  }

  .sudoku-square:nth-child(3),
  .sudoku-square:nth-child(6) {
    border-right: 2px solid black;
  }

  .sudoku-square:nth-child(1) {
    border-left: 4px solid black;
  }

  .sudoku-square:nth-child(9) {
    border-right: 4px solid black;
  }
</style>

<div
  class="sudoku-square"
  style={`background-color: ${backgroundColor};`}
  on:click={() => clickSquare(coords)}>
  {#if square.current.type === 'pre-filled'}
    {square.expected}
  {:else}{square.current.type === 'filled' ? square.current.value : ''}{/if}
  <div class="sudoku-note">{square.notes.join(' ')}</div>
</div>
