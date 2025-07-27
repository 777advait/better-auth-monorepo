import { createClient } from "@better/auth/server";
import { env } from "./env";

export const auth = createClient("auth-server", env.BASE_URL);
