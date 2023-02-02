import { createTRPCRouter, publicProcedure } from "./trpc";
import { exampleRouter } from "./routers/example";
import { authRouter } from "./routers/auth";
import { serverRouter } from "./routers/server";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  server: serverRouter,
  healthcheck: publicProcedure.query(() => "yay!"),
});

// export type definition of API
export type AppRouter = typeof appRouter;
