import { Recipe } from "./models";
import { readFile } from "fs/promises";
import type { z } from "zod";
import glob from "fast-glob";
import yaml from "js-yaml";
import { env } from '$env/dynamic/private';

if (!env.RECIPES_DIR) {
  throw new Error("`RECIPES_DIR` is not set");
}

export async function load() {
  const paths = await glob(`${env.RECIPES_DIR}/**/*.yml`);
  const validRecipes = [] as z.infer<typeof Recipe>[];

  for (const path of paths) {
    try {
      const yamlData = await readFile(path, "utf8");
      const data = yaml.load(yamlData);
      const recipe = Recipe.parse(data);
      validRecipes.push(recipe);
    } catch (error) {
      // console.log(`Failed to read data at ${path}: ${error}`);
    }
  }
  
  const recipes = validRecipes.sort((r1, r2) => (r1.name || '').localeCompare(r2.name || ''));
  const allTags = [...new Set(recipes.flatMap(r => r.tags))].sort();

  return { recipes, allTags };
}
