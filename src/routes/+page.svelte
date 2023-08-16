<script lang="ts">
	import { authStore, userStore } from '$lib/auth';
</script>

<div class="flex flex-col gap-4 h-full justify-center items-center text-center">
	<h1 class="text-3xl">Welcome to SvelteKit</h1>
	<p>
		Visit <a class="hyperlink" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>
	<p>
		Visit <a class="hyperlink" href="/todos">todos</a> to see the todos example
	</p>
	{#if $authStore}
		{@const user = $userStore}
		<p>Hi {user?.fname}</p>
		<a class="btn variant-filled-primary" href="/auth/logout">Sign out</a>
	{:else}
		<a class="btn variant-filled-primary" href="/auth/login?redirectTo=/">Sign in</a>
	{/if}
</div>
