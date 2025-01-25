<script lang="ts">
	import { enhance } from '$app/forms';
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
		ChevronDown
	} from 'lucide-svelte';
	import { blur, fly } from 'svelte/transition';

	let perfiles = $state([
		{ id: 1, nombre: 'Juan Pérez', email: 'juan@ejemplo.com', rol: 'Profesor' },
		{ id: 2, nombre: 'María González', email: 'maria@ejemplo.com', rol: 'Estudiante' },
		{ id: 3, nombre: 'Admin', email: 'admin@ejemplo.com', rol: 'Administrador' }
	]);

	let searchQuery = $state('');
	let showModal = $state(false);
	let isEditing = $state(false);
	let selectedUser = $state(null);

	let { form } = $props();

	let createShowModal = $state(false);
	let creando = $state(false);
	let showToast = $state(false);

	let formData = $state({
		email: '',
		password: '',
		rol: 'Estudiante'
	});

	const roles = ['Estudiante', 'Profesor', 'Administrador'];

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

	/* const filteredPerfiles = $derived(
		perfiles.filter(
			(p) =>
				p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
				p.email.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	function handleUserAction(user = null) {
		selectedUser = user;
		isEditing = !!user;
		showModal = true;

		if (user) {
			formData = {
				email: user.email,
				password: '',
				rol: user.rol
			};
		} else {
			formData = {
				email: '',
				password: '',
				rol: 'Estudiante'
			};
		}
	}

	function handleDelete(user) {
		if (confirm('¿Estás seguro de eliminar este usuario?')) {
			perfiles = perfiles.filter((p) => p.id !== user.id);
		}
	} */

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

<div class="p-6">
	<header class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Perfiles</h1>
		<button
			type="button"
			onclick={toggleCreateModal}
			class="rounded-md bg-neutral-600 px-4 py-2 text-white hover:bg-neutral-700"
			aria-label="Crear nuevo perfil"
		>
			Nuevo
		</button>
	</header>

	<!-- <div class="mb-6 flex gap-4">
		<div class="relative flex-1">
			<Search class="absolute left-3 top-2.5 text-gray-400" size={18} />
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Buscar..."
				class="w-full rounded-lg border py-2 pl-10 pr-4"
			/>
		</div>
	</div> -->

	<!-- <div class="rounded-lg bg-white shadow">
		<table class="w-full">
			<thead>
				<tr class="border-b">
					<th class="p-4 text-left">Nombre</th>
					<th class="p-4 text-left">Email</th>
					<th class="p-4 text-left">Rol</th>
					<th class="p-4 text-center">Acciones</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredPerfiles as perfil}
					<tr class="border-b hover:bg-gray-50">
						<td class="p-4">{perfil.nombre}</td>
						<td class="p-4">{perfil.email}</td>
						<td class="p-4">{perfil.rol}</td>
						<td class="p-4 text-center">
							<div class="flex justify-center gap-3">
								<button
									onclick={() => handleUserAction(perfil)}
									class="text-blue-600 hover:text-blue-800"
								>
									<PencilLine size={18} />
								</button>
								<button
									onclick={() => handleDelete(perfil)}
									class="text-red-600 hover:text-red-800"
								>
									<Trash size={18} />
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div> -->
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
								bind:value={formData.rol}
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
							bind:value={formData.email}
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
							bind:value={formData.password}
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
