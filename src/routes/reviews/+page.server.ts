import { Reviews, type Review } from "./models";
import type { z } from "zod";
import yaml from "js-yaml";
import glob from "fast-glob";
import { readFile } from "fs/promises";
import { env } from '$env/dynamic/private';

if (!env.REVIEWS_DIR) {
  throw new Error("`REVIEWS_DIR` is not set");
}

export async function load() {
  const paths = await glob(`${env.REVIEWS_DIR}/**/*.yml`);
  const allReviews = [] as z.infer<typeof Review>[];

  for (const path of paths) {
    try {
      const yamlData = await readFile(path, "utf8");
      const data = yaml.load(yamlData);
      const reviews = Reviews.parse(data);

      if ('length' in reviews) {
        allReviews.push(...reviews);
      } else {
        allReviews.push(reviews);
      }
    } catch (error) {
      console.log(`Failed to read data at ${path}: ${error}`);
    }
  }

  const reviews = allReviews.sort((r1, r2) => {
    if (r1.year !== r2.year) {
      return (r2.year || 0) - (r1.year || 0);
    }

    return (r1.title || '').localeCompare(r2.title || '');
  });

  return { reviews };
}
