import { Hono } from "hono";
import { auth } from "./core/auth";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { userRouter } from "./routers/user.router";
import { helloRouter } from "./routers/hello.router";
import { env } from "./core/env";

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
    ],
    maxAge: 34560000,
  })
);

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

export const appRouter = app
  .route("/hello", helloRouter)
  .route("/user", userRouter);
export type AppRouter = typeof appRouter;

export default {
  fetch: app.fetch,
  port: 3001,
};
