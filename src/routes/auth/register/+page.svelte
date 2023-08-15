<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let email = '';
	let password = '';
</script>

<form
	class="flex flex-col justify-center h-full items-center gap-4"
	action="/auth/register"
	method="post"
>
	<label for="email">Email</label>
	<input class="input input-bordered" type="email" name="email" id="email" />
	<label for="email">First Name</label>
	<input class="input input-bordered" type="text" name="fname" id="fname" />
	<label for="email">Last Name</label>
	<input class="input input-bordered" type="text" name="lname" id="lname" />

	<label for="password">Password</label>
	<input
		class="input input-bordered"
		type="password"
		name="password"
		id="password"
		bind:value={password}
	/>
	<button class="btn btn-accent w-full" type="submit">Register</button>
</form>
