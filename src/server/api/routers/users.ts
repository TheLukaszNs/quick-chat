import { createTRPCRouter, protectedProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    const { prisma, session } = ctx;
    const { id } = session.user;

    return prisma.user.findMany({
      where: {
        id: {
          not: id,
        },
      },
    });
  }),
});
