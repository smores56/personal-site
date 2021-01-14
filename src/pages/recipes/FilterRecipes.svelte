<script lang="ts">
  import { derived } from "svelte/store";
  import { route } from "../../route";
  import type { RecipesRoute } from "../../route";

  import TagList from "../../components/TagList.svelte";

  export let allTags: string[];
  export let toggleTag: (tag: string) => void;
  export let setName: (name: string) => void;

  const name = derived(route, ($route) => ($route as RecipesRoute).name);
  const tags = derived(route, ($route) => ($route as RecipesRoute).tags);
</script>

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
    <TagList tags={allTags} selected={$tags || []} toggle={toggleTag} />
  </div>
</fieldset>
