<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Perfil } from '$lib/database/perfiles/type.js';
	import {
		Search,
		Plus,
		Trash,
		PencilLine,
		X,
		CheckCircle,
		XCircle,
		Mail,
		User,
		Lock,
		Users,
		ChevronDown,
		Loader,
		IdCard
	} from 'lucide-svelte';
	import { blur, fly } from 'svelte/transition';

	let searchQuery = $state('');

	let { data, form } = $props();

	let perfiles = $derived(data.perfiles);
	let selectedPerfil: Perfil = $state({
		id: '',
		nombres: '',
		apellido_paterno: '',
		apellido_materno: '',
		dni: '',
		email: '',
		rol: 'Administrador',
		fecha_actualizacion: ''
	});

	let createShowModal = $state(false);
	let creando = $state(false);

	let editShowModal = $state(false);
	let editando = $state(false);

	let deleteShowModal = $state(false);
	let eliminando = $state(false);

	let showToast = $state(false);

	const filteredPerfiles = $derived(
		searchQuery
			? perfiles.filter(
					(p) =>
						p.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
						p.nombres.toLowerCase().includes(searchQuery.toLowerCase()) ||
						p.apellido_paterno.toLowerCase().includes(searchQuery.toLowerCase()) ||
						p.apellido_materno.toLowerCase().includes(searchQuery.toLowerCase()) ||
						p.dni.toLowerCase().includes(searchQuery.toLowerCase()) ||
						p.rol?.toLowerCase().includes(searchQuery.toLowerCase())
				)
			: perfiles
	);

	const roles = ['Estudiante', 'Profesor', 'Administrador'];

	function toggleCreateModal() {
		createShowModal = !createShowModal;
	}
	function toggleEditModal() {
		editShowModal = !editShowModal;
	}
	function toggleDeleteModal() {
		deleteShowModal = !deleteShowModal;
	}
	function editarPerfil(perfil: Perfil) {
		selectedPerfil = perfil;
		toggleEditModal();
	}
	function eliminarPerfil(perfil: Perfil) {
		selectedPerfil = perfil;
		toggleDeleteModal();
	}

	const handleCreate = () => {
		toggleCreateModal();
		creando = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();

			creando = false;
		};
	};
	const handleEdit = () => {
		toggleEditModal();
		editando = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();

			editando = false;
		};
	};
	const handleDelete = () => {
		toggleDeleteModal();
		eliminando = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();

			eliminando = false;
		};
	};

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
			<p class="font-medium text-white">Creando un nuevo perfil...</p>
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
			<p class="font-medium text-white">Editando la información del perfil...</p>
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
			<p class="font-medium text-white">Eliminando el perfil...</p>
		</div>
	</div>
{/if}

