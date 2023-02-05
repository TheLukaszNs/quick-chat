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
  getServer: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { id } = input;

      const server = await ctx.prisma.server.findFirst({
        where: {
          id,
        },
        include: {
          users: true,
          rooms: true,
        },
      });

      if (!server) {
        return null;
      }

      if (!server.users.some((user) => user.id === userId)) {
        throw new Error("You are not a member of this server");
      }

      return server;
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

      const room = await ctx.prisma.room.create({
        data: {
          name,
          server: {
            connect: {
              id: serverId,
            },
          },
        },
      });

      return room;
    }),
  addMember: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        serverId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, serverId } = input;

      const server = await ctx.prisma.server.update({
        where: {
          id: serverId,
        },
        data: {
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return server;
    }),
});
