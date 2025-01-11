<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import { fly } from 'svelte/transition';

	let activeTab = $state('login');
	let { form } = $props();
	let showToast = $state(false);

	$effect(() => {
		if (form?.error) {
			showToast = true;

			const toastTimer = setTimeout(() => {
				showToast = false;
			}, 3000);

			return () => {
				clearTimeout(toastTimer);
			};
		}
	});

	const handleLogin = () => {
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			await update();

			if (result.type === 'success') {
				await goto(`/privado`);
			}
		};
	};

	const handleRegister = () => {
		return async ({ result, update }: { result: ActionResult; update: () => Promise<void> }) => {
			await update();

			if (result.type === 'success') {
				await goto(`/`);
			}
		};
	};
</script>

<h1 class="mb-8 text-center text-2xl font-bold text-neutral-800 sm:text-3xl lg:text-4xl">
	Bienvenido
</h1>

{#if showToast && form?.error}
	<div
		transition:fly={{ x: 20 }}
		class="fixed right-4 top-4 flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-3 text-sm text-white"
		role="alert"
	>
		<span>❌</span>
		{form.error}
	</div>
{/if}

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
					<label for="login-email" class="block text-sm font-medium text-gray-700"> Email </label>
					<input
						id="login-email"
						name="email"
						type="email"
						required
						class="mt-1 block w-full rounded-md p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label for="login-password" class="block text-sm font-medium text-gray-700">
						Contraseña
					</label>
					<input
						id="login-password"
						name="password"
						type="password"
						required
						class="mt-1 block w-full rounded-md p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
			</fieldset>

			<button
				type="submit"
				class="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Iniciar Sesión
			</button>
		</form>
	</section>
{:else}
	<section aria-labelledby="signup-title">
		<form method="POST" action="?/signup" class="space-y-6" use:enhance={handleRegister}>
			<fieldset class="space-y-4">
				<legend class="sr-only">Datos de registro</legend>

				<div>
					<label for="signup-email" class="block text-sm font-medium text-gray-700"> Email </label>
					<input
						id="signup-email"
						name="email"
						type="email"
						required
						class="mt-1 block w-full rounded-md p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>

				<div>
					<label for="signup-password" class="block text-sm font-medium text-gray-700">
						Contraseña
					</label>
					<input
						id="signup-password"
						name="password"
						type="password"
						required
						class="mt-1 block w-full rounded-md p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
			</fieldset>
			<button
				type="submit"
				class="w-full rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
			>
				Crear Cuenta
			</button>
		</form>
	</section>
{/if}
