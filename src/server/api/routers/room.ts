import { observable } from "@trpc/server/observable";
import { z } from "zod";
import { eventEmitter } from "../root";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const roomRouter = createTRPCRouter({
  onNewMessage: protectedProcedure.subscription(() => {
    return observable<any>((emit) => {
      const onNewMessage = (data: any) => {
        emit.next(data);
      };

      eventEmitter.on("new-message", onNewMessage);

      return () => {
        eventEmitter.off("new-message", onNewMessage);
      };
    });
  }),
  newMessage: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      const { text } = input;
      const { id: userId } = ctx.session.user;

      eventEmitter.emit("new-message", { text, userId });
    }),
});
