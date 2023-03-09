import { initTRPC } from '@trpc/server';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create();

// Base router and procedure helpers

// eslint-disable-next-line prefer-destructuring
export const router = t.router;
// eslint-disable-next-line prefer-destructuring
export const procedure = t.procedure;
