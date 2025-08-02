import { Hono } from "hono";
import { auth } from "./core/auth";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { env } from "./core/env";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc/trpc";
import { createTRPCContext } from "./trpc/init";
import { TRPCError } from "@trpc/server";

const app = new Hono().basePath("/api");

app.use(
  "*",
  logger(),
  prettyJSON(),
  secureHeaders(),
  cors({
    origin: env.ALLOWED_ORIGINS.split(","),
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: [
      "Authorization",
      "Content-Type",
      "accept-language",
      "Cookie",
      "x-trpc-source",
    ],
    exposeHeaders: ["Set-Cookie", "Content-Length"],
    maxAge: 34560000,
  })
);

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: createTRPCContext,
    endpoint: "/api/trpc",
  })
);

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

export default { fetch: app.fetch, port: 3001 };
