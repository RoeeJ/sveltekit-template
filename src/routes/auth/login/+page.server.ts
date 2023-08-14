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
		let validated = loginSchema.safeParse(credentials);
		if(!validated.success) {
			evt.locals.flash({
				msg: JSON.stringify(validated.error.format()),
			});
			return
		}
		let loginResult = await Login(validated.data.email, validated.data.password);
		if(loginResult == null) {
			evt.locals.flash({
				msg: "Invalid email or password",
			});
			return
		}
		let session = sessionSchema.parse(loginResult);
		evt.locals.setSession(session);
		const retUrl = evt.url.searchParams.get("redirectTo") ?? "/";
		throw redirect(302, retUrl);
	}
}
