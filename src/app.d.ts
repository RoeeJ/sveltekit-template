import type { DefaultSession, User as DefaultUser } from "@auth/core/types";

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	interface User extends DefaultUser {
		id: string
	};
	interface Session extends DefaultSession {
		user?: User;
	}
	namespace App {
		interface Locals {
			getSession(): Promise<| null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}
export { };
