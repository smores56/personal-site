import { Show } from "solid-js"
import { Nutrition } from "~/types/recipe"

export default function NutritionInfo(props: { nutrition: (typeof Nutrition)['_output'] }) {
  return (
    <>
      <h4>Nutrition:</h4>
      <table style={{ lineHeight: "0.5" }}>
        <tbody>
          <Show when={props.nutrition.servings}>
            <tr>
              <td>Servings</td>
              <td>{props.nutrition.servings}</td>
            </tr>
          </Show>
          <Show when={props.nutrition.servingSize}>
            <tr>
              <td>Serving Size</td>
              <td>{props.nutrition.servingSize}</td>
            </tr>
          </Show>
          <Show when={props.nutrition.calories}>
            <tr>
              <td>Calories</td>
              <td>{props.nutrition.calories} cal</td>
            </tr>
          </Show>
          <Show when={props.nutrition.carbs}>
            <tr>
              <td>Carbs</td>
              <td>{props.nutrition.carbs} g</td>
            </tr>
          </Show>
          <Show when={props.nutrition.fiber}>
            <tr>
              <td>Fiber</td>
              <td>{props.nutrition.fiber} g</td>
            </tr>
          </Show>
          <Show when={props.nutrition.netCarbs}>
            <tr>
              <td>Net Carbs</td>
              <td>{props.nutrition.netCarbs} g</td>
            </tr>
          </Show>
          <Show when={props.nutrition.fat}>
            <tr>
              <td>Fat</td>
              <td>{props.nutrition.fat} g</td>
            </tr>
          </Show>
          <Show when={props.nutrition.protein}>
            <tr>
              <td>Protein</td>
              <td>{props.nutrition.protein} g</td>
            </tr>
          </Show>
        </tbody>
      </table>
    </>
  )
}