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

import { router } from '../trpc';
import kmsUser from './kmsUser';

const kmsBaseURL: string = process.env.KMS_BASE_URL as string;

export const appRouter = router({
  kmsUser
});

// export type definition of API
export type AppRouter = typeof appRouter;
