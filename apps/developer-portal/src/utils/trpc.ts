import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/routers/_app';

const DEFAULT_PORT = 3000;

function getBaseUrl() {
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

const trpc: any = createTRPCNext<AppRouter>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  config({ ctx }) {
    return {
      links: [
        httpBatchLink({
          // If you want to use SSR, you need to use the server's full URL
          // https://trpc.io/docs/ssr
          url: `${getBaseUrl()}/api/trpc`
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
