<script lang="ts">
  import { coordsAreEqual } from "$lib/utils";
  import type { SudokuSquareState, Coordinates } from "~/models";

  interface SudokuSquareProps {
    square: SudokuSquareState;
    coords: Coordinates;
    selected: Coordinates | null;
    showMistakes: boolean;
    clickSquare: (coords: Coordinates) => void;
  }

  const { square, coords, selected, showMistakes, clickSquare }: SudokuSquareProps = $props();

  const visiblyWrong = $derived(
    square.current.type === "filled" &&
    square.current.value !== square.expected &&
    showMistakes
  );
  const isSelected = $derived(
    selected && coordsAreEqual(selected, coords)
  );
  const backgroundColor = $derived(
    square.current.type === "pre-filled"
      ? "bg-neutral"
      : visiblyWrong
        ? isSelected
          ? "bg-secondary"
          : "bg-error"
        : isSelected
          ? "bg-base-200"
          : undefined
  );
</script>

<div
  onclick={() => clickSquare(coords)}
  class="
    flex-1 font-bold text-5xl text-center align-middle border-x border-primary
     [&:nth-child(4)]:border-l-2 [&:nth-child(7)]:border-l-2
     [&:nth-child(3)]:border-r-2 [&:nth-child(6)]:border-r-2
     first:border-l-4 last:border-r-4 {backgroundColor}"
>
  {#if square.current.type === "pre-filled"}
    {square.expected}
  {:else if square.current.type === "filled"}
    {square.current.value}
  {/if}
</div>
