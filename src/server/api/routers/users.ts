
import { createTRPCRouter, publicProcedure } from "@searchland/server/api/trpc";
import { users, insertUserSchema } from "@searchland/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from 'zod';

export const usersRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(insertUserSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(users).values(input);
    }),

  deleteUser: publicProcedure.input(z.object({ id: z.coerce.number() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(users).where(eq(users.id, input.id));
  }),

  getPaginatedUsers: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
  }),
});
