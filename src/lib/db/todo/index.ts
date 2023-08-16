import { dbClient } from "../client";
import { todoTable } from "./schema";
import { eq, and } from "drizzle-orm";

export const getUserTodos = async (userId: string) => {
	return dbClient.select().from(todoTable).where(eq(todoTable.userId, userId)).execute();
}

export const getAllTodos = async () => {
	return dbClient.select().from(todoTable).orderBy(todoTable.createdAt).execute();
}

export const getActiveTodos = async () => {
	return dbClient.select().from(todoTable).where(eq(todoTable.completed, false)).execute();
}

export const createTodo = async (userId: string, title: string, ) => {
	try {
		let inserted = await dbClient.insert(todoTable).values({
			userId,
			title,
			createdAt: new Date(),
			updatedAt: new Date(),
		}).returning().execute();
		if (inserted.length > 0) {
			return inserted[0];
		}
	} catch (e) {
		console.error(e);
	}
}

export const updateTodo = async (userId: string, todoId: string, title: string, completed: boolean) => {
	return dbClient.update(todoTable).set({
		title,
		completed,
		updatedAt: new Date(),
	}).where(and(eq(todoTable.userId, userId), eq(todoTable.id, todoId))).execute();
}

export const setTodoCompleted = async (userId: string, todoId: string, completed: boolean) => {
	return dbClient.update(todoTable).set({
		completed,
		updatedAt: new Date(),
	}).where(and(eq(todoTable.userId, userId), eq(todoTable.id, todoId))).execute();
}

export const deleteTodo = async (userId: string, todoId: string) => {
	return dbClient.delete(todoTable).where(and(eq(todoTable.userId, userId), eq(todoTable.id, todoId))).execute();
}
