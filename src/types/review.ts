import { z } from 'zod'

// My thoughts on a film
export const Review = z.object({
  // The title of the film
  title: z.string(),
  // When the movie was released
  year: z.number().optional(),
  // My rating of the film (empty if I haven't seen it yet)
  rating: z.number().optional(),
  // Additional thoughts on the film
  review: z.string().optional(),
  // A link to the movie page (ex. IMDb, Wikipedia, etc.)
  link: z.string().optional(),
})

// A collection of reviews
export const Reviews = z.union([Review, Review.array()])
