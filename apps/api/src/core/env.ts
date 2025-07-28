import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    BASE_URL: z.url(),
    AUTH_SECRET: z.string(),
    DATABASE_URL: z.url(),
    ALLOWED_ORIGINS: z.string(),
    TRUSTED_AUTH_ORIGINS: z.string(),
    ENVIRONMENT: z.enum(["development", "production"]).default("development"),
  },
  runtimeEnv: process.env,
});
