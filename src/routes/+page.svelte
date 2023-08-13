<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/auth';
	let greeting = '';
	let secret = '';
	async function handleClick() {
		greeting = await trpc($page).greeting.query();
		if ($authStore) {
		}
	}
	onMount(async () => {
		handleClick();
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={handleClick}>Click me</button>

<p>{greeting}</p>

{#if $authStore}
	{@const user = $authStore}
	{@const secretProm = trpc($page).secret.query()}
	<p>Hi {user.name}</p>
	{#await secretProm}
		<p>loading...</p>
	{:then secret}
		<p>{secret}</p>
	{/await}
	<a href="/auth/signout">Sign out</a>
{:else}
	<a href="/auth/signin">Sign in</a>
{/if}
