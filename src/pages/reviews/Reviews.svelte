<script lang="ts">
  import { writable, derived } from "svelte/store";
  import type { Review } from "../../models";
  import type { ReviewsRoute } from "../../route";
  import { route } from "../../route";
  import { getReviews } from "../../api";
  import LoadingBar from "../../components/LoadingBar.svelte";
  import ReviewCard from "./ReviewCard.svelte";
  import FilterReviews from "./FilterReviews.svelte";

  let status: string = "loading";

  const reviews = writable<Review[]>([]);

  getReviews().then((result) => {
    if (result.status === "success") {
      reviews.set(result.data.reviews);
      status = "loaded";
    } else {
      status = result.error;
    }
  });

  const noResults = derived(route, ($route) => {
    const $r = $route as ReviewsRoute;
    return $r.title || $r.unreviewed || $r.year || $r.reviewed;
  });

  const visibleReviews = derived([route, reviews], ([$route, $reviews]) => {
    const $r = $route as ReviewsRoute;
    const lowerTitle = ($r.title || "").toLowerCase();

    return $reviews.filter(
      (review) =>
        ($r.unreviewed ? review.rating === null : true) &&
        ($r.reviewed
          ? review.reviewed
            ? new Date(review.reviewed) >= new Date($r.reviewed)
            : false
          : true) &&
        review.title.toLowerCase().includes(lowerTitle) &&
        ($r.year ? review.year === $r.year : true)
    );
  });
</script>

<div class="container container-small">
  <div class="row">
    <div class="col align-center">
      <h1>Reviews</h1>
      <section>
        {#if status === 'loading'}
          <LoadingBar />
        {:else if status !== 'loaded'}
          <p class="alert alert-danger">{status}</p>
        {:else}
          <p>
            What GeoCities page would be complete without brash public opinions?
            Here you'll find a rolling list of (mostly) everything I've watched
            and remembered well enough to opine on, as well as (mostly)
            everything that I haven't seen but would like to at some point. If
            there's something missing from here,
            <a href="mailto:sam@mohr.codes">let me know</a>
            that you wanna know what I think and I can throw a dart at the
            proverbial board, so to say.
          </p>
          <FilterReviews />
          {#if $visibleReviews.length}
            <div>
              <strong>{`${$visibleReviews.length} review${$visibleReviews.length === 1 ? '' : 's'}`}
                found:</strong>
              {#each $visibleReviews as review}
                <ReviewCard {review} />
              {/each}
            </div>
          {:else}
            <p>
              <i>
                {#if $noResults}
                  No reviews found for the given query.
                {:else}No reviews available.{/if}
              </i>
            </p>
          {/if}
        {/if}
      </section>
    </div>
  </div>
</div>
