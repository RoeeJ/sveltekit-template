<script lang="ts">
	import { page } from '$app/stores';
	import './global.css';
	import { onMount } from 'svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { toast } from '@zerodevx/svelte-toast';

	onMount(() => {
		if ($page.data.flashMessages) {
			for (const message of $page.data.flashMessages) {
				toast.push(message);
			}
		}
	});
</script>

<div class="h-screen w-screen flex flex-col items-center">
	<SvelteToast />
	<slot />
</div>
