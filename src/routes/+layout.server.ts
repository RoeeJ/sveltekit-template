import type { LayoutServerLoad } from "./$types";
import type { Session } from "@auth/core/types";

export const load: LayoutServerLoad = async (evt) => {
	const session = await evt.locals.getSession();
	return {
		flashMessages: evt.locals.flashMessages,
		session
	}
}
