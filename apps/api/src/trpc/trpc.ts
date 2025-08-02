import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "./init";
import { helloRouter } from "./routers/hello.router";
import { authRouter } from "./routers/auth.router";

export const appRouter = createTRPCRouter({
  hello: helloRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
