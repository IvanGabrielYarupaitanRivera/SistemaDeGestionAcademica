<script lang="ts">
	import { Check, CheckCircle, Loader, PencilLine, X, XCircle } from 'lucide-svelte';
	import type { CursoResponse } from '$lib/database/inscripciones/db.js';
	import type { Nota } from '$lib/database/notas/type.js';
	import { blur, fly } from 'svelte/transition';
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let { cursosConNotas, user } = $derived(data);

	let showToast = $state(false);

	let selectedNota: Nota = $state({
		id: '',
		parcial_1: 0,
		parcial_2: 0,
		parcial_3: 0,
		promedio_parciales: 0
	});

	let editando = $state(false);
	let editShowModal = $state(false);
	function toggleEditModal() {
		editShowModal = !editShowModal;
	}
	function editarNota(nota: Nota) {
		selectedNota = nota;
		toggleEditModal();
	}
	const handleEdit = () => {
		toggleEditModal();
		editando = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();

			editando = false;
		};
	};

	const EVALUACIONES = [
		{ label: 'Parcial 1', key: 'parcial_1' },
		{ label: 'Parcial 2', key: 'parcial_2' },
		{ label: 'Parcial 3', key: 'parcial_3' },
		{ label: 'Promedio', key: 'promedio_parciales' }
	] as const;

	$effect(() => {
		if (form?.success) {
			showToast = true;

			const toastTimer = setTimeout(() => {
				showToast = false;
			}, 3000);

			return () => {
				clearTimeout(toastTimer);
			};
		}

		if (form?.error) {
			showToast = true;

			const toastTimer = setTimeout(() => {
				showToast = false;
			}, 5000);

			return () => {
				clearTimeout(toastTimer);
			};
		}
	});
</script>

{#if showToast && form?.error}
	<div
		transition:fly={{ x: 20 }}
		class="fixed right-4 top-4 flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm text-white shadow-lg"
		role="alert"
	>
		<XCircle class="h-5 w-5" />
		<span>{form.error}</span>
	</div>
{/if}

{#if showToast && form?.success}
	<div
		transition:fly={{ x: 20 }}
		class="fixed right-4 top-4 flex items-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm text-white shadow-lg"
		role="alert"
	>
		<CheckCircle class="h-5 w-5" />
		<span>{form.success}</span>
	</div>
{/if}

{#if editando}
	<div
		class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
		role="alert"
		aria-live="polite"
	>
		<div class="flex flex-col items-center gap-2 p-4">
			<Loader class="animate-spin text-white" size={40} />
			<p class="font-medium text-white">Editando la Información del Estudiante...</p>
		</div>
	</div>
{/if}

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
						<div class="flex-1">
							<h2 class="line-clamp-1 font-medium text-neutral-900" title={curso.nombre}>
								{curso.nombre}
							</h2>
							<p class="mt-1 line-clamp-1 text-sm text-neutral-500">{curso.descripcion}</p>
						</div>
						<div class="flex items-center gap-3">
							{#if user?.user_metadata.rol === 'Docente' || user?.user_metadata.rol === 'Administrador'}
								<button
									type="button"
									onclick={() => editarNota(notas)}
									class="rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-100 active:bg-neutral-200"
									aria-label="Editar notas"
								>
									<PencilLine class="h-4 w-4" />
								</button>
							{/if}

							<span
								class="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium {notas.promedio_parciales >=
								11
									? 'bg-green-50 text-green-700'
									: 'bg-red-50 text-red-700'}"
							>
								{notas.promedio_parciales >= 11 ? 'Aprobado' : 'Desaprobado'}
							</span>
						</div>
					</div>
				</header>

				<section class="p-4">
					<table class="w-full text-sm">
						<tbody class="divide-y divide-neutral-100">
							{#each EVALUACIONES as { label, key }}
								<tr class={key === 'promedio_parciales' ? 'bg-neutral-200' : ''}>
									<th scope="row" class="py-2.5 text-neutral-500">
										{label}
									</th>
									<td class="px-4 py-2.5 text-right font-medium text-neutral-900">
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

{#if editShowModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm"
		transition:blur
	>
		<dialog open class="mx-auto w-11/12 rounded-lg bg-white md:max-w-xl">
			<form
				method="POST"
				class="flex h-full flex-col overflow-hidden sm:h-auto"
				use:enhance={handleEdit}
				action="?/editarNota"
			>
				<!-- Header Fijo -->
				<div class="border-b p-4 sm:p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-medium sm:text-xl">Editar Notas</h2>
						<button
							type="button"
							onclick={toggleEditModal}
							class="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
							aria-label="Cerrar modal de edición de notas"
						>
							<X class="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="flex-1 space-y-4 p-4 sm:p-6">
					{#each EVALUACIONES.slice(0, -1) as { label, key }}
						<div class="space-y-1.5">
							<input type="hidden" name="id" value={selectedNota.id} />
							<label for={key} class="block text-sm font-medium text-neutral-700">
								{label}
							</label>
							<input
								id={key}
								type="number"
								name={key}
								value={selectedNota[key]}
								min="0"
								max="20"
								step="1"
								required
								class="block w-full rounded-md border-neutral-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
							/>
						</div>
					{/each}
				</div>

				<!-- Footer fijo -->
				<div class="border-t p-4 sm:p-6">
					<div class="flex gap-3 sm:justify-end">
						<button
							type="button"
							onclick={toggleEditModal}
							class="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-neutral-700
                            ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 sm:flex-none"
						>
							Cancelar
						</button>
						<button
							type="submit"
							class="flex-1 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white
                            hover:bg-neutral-800 sm:flex-none"
						>
							{editando ? 'Guardando...' : 'Guardar'}
						</button>
					</div>
				</div>
			</form>
		</dialog>
	</div>
{/if}
