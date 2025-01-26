<script lang="ts">
	import { Pencil, Plus, Trash } from 'lucide-svelte';
	import HeaderAdmin from './components/HeaderAdmin/HeaderAdmin.svelte';
	import Actions from './components/MainAdmin/Actions.svelte';
</script>

<HeaderAdmin />

<main class="mx-auto max-w-7xl px-4">
	<Actions />
</main>
