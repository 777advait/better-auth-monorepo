import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { db } from "@better/db";
import * as schema from "@better/db/schema";
import { nanoid } from "nanoid";
import { env } from "./core/env";

export const createClient = (appName: string, baseUrl: string) =>
  betterAuth({
    emailAndPassword: {
      enabled: false,
    },
    plugins: [
      emailOTP({
        disableSignUp: false,
        sendVerificationOTP: async ({ email, otp }) => {
          console.log({ email, otp });
        },
      }),
    ],
    database: drizzleAdapter(db, { provider: "pg", schema }),
    baseUrl,
    appName,
    trustedOrigins: env.TRUSTED_AUTH_ORIGINS.split(","),
    advanced: {
      defaultCookieAttributes: {
        sameSite: "None",
        secure: true,
        partitioned: true,
      },
      database: {
        generateId: () => nanoid(),
      },
    },
  });
