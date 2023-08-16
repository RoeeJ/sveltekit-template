import { protectedProcedure, publicProcedure, t } from "$lib/trpc/t";
import * as Todos from "$lib/db/todo";
import { TRPCError } from "@trpc/server";
import { z } from 'zod';

export const todoRouter = t.router({
    list: publicProcedure.query(async () => {
        const res = await Todos.getAllTodos();
        return res;
    }),

    create: protectedProcedure.input(z.object({ title: z.string() })).mutation(async ({ ctx, input }) => {
        const { title } = input;
        const { user } = ctx.session;
        if (!user) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return await Todos.createTodo(
            user.id, title
        );
    }),
    delete: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const { id } = input;
        const { user } = ctx.session;
        if (!user) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return await Todos.deleteTodo(
            user.id, id
        );
    }),
    setComplete: protectedProcedure.input(z.object({ id: z.string(), complete: z.boolean() })).mutation(async ({ ctx, input }) => {
        const { id, complete } = input;
        const { user } = ctx.session;
        if (!user) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return await Todos.setTodoCompleted(
            user.id, id, complete
        );
    })
});
