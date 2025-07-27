import { createClient } from "@better/auth/server";
import { env } from "~/env";

export const auth = createClient("web", env.NEXT_PUBLIC_AUTH_URL);
