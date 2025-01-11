<script lang="ts">
	let { data } = $props();
	let { perfil } = $derived(data);
</script>

<header>
	<h1 class="text-2xl font-bold">Mi Perfil</h1>
	<hr />
</header>

<section aria-labelledby="datos-perfil">
	<h2 id="datos-perfil" class="sr-only">Datos del perfil</h2>
	<dl>
		<dt>ID</dt>
		<dd>{perfil.id}</dd>

		<dt>Nombres</dt>
		<dd>{perfil.nombres}</dd>

		<dt>Apellido Paterno</dt>
		<dd>{perfil.apellido_paterno}</dd>

		<dt>Apellido Materno</dt>
		<dd>{perfil.apellido_materno}</dd>

		<dt>DNI</dt>
		<dd>{perfil.dni}</dd>

		<dt>Rol de Usuario</dt>
		<dd>{perfil.rol}</dd>

		<dt>Email</dt>
		<dd>{perfil.email}</dd>

		<dt>Fecha de Creación</dt>
		<dd>{perfil.fecha_creacion}</dd>

		<dt>Fecha de Actualización</dt>
		<dd>{perfil.fecha_actualizacion}</dd>
	</dl>
</section>

<footer>
	<button type="button">Editar Información</button>
</footer>
