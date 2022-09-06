import { createMemo, createSignal, For, Show } from "solid-js";
import { Title, useParams, useRouteData, useSearchParams } from "solid-start";
import { createServerData } from "solid-start/server";
import RecipePanel from "~/components/recipes/RecipePanel";
import TagList from "~/components/recipes/TagList";
import { Recipe } from "~/types/recipe";
import { toggleInList } from "~/utils";

export default function RecipesPage() {
  const [recipes] = createTrpcQ
  const [expanded, setExpanded] = createSignal<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams()

  const tags = createMemo(() => (useParams()["tags"] ?? "").split(","));
  const queryFilled = createMemo(() => searchParams.name || searchParams.tags)

  const recipes = useRouteData<typeof routeData>()
  const allTags = createMemo(() => [...new Set((recipes() || []).flatMap(recipe => recipe.tags))])

  const visibleRecipes = createMemo(() => {
    const lowerName = (searchParams.name || "").toLowerCase()

    return (recipes() || []).filter(recipe => {
      recipe.name.toLowerCase().includes(lowerName) &&
        tags().every((t) => recipe.tags.includes(t))
    })
  })

  function toggleTag(tag: string) {
    setSearchParams({ ...searchParams, tags: toggleInList(tags(), tag).join(",") })
  }

  return (
    <main>
      <Title>Recipes - Sam Mohr</Title>
      <div class="container">
        <div class="grid">
          <div>
            <h1>Recipes</h1>
            <p>
              Between a book full of family recipes and my ever-growing rotation
              of Keto-friendly recipes, I needed somewhere to keep these that I
              could access from anywhere. With the power of YAML files and
              GraphQL, I can now check the ingredients on my phone at Trader Joe's
              before I check out, and you can, too!
            </p>

            <section>
              <Show when={recipes()} fallback={<article aria-busy="true" />}>
                <fieldset>
                  <legend>Filter Recipes</legend>
                  <div class="form-control">
                    <label>By Name
                      <input
                        type="text"
                        placeholder="Meatball Mania"
                        value={searchParams.name || ''}
                        onInput={(event) => setSearchParams({
                          ...searchParams,
                          name: event.currentTarget.value,
                        })}
                      />
                    </label>
                  </div>
                  <div class="form-control">
                    <label>By Tag</label>
                    <TagList tags={allTags()} selected={tags()} toggle={toggleTag} />
                  </div>
                </fieldset>

                {visibleRecipes().length > 0 ? (
                  <div>
                    <strong>
                      {`${visibleRecipes().length} recipe${visibleRecipes().length === 1 ? '' : 's'}`}
                      found:
                    </strong>
                    <For each={visibleRecipes()}>
                      {(recipe) => (
                        <RecipePanel
                          recipe={recipe}
                          toggleTag={toggleTag}
                          selectedTags={tags()}
                          expanded={expanded().includes(recipe.name)}
                          toggleExpanded={() => setExpanded(toggleInList(expanded(), recipe.name))}
                        />
                      )}
                    </For>
                  </div>
                ) : (
                  <p>
                    <i>
                      {queryFilled() ?
                        "No recipes found for the given query." :
                        "No recipes available."
                      }
                    </i>
                  </p>
                )}
              </Show>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
