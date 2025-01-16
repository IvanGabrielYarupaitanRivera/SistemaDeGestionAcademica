<script lang="ts">
	import NavLinks from './NavLinks.svelte';
</script>

<header class="sticky top-0 z-30 bg-white shadow-md">
	<!-- Nav: Contenedor de navegación responsiva -->
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-4">
		<!-- Logo y nombre del colegio -->
		<a href="/" class="flex items-center gap-4">
			<img src="/logo/logo-colegio.webp" alt="Logo Colegio" class="h-12 w-12" />
			<span class="text-lg font-bold text-neutral-800">Colegio</span>
		</a>

		<!-- Lista de navegación - se oculta en móviles -->
		<NavLinks />
	</nav>
</header>
