import { page } from "$app/stores";
import { derived, get } from "svelte/store";
import { browser } from "$app/environment";
import type { RequestEvent, ServerLoadEvent } from "@sveltejs/kit";

export const authStore = derived(page, ($page) => {
	return $page.data.session?.user;
});
export async function getUser(evt?: ServerLoadEvent|RequestEvent): Promise<User|undefined> {
	if (browser) {
		const user = get(page).data.session?.user;
		return Promise.resolve(user);
	} else if (evt) {
		const session = await evt.locals.getSession();
		if (!session) {
			return Promise.reject(new Error("No session available"));
		}
		return Promise.resolve(session.user as User);
	}
	return Promise.reject(new Error("No session available"));

}

