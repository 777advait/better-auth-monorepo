import { createEnv } from "@t3-oss/env-core";
import z from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    DATABASE_AUTH_TOKEN: z.string(),
    AUTH_SECRET: z.string(),
  },
  runtimeEnv: process.env,
});
