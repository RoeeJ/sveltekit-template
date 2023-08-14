<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	let email: string = 'admin@admin.com';
	let password: string = 'admin123';
	async function handleSubmit() {
		trpc($page).auth.signup.mutate({ email, password });
	}
</script>

<div>
	<h1>Register</h1>
	<form action="/auth/register" method="post">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" bind:value={email} />
		<label for="password">Password</label>
		<input type="password" name="password" id="password" bind:value={password} />
		<button type="submit">Register</button>
	</form>
</div>
