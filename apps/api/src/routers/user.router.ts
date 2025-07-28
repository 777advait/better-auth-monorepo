import { Hono } from "hono";
import { isAuthenticated } from "~/middlewares/authenticated";

export const userRouter = new Hono()
  .use(isAuthenticated)
  .get("/me", (c) => c.json({ user: c.var.user, session: c.var.session }));
