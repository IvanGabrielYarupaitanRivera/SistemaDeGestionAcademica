<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '../app.css';
	import { Book, BookOpen, Home, Lock, LockKeyhole, LogIn, LogOut, User } from 'lucide-svelte';
	import { perfilStore } from '$lib/stores/perfil';

	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);

	const toggleMobileMenu = () => {
		isMobileMenuOpen = !isMobileMenuOpen;
	};

	const logout = async () => {
		const { error } = await supabase.auth.signOut();

		toggleMobileMenu();
		if (error) {
			console.error(error);
		}

		goto('/');
	};

	const menuItems = [
		{
			href: '/privado',
			icon: Lock,
			label: 'Privado',
			roles: ['Administrador', 'Profesor', 'Estudiante']
		},
		{
			href: '/privado/administrador',
			icon: LockKeyhole,
			label: 'Administrador',
			roles: ['Administrador']
		},
		{
			href: '/privado/profesor',
			icon: BookOpen,
			label: 'Profesor',
			roles: ['Profesor', 'Administrador']
		},
		{
			href: '/privado/estudiante',
			icon: Book,
			label: 'Estudiante',
			roles: ['Estudiante', 'Administrador']
		}
	];

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	let isMobileMenuOpen = $state(false);
</script>

<svelte:head>
	<title>Sistema de gestión Académica</title>
</svelte:head>

<div class="flex min-h-screen">
	<button
		class="fixed left-4 top-4 z-50 rounded bg-neutral-800 p-2 text-white lg:hidden"
		onclick={toggleMobileMenu}
		aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
		aria-expanded={isMobileMenuOpen}
	>
		<span aria-hidden="true">{isMobileMenuOpen ? '✕' : '☰'}</span>
	</button>

	<aside
		class={`fixed z-40 flex min-h-screen w-64 flex-col bg-neutral-800 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
		aria-label="Navegación principal"
	>
		<header class="border-b border-neutral-700 p-4">
			<a href="/" class="flex flex-col items-center" onclick={toggleMobileMenu}>
				<img src="/logo/logo-colegio.webp" alt="Logo del Colegio" class="w-16 lg:w-20" />
				<h2 class="mt-2 text-lg font-bold text-white lg:text-xl">Dashboard</h2>
			</a>
		</header>

		<nav class="flex h-full flex-1 flex-col p-4">
			<section class="mb-6" aria-label="Enlaces principales">
				<h2 class="mb-2 text-sm font-semibold text-gray-400">Navegación</h2>

				<a
					href="/"
					class="flex items-center gap-2 rounded p-2 text-sm text-white hover:bg-neutral-700"
					onclick={toggleMobileMenu}
				>
					<Home size={18} /> <span>Inicio</span>
				</a>

				{#if session}
					{#each menuItems as { href, icon: Icon, label, roles }}
						{#if roles.includes(user?.user_metadata?.rol)}
							<a
								{href}
								data-sveltekit-preload-data
								class="flex items-center gap-2 rounded p-2 text-sm text-white hover:bg-neutral-700"
								onclick={toggleMobileMenu}
							>
								<Icon size={18} /> <span>{label}</span>
							</a>
						{/if}
					{/each}
				{/if}
			</section>

			<section class="mt-auto border-t border-neutral-700 pt-4" aria-label="Acciones de usuario">
				<h2 class="mb-2 text-sm font-semibold text-gray-400">Usuario</h2>
				{#if session}
					<a
						href="/privado/perfil"
						class="flex items-center gap-2 rounded p-2 text-sm text-white hover:bg-neutral-700"
						onclick={toggleMobileMenu}
					>
						<User size={18} /> <span>Perfil</span>
					</a>
					<button
						onclick={logout}
						class="flex w-full items-center gap-2 rounded p-2 text-left text-sm text-white hover:bg-neutral-700"
					>
						<LogOut size={18} /> <span>Cerrar Sesión</span>
					</button>
				{:else}
					<a
						href="/ingresar"
						class="flex items-center gap-2 rounded p-2 text-sm text-white hover:bg-neutral-700"
						onclick={toggleMobileMenu}
					>
						<LogIn size={18} /> <span>Ingresar</span>
					</a>
				{/if}
			</section>
		</nav>

		<footer class="mt-auto border-t border-neutral-700 p-4 text-center">
			<small class="text-gray-400">© {new Date().getFullYear()}</small>
		</footer>
	</aside>

	<main class="relative flex-1 bg-neutral-100 transition-all duration-300 lg:ml-64">
		{@render children()}
	</main>

	{#if isMobileMenuOpen}
		<div
			class="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
			onclick={toggleMobileMenu}
			aria-hidden="true"
		></div>
	{/if}
</div>
