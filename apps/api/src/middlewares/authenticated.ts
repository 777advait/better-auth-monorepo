import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { auth } from "~/core/auth";

export const isAuthenticated = createMiddleware<{
  Variables: {
    session: typeof auth.$Infer.Session.session;
    user: typeof auth.$Infer.Session.user;
  };
  Bindings: {
    auth: typeof auth;
  };
}>(async (c, next) => {
  const headers = new Headers();

  headers.set("Cookie", c.req.header("Cookie") ?? "");
  const sessionData = await auth.api.getSession({ headers });

  console.log("Session Data:", sessionData);

  if (!sessionData) throw new HTTPException(401, { cause: "UNAUTHORIZED" });

  c.set("session", sessionData.session);
  c.set("user", sessionData.user);

  return await next();
});
