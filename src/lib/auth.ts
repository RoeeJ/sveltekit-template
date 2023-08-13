import { page } from "$app/stores";
import { get } from "svelte/store";
import { browser } from "$app/environment";
import type { Session, User } from "@auth/core/types";
import type { MaybePromise, ServerLoadEvent } from "@sveltejs/kit";
export async function getUser(evt?: ServerLoadEvent): Promise<User> {
	if (browser) {
		const user: User = get(page).data.user;
		return Promise.resolve(user);
	} else if (evt) {
		const session: Session = await evt.locals.getSession();
		return Promise.resolve(session.user);
	}
	return Promise.reject(new Error("No session available"));

}

