import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (evt) => {
	await evt.locals.deleteSession();

	throw redirect(302, "/");
}
