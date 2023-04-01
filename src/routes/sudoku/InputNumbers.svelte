<script lang="ts">
  export let clickNumber: (num: number) => void;
  export let clearSquare: () => void;

  const oneToNine = Array.from({ length: 9 }, (_, index) => index);
</script>

<style>
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
  }

  .input-square {
    font-weight: bold;
    font-size: 6vw;
    text-align: center;
    vertical-align: middle;
    flex: 1 0 0px;
    height: 0px;
    width: calc(100% / 10);
    padding-bottom: calc(100% / 10);
    font-family: sans-serif;
    border: 1.5px solid black;
    border-top-width: 3px;
    border-bottom-width: 3px;
  }

  .input-square:nth-child(1) {
    border-left-width: 3px;
  }

  .input-square:nth-child(10) {
    border-right-width: 3px;
  }

  @media (min-width: 768px) {
    .input-square {
      font-size: 32px;
    }
  }
</style>

<div class="sudoku-board">
  <div class="sudoku-row">
    {#each oneToNine as num}
      <div class="input-square" on:click={() => clickNumber(num + 1)}>
        <b>{num + 1}</b>
      </div>
    {/each}
    <div class="input-square" on:click={clearSquare}><b>⌫</b></div>
  </div>
</div>
