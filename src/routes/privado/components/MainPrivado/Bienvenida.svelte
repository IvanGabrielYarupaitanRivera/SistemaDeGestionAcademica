<script lang="ts">
	import { GraduationCap, Shield, User } from 'lucide-svelte';

	let { nombres, rol } = $props();

	const usuario = {
		nombres,
		rol
	};
</script>

<section class="rounded-lg bg-neutral-900 p-6 shadow-lg">
	<header class="">
		<h1 class="text-2xl font-semibold text-white">
			<span class="block">
				Bienvenido{usuario.nombres.includes(' ') ? ' ' : ' '}
				<a class="text-blue-400" href="/privado/perfil">{usuario.nombres}</a>
			</span>
		</h1>

		{#if usuario.rol === 'Administrador'}
			<span
				class="mt-2 inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-400"
			>
				<Shield class="h-4 w-4" />
				{usuario.rol}
			</span>
		{:else if usuario.rol === 'Profesor'}
			<span
				class="mt-2 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-400"
			>
				<GraduationCap class="h-4 w-4" />
				{usuario.rol}
			</span>
		{:else}
			<span
				class="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400"
			>
				<User class="h-4 w-4" />
				{usuario.rol}
			</span>
		{/if}
	</header>
</section>
