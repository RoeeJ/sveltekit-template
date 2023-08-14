<script lang="ts">
	let email: string = 'admin@admin.com';
	let password: string = 'admin123';
</script>

<form method="post" class="flex flex-col h-full items-center justify-center gap-2 text-center">
	<label for="email">Email</label>
	<input class="input input-bordered" type="email" name="email" id="email" bind:value={email} />
	<label for="password">Password</label>
	<input
		class="input input-bordered"
		type="password"
		name="password"
		id="password"
		bind:value={password}
	/>
	<button type="submit" class="w-full btn variant-ghost-primary mt-4">Login</button>
	<div class="flex flex-row justify-between gap-6 mt-4">
		<a href="/auth/register" class="btn btn-outline btn-xs btn-primary">Register</a>
		<a href="/auth/forgot-password" class="btn btn-outline btn-xs btn-warning">Forgot Password</a>
	</div>
</form>
