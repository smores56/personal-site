import { For, Show } from "solid-js";
import { Recipe } from "~/types/recipe";
import IngredientList from "./IngredientList";
import NutritionInfo from "./NutritionInfo";
import "./RecipePanel.css"
import TagList from "./TagList";

export default function RecipePanel(props: {
  selectedTags: string[],
  toggleTag: (tag: string) => void,
  recipe: (typeof Recipe)['_output'],
  expanded: boolean,
  toggleExpanded: () => void,
}) {
  return (
    <div class="panel">
      <header>
        <h3>{props.recipe.name}</h3>
        <span class="tags-wrapper">
          <TagList
            rightAlign={true}
            tags={props.recipe.tags}
            selected={props.selectedTags}
            toggle={props.toggleTag} />
        </span>
      </header>

      <Show when={props.expanded}>
        <div class="panel-body align-left">
          <Show when={props.recipe.image}>
            <section class="recipe-image">
              <img src={props.recipe.image} alt="preview of the dish" />
            </section>
          </Show>

          <h4> Ingredients:</h4>
          <IngredientList ingredients={props.recipe.ingredients} />

          <h4>Steps:</h4>
          <ol>
            <For each={props.recipe.steps}>
              {(step) => <li>{step}</li>}
            </For>
          </ol>

          <Show when={props.recipe.nutrition}>
            <NutritionInfo nutrition={props.recipe.nutrition!} />
          </Show>

          <Show when={props.recipe.links.length > 0}>
            <h4>Links:</h4>
            <ul>
              <For each={props.recipe.links}>
                {(link) => (
                  <li>
                    <a href={link}>
                      {link}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </div>
      </Show>

      <footer>
        <button onClick={props.toggleExpanded}>
          {props.expanded ? 'Hide' : 'Expand'}
        </button>
      </footer>
    </div>
  )
}