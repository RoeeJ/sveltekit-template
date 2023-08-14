import { z } from "zod";
import type { Actions } from "./$types";
import { Login } from "$lib/db/auth";
import { redirect } from "@sveltejs/kit";
import { userSelectSchema } from "$lib/db/auth/schema";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const sessionSchema = z.object({
	user: userSelectSchema.omit({ password: true }),
})

export const actions: Actions = {
	default: async (evt) => {
		let fd = await evt.request.formData();
		let credentials = Object.fromEntries(fd.entries());
		let validated = loginSchema.parse(credentials);
		let loginResult = await Login(validated.email, validated.password);
		if(loginResult == null) {
			evt.locals.flash("error", "Invalid credentials");
			throw redirect(302,"/auth/login");
		}
		let session = sessionSchema.parse(loginResult);
		evt.locals.setSession(session);
		evt.locals.flash("success", "Logged in successfully");
		throw redirect(302, "/");
	}
}
