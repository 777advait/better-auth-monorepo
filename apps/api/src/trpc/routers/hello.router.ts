import z from "zod";
import { createTRPCRouter, publicProcedure } from "../init";

export const helloRouter = createTRPCRouter({
  meJalo: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input: { name } }) => `Me Jalo ${name}`),
});
