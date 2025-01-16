<script>
	import Nosotros from './Nosotros.svelte';
	import Noticias from './Noticias.svelte';
	import Accesos from './Accesos.svelte';
	import Contacto from './Contacto.svelte';
</script>

<main class="mx-auto max-w-7xl px-4">
	<!-- Sección Nosotros: Grid de 3 columnas con misión, visión y valores -->
	<Nosotros />

	<!-- Sección Noticias: Grid responsivo de cards con imágenes -->
	<Noticias />

	<!-- Sección Accesos: Portales de usuario con iconos y descripciones -->
	<Accesos />

	<!-- Sección Contacto: Formulario y cards de información -->
	<Contacto />
</main>
