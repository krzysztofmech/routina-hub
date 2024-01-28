import { trpc } from "./tRpc";
import { z } from "zod";
import { prisma } from "./prisma";
import { User } from "@prisma/client";

export const appRouter = trpc.router({
  getAllUsers: trpc.procedure.query(() => {
    return prisma.user.findMany();
  }),
  createUser: trpc.procedure
    .input(
      z.object({
        username: z.string().min(3),
        email: z.string().email(),
      })
    )
    .mutation(async ({ input }) => {
      const user: User = await prisma.user.create({
        data: {
          email: input.email,
          username: input.username,
        },
      });
      return user;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
