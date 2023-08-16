import { dbClient } from "$lib/db/client";
import { sessionSelectSchema, sessionTable, userTable } from "$lib/db/auth/schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";
import type { z } from "zod";

type LoginFunction = (email: string, password: string) => Promise<Session | null>;
export const login: LoginFunction = async (email: string, password: string) => {
	let user = await dbClient
		.select()
		.from(userTable)
		.where(eq(userTable.email, email))
		.limit(1)
		.then(users => {
			if (users.length == 0) {
				return null;
			}
			return users[0];
		});
	if (user == null) {
		return null;
	}
	let passwordMatch = await bcrypt.compare(password, user.password);
	if (!passwordMatch) {
		return null;
	}
	let newSession = await dbClient.insert(sessionTable).values({
		userId: user.id,
		createdAt: new Date(),
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
	}).returning().execute();
	return {
		sessionId: newSession[0].id,
		user
	}
};
export const getUserSessions = async (userId: string) => {
	return dbClient.select().from(sessionTable).where(eq(sessionTable.userId, userId)).execute();
};
export default {
	login,
	getUserSessions,
}
