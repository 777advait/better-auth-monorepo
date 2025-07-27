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
  const headersObj = Object.fromEntries(c.req.raw.headers.entries());
  console.log("Incoming headers:", headersObj); // Should show { cookie: "...", origin: "...", etc. }

  // Also log the specific cookie for sanity
  const cookie = c.req.header("Cookie");
  console.log("Cookie header:", cookie); // Expect: "__Secure-better-auth.session_token=..."
  const sessionData = await auth.api.getSession({ headers: c.req.raw.headers });

  console.log("Session Data:", sessionData);

  if (!sessionData) throw new HTTPException(401, { cause: "UNAUTHORIZED" });

  c.set("session", sessionData.session);
  c.set("user", sessionData.user);

  return await next();
});
