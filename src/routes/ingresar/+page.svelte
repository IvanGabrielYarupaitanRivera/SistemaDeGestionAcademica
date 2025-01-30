<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import { fly } from 'svelte/transition';
	import {
		CheckCircle,
		ChevronDown,
		GraduationCap,
		Key,
		Loader,
		Lock,
		Mail,
		User,
		Users,
		XCircle
	} from 'lucide-svelte';

	let activeTab = $state('login');
	let ingresando = $state(false);
	let creando = $state(false);
	let { form } = $props();
	let showToast = $state(false);

	let email = $state('');
	let password = $state('');

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

<section class="p-8">
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
				<form method="POST" action="?/login" class="space-y-4" use:enhance={handleLogin}>
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
								bind:value={email}
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
								bind:value={password}
								class="mt-1 w-full rounded-md px-4 py-2 shadow-md"
							/>
						</div>
					</fieldset>

					<div class="space-y-2">
						<div class="flex items-center gap-2 text-sm text-neutral-600">
							<Key class="h-5 w-5" />
							<span>Cuentas Demo</span>
						</div>

						<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
							<button
								type="button"
								onclick={() => {
									email = 'estudiante01@gmail.com';
									password = '123123123';
								}}
								class="group flex items-center justify-center gap-3 rounded-lg border border-neutral-200
									   bg-white p-3 text-sm font-medium text-neutral-700 shadow-sm
									   transition-all hover:bg-neutral-50 hover:shadow-md
									   active:scale-[0.98]"
							>
								<img
									src="/logo/logo-estudiante.webp"
									alt="Estudiante"
									class="h-5 w-5 object-contain"
									loading="lazy"
								/>
								<span>Estudiante Demo</span>
							</button>

							<button
								type="button"
								onclick={() => {
									email = 'profesor01@gmail.com';
									password = '123123123';
								}}
								class="group flex items-center justify-center gap-3 rounded-lg border border-neutral-200
									   bg-white p-3 text-sm font-medium text-neutral-700 shadow-sm
									   transition-all hover:bg-neutral-50 hover:shadow-md
									   active:scale-[0.98]"
							>
								<img
									src="/logo/logo-profesor.webp"
									alt="Profesor"
									class="h-5 w-5 object-contain"
									loading="lazy"
								/>
								<span>Profesor Demo</span>
							</button>
						</div>
					</div>

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
									class="mt-1 w-full cursor-pointer appearance-none rounded-md border-gray-300 py-2 pl-4 pr-10 shadow-md"
								>
									<option value="" disabled selected class="hidden">Seleccione un rol</option>
									<option value="Estudiante">Estudiante</option>
									<option value="Profesor">Profesor</option>
								</select>
								<ChevronDown
									class="pointer-events-none absolute right-3 top-[55%] h-5 w-5 -translate-y-1/2 transform text-gray-500"
									aria-hidden="true"
								/>
							</div>
						</div>

						<div>
							<label
								class="flex items-center space-x-2 text-sm text-neutral-600"
								for="signUp-email"
							>
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
</section>
