// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
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
			getSession(): Promise<JWTSession|null>;
			setSession(session: Session): Promise<void>;
			deleteSession(): Promise<void>;
			flash(type: string, message: string): void;
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
