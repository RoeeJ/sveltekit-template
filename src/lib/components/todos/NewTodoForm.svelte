<script lang="ts">
	import { trpc } from '$lib/trpc/client';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let title = '';
	async function createTodo() {
		let resp = await trpc().todos.create.mutate({ title });
		console.log(resp);
		title = '';
		dispatch('createTodo', { title });
	}
</script>

<div class="flex flex-col gap-2 border-warning border-2 rounded-xl p-4">
	<input class="input input-bordered" type="text" placeholder="Title" bind:value={title} />
	<button class="btn variant-filled-primary" on:click={createTodo}>Create</button>
</div>
