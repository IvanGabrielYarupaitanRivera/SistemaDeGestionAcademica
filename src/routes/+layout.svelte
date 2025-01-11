<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { session, supabase } = $derived(data);

	import '../app.css';

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		goto('/');
		if (error) {
			console.error(error);
		}
	};

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="flex min-h-screen">
	<!-- Sidebar -->
	<aside class="flex min-h-screen w-64 flex-col bg-gray-800">
		<!-- Header -->
		<header class="border-b border-gray-700 p-4 text-center">
			<a href="/">
				<img src="/logo/logo-colegio.webp" alt="Logo del Colegio" class="mx-auto w-20" />
				<h1 class="mt-2 text-xl font-bold text-white">Dashboard</h1>
			</a>
		</header>

		<!-- Nav -->
		<nav class="flex h-full flex-col p-4">
			<!-- Navegación Principal -->
			<section>
				<h2 class="text-md mb-2 font-semibold text-gray-400">Navegación</h2>

				<a href="/" class="block rounded p-2 text-sm text-white hover:bg-gray-700"> 🏠 Inicio </a>
				{#if session}
					<a href="/private" class="block rounded p-2 text-sm text-white hover:bg-gray-700">
						🔒 Privado
					</a>
				{/if}
			</section>

			<!-- Acciones Usuario -->
			<section class="mt-auto border-t border-gray-700 pt-4">
				<h2 class="text-md mb-2 font-semibold text-gray-400">Usuario</h2>

				{#if !session}
					<a
						href="/auth"
						class="block rounded bg-green-600 p-2 text-sm text-white hover:bg-green-700"
					>
						🔑 Ingresar
					</a>
				{/if}

				{#if session}
					<a href="/" class="block rounded p-2 text-sm text-white hover:bg-gray-700"> 🚹 Perfil </a>
					<button
						onclick={logout}
						class="w-full rounded bg-red-600 p-2 text-left text-sm text-white hover:bg-red-700"
					>
						📤 Cerrar Sesión
					</button>
				{/if}
			</section>
		</nav>

		<!-- Footer -->
		<footer class="mt-auto border-t border-gray-700 p-4">
			<small class="text-gray-400">© {new Date().getFullYear()}</small>
		</footer>
	</aside>

	<!-- Contenido principal -->
	<div class="flex flex-1 flex-col bg-yellow-100">
		<main class="flex-1 p-8">
			{@render children()}
		</main>
	</div>
</div>
