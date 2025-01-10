<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	import '../app.css';

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<header>
	<nav>
		<a href="/">Home</a>
		<a href="/auth">Ingresar</a>
		<a href="/private">Privado</a>
	</nav>
</header>

{@render children()}
