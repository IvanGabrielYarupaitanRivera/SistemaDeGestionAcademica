<script>
	import HeaderEstudiante from './components/HeaderEstudiante/HeaderEstudiante.svelte';
	import ActionsEstudiante from './components/MainEstudiante/ActionsEstudiante.svelte';

	let { data } = $props();
	let { user } = $derived(data);
</script>

<HeaderEstudiante />

<main class="mx-auto max-w-7xl px-4">
	<ActionsEstudiante idEstudiante={user?.id} />
</main>
