import "client-only";
import { hc } from "hono/client";
import { AppRouter } from "@better/api";
import { env } from "~/env";

export const { api } = hc<AppRouter>(env.NEXT_PUBLIC_API_URL, {
  fetch: (async (input, init) => {
    return fetch(input, {
      ...init,
      credentials: "include",
    });
  }) as typeof fetch,
});
