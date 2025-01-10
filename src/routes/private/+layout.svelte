<script>
	import { goto } from '$app/navigation';

	let { data, children } = $props();
	let { supabase } = $derived(data);

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		goto('/');
		if (error) {
			console.error(error);
		}
	};
</script>

<header>
	<nav>
		<a href="/">Home</a>
	</nav>
	<button onclick={logout}>Logout</button>
</header>

<main>
	{@render children()}
</main>
