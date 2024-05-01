<script lang="ts">
  import { randomPuzzle } from "$lib/starters";
  import { mapSquareAtCoords, coordsAreEqual, emptyBoard } from "$lib/utils";
  import type {
    SudokuSquareState,
    Coordinates,
    Timing,
  } from "~/models";
  import SudokuControls from "~/components/sudoku/SudokuControls.svelte";
  import InputNumbers from "~/components/sudoku/InputNumbers.svelte";
  import SudokuBoard from "~/components/sudoku/SudokuBoard.svelte";

  let squares = $state<SudokuSquareState[] | null>(randomPuzzle());
  let selected = $state<Coordinates | null>(null);
  let showMistakes = $state(false);
  let timing = $state<Timing>({ started: new Date(), finished: null });
  let now = $state(new Date());

  $effect(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 1000);

    return () => clearInterval(interval);
  });

  const elapsedTime = $derived.by(() => {
    const t = timing;
    if (!t.started) return "0:00";

    const ending = t.finished || now;
    const seconds = Math.floor(
      (ending.getTime() - t.started.getTime()) / 1000
    );
    return `${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  });

  function handleKeydown(event: KeyboardEvent) {
    const num = parseInt(event.key);
    if (num && num >= 1 && num <= 9) {
      inputNumber(num);
    } else if (event.key === "r") {
      selected = null;
    } else if (event.key === "c") {
      clearSquare();
    } else if (event.key === "m") {
      showMistakes = !showMistakes;
    }
  }

  $effect(() => {
    document.addEventListener("keydown", handleKeydown);

    return () => document.removeEventListener("keydown", handleKeydown);
  });

  const gameIsBeat = $derived.by(() => {
    if (!squares) return false;

    return squares.every(sq => {
      return sq.current.type === "pre-filled" ||
        (sq.current.type === "filled" && sq.current.value === sq.expected);
    });
  });

  function pickNewPuzzle() {
    squares = randomPuzzle();
    timing = { started: now, finished: null };
  }

  function clickSquare(coords: Coordinates) {
    if (!squares || gameIsBeat) return;

    if (selected && coordsAreEqual(selected, coords)) {
      selected = null;
    } else {
      selected = coords;
    }
  }

  function clearSquare() {
    if (!selected || !squares) return;

    squares = mapSquareAtCoords(selected, squares, (square) =>
      square.current.type === "filled" ?
        { ...square, current: { type: "empty" } } :
        square
    );
    selected = null;
  }

  function inputNumber(num: number) {
    if (!selected || !squares || gameIsBeat) return;

    squares = mapSquareAtCoords(selected, squares, (square) =>
      square.current.type !== "pre-filled"
        ? { ...square, current: { type: "filled", value: num } }
        : square
    );
    selected = null;

    if (gameIsBeat) {
      timing.finished = now;
    }
  }
</script>

<div class="container mx-auto max-w-lg px-2 pt-2">
  <div>
    <SudokuBoard
      squares={squares || emptyBoard}
      {selected}
      {showMistakes}
      {clickSquare}
    />
    <br />
    <InputNumbers clickNumber={inputNumber} clearSquare={clearSquare} />
  </div>
  <div class="flex flex-row justify-evenly w-full p-6">
    <div class="align-center basis-4/12 space-between h-full flex flex-col">
      <p class="text-center text-5xl" class:text-success={!!timing.finished}>
        {elapsedTime}
      </p>
      <div class="form-control py-4">
        <label class="label cursor-pointer">
          <span class="label-text">Show Mistakes</span>
          <input
            type="checkbox"
            class="toggle"
            checked={showMistakes}
            oninput={() => showMistakes = !showMistakes}
          />
        </label>
      </div>
      <div class="form-control">
        <button class="btn align-right" onclick={pickNewPuzzle}>
          New Game
        </button>
      </div>
    </div>
    <div class="flex-end">
      <SudokuControls />
    </div>
  </div>
</div>
