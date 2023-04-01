<script lang="ts">
  import { derived } from "svelte/store";
  import type { PageData } from "./$types";
  import { queryParam, ssp } from "sveltekit-search-params";
  import { EMAIL } from "$lib/constants";

  import ReviewCard from "./ReviewCard.svelte";
  import FilterReviews from "./FilterReviews.svelte";
  import { Paginator, ProgressBar } from "@skeletonlabs/skeleton";

  const PAGE_SIZE = 20;

  let data: PageData;

  const titleFilter = queryParam("title", ssp.string());
  const reviewedFilter = queryParam("reviewed", ssp.boolean());
  const minRatingFilter = queryParam("minRating", ssp.number());
  const yearFilter = queryParam("year", ssp.number());
  const offsetFilter = queryParam("offsetFilter", ssp.number());

  const noFiltering = derived(
    [titleFilter, reviewedFilter, yearFilter, minRatingFilter], 
    (filters) => filters.every(f => f === null)
  );

  $: visibleReviews = derived(
    [titleFilter, reviewedFilter, yearFilter, minRatingFilter], 
    ([title, reviewed, year, minRating]) => {
      const lowerTitle = (title || "").toLowerCase().trim();

      return data?.reviews.filter(
        (review) =>
          (reviewed !== null ? reviewed === (review.rating !== null) : true) &&
          (minRating ? (review.rating || review.review) &&  minRating <= (review.rating || 0) : true) &&
          review.title.toLowerCase().includes(lowerTitle) &&
          (year ? review.year === year : true)
      );
    });

  const shownReviews = derived([visibleReviews, offsetFilter], ([reviews, offset]) => {
    return reviews.slice(offset || 0, (offset || 0) + PAGE_SIZE);
  });
</script>

<div class="container max-w-screen-md">
  <div class="row">
    <div class="col align-center">
      <h1>Reviews</h1>
      <section>
        {#if !data}
          <ProgressBar />
        {:else}
          <p>
            What GeoCities page would be complete without brash public opinions?
            Here you'll find a rolling list of (mostly) everything I've watched
            and remembered well enough to opine on, as well as (mostly)
            everything that I haven't seen but would like to at some point. If
            there's something missing from here, <a href="mailto:{EMAIL}">let me know</a>
            that you wanna know what I think and I can throw a dart at the
            proverbial board.
          </p>
          <FilterReviews />
          {#if $visibleReviews.length}
            <div>
              <strong>
                {#if $visibleReviews.length > PAGE_SIZE}
                  showing reviews
                  {$offsetFilter || 0}
                  to
                  {Math.max(($offsetFilter || 0) + PAGE_SIZE, $visibleReviews.length)}
                  of
                {/if}
                {`${$visibleReviews.length} review${$visibleReviews.length === 1 ? '' : 's'}`}
                found:
              </strong>
              {#each $shownReviews as review}
                <ReviewCard {review} />
              {/each}
              {#if $visibleReviews.length > 1}
                <Paginator page={{
                  offset: $offsetFilter || 0,
                  limit: PAGE_SIZE,
                  size: data.reviews.length,
                  amounts: [PAGE_SIZE]
                }} on:page={(event) => {
                  $offsetFilter = event.detail.offset || null;
                  setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                  }, 20);
                }}/>
              {/if}
            </div>
          {:else}
            <p>
              <i>
                {#if $noFiltering}
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
