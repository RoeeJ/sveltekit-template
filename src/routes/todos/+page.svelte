<script lang="ts">
	import { authStore, userStore } from '$lib/auth';
	import { trpc } from '$lib/trpc/client';
	import type { Todo } from '$lib/db/todo/schema';
	import { onDestroy, onMount } from 'svelte';
	import NewTodoForm from '$lib/components/todos/NewTodoForm.svelte';
	let todos: Todo[] = [];

	async function refreshTodos() {
		todos = await trpc().todos.list.query();
	}
	async function toggleTodo(todo: Todo) {
		trpc().todos.setComplete.mutate({ id: todo.id, complete: todo.completed }).then(refreshTodos);
	}
	onMount(async () => {
		await refreshTodos();
	});
</script>

<div class="h-full flex flex-col justify-center items-center gap-4">
	<p>{todos.length} todos</p>
	<NewTodoForm on:createTodo={refreshTodos} />
	<ol class="flex flex-col gap-4">
		{#each todos as todo (todo.id)}
			<li class="flex flex-row gap-4 justify-between items-center">
				<input
					class="checkbox"
					type="checkbox"
					bind:checked={todo.completed}
					on:change={toggleTodo.bind(null, todo)}
				/>
				<p class:line-through={todo.completed}>{todo.title}</p>
			</li>
		{/each}
	</ol>
	<button class="btn btn-outline btn-info" on:click={refreshTodos}>Refresh</button>
</div>
