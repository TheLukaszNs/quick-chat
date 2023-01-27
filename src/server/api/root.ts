import { createTRPCRouter, publicProcedure } from "./trpc";
import { exampleRouter } from "./routers/example";
import { observable } from "@trpc/server/observable";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  healthcheck: publicProcedure.query(() => "yay!"),
  randomNumber: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random());
      }, 500);
      return () => {
        clearInterval(int);
      };
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
