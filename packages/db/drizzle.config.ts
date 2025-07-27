import { defineConfig } from "drizzle-kit";
import { env } from "./src/core/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema/index.ts",
  out: "./src/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
