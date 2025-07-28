import { createClient } from "@better/auth/client";
import { env } from "~/env";

export const { signIn, signOut, emailOtp } = createClient(
  env.NEXT_PUBLIC_API_URL
);
