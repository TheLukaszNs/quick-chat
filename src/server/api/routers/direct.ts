import { DirectMessage } from "@prisma/client";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { eventEmitter } from "../root";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const newMessageEventKeyBuilder = <T extends string>(directRoomId: T) =>
  `new-message-direct-${directRoomId}` as const;

export const directRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;

    const user = await ctx.prisma.user.findFirst({
      where: {
        id,
      },
      select: {
        directRooms: {
          include: {
            messages: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return user.directRooms;
  }),
  addDirectRoom: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        receiverId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, receiverId } = input;
      const newDirectRoom = await ctx.prisma.directRoom.create({
        data: {
          users: {
            connect: [
              {
                id: userId,
              },
              {
                id: receiverId,
              },
            ],
          },
        },
      });

      return newDirectRoom;
    }),
  onMessage: protectedProcedure
    .input(
      z.object({
        directRoomId: z.string(),
      })
    )
    .subscription(({ input }) => {
      const { directRoomId } = input;

      const eeKey = newMessageEventKeyBuilder(directRoomId);

      return observable<DirectMessage>((emit) => {
        const onMessage = (data: DirectMessage) => {
          emit.next(data);
        };

        eventEmitter.on(eeKey, onMessage);

        return () => {
          eventEmitter.off(eeKey, onMessage);
        };
      });
    }),
  newMessage: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1),
        directRoomId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { text, directRoomId } = input;
      const { id: userId } = ctx.session.user;

      const eeKey = newMessageEventKeyBuilder(directRoomId);

      const message = ctx.prisma.directMessage.create({
        data: {
          content: text,
          author: {
            connect: {
              id: userId,
            },
          },
          room: {
            connect: {
              id: directRoomId,
            },
          },
        },
      });

      eventEmitter.emit(eeKey, message);

      return message;
    }),
});