<div class="space-y-4 p-6">
	<header class="  ">
		<div class="flex items-center justify-between">
			<h1 class="text-xl font-semibold text-neutral-900 sm:text-2xl lg:text-3xl">Perfiles</h1>

			<button
				type="button"
				onclick={toggleCreateModal}
				class="inline-flex items-center gap-2 rounded-lg bg-neutral-600 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 sm:text-base"
				aria-label="Crear nuevo perfil"
			>
				<Plus class="h-5 w-5" aria-hidden="true" />
				<span>Nuevo Perfil</span>
			</button>
		</div>
	</header>

	<section aria-label="Búsqueda">
		<label class="flex items-center space-x-2 text-sm text-neutral-600" for="search">
			<Search class="h-5 w-5" /> <span>Buscar</span>
		</label>
		<input
			type="search"
			bind:value={searchQuery}
			placeholder="Buscar por nombre, apellidos paternos, maternos, email, DNI o rol..."
			id="search"
			name="search"
			autocomplete="off"
			aria-label="Campo de búsqueda"
			class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
		/>
	</section>

	<section
		class="overflow-hidden rounded-lg bg-white shadow-sm"
		aria-labelledby="tabla-perfiles-heading"
	>
		<h2 id="tabla-perfiles-heading" class="sr-only">Lista de perfiles</h2>
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-neutral-200">
				<thead class="bg-neutral-700">
					<tr>
						<th scope="col" class="p-4 text-left text-xs font-medium tracking-wider text-white">
							DNI
						</th>
						<th
							scope="col"
							class="hidden p-4 text-left text-xs font-medium tracking-wider text-white lg:table-cell"
						>
							Nombre Completo
						</th>
						<th
							scope="col"
							class="w-40 p-4 text-left text-xs font-medium tracking-wider text-white"
						>
							Email
						</th>
						<th
							scope="col"
							class="hidden p-4 text-left text-xs font-medium tracking-wider text-white sm:table-cell"
						>
							Rol
						</th>
						<th scope="col" class="p-4 text-center text-xs font-medium tracking-wider text-white">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-neutral-200">
					{#each filteredPerfiles as perfil (perfil.id)}
						<tr class="transition-colors hover:bg-neutral-100">
							<td class="whitespace-nowrap p-4 text-sm font-medium text-neutral-900">
								{perfil.dni}
							</td>
							<td class="hidden whitespace-nowrap p-4 text-sm text-neutral-600 lg:table-cell">
								{perfil.nombres}
								{perfil.apellido_paterno}
								{perfil.apellido_materno}
							</td>
							<td class="w-40 truncate p-4 text-sm text-neutral-600">
								<a
									href="mailto:{perfil.email}"
									class="block truncate hover:text-neutral-900"
									title={perfil.email}
								>
									{perfil.email}
								</a>
							</td>
							<td class="hidden whitespace-nowrap p-4 text-sm sm:table-cell">
								{#if perfil.rol === 'Administrador'}
									<span
										class="inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700"
									>
										{perfil.rol}
									</span>
								{:else if perfil.rol === 'Profesor'}
									<span
										class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
									>
										{perfil.rol}
									</span>
								{:else}
									<span
										class="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
									>
										{perfil.rol}
									</span>
								{/if}
							</td>
							<td class="p-4 text-center">
								<button
									type="button"
									onclick={() => editarPerfil(perfil)}
									class="rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-100"
									aria-label="Editar perfil"
								>
									<PencilLine class="h-4 w-4" />
								</button>

								<button
									type="button"
									onclick={() => eliminarPerfil(perfil)}
									class="rounded-md p-2 text-neutral-600 transition-colors hover:bg-neutral-100"
									aria-label="Eliminasr perfil"
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
				action="?/crearUsuario"
			>
				<!-- Header fijo -->
				<div class="border-b p-4 sm:p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-medium sm:text-xl">Crear Cuenta</h2>
						<button
							type="button"
							onclick={toggleCreateModal}
							class="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
						>
							<X class="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
					<div class="space-y-6">
						<!-- Rol -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="rol"
							>
								<Users class="h-5 w-5 text-neutral-500" />
								<span>Rol</span>
							</label>
							<div class="relative">
								<select
									id="rol"
									name="rol"
									required
									class="w-full appearance-none rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
						   transition duration-200
						   focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
								>
									{#each roles as rol}
										<option>{rol}</option>
									{/each}
								</select>
								<ChevronDown
									class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500"
									aria-hidden="true"
								/>
							</div>
						</div>

						<!-- Email -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="email"
							>
								<Mail class="h-5 w-5 text-neutral-500" />
								<span>Email</span>
							</label>
							<input
								placeholder="Ingrese su email"
								id="email"
								type="email"
								class="w-full rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
						 transition duration-200
						 placeholder:text-neutral-400
						 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
								name="email"
								required
							/>
						</div>

						<!-- Contraseña -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="password"
							>
								<Lock class="h-5 w-5 text-neutral-500" />
								<span>Contraseña</span>
							</label>
							<input
								placeholder="Ingrese su contraseña"
								id="password"
								type="password"
								class="w-full rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
						 transition duration-200
						 placeholder:text-neutral-400
						 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
								name="password"
								required
							/>
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
							{creando ? 'Guardar' : 'Crear'}
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
				action="?/editarUsuario"
			>
				<!-- Header fijo -->
				<div class="border-b p-4 sm:p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-medium sm:text-xl">Editar Información</h2>
						<button
							type="button"
							onclick={toggleEditModal}
							class="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
						>
							<X class="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
					<input type="hidden" bind:value={selectedPerfil.id} name="id" />

					<div class="space-y-6">
						<!-- Nombres -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="nombres"
							>
								<User class="h-5 w-5 text-neutral-500" />
								<span>Nombres</span>
							</label>
							<input
								bind:value={selectedPerfil.nombres}
								placeholder="Ingrese sus nombres"
								id="nombres"
								type="text"
								class="w-full rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
                       transition duration-200
                       placeholder:text-neutral-400
                       focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
								name="nombres"
							/>
						</div>

						<!-- Apellido Paterno -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="apellido_paterno"
							>
								<User class="h-5 w-5 text-neutral-500" />
								<span>Apellido Paterno</span>
							</label>
							<input
								bind:value={selectedPerfil.apellido_paterno}
								placeholder="Ingrese apellido paterno"
								id="apellido_paterno"
								type="text"
								class="w-full rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
                       transition duration-200
                       placeholder:text-neutral-400
                       focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
								name="apellido_paterno"
							/>
						</div>

						<!-- Apellido Materno -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="apellido_materno"
							>
								<User class="h-5 w-5 text-neutral-500" />
								<span>Apellido Materno</span>
							</label>
							<input
								bind:value={selectedPerfil.apellido_materno}
								placeholder="Ingrese apellido materno"
								id="apellido_materno"
								type="text"
								class="w-full rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
                       transition duration-200
                       placeholder:text-neutral-400
                       focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
								name="apellido_materno"
							/>
						</div>

						<!-- DNI -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="dni"
							>
								<IdCard class="h-5 w-5 text-neutral-500" />
								<span>DNI</span>
							</label>
							<input
								bind:value={selectedPerfil.dni}
								placeholder="Ingrese DNI"
								id="dni"
								type="text"
								maxlength="8"
								class="w-full rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
                       transition duration-200
                       placeholder:text-neutral-400
                       focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
								name="dni"
							/>
						</div>

						<!-- Rol -->
						<div>
							<label
								class="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700"
								for="rol"
							>
								<Users class="h-5 w-5 text-neutral-500" />
								<span>Rol</span>
							</label>
							<div class="relative">
								<select
									bind:value={selectedPerfil.rol}
									id="rol"
									name="rol"
									required
									class="w-full appearance-none rounded-lg border-neutral-300 px-4 py-2.5 shadow-md
                           transition duration-200
                           focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500"
								>
									{#each roles as rol}
										<option>{rol}</option>
									{/each}
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
							Guardar
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
				action="?/eliminarUsuario"
			>
				<!-- Header fijo -->
				<div class="border-b p-4 sm:p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-lg font-medium sm:text-xl">Eliminar Usuario</h2>
						<button
							type="button"
							onclick={toggleDeleteModal}
							class="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
						>
							<X class="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="flex-1 overflow-y-auto p-4 sm:p-6">
					<input type="hidden" bind:value={selectedPerfil.id} name="id" />

					<p class="text-sm text-neutral-600">
						¿Estás seguro de que deseas eliminar al usuario? Esta acción no se puede deshacer.
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
							Eliminar
						</button>
					</div>
				</div>
			</form>
		</dialog>
	</div>
{/if}
