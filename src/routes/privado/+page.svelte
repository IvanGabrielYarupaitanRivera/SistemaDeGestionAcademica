<script>
	import Header from './components/HeaderPrivado/Header.svelte';
	import Hero from './components/HeroPrivado/Hero.svelte';
	import Main from './components/MainPrivado/Main.svelte';

	let { data } = $props();
	let { totalEstudiantes, totalProfesores, totalCursos, perfil } = $derived(data);
</script>

<Header />
<Hero />
<Main
	{totalEstudiantes}
	{totalProfesores}
	{totalCursos}
	nombres={perfil.nombres}
	rol={perfil.rol}
/>
<div class="mb-24"></div>
