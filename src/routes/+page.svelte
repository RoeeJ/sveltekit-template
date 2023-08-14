<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { authStore } from '$lib/auth';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if $authStore}
	{@const user = $authStore}
	<p>Hi {user.fname}</p>
	<code>{JSON.stringify(user, null, 4)}</code>
	<a href="/auth/logout">Sign out</a>
{:else}
	<a href="/auth/login">Sign in</a>
{/if}
