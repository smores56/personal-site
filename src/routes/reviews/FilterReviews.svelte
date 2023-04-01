<script lang="ts">
  import { titleFilter, reviewedFilter, yearFilter, minRatingFilter } from "./filters";
</script>

<fieldset>
  <legend>Filter Reviews</legend>
  <div class="form-control-group">
    <div class="form-control grow-3x">
      <label>By Title
        <input
          type="text"
          placeholder="Shrek"
          value={$titleFilter || ''}
          on:input={(event) => $titleFilter = event.currentTarget.value} />
      </label>
    </div>
    <div class="form-control">
      <label>Reviewed?</label>
      {#if $reviewedFilter === null}
        <button on:click={() => $reviewedFilter = true}>All Movies</button>
      {:else if $reviewedFilter}
        <button on:click={() => $reviewedFilter = false}>Only Reviewed</button>
      {:else}
        <button on:click={() => $reviewedFilter = null}>Only Unreviewed</button>
      {/if}
    </div>
  </div>
  <div class="form-control-group">
    <div class="form-control">
      <label>By Release Year
        <input
          type="number"
          placeholder="2099"
          value={$yearFilter || ''}
          on:input={(event) => $yearFilter = parseInt(event.currentTarget.value) || null} />
      </label>
    </div>
    <div class="form-control">
      <label>By Minimum Rating
        <input
          type="number"
          min="0"
          max="10"
          placeholder="6/10"
          value={$minRatingFilter || ''}
          on:input={(event) => $minRatingFilter = parseInt(event.currentTarget.value) || null} />
      </label>
    </div>
  </div>
</fieldset>
