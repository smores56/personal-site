<script lang="ts">
  import { get, writable, derived } from "svelte/store";
  import type { Review } from "../../models";
  import type { ReviewsRoute } from "../../route";
  import { replaceRoute, route } from "../../route";
  import { getReviews } from "../../api";

  import LoadingBar from "../../components/LoadingBar.svelte";
  import ReviewCard from "./ReviewCard.svelte";
  import FilterReviews from "./FilterReviews.svelte";
  import PageControls from "./PageControls.svelte";

  const PAGE_SIZE = 20;

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
    return $r.title || $r.reviewed !== undefined || $r.year || $r.minRating;
  });

  const visibleReviews = derived([route, reviews], ([$route, $reviews]) => {
    const $r = $route as ReviewsRoute;
    const lowerTitle = ($r.title || "").toLowerCase();

    return $reviews.filter(
      (review) =>
        ($r.reviewed !== undefined
          ? $r.reviewed === (review.rating !== null)
          : true) &&
        ($r.minRating
          ? (review.rating !== null || review.review !== null) &&
            $r.minRating <= review.rating
          : true) &&
        review.title.toLowerCase().includes(lowerTitle) &&
        ($r.year ? review.year === $r.year : true)
    );
  });

  const pageCount = derived(visibleReviews, ($reviews) =>
    Math.ceil($reviews.length / PAGE_SIZE)
  );
  const pageNumber = derived([route, pageCount], ([$route, $pageCount]) =>
    Math.min($pageCount, Math.max(1, ($route as ReviewsRoute).pageNumber || 1))
  );

  const shownReviews = derived(
    [visibleReviews, pageNumber],
    ([$reviews, $pageNumber]) =>
      $reviews.slice(($pageNumber - 1) * PAGE_SIZE, $pageNumber * PAGE_SIZE)
  );

  function goToPage(page: number) {
    replaceRoute({
      ...(get(route) as ReviewsRoute),
      pageNumber: page > 1 ? page : undefined,
    });
  }
</script>

<style>
  .bottom-page-control-wrapper {
    margin-top: 25px;
  }
</style>

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
              <strong>
                {#if $pageCount > 1}
                  showing reviews
                  {($pageNumber - 1) * PAGE_SIZE + 1}
                  to
                  {Math.min($pageNumber * PAGE_SIZE, $visibleReviews.length)}
                  of
                {/if}
                {`${$visibleReviews.length} review${$visibleReviews.length === 1 ? '' : 's'}`}
                found:
              </strong>
              {#if $pageCount > 1}
                <PageControls
                  pageCount={$pageCount}
                  pageNumber={$pageNumber}
                  {goToPage} />
              {/if}
              {#each $shownReviews as review}
                <ReviewCard {review} />
              {/each}
              {#if $pageCount > 1}
                <div class="bottom-page-control-wrapper">
                  <PageControls
                    pageCount={$pageCount}
                    pageNumber={$pageNumber}
                    goToPage={(page) => {
                      goToPage(page);
                      setTimeout(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                      }, 10);
                    }} />
                </div>
              {/if}
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
