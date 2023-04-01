import { z } from "zod";

export const Review = z.object({
  title: z.string(),
  year: z.number(),
  link: z.string(),
  rating: z.optional(z.number()),
  review: z.optional(z.string())
})

export const Reviews = z.array(Review).or(Review);
