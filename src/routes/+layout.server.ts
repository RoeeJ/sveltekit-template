import type { LayoutServerLoad } from "./$types";
import * as Auth from "$lib/auth";
import type { Session } from "@auth/core/types";

export const load: LayoutServerLoad = async (evt) => {
	const session: Session = await evt.locals.getSession();
	return {
		user: session?.user
	}
}
