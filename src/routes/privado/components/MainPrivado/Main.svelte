<script>
	import Bienvenida from './Bienvenida.svelte';
	import TotalAlumnos from './TotalAlumnos.svelte';
	import TotalCursos from './TotalCursos.svelte';
	import TotalProfesores from './TotalProfesores.svelte';

	let { totalEstudiantes, totalProfesores, totalCursos, nombres, rol } = $props();
</script>

<main class="mx-auto max-w-7xl space-y-6 px-4">
	<Bienvenida {nombres} {rol} />

	<section class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<TotalAlumnos {totalEstudiantes} />
		<TotalProfesores {totalProfesores} />
		<TotalCursos {totalCursos} />
	</section>
</main>
