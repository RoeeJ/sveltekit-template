import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { config } from 'dotenv';

export default defineConfig(({ mode }) => {
	config();

	return {
		plugins: [sveltekit()],
		server: {
			port: 3000,
		},
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	}
})
