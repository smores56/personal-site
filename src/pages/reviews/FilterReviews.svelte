<script lang="ts">
  import { derived, get } from "svelte/store";
  import type { ReviewsRoute } from "../../route";
  import { route, replaceRoute } from "../../route";

  const title = derived(route, ($route) => ($route as ReviewsRoute).title);
  const unreviewed = derived(
    route,
    ($route) => ($route as ReviewsRoute).unreviewed
  );
  const year = derived(route, ($route) => ($route as ReviewsRoute).year);
  const reviewed = derived(
    route,
    ($route) => ($route as ReviewsRoute).reviewed
  );

  function setTitle(title: string) {
    replaceRoute({ ...(get(route) as ReviewsRoute), title });
  }

  function setUnreviewed(unreviewed: boolean) {
    replaceRoute({ ...(get(route) as ReviewsRoute), unreviewed });
  }

  function setYear(year: number | undefined) {
    replaceRoute({ ...(get(route) as ReviewsRoute), year });
  }

  function setReviewed(reviewed: Date | undefined) {
    const dateReviewed =
      reviewed && !isNaN(reviewed.getTime())
        ? reviewed.toISOString().split("T")[0]
        : undefined;
    replaceRoute({ ...(get(route) as ReviewsRoute), reviewed: dateReviewed });
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
      <label>Unreviewed</label>
      <button on:click={() => setUnreviewed(!$unreviewed)}>
        {$unreviewed ? 'Only Unreviewed' : 'All Movies'}
      </button>
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
      <label>After Review Date
        <input
          type="date"
          value={$reviewed || ''}
          on:input={(event) => setReviewed(new Date(event.currentTarget.value))} />
      </label>
    </div>
  </div>
</fieldset>
