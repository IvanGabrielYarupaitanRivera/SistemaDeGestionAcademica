<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Curso } from '$lib/database/cursos/type.js';
	import {
		Book,
		CheckCircle,
		FileText,
		Loader,
		PencilLine,
		Plus,
		Search,
		Trash,
		X,
		XCircle
	} from 'lucide-svelte';
	import { blur, fly } from 'svelte/transition';

	let { data, form } = $props();
	let { cursos } = $derived(data);

	let showToast = $state(false);

	let selectedCurso: Curso = $state({
		id: '',
		nombre: '',
		descripcion: ''
	});

	let creando = $state(false);
	let createShowModal = $state(false);
	function toggleCreateModal() {
		createShowModal = !createShowModal;
	}
	const handleCreate = () => {
		toggleCreateModal();
		creando = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();

			creando = false;
		};
	};

	let editando = $state(false);
	let editShowModal = $state(false);
	function toggleEditModal() {
		editShowModal = !editShowModal;
	}
	function editarCurso(curso: Curso) {
		selectedCurso = curso;
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

	let eliminando = $state(false);
	let deleteShowModal = $state(false);
	function toggleDeleteModal() {
		deleteShowModal = !deleteShowModal;
	}
	function eliminarCurso(curso: Curso) {
		selectedCurso = curso;
		toggleDeleteModal();
	}
	const handleDelete = () => {
		toggleDeleteModal();
		eliminando = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();

			eliminando = false;
		};
	};

	let searchQuery = $state('');
	const filteredCursos = $derived(
		searchQuery
			? cursos.filter((c) => c.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
			: cursos
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

{#if creando}
	<div
		class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
		role="alert"
		aria-live="polite"
	>
		<div class="flex flex-col items-center gap-2 p-4">
			<Loader class="animate-spin text-white" size={40} />
			<p class="font-medium text-white">Creando un nuevo curso...</p>
		</div>
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
			<p class="font-medium text-white">Editando el curso...</p>
		</div>
	</div>
{/if}

{#if eliminando}
	<div
		class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
		role="alert"
		aria-live="polite"
	>
		<div class="flex flex-col items-center gap-2 p-4">
			<Loader class="animate-spin text-white" size={40} />
			<p class="font-medium text-white">Eliminando el curso...</p>
		</div>
	</div>
{/if}

<div class="space-y-4 p-6">
	<header>
		<div class="flex items-center justify-between">
			<h1 class="text-xl font-semibold text-neutral-900 sm:text-2xl lg:text-3xl">Cursos</h1>

			<button
				type="button"
				onclick={toggleCreateModal}
				class="inline-flex items-center gap-2 rounded-lg bg-neutral-600 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 sm:text-base"
				aria-label="Crear nuevo curso"
			>
				<Plus />
				<span>Nuevo Curso</span>
			</button>
		</div>
	</header>

	<section aria-label="Búsqueda de cursos">
		<label for="search" class="flex items-center space-x-2 text-sm text-neutral-600">
			<Search class="h-5 w-5" />
			<span>Buscar</span>
		</label>
		<input
			type="search"
			name="search"
			id="search"
			bind:value={searchQuery}
			placeholder="Buscar por nombre del curso"
			autocomplete="off"
			aria-label="Campo de búsqueda"
			class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
		/>
	</section>

	<section
		class="overflow-hidden rounded-lg bg-white shadow-sm"
		aria-labelledby="tabla-cursos-heading"
	>
		<h2 id="tabla-cursos-heading" class="sr-only">Lista de cursos</h2>
		<div>
			<table class="min-w-full divide-y divide-neutral-200">
				<thead class="bg-neutral-700">
					<tr>
						<th scope="col" class="p-4 text-left text-xs font-medium tracking-wider text-white">
							Nombre
						</th>
						<th
							scope="col"
							class="hidden p-4 text-left text-xs font-medium tracking-wider text-white md:table-cell"
						>
							Descripción
						</th>
						<th scope="col" class="p-4 text-center text-xs font-medium tracking-wider text-white">
							Acciones
						</th>
					</tr>
				</thead>

				<tbody class="divide-y divide-neutral-200">
					{#each filteredCursos as curso (curso.id)}
						<tr class="transition-colors hover:bg-neutral-100">
							<td class="p-4 text-sm">
								{curso.nombre}
							</td>
							<td class="hidden p-4 text-sm md:table-cell">
								{curso.descripcion}
							</td>
							<td class="p-4 text-center">
								<button
									type="button"
									onclick={() => editarCurso(curso)}
									class="rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-200"
									aria-label="Editar curso"
								>
									<PencilLine class="h-4 w-4" />
								</button>
								<button
									type="button"
									onclick={() => eliminarCurso(curso)}
									class="rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-200"
									aria-label="Eliminar curso"
								>
									<Trash class="h-4 w-4" />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>

{#if createShowModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm"
		transition:blur
	>
		<dialog open class="mx-auto w-11/12 rounded-lg bg-white md:max-w-xl">
			<form
				method="POST"
				class="flex h-full flex-col overflow-hidden sm:h-auto"
				use:enhance={handleCreate}
				action="?/crearCurso"
			>
				<!-- Header Fijo -->
				<div class="border-b p-4 sm:p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-medium sm:text-xl">Crear Curso</h2>
						<button
							type="button"
							onclick={toggleCreateModal}
							class="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
							aria-label="Cerrar modal de creación de curso"
						>
							<X class="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="flex-1 overflow-y-auto p-4 sm:p-6">
					<div class="space-y-6">
						<!-- Nombre del Curso -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="nombre"
							>
								<Book class="h-5 w-5 text-neutral-500" />
								<span>Nombre del Curso</span>
							</label>
							<input
								type="text"
								id="nombre"
								name="nombre"
								required
								placeholder="Ingrese el nombre del curso"
								class="w-full rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
							transition duration-200 placeholder:text-neutral-400
							focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
							/>
						</div>

						<!-- Descripción del Curso -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="descripcion"
							>
								<FileText class="h-5 w-5 text-neutral-500" />
								<span>Descripción</span>
							</label>
							<textarea
								id="descripcion"
								name="descripcion"
								rows="4"
								placeholder="Ingrese la descripción del curso"
								class="w-full rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
                                transition duration-200 placeholder:text-neutral-400
                                focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
							></textarea>
						</div>
					</div>
				</div>

				<!-- Footer fijo -->
				<div class="border-t p-4 sm:p-6">
					<div class="flex gap-3 sm:justify-end">
						<button
							type="button"
							onclick={toggleCreateModal}
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
							{creando ? 'Creando...' : 'Crear'}
						</button>
					</div>
				</div>
			</form>
		</dialog>
	</div>
{/if}

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
				action="?/editarCurso"
			>
				<!-- Header Fijo -->
				<div class="border-b p-4 sm:p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-medium sm:text-xl">Editar Curso</h2>
						<button
							type="button"
							onclick={toggleEditModal}
							class="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
							aria-label="Cerrar modal de edición de curso"
						>
							<X class="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
					<input type="hidden" bind:value={selectedCurso.id} name="id" />

					<div class="space-y-6">
						<!-- Nombre del Curso -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="nombre"
							>
								<Book class="h-5 w-5 text-neutral-500" />
								<span>Nombre del Curso</span>
							</label>
							<input
								bind:value={selectedCurso.nombre}
								type="text"
								id="nombre"
								name="nombre"
								required
								placeholder="Ingrese el nombre del curso"
								class="w-full rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
                                transition duration-200 placeholder:text-neutral-400
                                focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
							/>
						</div>

						<!-- Descripción del Curso -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="descripcion"
							>
								<FileText class="h-5 w-5 text-neutral-500" />
								<span>Descripción</span>
							</label>
							<textarea
								bind:value={selectedCurso.descripcion}
								id="descripcion"
								name="descripcion"
								rows="4"
								placeholder="Ingrese la descripción del curso"
								class="w-full rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
                                transition duration-200 placeholder:text-neutral-400
                                focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
							></textarea>
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

{#if deleteShowModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm"
		transition:blur
	>
		<dialog open class="mx-auto w-11/12 rounded-lg bg-white md:max-w-xl">
			<form
				method="POST"
				class="flex h-full flex-col overflow-hidden sm:h-auto"
				use:enhance={handleDelete}
				action="?/eliminarCurso"
			>
				<!-- Header fijo -->
				<div class="border-b p-4 sm:p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-medium sm:text-xl">Eliminar Curso</h2>
						<button
							type="button"
							onclick={toggleDeleteModal}
							class="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
							aria-label="Cerrar modal de eliminación de curso"
						>
							<X class="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="flex-1 overflow-y-auto p-4 sm:p-6">
					<input type="hidden" bind:value={selectedCurso.id} name="id" />

					<p class="text-sm text-neutral-600">
						¿Estás seguro de que deseas eliminar el curso? Esta acción no se puede deshacer.
					</p>
				</div>

				<!-- Footer fijo -->
				<div class="border-t p-4 sm:p-6">
					<div class="flex gap-3 sm:justify-end">
						<button
							type="button"
							onclick={toggleDeleteModal}
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
							{eliminando ? 'Eliminando...' : 'Eliminar'}
						</button>
					</div>
				</div>
			</form>
		</dialog>
	</div>
{/if}
