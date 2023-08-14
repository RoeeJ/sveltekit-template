import { dbClient } from "$lib/db/client";
import { userTable } from "$lib/db/auth/schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcrypt";

type LoginFunction = (email: string, password: string) => Promise<Session | null>;
export const Login: LoginFunction = async (email: string, password: string) => {
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
	return {
		user
	}
};

