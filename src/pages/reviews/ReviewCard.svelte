<script lang="ts">
  import type { Review } from "../../models";

  export let review: Review;

  let starsClass = `stars-container stars-${Math.round(review.rating * 2) * 5}`;
</script>

<style>
  /* Credit to https://stackoverflow.com/a/34950378 */
  .stars-container {
    position: relative;
    display: inline-block;
    color: transparent;
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
</style>

<div class="card">
  <h3 class="card-title">
    {review.title}
    {#if review.year}({review.year}){/if}
  </h3>
  {#if review.rating}
    <h5><span class={starsClass}>★★★★★★★★★★</span></h5>
    {#if review.review}
      <p>
        {review.review}
        {#if review.reviewed}<i> - reviewed on {review.reviewed}</i>{/if}
      </p>
    {:else}
      <p><i>No Review</i></p>
    {/if}
  {:else}<i>Not Yet Rated</i>{/if}
</div>
