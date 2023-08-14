import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { signSession, verifySession } from '$lib/auth/jwt';
import { defaultCookieOpts } from '$lib/util';

const requestHelpers: Handle = ({ event, resolve }) => {
	event.locals.setCookie = (name: string, value: string) => {
		event.cookies.set(name, value, defaultCookieOpts());
	}
	event.locals.getCookie = (name: string) => {
		return event.cookies.get(name);
	}
	event.locals.deleteCookie = (name: string) => {
		event.cookies.delete(name, defaultCookieOpts());
	}
	return resolve(event);
}
const trpcHandler = createTRPCHandle({
	router, createContext,
	responseMeta({ ctx, type }) {
		if (ctx && (type === "mutation" || type === "query")) {
				const { cookies } = ctx;
				const cookiesHeader = cookies.getAll().map(({ name, value }) =>
					cookies.serialize(name, value, defaultCookieOpts())
				).join("; ");
				return {
					headers: {
						"set-cookie": cookiesHeader,
					}
				}
			}
		return {};
	}
});
export const flashResolver: Handle = async ({ event, resolve }) => {
	event.locals.flash = (opts: ToastSettings) => {
		if (!event.locals.flashMessages) {
			event.locals.flashMessages = [];
		}
		event.locals.flashMessages.push(opts);
	}
	return resolve(event);
};
export const sessionResolver: Handle = async ({ event, resolve }) => {
	event.locals.getSession = async () => {
		let tokenCookie = event.cookies.get('jwt');
		if (!tokenCookie) {
			return null;
		}
		try {
			let session = await verifySession(tokenCookie);
			return session;
		} catch (e) {
			event.locals.deleteSession();
			return null;
		}
	};
	event.locals.setSession = async (session: Session) => {
		const token = await signSession(session);
		event.cookies.set('jwt', token, defaultCookieOpts());
	}
	event.locals.deleteSession = async () => {
		event.cookies.delete('jwt', defaultCookieOpts());
	}

	return resolve(event);
};
export const handle: Handle = sequence(requestHelpers, flashResolver, sessionResolver, trpcHandler);

