import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { Recipe } from '~/types/recipe';
import { Review } from '~/types/review';
import { watchDirectory } from '~/lib/utils';

const recipes = await watchDirectory('/home/smores/pCloudDrive/recipes/', Recipe)
const reviews = await watchDirectory('/home/smores/pCloudDrive/reviews/', Review)

const appRouter = trpc
  .router()
  .query('reviews', {
    resolve: () => reviews(),
  })
  .query('recipes', {
    resolve: () => recipes(),
  })

export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
