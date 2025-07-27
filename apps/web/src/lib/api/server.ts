import "server-only";
import { hc } from "hono/client";
import { AppRouter } from "@better/api";
import { env } from "~/env";
import { cookies as getCookies } from "next/headers";

export const { api } = hc<AppRouter>(env.NEXT_PUBLIC_API_URL, {
  fetch: (async (input, init) => {
    const cookieHeader = (await getCookies())
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    return fetch(input, {
      ...init,
      credentials: "include",
      headers: {
        ...init?.headers,
        // Add the cookie header if we have cookies
        ...(cookieHeader && { cookie: cookieHeader }),
      },
    });
  }) as typeof fetch,
});
