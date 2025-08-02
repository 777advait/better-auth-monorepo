import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "hono";
import superjson from "superjson";
import { auth } from "~/core/auth";

type TRPCContext = {
  secret: string;
  headers: Headers;
};

export const createTRPCContext = async (
  _: unknown,
  c: Context
): Promise<TRPCContext> => {
  return {
    secret: "+rcgydjvWtO9WcZ3kPAHgHwlRDl4N1KnUHZopMNhp/8=",
    headers: c.req.raw.headers,
  };
};

const t = initTRPC.context<TRPCContext>().create({ transformer: superjson });

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

const isAuthenticated = t.middleware(async ({ ctx: { headers }, next }) => {
  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return await next({
    ctx: { auth: { session: session.session, user: session.user } },
  });
});

export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(isAuthenticated);
