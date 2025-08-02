import { authenticatedProcedure, createTRPCRouter } from "../init";

export const authRouter = createTRPCRouter({
  me: authenticatedProcedure.query(({ ctx: { auth } }) => auth),
});
