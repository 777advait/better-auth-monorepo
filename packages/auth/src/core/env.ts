import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    AUTH_SECRET: z.string(),
    TRUSTED_AUTH_ORIGINS: z.string(),
  },
  runtimeEnv: process.env,
});
