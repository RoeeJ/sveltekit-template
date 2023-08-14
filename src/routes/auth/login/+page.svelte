<script lang="ts">
	let email: string = 'admin@admin.com';
	let password: string = 'admin123';
</script>

<h1>Register</h1>

<form action="/auth/login" method="post">
	<label for="email">Email</label>
	<input type="email" name="email" id="email" bind:value={email} />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" bind:value={password} />
	<button type="submit">Login</button>
</form>
