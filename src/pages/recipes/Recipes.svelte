<script lang="ts">
  import { get, writable, derived } from "svelte/store";
  import type { RecipesRoute } from "../../route";
  import { route, replaceRoute } from "../../route";
  import type { Recipe } from "../../models";
  import { getRecipes } from "../../api";
  import LoadingBar from "../../components/LoadingBar.svelte";
  import FilterRecipes from "./FilterRecipes.svelte";
  import RecipePanel from "./RecipePanel.svelte";

  let status = "loading";

  const recipes = writable<Recipe[]>([]);
  const allTags = writable<string[]>([]);

  getRecipes().then((result) => {
    if (result.status === "success") {
      recipes.set(result.data.recipes);
      allTags.set(result.data.recipeTags);
      status = "loaded";
    } else {
      status = result.error;
    }
  });

  const name = derived(route, ($route) => ($route as RecipesRoute).name);
  const tags = derived(route, ($route) => ($route as RecipesRoute).tags);

  function setName(name: string) {
    console.log(name, get(tags));
    replaceRoute({ page: "recipes", tags: get(tags), name });
  }

  function setTags(tags: string[]) {
    replaceRoute({ page: "recipes", tags, name: get(name) });
  }

  function toggleTag(tag: string) {
    const currentTags = get(tags) || [];
    if (currentTags.includes(tag)) {
      setTags(currentTags.filter((t) => t !== tag));
    } else {
      setTags([...currentTags, tag]);
    }
  }

  let expandedRecipes: string[] = [];

  function toggleRecipeExpanded(recipeName: string) {
    if (expandedRecipes.includes(recipeName)) {
      expandedRecipes = expandedRecipes.filter((r) => r !== recipeName);
    } else {
      expandedRecipes = [...expandedRecipes, recipeName];
    }
  }

  const visibleRecipes = derived([route, recipes], ([$route, $recipes]) => {
    const $r = $route as RecipesRoute;
    const lowerName = ($r.name || "").toLowerCase();

    return $recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(lowerName) &&
        ($r.tags || []).every((t) => recipe.tags.includes(t))
    );
  });

  const queryFilled = derived(route, ($route) => {
    const $r = $route as RecipesRoute;
    return $r.name || $r.tags?.length;
  });
</script>

<div class="container container-small">
  <div class="row">
    <div class="col align-center">
      <h1>Recipes</h1>
      <section>
        {#if status === 'loading'}
          <LoadingBar />
        {:else if status !== 'loaded'}
          <p class="alert alert-danger">{status}</p>
        {:else}
          <FilterRecipes allTags={$allTags} {toggleTag} {setName} />
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
                  tags={$tags || []}
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
