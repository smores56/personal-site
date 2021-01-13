<script lang="ts">
  import type { Ingredient } from "../../models";

  export let ingredient: Ingredient;
</script>

<li>
  {ingredient.item}
  {#if ingredient.quantity}- {ingredient.quantity}{/if}
  {#if ingredient.optional}<i> (optional) </i>{/if}
  {#if ingredient.notes}<i> ({ingredient.notes}) </i>{/if}
  {#if ingredient.substitutes.length}
    <i> [can substitute with {ingredient.substitutes.join(' / ')}] </i>
  {/if}
</li>
