<script lang="ts">
	import { Check, X } from 'lucide-svelte';

	let { data } = $props();
	let { cursosConNotas } = $derived(data);

	const getEstadoNota = (promedio: number) => promedio >= 11;

	const EVALUACIONES = [
		{ label: 'Parcial 1', key: 'parcial_1' },
		{ label: 'Parcial 2', key: 'parcial_2' },
		{ label: 'Parcial 3', key: 'parcial_3' },
		{ label: 'Promedio', key: 'promedio_parciales' }
	] as const;
</script>

<main class="space-y-6">
	<header>
		<h1 class="text-2xl font-semibold text-neutral-900">Notas por Curso</h1>
	</header>

	<section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each cursosConNotas as { curso, notas }}
			<article
				class="group rounded-lg bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-md"
			>
				<header class="border-b p-4">
					<div class="flex items-center justify-between gap-4">
						<h2 class="line-clamp-1 font-medium text-neutral-900" title={curso.nombre}>
							{curso.nombre}
						</h2>
						<span
							class="rounded-full px-2.5 py-1 text-xs font-medium {notas.promedio_parciales >= 11
								? 'bg-green-50 text-green-700'
								: 'bg-red-50 text-red-700'}"
						>
							{notas.promedio_parciales >= 11 ? 'Aprobado' : 'Desaprobado'}
						</span>
					</div>
				</header>

				<section class="p-4">
					<table class="w-full text-sm">
						<tbody class="divide-y divide-neutral-100">
							{#each EVALUACIONES as { label, key }}
								<tr>
									<th scope="row" class="py-2.5 text-neutral-500">
										{label}
									</th>
									<td class="py-2.5 text-right font-medium">
										{notas[key]}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</section>
			</article>
		{/each}
	</section>
</main>
