<script lang="ts">
  import { derived } from "svelte/store";
  import type { PageData } from "./$types";
  import { toggleInList } from "$lib/utils";
  import { queryParam, ssp } from "sveltekit-search-params";

  import FilterRecipes from "./FilterRecipes.svelte";
  import RecipePanel from "./RecipePanel.svelte";
  import { ProgressBar } from "@skeletonlabs/skeleton";

  let data: PageData;
  let expandedRecipes: string[] = [];

  const nameFilter = queryParam("name", ssp.string());
  const tagsFilter = queryParam("tags", ssp.object<string[]>());

  function toggleRecipeExpanded(recipeName: string) {
    expandedRecipes = toggleInList(expandedRecipes, recipeName);
  }

  function toggleTag(tag: string) {
    tagsFilter.update(tags => {
      const updatedTags = toggleInList(tags || [], tag);
      return updatedTags.length > 0 ? updatedTags : null;
    });
  }

  $: visibleRecipes = derived([nameFilter, tagsFilter], ([name, tags]) => {
    const lowerName = (name || "").toLowerCase().trim();

    return data?.recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(lowerName) &&
        (tags || []).every((t) => recipe.tags.includes(t))
    );
  });

  const queryFilled = derived(
    [nameFilter, tagsFilter],
    (filters) => filters.every(f => f !== null)
  );
</script>

<div class="container container-small">
  <div class="row">
    <div class="col align-center">
      <h1>Recipes</h1>
      <section>
        {#if !data}
          <ProgressBar />
        {:else}
          <p>
            Between a book full of family recipes and my ever-growing rotation
            of Keto-friendly recipes, I needed somewhere to keep these that I
            could access from anywhere. With the power of YAML files and
            GraphQL, I can now check the ingredients on my phone at Trader Joe's
            before I check out, and you can, too!
          </p>
          <FilterRecipes name={nameFilter} tags={tagsFilter} allTags={data.allTags} toggleTag={toggleTag} />
          {#if $visibleRecipes.length}
            <div>
              <strong>
                {`${$visibleRecipes.length} recipe${$visibleRecipes.length === 1 ? '' : 's'}`}
                found:
              </strong>
              {#each $visibleRecipes as recipe}
                <RecipePanel
                  {recipe}
                  {toggleTag}
                  tags={$tagsFilter || []}
                  expanded={expandedRecipes.includes(recipe.name)}
                  toggleExpanded={() => toggleRecipeExpanded(recipe.name)} />
              {/each}
            </div>
          {:else}
            <p>
              <i>
                {#if $queryFilled}
                  No recipes found for the given query.
                {:else}No recipes available.{/if}
              </i>
            </p>
          {/if}
        {/if}
      </section>
    </div>
  </div>
</div>
