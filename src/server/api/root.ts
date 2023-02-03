import { createTRPCRouter, publicProcedure } from "./trpc";
import { exampleRouter } from "./routers/example";
import { authRouter } from "./routers/auth";
import { serverRouter } from "./routers/server";
import EventEmitter from "events";
import { roomRouter } from "./routers/room";
import { directRouter } from "./routers/direct";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  server: serverRouter,
  room: roomRouter,
  direct: directRouter,
  healthcheck: publicProcedure.query(() => "yay!"),
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const eventEmitter = new EventEmitter();
