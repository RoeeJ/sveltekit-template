import type { Actions } from "./$types";
import {userInsertSchema, userTable} from "$lib/db/auth/schema";
import {redirect} from "@sveltejs/kit";
import * as bcr from "bcrypt";
import { dbClient } from "$lib/db/client";
export const actions: Actions = {
	default: async (evt) => {
		const fd = await evt.request.formData();
		const credentials = Object.fromEntries(fd.entries());
		const validation = userInsertSchema.safeParse(credentials);
		if (!validation.success) {
			evt.locals.flash(validation.error.message);
			throw redirect(302, "/auth/register")
		}
		let password = bcr.hashSync(credentials.password.toString(), 10);

		dbClient.insert(userTable).values({
			email: credentials.email.toString(),
			password,
			fname: credentials.fname.toString(),
			lname: credentials.lname.toString(),
		}).execute();

		evt.locals.flash("Account created successfully");
		throw redirect(302, "/auth/login")
	},
}
