import { z } from 'zod'

// An ingredient for a recipe
export const Ingredient = z.object({
  // The name of the item
  item: z.string(),
  // How much of the item is called for
  quantity: z.string().optional(),
  // Additional notes about this ingredient
  notes: z.string().optional(),
  // Potential substitutes if you don't have this ingredient handy
  substitutes: z.string().array(),
  // Whether this ingredient is optional
  optional: z.boolean(),
})

// The ingredients for a component of a recipe
export const IngredientsForComponent = z.object({
  // The name of the component
  component: z.string(),
  // The ingredients for the component
  ingredients: Ingredient.array(),
})

// All of the ingredients in a recipe
export const Ingredients = z.union([
  Ingredient.array(),
  z.map(z.string(), Ingredient.array()),
])

// The nutritional info for a recipe
export const Nutrition = z.object({
  // The number of servings it makes
  servings: z.number().optional(),
  // The size of each serving
  servingSize: z.string().optional(),
  // The calories (in grams) in each serving
  calories: z.number().optional(),
  // The fat (in grams) in each serving
  fat: z.number().optional(),
  // The carbohydrates (in grams) in each serving
  carbs: z.number().optional(),
  // The NET carbohydrates (in grams) in each serving
  netCarbs: z.number().optional(),
  // The protein (in grams) in each serving
  protein: z.number().optional(),
  // The fiber (in grams) in each serving
  fiber: z.number().optional(),
})

// A recipe worth keeping around
export const Recipe = z.object({
  // The name of the interface
  name: z.string(),
  // A summary of the recipe
  notes: z.string().optional(),
  // Tags for searching
  tags: z.string().array(),
  // An optional link to an image
  image: z.string().optional(),
  // Relevant links
  links: z.string().array(),
  // Steps to cook the recipe
  steps: z.string().array(),
  // The ingredients for the recipe
  ingredients: Ingredients,
  // Nutritional info on the recipe
  nutrition: Nutrition.optional(),
})
