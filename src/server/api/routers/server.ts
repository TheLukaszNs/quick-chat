import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const serverRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;

    const user = await ctx.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        servers: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return user.servers;
  }),
  createServer: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, userId } = input;

      const server = await ctx.prisma.server.create({
        data: {
          name,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return server;
    }),
  addRoom: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        serverId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, serverId } = input;

      const room = await ctx.prisma.server.update({
        where: {
          id: serverId,
        },
        data: {
          rooms: {
            create: {
              name,
            },
          },
        },
      });

      return room;
    }),
});
