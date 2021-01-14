<script lang="ts">
  import { derived } from "svelte/store";
  import { route } from "../../route";
  import type { RecipesRoute } from "../../route";

  export let allTags: string[];
  export let toggleTag: (tag: string) => void;
  export let setName: (name: string) => void;

  const name = derived(route, ($route) => ($route as RecipesRoute).name);
  const tags = derived(route, ($route) => ($route as RecipesRoute).tags);
</script>

<style>
  .recipe-tags li {
    margin-top: 2px;
    margin-bottom: 2px;
  }
</style>

<fieldset>
  <legend>Filter Recipes</legend>
  <div class="form-control">
    <label>By Name
      <input
        type="text"
        placeholder="Meatball Mania"
        value={$name || ''}
        on:input={(event) => setName(event.currentTarget.value)} />
    </label>
  </div>
  <div class="form-control">
    <label>By Tag</label>
    <ul class="tags recipe-tags">
      {#each allTags as tag}
        <li
          class={`tag tag-rounded${($tags || []).includes(tag) ? ' tag-green' : ''}`}
          on:click={() => toggleTag(tag)}>
          {tag}
        </li>
      {/each}
    </ul>
  </div>
</fieldset>
