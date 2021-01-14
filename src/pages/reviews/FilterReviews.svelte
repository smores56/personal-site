<script lang="ts">
  import { derived, get } from "svelte/store";
  import type { ReviewsRoute } from "../../route";
  import { route, replaceRoute } from "../../route";

  const title = derived(route, ($route) => ($route as ReviewsRoute).title);
  const reviewed = derived(
    route,
    ($route) => ($route as ReviewsRoute).reviewed
  );
  const year = derived(route, ($route) => ($route as ReviewsRoute).year);
  const minRating = derived(
    route,
    ($route) => ($route as ReviewsRoute).minRating
  );

  function setTitle(title: string) {
    replaceRoute({ ...(get(route) as ReviewsRoute), title });
  }

  function setReviewed(reviewed: boolean | undefined) {
    replaceRoute({ ...(get(route) as ReviewsRoute), reviewed });
  }

  function setYear(year: number | undefined) {
    replaceRoute({ ...(get(route) as ReviewsRoute), year });
  }

  function setMinRating(minRating: number | undefined) {
    replaceRoute({ ...(get(route) as ReviewsRoute), minRating });
  }
</script>

<fieldset>
  <legend>Filter Reviews</legend>
  <div class="form-control-group">
    <div class="form-control grow-3x">
      <label>By Title
        <input
          type="text"
          placeholder="Shrek"
          value={$title || ''}
          on:input={(event) => setTitle(event.currentTarget.value)} />
      </label>
    </div>
    <div class="form-control">
      <label>Reviewed?</label>
      {#if $reviewed === undefined}
        <button on:click={() => setReviewed(true)}>All Movies</button>
      {:else if $reviewed}
        <button on:click={() => setReviewed(false)}>Only Reviewed</button>
      {:else}
        <button on:click={() => setReviewed(undefined)}>Only Unreviewed</button>
      {/if}
    </div>
  </div>
  <div class="form-control-group">
    <div class="form-control">
      <label>By Release Year
        <input
          type="number"
          placeholder="2099"
          value={$year || ''}
          on:input={(event) => setYear(parseInt(event.currentTarget.value) || null)} />
      </label>
    </div>
    <div class="form-control">
      <label>By Minimum Rating
        <input
          type="number"
          min="0"
          max="10"
          placeholder="6/10"
          value={$minRating || ''}
          on:input={(event) => setMinRating(parseInt(event.currentTarget.value) || undefined)} />
      </label>
    </div>
  </div>
</fieldset>
