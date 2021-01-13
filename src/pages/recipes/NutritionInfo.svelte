<script lang="ts">
  import type { Nutrition } from "../../models";

  export let nutrition: Nutrition;
</script>

<style>
  .nutrition-table {
    line-height: 0.5;
  }
</style>

<h4>Nutrition:</h4>
<table class="nutrition-table">
  <tbody>
    {#if nutrition.servings}
      <tr>
        <td>Servings</td>
        <td>{nutrition.servings}</td>
      </tr>
    {/if}
    {#if nutrition.servingSize}
      <tr>
        <td>Serving Size</td>
        <td>{nutrition.servingSize}</td>
      </tr>
    {/if}
    {#if nutrition.calories}
      <tr>
        <td>Calories</td>
        <td>{nutrition.calories} cal</td>
      </tr>
    {/if}
    {#if nutrition.carbs}
      <tr>
        <td>Carbs</td>
        <td>{nutrition.carbs} g</td>
      </tr>
    {/if}
    {#if nutrition.fiber}
      <tr>
        <td>Fiber</td>
        <td>{nutrition.fiber} g</td>
      </tr>
    {/if}
    {#if nutrition.netCarbs}
      <tr>
        <td>Net Carbs</td>
        <td>{nutrition.netCarbs} g</td>
      </tr>
    {/if}
    {#if nutrition.fat}
      <tr>
        <td>Fat</td>
        <td>{nutrition.fat} g</td>
      </tr>
    {/if}
    {#if nutrition.protein}
      <tr>
        <td>Protein</td>
        <td>{nutrition.protein} g</td>
      </tr>
    {/if}
  </tbody>
</table>
