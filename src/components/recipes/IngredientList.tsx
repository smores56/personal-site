import { For, Show } from "solid-js"
import { Ingredient, Recipe } from "~/types/recipe"

export default function IngredientList(
  props: {
    ingredients: (typeof Recipe)['_output']['ingredients']
  }
) {
  if ('length' in props.ingredients) {
    return (
      <ul>
        <For each={props.ingredients}>
          {ingredient => <IngredientListItem ingredient={ingredient} />}
        </For>
      </ul>
    )
  } else {
    return (
      <For each={[...props.ingredients.entries()]}>
        {([component, ingredients]) => (
          <>
            <h5> For the {component}:</h5>
            <ul>
              <For each={ingredients}>
                {ingredient => <IngredientListItem ingredient={ingredient} />}
              </For>
            </ul>
          </>
        )}
      </For >
    )
  }
}

function IngredientListItem(props: { ingredient: (typeof Ingredient)['_output'] }) {
  return (
    <li>
      {props.ingredient.item}
      <Show when={props.ingredient.quantity}>
        - {props.ingredient.quantity}
      </Show>
      <Show when={props.ingredient.optional}>
        <i> (optional) </i>
      </Show>
      <Show when={props.ingredient.notes}>
        <i> ({props.ingredient.notes}) </i>
      </Show>
      <Show when={props.ingredient.substitutes.length > 0}>
        <i> [can substitute with {props.ingredient.substitutes.join(' / ')}] </i>
      </Show>
    </li>
  )
}