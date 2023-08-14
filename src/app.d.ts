// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
//import type {SvelteToastOptions} from '@zerodevx/svelte-toast';
import type {SvelteToastOptions} from '@zerodevx/svelte-toast/stores';
declare global {
	interface User {
		id: string;
		fname: string;
		lname: string;
		email: string;
		password?: string;
		createdAt: Date;
		updatedAt?: Date;
	};
	interface Session {
		user?: User;
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
			flashMessages: ToastSettings[];
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}
export { };
