import "server-only";

import type { AppRouter } from "@better/api";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { createTRPCClient, loggerLink } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import {
  type TRPCQueryOptions,
  createTRPCOptionsProxy,
} from "@trpc/tanstack-react-query";
import { cache } from "react";
import superjson from "superjson";
import { makeQueryClient } from "./query-client";
import { env } from "~/env";
import { cookies as getCookies } from "next/headers";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy<AppRouter>({
  queryClient: getQueryClient,
  client: createTRPCClient({
    links: [
      httpBatchLink({
        url: `${env.NEXT_PUBLIC_API_URL}/api/trpc`,
        transformer: superjson,
        fetch: async (url, opts) => {
          const cookieHeader = (await getCookies())
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; ");

          return fetch(url, {
            ...opts,
            credentials: "include",
            headers: {
              ...opts?.headers,
              // Add the cookie header if we have cookies
              ...(cookieHeader && { cookie: cookieHeader }),
            },
          } as RequestInit);
        },
      }),
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === "development" ||
          (opts.direction === "down" && opts.result instanceof Error),
      }),
    ],
  }),
});

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export async function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T
) {
  const queryClient = getQueryClient();

  if (queryOptions.queryKey[1]?.type === "infinite") {
    await queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    await queryClient.prefetchQuery(queryOptions);
  }
}

export async function batchPrefetch<
  T extends ReturnType<TRPCQueryOptions<any>>
>(queryOptionsArray: T[]) {
  const queryClient = getQueryClient();

  for (const queryOptions of queryOptionsArray) {
    if (queryOptions.queryKey[1]?.type === "infinite") {
      await queryClient.prefetchInfiniteQuery(queryOptions as any);
    } else {
      await queryClient.prefetchQuery(queryOptions);
    }
  }
}
