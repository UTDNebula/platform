/*
 * tRPC HTTP Handler
 * 
 * This file is responsible for starting tRPC's API routes handler as defined
 * in src/server/routers/_app.ts. It is located here because this is where
 * NextJS handles API routes by default and we want tRPC to take over that
 * functionality.
 * 
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/routers/_app';

// See https://trpc.io/docs/api-handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({})
});
