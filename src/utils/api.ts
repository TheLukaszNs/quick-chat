/**
 * This is the client-side entrypoint for your tRPC API.
 * It's used to create the `api` object which contains the Next.js App-wrapper
 * as well as your typesafe react-query hooks.
 *
 * We also create a few inference helpers for input and output types
 */
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { wsLink, createWSClient } from "@trpc/client/links/wsLink";
import superjson from "superjson";

import { type AppRouter } from "../server/api/root";
import { type NextPageContext } from "next";
import getConfig from "next/config";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { publicRuntimeConfig } = getConfig();

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { APP_URL, WS_URL } = publicRuntimeConfig;

const getEndingLink = (ctx: NextPageContext | undefined) => {
  if (typeof window === "undefined") {
    return httpBatchLink({
      url: `${APP_URL as string}/api/trpc`,
      headers() {
        if (ctx?.req) {
          // on ssr, forward client's headers to the server
          return {
            ...ctx.req.headers,
            "x-ssr": "1",
          };
        }
        return {};
      },
    });
  }
  const client = createWSClient({
    url: WS_URL as string,
  });
  return wsLink<AppRouter>({
    client,
  });
};

/**
 * A set of typesafe react-query hooks for your tRPC API
 */
export const api = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      /**
       * Transformer used for data de-serialization from the server
       * @see https://trpc.io/docs/data-transformers
       **/
      transformer: superjson,

      /**
       * Links used to determine request flow from client to server
       * @see https://trpc.io/docs/links
       * */
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        getEndingLink(ctx),
      ],
    };
  },
  /**
   * Whether tRPC should await queries when server rendering pages
   * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
   */
  ssr: false,
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
