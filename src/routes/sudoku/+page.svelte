<script lang="ts">
  import Game from "./Game.svelte";
</script>

<div class="container max-w-screen-md">
  <div class="flex flex-row">
    <h1 class="align-center">Sudoku</h1>
    <section>
      <p>
        I think that Sudoku needs no explanation. It was fun to implement this
        all by myself, and writing it in TypeScript (which is what this site
        is written in) made my life pretty easy. There are 100 random puzzles
        of varying difficulty, so just hit the "New Game" button and have at
        it!
      </p>
    </section>
    <Game />
  </div>
</div>
