<script lang="ts">
  import type { Recipe } from "../../models";
  import IngredientList from "./IngredientList.svelte";
  import NutritionInfo from "./NutritionInfo.svelte";
  import TagList from "../../components/TagList.svelte";

  export let tags: string[];
  export let toggleTag: (tag: string) => void;
  export let recipe: Recipe;
  export let expanded: boolean;
  export let toggleExpanded: () => void;
</script>

<style>
  .recipe-image {
    padding-top: 0;
  }

  .recipe-image img {
    width: 100%;
  }

  p.panel-title {
    margin-bottom: 0;
  }

  .tags-wrapper {
    margin-left: 10px;
  }
</style>

<div class="panel">
  <div class="panel-head">
    <p class="panel-title">{recipe.name}</p>
    <span class="tags-wrapper">
      <TagList
        rightAlign={true}
        tags={recipe.tags}
        selected={tags}
        toggle={toggleTag} />
    </span>
  </div>
  {#if expanded}
    <div class="panel-body align-left">
      {#if recipe.image}
        <section class="recipe-image">
          <img src={recipe.image} alt="preview of the dish" />
        </section>
      {/if}
      <h4>Ingredients:</h4>
      <IngredientList ingredients={recipe.ingredients} />
      <h4>Steps:</h4>
      <ol>
        {#each recipe.steps as step}
          <li>{step}</li>
        {/each}
      </ol>
      {#if recipe.nutrition}
        <NutritionInfo nutrition={recipe.nutrition} />
      {/if}
      {#if recipe.links.length}
        <h4>Links:</h4>
        <ul>
          {#each recipe.links as link}
            <li><a href={link}>{link}</a></li>
          {/each}
        </ul>
      {/if}
    </div>
  {/if}
  <div class="panel-footer">
    <button on:click={toggleExpanded}> {expanded ? 'Hide' : 'Expand'} </button>
  </div>
</div>
