<script lang="ts">
	import NavLinks from './NavLinks.svelte';
</script>

<header class="sticky top-0 z-30 bg-white shadow-md">
	<!-- Nav: Contenedor de navegación responsiva -->
	<nav class="mx-auto flex max-w-7xl items-center justify-center p-4 md:justify-between">
		<!-- Logo y nombre del colegio -->
		<a href="/privado" class="flex items-center gap-4">
			<img src="/logo/logo-sistema.webp" alt="Logo Sistema" class="h-12 w-12" />
			<span class="hidden text-lg font-bold text-neutral-800 md:flex">Sistema</span>
		</a>

		<!-- Lista de navegación - se oculta en móviles -->
		<NavLinks />
	</nav>
</header>
