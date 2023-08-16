// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
//import type {SvelteToastOptions} from '@zerodevx/svelte-toast';
import type { userSelectSchema } from '$lib/db/auth/schema';
import type {SvelteToastOptions} from '@zerodevx/svelte-toast/stores';
import type { z } from 'zod';
declare global {
	type User = z.infer<typeof userSelectSchema>;
	type Session = {
		user?: User;
		sessionId: string;
	}
	interface JWTSession extends Session {
		iat: number;
		exp: number;
		iss: string;
		sub: string;
	}
	namespace App {
		interface Locals {
			getSession(): Promise<JWTSession | null>;
			setSession(session: Session): Promise<void>;
			deleteSession(): Promise<void>;
			getCookie(name: string): string | undefined;
			setCookie(name: string, value: string): void;
			deleteCookie(name: string): void;
			flash(opts: SvelteToastOptions|string): void;
			flashMessages: (SvelteToastOptions|string)[];
		}
		interface PageData {
			session: Session | null;
			flashMessages: SvelteToastOptions[];
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}
export { };
