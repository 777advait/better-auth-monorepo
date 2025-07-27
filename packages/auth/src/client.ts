import { createAuthClient } from "better-auth/client";
import { emailOTPClient } from "better-auth/client/plugins";

export const createClient = (baseURL: string) =>
  createAuthClient({
    baseURL,
    plugins: [emailOTPClient()],
    fetchOptions: { credentials: "include" },
  });
