import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "./core/env";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});
export const db = drizzle({
  client: pool,
  logger: true,
  schema,
  casing: "snake_case",
});
