<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Profesor } from '$lib/database/profesores/type.js';
	import {
		Briefcase,
		CheckCircle,
		ChevronDown,
		Loader,
		PencilLine,
		Search,
		X,
		XCircle
	} from 'lucide-svelte';
	import { blur, fly } from 'svelte/transition';

	let { data, form } = $props();
	let { profesores, user } = $derived(data);

	let showToast = $state(false);

	let selectedProfesor: Profesor = $state({
		id: '',
		especialidad: ''
	});

	let editando = $state(false);
	let editShowModal = $state(false);
	function toggleEditModal() {
		editShowModal = !editShowModal;
	}
	function editarProfesor(profesor: Profesor) {
		selectedProfesor = profesor;
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

	let searchQuery = $state('');
	const filteredProfesores = $derived(
		searchQuery
			? profesores.filter((e) => e.especialidad?.toLowerCase().includes(searchQuery.toLowerCase()))
			: profesores
	);

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
			<p class="font-medium text-white">Editando la Información del Profesor...</p>
		</div>
	</div>
{/if}

<div class="space-y-4 p-6">
	<header>
		<div class="flex items-center justify-between">
			<h1 class="text-xl font-semibold text-neutral-900 sm:text-2xl lg:text-3xl">Profesores</h1>
		</div>
	</header>

	<section aria-label="Búsqueda de estudiantes">
		<label for="search" class="flex items-center space-x-2 text-sm text-neutral-600">
			<Search class="h-5 w-5" />
			<span>Buscar</span>
		</label>
		<input
			type="search"
			name="search"
			id="search"
			bind:value={searchQuery}
			placeholder="Buscar por especialidad del profesor"
			autocomplete="off"
			aria-label="Campo de búsqueda"
			class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
		/>
	</section>

	<section
		class="overflow-hidden rounded-lg bg-white shadow-sm"
		aria-labelledby="tabla-profesores-heading"
	>
		<h2 id="tabla-profesores-heading" class="sr-only">Lista de profesores</h2>
		<div>
			<table class="min-w-full divide-y divide-neutral-200">
				<thead class="bg-neutral-700">
					<tr>
						<th scope="col" class="p-4 text-left text-xs font-medium tracking-wider text-white">
							DNI
						</th>
						<th scope="col" class="p-4 text-left text-xs font-medium tracking-wider text-white">
							Nombre
						</th>
						<th
							scope="col"
							class="hidden p-4 text-left text-xs font-medium tracking-wider text-white lg:table-cell"
						>
							Apellido Paterno
						</th>
						<th
							scope="col"
							class="hidden p-4 text-left text-xs font-medium tracking-wider text-white lg:table-cell"
						>
							Apellido Materno
						</th>

						<th
							scope="col"
							class="hidden p-4 text-left text-xs font-medium tracking-wider text-white sm:table-cell"
						>
							Especialidad
						</th>

						{#if user?.user_metadata.rol === 'Administrador'}
							<th scope="col" class="p-4 text-center text-xs font-medium tracking-wider text-white">
								Acciones
							</th>
						{/if}
					</tr>
				</thead>

				<tbody class="divide-y divide-neutral-200">
					{#each filteredProfesores as profesor (profesor.id)}
						<tr class="transition-colors hover:bg-neutral-100">
							<td class="p-4 text-sm">
								{profesor.Perfiles?.dni}
							</td>
							<td class="p-4 text-sm">
								{profesor.Perfiles?.nombres}
							</td>
							<td class="hidden p-4 text-sm lg:table-cell">
								{profesor.Perfiles?.apellido_paterno}
							</td>
							<td class="hidden p-4 text-sm lg:table-cell">
								{profesor.Perfiles?.apellido_materno}
							</td>

							<td class="hidden p-4 text-sm sm:table-cell">
								{profesor.especialidad}
							</td>
							{#if user?.user_metadata.rol === 'Administrador'}
								<td class="p-4 text-center">
									<button
										type="button"
										onclick={() => editarProfesor(profesor)}
										class="rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-200"
										aria-label="Editar profesor"
									>
										<PencilLine class="h-4 w-4" />
									</button>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>

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
				action="?/editarProfesor"
			>
				<!-- Header Fijo -->
				<div class="border-b p-4 sm:p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-medium sm:text-xl">Editar Profesor</h2>
						<button
							type="button"
							onclick={toggleEditModal}
							class="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
							aria-label="Cerrar modal de edición de especialidad"
						>
							<X class="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
					<input type="hidden" bind:value={selectedProfesor.id} name="id" />

					<div class="space-y-6">
						<!-- Especialidad -->
						<div>
							<label
								for="especialidad"
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
							>
								<Briefcase class="h-5 w-5 text-neutral-500" />
								<span>Especialidad</span>
							</label>

							<div class="relative">
								<select
									bind:value={selectedProfesor.especialidad}
									id="especialidad"
									name="especialidad"
									required
									class="w-full appearance-none rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
										transition duration-200 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
								>
									<option value="Sin especialidad" disabled>Seleccione una especialidad</option>
									<option value="Matemática">Matemática</option>
									<option value="Comunicación">Comunicación</option>
									<option value="Ciencias">Ciencias</option>
									<option value="Historia">Historia</option>
									<option value="Arte">Arte</option>
									<option value="Educación Física">Educación Física</option>
								</select>

								<ChevronDown
									class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
									aria-hidden="true"
								/>
							</div>
						</div>
					</div>
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
