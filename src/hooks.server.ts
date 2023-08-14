import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import { signSession, verifySession } from '$lib/auth/jwt';
const trpcHandler = createTRPCHandle({ router, createContext });
export const flashResolver: Handle = async ({ event, resolve }) => {
	event.locals.flash = (type: string, message: string) => {
		console.log(type, message);
	}
	return resolve(event);
};
export const sessionResolver: Handle = async ({ event, resolve }) => {
	const cookieOpts = {
		path: '/',
		httpOnly: true,
		expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
	};
	event.locals.getSession = async () => {
		let tokenCookie = event.cookies.get('jwt');
		if (!tokenCookie) {
			return null;
		}
		try {
			let session = await verifySession(tokenCookie);
			return session as Session;
		} catch (e) {
			event.locals.deleteSession();
			return null;
		}
	};
	event.locals.setSession = async (session: Session) => {
		const token = await signSession(session);
		event.cookies.set('jwt', token, cookieOpts);
	}
	event.locals.deleteSession = async () => {
		event.cookies.delete('jwt', cookieOpts);
	}

	return resolve(event);
};
export const handle: Handle = sequence(flashResolver, sessionResolver, trpcHandler);

