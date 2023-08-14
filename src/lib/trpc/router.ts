import { protectedProcedure, publicProcedure, t } from '$lib/trpc/t';
import { authRouter } from './routers/auth';
export const router = t.router({
  auth: authRouter,
});

export type Router = typeof router;
