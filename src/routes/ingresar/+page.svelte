<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import { fly } from 'svelte/transition';
	import { CheckCircle, ChevronDown, Loader, Lock, Mail, Users, XCircle } from 'lucide-svelte';

	let activeTab = $state('login');
	let ingresando = $state(false);
	let creando = $state(false);
	let { form } = $props();
	let showToast = $state(false);

	$effect(() => {
		if (form?.error) {
			showToast = true;

			const toastTimer = setTimeout(() => {
				showToast = false;
			}, 2000);

			return () => {
				clearTimeout(toastTimer);
			};
		}

		if (form?.success) {
			showToast = true;

			const toastTimer = setTimeout(() => {
				showToast = false;
				goto(`/`);
			}, 5000);

			return () => {
				clearTimeout(toastTimer);
			};
		}
	});

	const handleLogin = () => {
		ingresando = true;

		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			await update();

			ingresando = false;

			if (result.type === 'success') {
				await goto(`/privado`);
			}
		};
	};

	const handleRegister = () => {
		creando = true;

		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			await update();

			creando = false;
		};
	};
</script>

<h1 class="mb-8 text-center text-xl font-bold text-neutral-800 sm:text-2xl">Bienvenido</h1>

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

{#if ingresando}
	<div
		class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
	>
		<Loader class="animate-spin  text-white" size={40} />
		<p class="mt-2 font-medium text-white">Ingresando...</p>
	</div>
{/if}

{#if creando}
	<div
		class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
	>
		<Loader class="animate-spin  text-white" size={40} />
		<p class="mt-2 font-medium text-white">Se está creando su cuenta...</p>
	</div>
{/if}

<div class="mx-0 md:mx-32 xl:mx-64">
	<div class="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-neutral-200 p-1">
		<button
			class="rounded-md px-4 py-2 text-sm font-medium transition-all
        {activeTab === 'login' ? 'bg-white text-neutral-800' : 'text-neutral-600'}"
			onclick={() => (activeTab = 'login')}
		>
			<h2>Iniciar Sesión</h2>
		</button>
		<button
			class="rounded-md px-4 py-2 text-sm font-medium transition-all
        {activeTab === 'signup' ? 'bg-white text-neutral-800' : 'text-neutral-600'}"
			onclick={() => (activeTab = 'signup')}
		>
			<h2>Crear Cuenta</h2>
		</button>
	</div>

	{#if activeTab === 'login'}
		<section aria-labelledby="login-title">
			<form method="POST" action="?/login" class="space-y-6" use:enhance={handleLogin}>
				<fieldset class="space-y-4">
					<legend class="sr-only">Credenciales de acceso</legend>

					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="login-email">
							<Mail class="h-5 w-5" /> <span>Email</span>
						</label>
						<input
							placeholder="correo@ejemplo.com"
							id="login-email"
							name="email"
							type="email"
							required
							class="mt-1 w-full rounded-md px-4 py-2 shadow-md"
						/>
					</div>

					<div>
						<label
							class="flex items-center space-x-2 text-sm text-neutral-600"
							for="login-password"
						>
							<Lock class="h-5 w-5" /> <span>Contraseña</span>
						</label>
						<input
							placeholder="********"
							id="login-password"
							name="password"
							type="password"
							required
							class="mt-1 w-full rounded-md px-4 py-2 shadow-md"
						/>
					</div>
				</fieldset>

				<button
					type="submit"
					class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
				>
					{ingresando ? 'Ingresando...' : 'Ingresar'}
				</button>
			</form>
		</section>
	{:else}
		<section aria-labelledby="signup-title">
			<form method="POST" action="?/signup" class="space-y-6" use:enhance={handleRegister}>
				<fieldset class="space-y-4">
					<legend class="sr-only">Datos de registro</legend>

					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="signUp-rol">
							<Users class="h-5 w-5" /> <span>Rol</span>
						</label>
						<div class="relative">
							<select
								placeholder="Seleccione un rol"
								id="signUp-rol"
								name="rol"
								required
								class="mt-1 w-full cursor-pointer appearance-none rounded-md px-4 py-2 shadow-md"
							>
								<option value="" disabled selected class="hidden">Seleccione un rol</option>
								<option value="Estudiante">Estudiante</option>
								<option value="Profesor">Profesor</option>
								<option value="Administrador">Administrador</option>
							</select>
							<ChevronDown
								class="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-colors group-hover:text-gray-700"
								aria-hidden="true"
							/>
						</div>
					</div>

					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="signUp-email">
							<Mail class="h-5 w-5" /> <span>Email</span>
						</label>
						<input
							placeholder="correo@ejemplo.com"
							id="signUp-email"
							name="email"
							type="email"
							required
							class="mt-1 w-full rounded-md px-4 py-2 shadow-md"
						/>
					</div>

					<div>
						<label
							class="flex items-center space-x-2 text-sm text-neutral-600"
							for="signUp-password"
						>
							<Lock class="h-5 w-5" /> <span>Contraseña</span>
						</label>
						<input
							placeholder="********"
							id="signUp-password"
							name="password"
							type="password"
							required
							class="mt-1 w-full rounded-md px-4 py-2 shadow-md"
						/>
					</div>
				</fieldset>
				<button
					type="submit"
					class="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
				>
					Crear Cuenta
				</button>
			</form>
		</section>
	{/if}
</div>
