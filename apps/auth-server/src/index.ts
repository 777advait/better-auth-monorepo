import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./auth";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { env } from "cloudflare:workers";

const app = new Hono();
app.use(
  cors({
    origin: env.TRUSTED_AUTH_ORIGINS.split(","),
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowHeaders: [
      "Authorization",
      "Content-Type",
      "accept-language",
      "Cookie",
    ],
    maxAge: 34560000,
  }),
  secureHeaders(),
  logger(),
  prettyJSON()
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default {
  fetch: app.fetch,
  port: 3002,
};
