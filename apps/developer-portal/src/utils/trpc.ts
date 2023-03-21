/*
 * Type-Safe tRPC Hook Definitions
 * 
 * This file is responsible for defining custom tRPC React hooks. These hooks
 * are used in the NextJS pages to access the API routes in a type-safe manner.
 * Currently, everything is done through the export "trpc". To make an
 * endpoint call, the front-end would therefore use trpc.[endpoint].useQuery().
 * 
 * Written by Daniel "Ludo" DeAnda (dcd180001) for CS4485.0W1
 * (Nebula Platform CS Project) starting March 21, 2023
 */

import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/routers/_app';

const DEFAULT_PORT = 3000;

/*
 * getBaseUrl() is a helper function that disambiguates between instances of
 * this NextJS application that are running on localhost, on Vercel (the
 * intended deployment destination for this project), on Render.com, and
 * without a window. It returns whatever the base URL for the deployment is
 * (e.g., when running locally, it returns http://localhost:3000/).
 */
function getBaseURL() {
  if (typeof window !== 'undefined') {
    // browser should use relative path
    return '';
  }

  if (process.env.VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    // reference for render.com
    // noinspection HttpUrlsUsage
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  // assume localhost
  return `http://localhost:${process.env.PORT ?? DEFAULT_PORT}`;
}

/*
 * Here, we define trpc, a collection of strongly-typed hooks based on the API
 * routes defined in the server directory. Links are included to relevant bits
 * of tRPC usage documentation.
 */
const trpc: any = createTRPCNext<AppRouter>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          // If you want to use SSR, you need to use the server's full URL
          // https://trpc.io/docs/ssr
          url: `${getBaseURL()}/api/trpc`
        })
      ]
      // https://tanstack.com/query/v4/docs/reference/QueryClient
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  // https://trpc.io/docs/ssr
  ssr: false
});

export default trpc;
