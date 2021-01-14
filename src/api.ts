import type { Recipe, Review } from "./models";

const API_URL = "https://api.mohr.codes/";

export type QueryResult<T> = { status: "success"; data: T } | { status: "error"; error: string };

async function queryApi<T>(query: string): Promise<QueryResult<T>> {
  try {
    const response = await fetch(API_URL, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ query, variables: null })
    });
    const data = await response.json();

    if (data.errors?.length) {
      return { status: "error", error: data.errors[0].message };
    } else {
      return { status: "success", data: data.data };
    }
  } catch (exception) {
    return { status: "error", error: exception.toString() };
  }
}

export interface ReviewsQueryData {
  reviews: Review[];
}

export async function getReviews(): Promise<QueryResult<ReviewsQueryData>> {
  const query = "{ reviews { title year rating review link } }";
  return await queryApi<ReviewsQueryData>(query);
}

export interface RecipesQueryData {
  recipes: Recipe[];
  recipeTags: string[];
}

export async function getRecipes(): Promise<QueryResult<RecipesQueryData>> {
  const query = `{
    recipeTags
    recipes {
      name tags image links steps
      ingredients {
        component
        ingredients {
          item quantity notes substitutes optional
        }
      }
      nutrition {
        servings servingSize calories fat carbs netCarbs protein fiber
      }
    }
  }`;
  return await queryApi<RecipesQueryData>(query);
}
