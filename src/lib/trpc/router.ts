import { protectedProcedure, publicProcedure, t } from '$lib/trpc/t';
import { authRouter } from './routers/auth';
import { todoRouter } from './routers/todo';
export const router = t.router({
  auth: authRouter,
  todos: todoRouter,
});

export type Router = typeof router;
