/*
 * Main tRPC Router
 * 
 * This file is responsible for combining all of the tRPC API routes
 * ("procedures") defined in this directory into a single router that will be
 * hooked up to the HTTP handler and thus serve all incoming API requests.
 * 
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

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
