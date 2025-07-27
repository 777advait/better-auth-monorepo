import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    BASE_URL: z.url(),
    AUTH_SECRET: z.string(),
    DATABASE_URL: z.url(),
    DATABASE_AUTH_TOKEN: z.string(),
  },
  runtimeEnv: process.env,
});
