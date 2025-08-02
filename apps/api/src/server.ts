import app from "./app";

import { serve } from "bun";

const server = serve({ fetch: app.fetch, port: 3001, idleTimeout: 60 });

console.log(`Server running at :${server.port}`);

process.on("SIGINT", () => {
  server.stop();
  process.exit(0);
});
process.on("SIGTERM", () => {
  server.stop();
});
