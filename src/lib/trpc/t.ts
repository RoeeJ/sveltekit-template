import { TRPCError, initTRPC } from "@trpc/server";
import type { inferAsyncReturnType } from "@trpc/server";
import type { RequestEvent } from "@sveltejs/kit";
import superjson from 'superjson';
export async function createContext(evt: RequestEvent) {
  const session = await evt.locals.getSession();
  return {
    session,
    locals: evt.locals,
    clientIp: evt.getClientAddress(),
    cookies: evt.cookies,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
