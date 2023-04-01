<script lang="ts">
  import type { Writable } from "svelte/store";

  import TagList from "$lib/components/TagList.svelte";

  export let name: Writable<string | null>;
  export let tags: Writable<string[] | null>;
  export let allTags: string[];
  export let toggleTag: (tag: string) => void;
</script>

<fieldset>
  <legend>Filter Recipes</legend>
  <div class="form-control">
    <label>By Name
      <input
        type="text"
        placeholder="Meatball Mania"
        value={$name || ''}
        on:input={(event) => $name = event.currentTarget.value} />
    </label>
  </div>
  <div class="form-control">
    <label>By Tag</label>
    <TagList tags={allTags} selected={$tags || []} toggle={toggleTag} />
  </div>
</fieldset>
