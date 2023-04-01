<script lang="ts">
  import type { IngredientsForComponent } from "$lib/models";
  import IngredientListItem from "./IngredientListItem.svelte";

  export let ingredients: IngredientsForComponent[];
</script>

{#if ingredients.length === 1}
  <ul>
    {#each ingredients[0].ingredients as ingredient}
      <IngredientListItem {ingredient} />
    {/each}
  </ul>
{:else}
  {#each ingredients as group}
    <h5>For the {group.component}:</h5>
    <ul>
      {#each group.ingredients as ingredient}
        <IngredientListItem {ingredient} />
      {/each}
    </ul>
  {/each}
{/if}
