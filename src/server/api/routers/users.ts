import { createInsertSchema } from 'drizzle-zod';

import { createTRPCRouter, publicProcedure } from "@searchland/server/api/trpc";
import { users } from "@searchland/server/db/schema";

export const usersRouter = createTRPCRouter({
  create: publicProcedure
    .input(createInsertSchema(users))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await ctx.db.insert(users).values(input);
    }),

  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.users.findFirst({
      orderBy: (users, { desc }) => [desc(users.createdAt)],
    });
  }),
});
