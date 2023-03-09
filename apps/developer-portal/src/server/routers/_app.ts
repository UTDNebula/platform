import { z } from 'zod';
import { procedure, router } from '../trpc';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .query(({ input }) => ({
      greeting: `Hello, ${input.text}`
    }))
});

// export type definition of API
export type AppRouter = typeof appRouter;
