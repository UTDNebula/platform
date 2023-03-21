/*
 * tRPC Helper Definitions
 * 
 * This file is responsible for gathering and exporting helper constructors
 * that the API routes defined in the routers/ directory will use.
 * router - defines an entire AppRouter; we do this only once, in _app.ts
 * procedure - defines a single API route; we do this many times
 * 
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import { initTRPC } from '@trpc/server';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create();

// eslint-disable-next-line prefer-destructuring
export const router = t.router;
// eslint-disable-next-line prefer-destructuring
export const procedure = t.procedure;
