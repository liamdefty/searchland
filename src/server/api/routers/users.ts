
import { createTRPCRouter, publicProcedure } from "@searchland/server/api/trpc";
import { users, insertUserSchema } from "@searchland/server/db/schema";
import { eq, count } from "drizzle-orm";
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

  getUser: publicProcedure.input(z.object({ id: z.coerce.number() })).query(({ ctx, input}) => {
    return ctx.db.select().from(users).where(eq(users.id, input.id));
  }),

  getPaginatedUsers: publicProcedure.input(z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
  })).query(async ({ ctx, input }) => {
    const items = await ctx.db.query.users.findMany({
      limit: input.limit,
      offset: (input.page - 1) * input.limit,
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });

    const total = await ctx.db.select({ count: count() }).from(users);

    return {
      items,
      totalPages: Math.ceil((total[0]?.count ?? 0) / input.limit),
      page: input.page,
      limit: input.limit,
    };
  }),
});
