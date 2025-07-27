import { defineConfig } from "drizzle-kit";
import { env } from "./src/core/env";

export default defineConfig({
  dialect: "turso",
  schema: "./src/server/db/schema/index.ts",
  out: "./src/server/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
});
