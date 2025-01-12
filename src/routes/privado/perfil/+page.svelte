<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
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
		CheckCircle
	} from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { data, form } = $props();
	let { perfil } = $derived(data);

	let showToast = $state(false);

	let showEditModal = $state(false);
	let showChangePasswordModal = $state(false);
	let showDeleteAccountModal = $state(false);

	let editando = $state(false);

	function toggleEditModal() {
		showEditModal = !showEditModal;
	}

	function toggleChangePasswordModal() {
		showChangePasswordModal = !showChangePasswordModal;
	}

	function toggleDeleteAccountModal() {
		showDeleteAccountModal = !showDeleteAccountModal;
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

		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			await update();

			editando = false;

			/* if (result.type === 'success') {
				await goto(`/privado/perfil`);
			} */
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

<header class="bg-white p-4 shadow-md md:p-6 lg:p-8">
	<h1 class="text-center text-xl font-bold text-neutral-800 md:text-2xl">Mi Perfil</h1>
</header>

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
		class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
	>
		<Loader class="animate-spin  text-white" size={40} />
		<p class="mt-2 font-medium text-white">Editando su información...</p>
	</div>
{/if}

<div class="mx-auto mt-8 xl:max-w-3xl">
	<section aria-labelledby="datos-personales" class="rounded-md bg-neutral-100 p-4 sm:p-6 lg:p-8">
		<h2 id="datos-personales" class="sr-only">Datos Personales</h2>
		<dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			<div class="space-y-2">
				<dt class="flex items-center space-x-2 text-sm text-neutral-600">
					<User class="h-5 w-5" /> <span>Nombres</span>
				</dt>
				<dd class="ml-7 text-neutral-800">{perfil.nombres}</dd>
			</div>
			<div class="space-y-2">
				<dt class="flex items-center space-x-2 text-sm text-neutral-600">
					<User class="h-5 w-5" /> <span>Apellido Paterno</span>
				</dt>
				<dd class="ml-7 text-neutral-800">{perfil.apellido_paterno}</dd>
			</div>
			<div class="space-y-2">
				<dt class="flex items-center space-x-2 text-sm text-neutral-600">
					<User class="h-5 w-5" /> <span>Apellido Materno</span>
				</dt>
				<dd class="ml-7 text-neutral-800">{perfil.apellido_materno}</dd>
			</div>
			<div class="space-y-2">
				<dt class="flex items-center space-x-2 text-sm text-neutral-600">
					<IdCard class="h-5 w-5" /> <span>DNI</span>
				</dt>
				<dd class="ml-7 text-neutral-800">{perfil.dni}</dd>
			</div>
		</dl>
	</section>

	<hr class="my-8 border-neutral-300" />

	<section aria-labelledby="datos-contacto" class="rounded-md bg-neutral-100 p-4 sm:p-6 lg:p-8">
		<h2 id="datos-contacto" class="sr-only">Datos de Contacto</h2>
		<dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			<div class="space-y-2">
				<dt class="flex items-center space-x-2 text-sm text-neutral-600">
					<Mail class="h-5 w-5" /> <span>Email</span>
				</dt>
				<dd class="ml-7 text-neutral-800">{perfil.email}</dd>
			</div>
		</dl>
	</section>

	<hr class="my-8 border-neutral-300" />

	<section aria-labelledby="datos-cuenta" class="rounded-md bg-neutral-100 p-4 sm:p-6 lg:p-8">
		<h2 id="datos-cuenta" class="sr-only">Datos de la Cuenta</h2>
		<dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
			<div class="space-y-2">
				<dt class="flex items-center space-x-2 text-sm text-neutral-600">
					<Shield class="h-5 w-5" /> <span>Rol de Usuario</span>
				</dt>
				<dd class="ml-7 text-neutral-800">{perfil.rol}</dd>
			</div>
			<div class="space-y-2">
				<dt class="flex items-center space-x-2 text-sm text-neutral-600">
					<Calendar class="h-5 w-5" /> <span>Fecha de Creación de la Cuenta</span>
				</dt>
				<dd class="ml-7 text-neutral-800">{formatFechaPeruana(perfil.fecha_creacion)}</dd>
			</div>
			<div class="space-y-2">
				<dt class="flex items-center space-x-2 text-sm text-neutral-600">
					<Calendar class="h-5 w-5" /> <span>Fecha de Actualización de la Cuenta</span>
				</dt>
				<dd class="ml-7 text-neutral-800">{formatFechaPeruana(perfil.fecha_actualizacion)}</dd>
			</div>
		</dl>
	</section>

	<hr class="my-8 border-neutral-300" />

	<footer class="mt-8 flex justify-end space-x-2">
		<button
			type="button"
			onclick={toggleEditModal}
			class="rounded-md bg-neutral-600 px-4 py-2 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50"
			aria-label="Editar Información"
		>
			Editar Información
		</button>
		<button
			type="button"
			onclick={toggleChangePasswordModal}
			class="rounded-md bg-neutral-600 px-4 py-2 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50"
			aria-label="Cambiar Contraseña"
		>
			Cambiar Contraseña
		</button>
		<button
			type="button"
			onclick={toggleDeleteAccountModal}
			class="rounded-md bg-neutral-600 px-4 py-2 text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50"
			aria-label="Eliminar Cuenta"
		>
			Eliminar Cuenta
		</button>
	</footer>
</div>

{#if showEditModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
	>
		<dialog open class=":max-w-sm mx-auto w-full rounded-lg bg-white p-6 md:max-w-xl">
			<form method="POST" class="space-y-8" use:enhance={handleEdit} action="?/editarPerfil">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold">Editar Información</h2>
					<button type="button" onclick={toggleEditModal} class="text-gray-500 hover:text-gray-700">
						<X class="h-6 w-6" />
					</button>
				</div>
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

				<div class="flex justify-end space-x-2">
					<button
						type="button"
						onclick={toggleEditModal}
						class="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
					>
						Cancelar
					</button>
					<button
						type="submit"
						class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Guardar
					</button>
				</div>
			</form>
		</dialog>
	</div>
{/if}

{#if showChangePasswordModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
	>
		<dialog open class="mx-4 w-full max-w-lg rounded-lg bg-white p-6 sm:mx-auto">
			<form method="dialog" class="space-y-8">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold">Cambiar Contraseña</h2>
					<button
						type="button"
						onclick={toggleChangePasswordModal}
						class="text-gray-500 hover:text-gray-700"
					>
						<X class="h-6 w-6" />
					</button>
				</div>
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
					/>
				</div>
				<div class="flex justify-end space-x-2">
					<button
						type="button"
						onclick={toggleChangePasswordModal}
						class="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
					>
						Cancelar
					</button>
					<button
						type="submit"
						onclick={toggleChangePasswordModal}
						class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Cambiar
					</button>
				</div>
			</form>
		</dialog>
	</div>
{/if}

{#if showDeleteAccountModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
	>
		<dialog open class="mx-4 w-full max-w-lg rounded-lg bg-white p-6 sm:mx-auto">
			<form method="dialog" class="space-y-8">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold">Eliminar Cuenta</h2>
					<button
						type="button"
						onclick={toggleDeleteAccountModal}
						class="text-gray-500 hover:text-gray-700"
					>
						<X class="h-6 w-6" />
					</button>
				</div>
				<p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
				<div class="flex justify-end space-x-2">
					<button
						type="submit"
						onclick={toggleDeleteAccountModal}
						class="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
					>
						Eliminar
					</button>
					<button
						type="button"
						onclick={toggleDeleteAccountModal}
						class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Cancelar
					</button>
				</div>
			</form>
		</dialog>
	</div>
{/if}
