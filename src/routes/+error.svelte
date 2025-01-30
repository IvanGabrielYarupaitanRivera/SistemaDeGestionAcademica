<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import { page } from '$app/state';
</script>

<main class="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-16">
	<div
		class="rounded-xl bg-white p-8 text-center shadow-lg ring-1 ring-neutral-200 transition-shadow hover:shadow-xl"
	>
		<div>
			<h1 class="text-4xl font-semibold tracking-tight text-neutral-900">
				{page.status}
			</h1>

			<h2 class="mt-2 text-2xl font-medium text-neutral-700">Página no encontrada</h2>

			<p class="mx-auto mb-8 mt-1 max-w-sm text-center text-neutral-600">
				No pudimos encontrar la página que estás buscando.
			</p>
		</div>
		<a
			href="/"
			class="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2
                text-sm font-medium text-white shadow transition-all
                hover:bg-neutral-800 hover:shadow-md active:scale-95 active:transform"
		>
			<ArrowLeft class="h-4 w-4" />
			Volver al inicio
		</a>
	</div>
</main>
