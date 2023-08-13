<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import * as Auth from '$lib/auth';
	async function handleClick() {
		greeting = await trpc($page).greeting.query();
	}
	let greeting = '';
	onMount(async () => {
		greeting = await trpc($page).greeting.query();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={handleClick}>Click me</button>

{#if greeting}
	<p>{greeting}</p>
{/if}

{#await Auth.getUser()}
	<p>Checking session...</p>
{:then user}
	{#if user}
		<p>Hi {JSON.stringify(user, null, 4)}</p>
		<a href="/auth/signout">Sign out</a>
	{:else}
		<a href="/auth/signin">Sign in</a>
	{/if}
{:catch error}
	<p>{error}</p>
{/await}
