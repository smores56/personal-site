<script lang="ts">
  import type { Review } from "../../models";

  export let review: Review;
  $: reviewLines = (review.review || "").split(/\n/).filter((line) => line);

  $: starsClass = `stars-container tooltip stars-${
    Math.round(review.rating * 2) * 5
  }`;
</script>

<style>
  /* Credit to https://stackoverflow.com/a/34950378 */
  .stars-container {
    position: relative;
    display: inline-block;
    color: transparent;
    font-size: 24px;
    line-height: 36px;
    border-bottom: 0px;
  }

  .stars-container:before {
    position: absolute;
    top: 0;
    left: 0;
    content: "★★★★★★★★★★";
    color: lightgray;
  }

  .stars-container:after {
    position: absolute;
    top: 0;
    left: 0;
    content: "★★★★★★★★★★";
    color: gold;
    overflow: hidden;
  }

  .stars-0:after {
    width: 0%;
  }
  .stars-5:after {
    width: 5%;
  }
  .stars-10:after {
    width: 10%;
  }
  .stars-15:after {
    width: 15%;
  }
  .stars-20:after {
    width: 20%;
  }
  .stars-25:after {
    width: 25%;
  }
  .stars-30:after {
    width: 30%;
  }
  .stars-35:after {
    width: 35%;
  }
  .stars-40:after {
    width: 40%;
  }
  .stars-45:after {
    width: 45%;
  }
  .stars-50:after {
    width: 50%;
  }
  .stars-55:after {
    width: 55%;
  }
  .stars-60:after {
    width: 60%;
  }
  .stars-65:after {
    width: 65%;
  }
  .stars-70:after {
    width: 70%;
  }
  .stars-75:after {
    width: 75%;
  }
  .stars-80:after {
    width: 80%;
  }
  .stars-85:after {
    width: 85%;
  }
  .stars-90:after {
    width: 90%;
  }
  .stars-95:after {
    width: 95%;
  }
  .stars-100:after {
    width: 100;
  }

  a.title-link {
    color: #424242;
    font-weight: 600;
  }

  a.title-link:hover {
    text-decoration: underline;
  }

  .stars-container .tooltip-text {
    font-size: 16px;
    line-height: 1;
    min-width: 130px;
  }
</style>

<div class="card">
  <h3 class="card-title">
    {#if review.link}
      <a class="title-link" href={review.link}>{review.title}</a>
    {:else}{review.title}{/if}

    {#if review.year}({review.year}){/if}
  </h3>
  {#if review.rating}
    <span class={starsClass}>
      ★★★★★★★★★★
      <span class="tooltip-text">{review.rating} out of 10</span>
    </span>
    {#if review.review}
      {#each reviewLines as line}
        <p>{line}</p>
      {/each}
    {:else}
      <p><i>No Review</i></p>
    {/if}
  {:else}<i>Not Yet Rated</i>{/if}
</div>
