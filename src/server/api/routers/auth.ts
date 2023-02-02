import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ input }) => {
      console.log(input);
      return;
    }),
});
