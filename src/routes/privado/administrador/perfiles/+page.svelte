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
	function editarPerfil(perfil: Perfil) {
		selectedPerfil = perfil;
		toggleEditModal();
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

	<section class="overflow-x-auto rounded-lg bg-white shadow" aria-label="Lista de perfiles">
		<table class="min-w-full divide-y divide-gray-200">
			<thead class="bg-gray-50">
				<tr>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
					>
						DNI
					</th>
					<th
						scope="col"
						class="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell"
					>
						Nombre
					</th>
					<th
						scope="col"
						class="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell"
					>
						Apellido Paterno
					</th>
					<th
						scope="col"
						class="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell"
					>
						Apellido Materno
					</th>
					<th
						scope="col"
						class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
					>
						Email
					</th>
					<th
						scope="col"
						class="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell"
					>
						Rol
					</th>
					<th
						scope="col"
						class="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
					>
						Acciones
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-200 bg-white">
				{#each filteredPerfiles as perfil (perfil.id)}
					<tr class="hover:bg-gray-50">
						<td class="whitespace-nowrap px-6 py-4 text-xs">
							{perfil.dni}
						</td>
						<td class="hidden whitespace-nowrap px-6 py-4 text-xs sm:table-cell">
							{perfil.nombres}
						</td>
						<td class="hidden whitespace-nowrap px-6 py-4 text-xs md:table-cell">
							{perfil.apellido_paterno}
						</td>
						<td class="hidden whitespace-nowrap px-6 py-4 text-xs lg:table-cell">
							{perfil.apellido_materno}
						</td>
						<td class="whitespace-nowrap px-6 py-4 text-xs">
							{perfil.email}
						</td>
						<td class="hidden whitespace-nowrap px-6 py-4 text-xs sm:table-cell">
							{perfil.rol}
						</td>
						<td class="xs flex justify-center gap-2 whitespace-nowrap px-6 py-4">
							<button
								type="button"
								onclick={() => editarPerfil(perfil)}
								class="rounded p-1 text-neutral-600 hover:bg-neutral-300"
								aria-label="Editar perfil"
							>
								<PencilLine class="h-4 w-4" />
							</button>
							<!-- <button
								type="button"
								onclick={() => eliminarPerfil(perfil.id)}
								class="rounded p-1 text-neutral-600 hover:bg-neutral-300"
								aria-label="Eliminar perfil"
							>
								<Trash class="h-5 w-5" />
							</button> -->
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
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
				class="flex h-[90vh] flex-col md:h-auto"
				use:enhance={handleCreate}
				action="?/crearUsuario"
			>
				<!-- Header fijo -->
				<div class="border-b p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-semibold">Crear Cuenta</h2>
						<button
							type="button"
							onclick={toggleCreateModal}
							class="text-gray-500 hover:text-gray-700"
						>
							<X class="h-6 w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="flex-1 space-y-8 overflow-y-auto p-6">
					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="rol">
							<Users class="h-5 w-5" /> <span>Rol</span>
						</label>
						<div class="relative">
							<select
								id="rol"
								name="rol"
								required
								class="mt-1 w-full cursor-pointer appearance-none rounded-md border-gray-300 py-2 pl-4 pr-10 shadow-md"
							>
								{#each roles as rol}
									<option>{rol}</option>
								{/each}
							</select>
							<ChevronDown
								class="pointer-events-none absolute right-3 top-[55%] h-5 w-5 -translate-y-1/2 transform text-gray-500"
								aria-hidden="true"
							/>
						</div>
					</div>

					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="email">
							<Mail class="h-5 w-5" /> <span>Email</span>
						</label>
						<input
							placeholder="Ingrese su email"
							id="email"
							type="email"
							class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
							name="email"
							required
						/>
					</div>

					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="password">
							<Lock class="h-5 w-5" /> <span>Contraseña</span>
						</label>
						<input
							placeholder="Ingrese su contraseña"
							id="password"
							type="password"
							class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
							name="password"
							required
						/>
					</div>
				</div>

				<!-- Footer fijo -->
				<div class="p-6">
					<div class="flex justify-end space-x-2">
						<button
							type="button"
							onclick={toggleCreateModal}
							class="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
						>
							Cancelar
						</button>
						<button
							type="submit"
							class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
				class="flex h-[90vh] flex-col md:h-auto"
				use:enhance={handleEdit}
				action="?/editarUsuario"
			>
				<!-- Header fijo -->
				<div class="border-b p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-semibold">Editar Información</h2>
						<button
							type="button"
							onclick={toggleEditModal}
							class="text-gray-500 hover:text-gray-700"
						>
							<X class="h-6 w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="flex-1 space-y-8 overflow-y-auto p-6">
					<input hidden bind:value={selectedPerfil.id} name="id" />

					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="nombres">
							<User class="h-5 w-5" /> <span>Nombres</span>
						</label>
						<input
							bind:value={selectedPerfil.nombres}
							placeholder="Ingrese sus nombres"
							id="nombres"
							type="text"
							class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
							name="nombres"
						/>
					</div>
					<div>
						<label
							class="flex items-center space-x-2 text-sm text-neutral-600"
							for="apellido_paterno"
						>
							<User class="h-5 w-5" /> <span>Apellido Paterno</span>
						</label>
						<input
							bind:value={selectedPerfil.apellido_paterno}
							placeholder="Ingrese su apellido paterno"
							id="apellido_paterno"
							type="text"
							class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
							name="apellido_paterno"
						/>
					</div>
					<div>
						<label
							class="flex items-center space-x-2 text-sm text-neutral-600"
							for="apellido_materno"
						>
							<User class="h-5 w-5" /> <span>Apellido Materno</span>
						</label>
						<input
							bind:value={selectedPerfil.apellido_materno}
							placeholder="Ingrese su apellido materno"
							id="apellido_materno"
							type="text"
							class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
							name="apellido_materno"
						/>
					</div>
					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="dni">
							<IdCard class="h-5 w-5" /> <span>DNI</span>
						</label>
						<input
							bind:value={selectedPerfil.dni}
							placeholder="Ingrese su DNI"
							id="dni"
							type="text"
							class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
							name="dni"
							maxlength="8"
						/>
					</div>
					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="rol">
							<Users class="h-5 w-5" /> <span>Rol</span>
						</label>
						<div class="relative">
							<select
								bind:value={selectedPerfil.rol}
								id="rol"
								name="rol"
								required
								class="mt-1 w-full cursor-pointer appearance-none rounded-md border-gray-300 py-2 pl-4 pr-10 shadow-md"
							>
								{#each roles as rol}
									<option>{rol}</option>
								{/each}
							</select>
							<ChevronDown
								class="pointer-events-none absolute right-3 top-[55%] h-5 w-5 -translate-y-1/2 transform text-gray-500"
								aria-hidden="true"
							/>
						</div>
					</div>
				</div>

				<!-- Footer fijo -->
				<div class="border-t p-6">
					<div class="flex justify-end space-x-2">
						<button
							type="button"
							onclick={toggleEditModal}
							class="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
						>
							Cancelar
						</button>
						<button
							type="submit"
							class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
						>
							Guardar
						</button>
					</div>
				</div>
			</form>
		</dialog>
	</div>
{/if}
