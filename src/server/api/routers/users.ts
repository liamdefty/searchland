import { createInsertSchema } from 'drizzle-zod';

import { createTRPCRouter, publicProcedure } from "@searchland/server/api/trpc";
import { users } from "@searchland/server/db/schema";

export const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(createInsertSchema(users))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(users).values(input);
    }),

  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findMany({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
  }),
});
