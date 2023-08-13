import { protectedProcedure, publicProcedure, t } from '$lib/trpc/t';
export const router = t.router({
  greeting: publicProcedure.query(async () => {
    return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
  }),
  secret: protectedProcedure.query(async () => {
    return `Hello secret world @ ${new Date().toLocaleTimeString()}`;
  })
});

export type Router = typeof router;
