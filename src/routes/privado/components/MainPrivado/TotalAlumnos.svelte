<script lang="ts">
	import { Users } from 'lucide-svelte';

	let { totalEstudiantes } = $props();
</script>

<article class="rounded-lg bg-white p-4 shadow-sm ring-1 ring-neutral-200">
	<header class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-neutral-500">Total de Estudiantes</h2>
		<Users class="h-5 w-5 text-neutral-400" />
	</header>

	<p class="mt-1 text-2xl font-semibold text-neutral-900">
		{totalEstudiantes}
	</p>
</article>
