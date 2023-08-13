import { createContext } from '$lib/trpc/t';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { z } from 'zod';
import { sequence } from '@sveltejs/kit/hooks';

import {SvelteKitAuth} from "@auth/sveltekit"
import GitHub from '@auth/core/providers/github'
import Facebook from '@auth/core/providers/facebook'
import Google from '@auth/core/providers/google'
import CredentialsProvider from '@auth/core/providers/credentials';
// import { 
//   GITHUB_ID,
//   GITHUB_SECRET,
//   FACEBOOK_ID,
//   FACEBOOK_SECRET,
//   GOOGLE_ID,
//   GOOGLE_SECRET
// } from "$env/static/private"

const authHandler = SvelteKitAuth({
	providers: [
		CredentialsProvider({
			id: 'credentials', name: 'Credentials',
			credentials: {
				username: { label: "Username", value: "admin", type: "text"},
				password: { label: "Password", type: "password", value: "admin" }
			},
			async authorize(credentials, req) {
				z.object({username: z.string(), password: z.string()}).parse(credentials);
				console.log(credentials);
				return {
					id: credentials.username,
					name: credentials.username,
					email: credentials.username + "@example.com",
				}

			}
		})
		// GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
		// Facebook({ clientId: FACEBOOK_ID, clientSecret: FACEBOOK_SECRET }),
		// Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })
	],
})
const trpcHandler = createTRPCHandle({ router, createContext });
export const handle: Handle = sequence(authHandler, trpcHandler);

