import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP } from "better-auth/plugins";
import { db } from "@better/db";
import * as schema from "@better/db/schema";

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
    database: drizzleAdapter(db, { provider: "sqlite", schema }),
    baseUrl,
    appName,
    trustedOrigins: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    advanced: {
      defaultCookieAttributes: {
        sameSite: "None",
        secure: true,
        partitioned: true,
        domain: "localhost",
      },
    },
  });
