import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const serverRouter = createTRPCRouter({
  createServer: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // const { name, userId } = input;
      // const newServer = await ctx.prisma.server.create({
      //   data: {
      //     name,
      //     users: {
      //       connect: {
      //         id: userId,
      //       },
      //     },
      //   },
      // });
      // console.log({ newServer });
    }),
});
