import type { Message } from "@prisma/client";
import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { eventEmitter } from "../root";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const newMessageEventKeyBuilder = <T extends string>(roomId: T) =>
  `new-message-${roomId}` as const;

export const roomRouter = createTRPCRouter({
  getRoom: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const { id } = input;

      return ctx.prisma.room.findUnique({
        where: {
          id,
        },
        include: {
          messages: {
            include: {
              author: true,
            },
          },
        },
      });
    }),
  onNewMessage: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
      })
    )
    .subscription(({ input }) => {
      const { roomId } = input;

      const eeKey = newMessageEventKeyBuilder(roomId);

      return observable<Message>((emit) => {
        const onNewMessage = (data: Message) => {
          emit.next(data);
        };

        eventEmitter.on(eeKey, onNewMessage);

        return () => {
          eventEmitter.off(eeKey, onNewMessage);
        };
      });
    }),
  newMessage: protectedProcedure
    .input(
      z.object({
        roomId: z.string(),
        text: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      const { text, roomId } = input;
      const { id: userId } = ctx.session.user;

      const eeKey = newMessageEventKeyBuilder(roomId);

      const message = ctx.prisma.message.create({
        data: {
          content: text,
          author: {
            connect: {
              id: userId,
            },
          },
          room: {
            connect: {
              id: roomId,
            },
          },
        },
      });

      eventEmitter.emit(eeKey, message);

      return message;
    }),
});
