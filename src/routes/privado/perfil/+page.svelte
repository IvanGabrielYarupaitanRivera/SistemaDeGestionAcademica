<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import {
		User,
		Mail,
		Calendar,
		Shield,
		IdCard,
		X,
		Lock,
		Loader,
		XCircle,
		CheckCircle,
		Pencil,
		ClipboardList
	} from 'lucide-svelte';
	import { blur, fly } from 'svelte/transition';

	let { data, form } = $props();
	let { perfil } = $derived(data);

	let showToast = $state(false);

	let showEditModal = $state(false);
	let showChangePasswordModal = $state(false);

	let editando = $state(false);
	let cambiandoContraseña = $state(false);

	function toggleEditModal() {
		showEditModal = !showEditModal;
	}

	function toggleChangePasswordModal() {
		showChangePasswordModal = !showChangePasswordModal;
	}

	function formatFechaPeruana(fechaISO: string | undefined): string {
		if (!fechaISO) {
			return 'Fecha no disponible';
		}
		const opciones: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: true,
			timeZone: 'America/Lima'
		};

		const fecha = new Date(fechaISO);
		return fecha.toLocaleDateString('es-PE', opciones);
	}

	const handleEdit = () => {
		toggleEditModal();
		editando = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();

			editando = false;
		};
	};

	const handleChangePassword = () => {
		toggleChangePasswordModal();
		cambiandoContraseña = true;

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			cambiandoContraseña = false;
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

	const verNotas = (estudianteId: string) => {
		goto(`/privado/perfil/notas/${estudianteId}`);
	};

	const DATOS_PERSONALES = $derived([
		{ label: 'Nombres', value: perfil.nombres },
		{ label: 'Apellido Paterno', value: perfil.apellido_paterno },
		{ label: 'Apellido Materno', value: perfil.apellido_materno },
		{ label: 'DNI', value: perfil.dni }
	]);

	const DATOS_CUENTA = $derived([
		{ label: 'Rol', value: perfil.rol, icon: Shield },
		{ label: 'Creación', value: formatFechaPeruana(perfil.fecha_creacion), icon: Calendar },
		{
			label: 'Actualización',
			value: formatFechaPeruana(perfil.fecha_actualizacion),
			icon: Calendar
		}
	]);
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
		<Loader class="animate-spin  text-white" size={40} />
		<p class="mt-2 font-medium text-white">Editando su información...</p>
	</div>
{/if}

{#if cambiandoContraseña}
	<div
		class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
		role="alert"
		aria-live="polite"
	>
		<Loader class="animate-spin  text-white" size={40} />
		<p class="mt-2 font-medium text-white">Cambiando su contraseña...</p>
	</div>
{/if}

<section class="space-y-6 p-6">
	<header>
		<div class="flex items-center justify-between">
			<h1 class="text-xl font-semibold text-neutral-900 sm:text-2xl lg:text-3xl">Perfil</h1>

			<div class="space-x-4">
				<button
					type="button"
					onclick={toggleEditModal}
					class="inline-flex items-center gap-2 rounded-md bg-neutral-600 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
					aria-label="Editar Información"
				>
					<Pencil class="h-4 w-4" />
					<span class="hidden sm:inline">Editar Información</span>
				</button>
				<button
					type="button"
					onclick={toggleChangePasswordModal}
					class="inline-flex items-center gap-2 rounded-md bg-neutral-600 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
					aria-label="Cambiar Contraseña"
				>
					<Lock class="h-4 w-4" />
					<span class="hidden sm:inline"> Cambiar Contraseña </span>
				</button>

				{#if perfil.rol === 'Estudiante'}
					<button
						type="button"
						onclick={() => verNotas(perfil.id)}
						class="inline-flex items-center gap-2 rounded-md bg-neutral-600 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700"
						aria-label="Ver mis Notas"
					>
						<ClipboardList class="h-4 w-4" />
						<span class="hidden sm:inline"> Ver mis Notas </span>
					</button>
				{/if}
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-4xl space-y-6">
		<!-- Datos Personales -->
		<section class="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
			<div class="mb-8 border-b pb-4">
				<h2 class="text-lg font-medium text-neutral-900">Información Personal</h2>
			</div>

			<dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{#each DATOS_PERSONALES as { label, value }}
					<div class="group rounded-lg p-4 transition-colors hover:bg-neutral-50">
						<dt class="flex items-center gap-3 text-sm text-neutral-600">
							<User class="h-5 w-5 text-neutral-400" />
							{label}
						</dt>
						<dd class="mt-2 pl-8 font-medium text-neutral-900">{value}</dd>
					</div>
				{/each}
			</dl>
		</section>

		<!-- Datos de Contacto -->
		<section class="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
			<div class="mb-8 border-b pb-4">
				<h2 class="text-lg font-medium text-neutral-900">Información de Contacto</h2>
			</div>

			<dl class="space-y-6">
				<div class="group rounded-lg p-4 transition-colors hover:bg-neutral-50">
					<dt class="flex items-center gap-3 text-sm text-neutral-600">
						<Mail class="h-5 w-5 text-neutral-400" />
						Email
					</dt>
					<dd class="mt-2 pl-8 font-medium text-neutral-900">{perfil.email}</dd>
				</div>
			</dl>
		</section>

		<!-- Datos de Cuenta -->
		<section class="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
			<div class="mb-8 border-b pb-4">
				<h2 class="text-lg font-medium text-neutral-900">Información de Cuenta</h2>
			</div>

			<dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
				{#each DATOS_CUENTA as dato}
					<div class="group rounded-lg p-4 transition-colors hover:bg-neutral-50">
						<dt class="flex items-center gap-3 text-sm text-neutral-600">
							{#if dato.icon === Shield}
								<Shield class="h-5 w-5 text-neutral-400" />
							{:else}
								<Calendar class="h-5 w-5 text-neutral-400" />
							{/if}
							{dato.label}
						</dt>
						<dd class="mt-2 pl-8 font-medium text-neutral-900">{dato.value}</dd>
					</div>
				{/each}
			</dl>
		</section>
	</main>
</section>

{#if showEditModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm"
		transition:blur
	>
		<dialog open class="mx-auto w-11/12 rounded-lg bg-white md:max-w-xl">
			<form
				method="POST"
				class="flex h-full flex-col overflow-hidden sm:h-auto"
				use:enhance={handleEdit}
				action="?/editarPerfil"
			>
				<!-- Header fijo -->
				<div class="border-b p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-semibold">Editar Información</h2>
						<button
							type="button"
							onclick={toggleEditModal}
							class="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
							aria-label="Cerrar modal de edición de perfil"
						>
							<X class="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="max-h-[50vh] flex-1 space-y-6 overflow-y-auto rounded-lg border p-4 sm:p-6">
					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="nombres">
							<User class="h-5 w-5" /> <span>Nombres</span>
						</label>
						<input
							value={perfil.nombres}
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
							value={perfil.apellido_paterno}
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
							value={perfil.apellido_materno}
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
							value={perfil.dni}
							placeholder="Ingrese su DNI"
							id="dni"
							type="text"
							class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
							name="dni"
							maxlength="8"
						/>
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

{#if showChangePasswordModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 backdrop-blur-sm"
		transition:blur
	>
		<dialog open class="mx-auto w-11/12 rounded-lg bg-white md:max-w-xl">
			<form
				method="POST"
				class="flex h-full flex-col overflow-hidden sm:h-auto"
				use:enhance={handleChangePassword}
				action="?/cambiarContrasena"
			>
				<!-- Header fijo -->
				<div class="border-b p-6">
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-semibold">Cambiar Contraseña</h2>
						<button
							type="button"
							onclick={toggleChangePasswordModal}
							class="rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
							aria-label="Cerrar modal de edición de perfil"
						>
							<X class="h-5 w-5 sm:h-6 sm:w-6" />
						</button>
					</div>
				</div>

				<!-- Contenido scrolleable -->
				<div class="max-h-[50vh] flex-1 space-y-6 overflow-y-auto rounded-lg border p-4 sm:p-6">
					<div>
						<label
							class="flex items-center space-x-2 text-sm text-neutral-600"
							for="current_password"
						>
							<Lock class="h-5 w-5" /> <span>Contraseña Actual</span>
						</label>
						<input
							placeholder="Ingrese su contraseña actual"
							id="current_password"
							type="password"
							class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
							name="current_password"
						/>
					</div>
					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="new_password">
							<Lock class="h-5 w-5" /> <span>Nueva Contraseña</span>
						</label>
						<input
							placeholder="Ingrese su nueva contraseña"
							id="new_password"
							type="password"
							class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
							name="new_password"
						/>
					</div>
					<div>
						<label
							class="flex items-center space-x-2 text-sm text-neutral-600"
							for="confirm_password"
						>
							<Lock class="h-5 w-5" /> <span>Confirmar Nueva Contraseña</span>
						</label>
						<input
							placeholder="Confirme su nueva contraseña"
							id="confirm_password"
							type="password"
							class="mt-1 w-full rounded-md border-gray-300 px-4 py-2 shadow-md"
							name="confirm_password"
						/>
					</div>
				</div>

				<!-- Footer fijo -->
				<div class="border-t p-4 sm:p-6">
					<div class="flex gap-3 sm:justify-end">
						<button
							type="button"
							onclick={toggleChangePasswordModal}
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
							Cambiar
						</button>
					</div>
				</div>
			</form>
		</dialog>
	</div>
{/if}
