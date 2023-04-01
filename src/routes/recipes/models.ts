import { z } from "zod";

export const Ingredient = z.object({
  item: z.string(),
  quantity: z.optional(z.string()),
  notes: z.optional(z.string()),
  optional: z.optional(z.boolean()),
  substitutes: z.optional(z.array(z.string()))
})

export const Ingredients = z.array(Ingredient).or(z.map(z.string(), z.array(Ingredient)));

export const Nutrition = z.object({
  servings: z.optional(z.number()),
  servingSize: z.optional(z.string()),
  calories: z.optional(z.number()),
  fat: z.optional(z.number()),
  netCarbs: z.optional(z.number()),
  protein: z.optional(z.number()),
  carbs: z.optional(z.number()),
  fiber: z.optional(z.number())
})

export const Recipe = z.object({
  name: z.string(),
  notes: z.optional(z.string()),
  tags: z.array(z.string()),
  image: z.optional(z.string()),
  links: z.optional(z.array(z.string())),
  steps: z.array(z.string()),
  ingredients: Ingredients,
  nutrition: z.optional(Nutrition)
})
