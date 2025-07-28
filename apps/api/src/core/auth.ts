import { createClient } from "@better/auth/server";
import { env } from "./env";

export const auth = createClient("api", env.BASE_URL);
