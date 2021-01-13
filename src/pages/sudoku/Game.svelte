<script lang="ts">
  import { get, derived, readable, writable } from "svelte/store";
  import type {
    SudokuSquare,
    Coordinates,
    SudokuKeyEvent,
    Timing,
  } from "../../models";
  import { randomPuzzle } from "./starters";
  import { mapSquareAtCoords, coordsAreEqual, emptyBoard } from "./utils";

  import Board from "./Board.svelte";
  import Controls from "./Controls.svelte";
  import InputNumbers from "./InputNumbers.svelte";

  let squares: SudokuSquare[] | null = null;
  let selected: Coordinates | null = null;
  let notesMode: boolean = false;
  let showMistakes: boolean = false;

  let timing = writable<Timing>({ started: null, finished: null });

  // STORES

  const now = readable<Date>(new Date(), (setNow) => {
    setNow(new Date());

    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  });

  const elapsedTime = derived([now, timing], ([$now, $timing]) => {
    if (!$timing.started) return "0:00";

    const ending = $timing.finished || $now;
    const seconds = Math.floor(
      (ending.getTime() - $timing.started.getTime()) / 1000
    );
    return `${Math.floor(seconds / 60)}:${(seconds % 60)
      .toString()
      .padStart(2, "0")}`;
  });

  const keyEvents = readable<SudokuKeyEvent>(
    { type: "clear-selection" },
    (setEvent) => {
      const onKeyDown = (event: KeyboardEvent) => {
        const num = parseInt(event.key);
        if (num && num >= 1 && num <= 9) {
          setEvent({ type: "input-number", num });
        } else if (event.key === "r") {
          setEvent({ type: "clear-selection" });
        } else if (event.key === "c") {
          setEvent({ type: "clear-square" });
        } else if (event.key === "n") {
          setEvent({ type: "toggle-notes-mode" });
        } else if (event.key === "m") {
          setEvent({ type: "toggle-show-mistakes" });
        }
      };

      document.addEventListener("keydown", onKeyDown);

      return () => document.removeEventListener("keydown", onKeyDown);
    }
  );

  keyEvents.subscribe((keyEvent) => {
    if (keyEvent.type === "input-number") {
      inputNumber(keyEvent.num);
    } else if (keyEvent.type === "clear-selection") {
      selected = null;
    } else if (keyEvent.type === "clear-square") {
      clearSquare();
    } else if (keyEvent.type === "toggle-notes-mode") {
      notesMode = !notesMode;
    } else {
      showMistakes = !showMistakes;
    }
  });

  // METHODS

  function gameIsBeat() {
    return (
      squares &&
      squares.every(
        (sq) =>
          sq.current.type === "pre-filled" ||
          (sq.current.type === "filled" && sq.current.value === sq.expected)
      )
    );
  }

  function pickNewPuzzle() {
    squares = randomPuzzle();
    console.log(squares);
    timing.update((t) => ({ ...t, started: get(now), finished: null }));
  }

  function clickSquare(coords: Coordinates) {
    if (!squares || gameIsBeat()) return;

    selected = selected && coordsAreEqual(selected, coords) ? null : coords;

    console.log(squares, coords, selected);
  }

  function clearSquare() {
    if (!squares || !selected) return;

    squares = mapSquareAtCoords(selected, squares, (square) =>
      notesMode
        ? { ...square, notes: [] }
        : square.current.type === "filled"
        ? { ...square, current: { type: "empty" } }
        : square
    );
    selected = null;
  }

  function inputNumber(num: number) {
    if (!selected || !squares || gameIsBeat()) return;

    if (notesMode) {
      squares = mapSquareAtCoords(selected, squares, (square) => ({
        ...square,
        notes: square.notes.includes(num)
          ? square.notes.filter((n) => n !== num)
          : [...square.notes, num],
      }));
    } else {
      squares = mapSquareAtCoords(selected, squares, (square) =>
        square.current.type !== "pre-filled"
          ? { ...square, current: { type: "filled", value: num } }
          : square
      );
      selected = null;

      if (gameIsBeat()) {
        timing.update((t) => ({ ...t, finished: get(now) }));
      }
    }
  }
</script>

<style>
  .sudoku-timer {
    font-size: 40px;
    margin-bottom: 0;
  }

  .sudoku-timer.finished {
    color: darkgreen;
  }
</style>

<div class="row">
  <div class="col col-sm-12 col-md-8">
    <Board
      squares={squares || emptyBoard}
      {selected}
      {showMistakes}
      {clickSquare} />
    <br />
    <InputNumbers clickNumber={inputNumber} {clearSquare} />
  </div>
  <div class="col col-sm-12 col-md-offset-1 col-md-3 align-center">
    <p class={`sudoku-timer${$timing.finished ? ' finished' : ''}`}>
      {$elapsedTime}
    </p>
    <fieldset>
      <legend>Options</legend>
      <div class="form-control">
        <label>
          <input
            type="checkbox"
            on:input={() => (showMistakes = !showMistakes)}
            checked={showMistakes} />
          Show Mistakes
        </label>
      </div>
      <div class="form-control">
        <label>
          <input
            type="checkbox"
            on:input={() => (notesMode = !notesMode)}
            checked={notesMode} />
          Notes Mode
        </label>
      </div>
      <div class="form-control">
        <button
          class="align-right"
          on:click={pickNewPuzzle}
          style="margin-bottom: 0;">
          New Game
        </button>
      </div>
    </fieldset>
    <div class="display-md-up">
      <Controls />
    </div>
    <div class="display-md-down">
      <Controls centered={true} />
    </div>
  </div>
</div>
