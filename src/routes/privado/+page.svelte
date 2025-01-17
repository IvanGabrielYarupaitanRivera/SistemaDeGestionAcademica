<script lang="ts">
	import { fade } from 'svelte/transition';

	let { data } = $props();

	let user = data.user;

	// Datos de ejemplo para las secciones
	const eventos = [
		{ fecha: '2024-03-25', titulo: 'Entrega de Calificaciones' },
		{ fecha: '2024-04-01', titulo: 'Inicio de Nuevo Período' }
	];

	const notificaciones = [
		{ tipo: 'info', mensaje: 'Bienvenido al nuevo sistema' },
		{ tipo: 'alerta', mensaje: 'Próximo mantenimiento programado' }
	];

	const faqs = [
		{ pregunta: '¿Cómo subir calificaciones?', respuesta: 'Dirígete a la sección...' },
		{ pregunta: '¿Cómo reportar un problema?', respuesta: 'Utiliza el formulario...' }
	];
</script>

<div class="p-8">
	<!-- Encabezado -->
	<header class="welcome-header">
		<h1>Bienvenido</h1>
		<p class="role-badge">{user?.user_metadata.rol}</p>
	</header>

	<!-- Grid principal -->
	<div class="dashboard-grid">
		<!-- Panel de Eventos -->
		<section class="dashboard-card">
			<h2>Eventos Próximos</h2>
			<div class="events-list">
				{#each eventos as evento}
					<div class="event-item">
						<span class="date">{evento.fecha}</span>
						<span class="title">{evento.titulo}</span>
					</div>
				{/each}
			</div>
		</section>

		<!-- Notificaciones -->
		<section class="dashboard-card">
			<h2>Notificaciones</h2>
			<div class="notifications-list">
				{#each notificaciones as notif}
					<div class="notification-item {notif.tipo}">
						<p>{notif.mensaje}</p>
					</div>
				{/each}
			</div>
		</section>

		<!-- FAQs -->
		<section class="dashboard-card">
			<h2>Preguntas Frecuentes</h2>
			<div class="faq-list">
				{#each faqs as faq}
					<details>
						<summary>{faq.pregunta}</summary>
						<p>{faq.respuesta}</p>
					</details>
				{/each}
			</div>
		</section>

		<!-- Formulario de Retroalimentación -->
		<section class="dashboard-card">
			<h2>Retroalimentación</h2>
			<form class="feedback-form">
				<textarea placeholder="Describe tu problema o sugerencia"></textarea>
				<button type="submit">Enviar</button>
			</form>
		</section>

		<!-- Recursos -->
		<section class="dashboard-card">
			<h2>Recursos Útiles</h2>
			<div class="resources-list">
				<a href="/docs/manual">Manual de Usuario</a>
				<a href="/docs/guias">Guías Rápidas</a>
				<a href="/docs/recursos">Recursos Académicos</a>
			</div>
		</section>
	</div>
</div>

<style>
	.welcome-header {
		margin-bottom: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.role-badge {
		background: #4caf50;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 20px;
	}

	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.dashboard-card {
		background: white;
		border-radius: 10px;
		padding: 1.5rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.event-item,
	.notification-item {
		padding: 0.8rem;
		margin-bottom: 0.5rem;
		border-radius: 5px;
		background: #f5f5f5;
	}

	.notification-item.alerta {
		background: #fff3cd;
	}

	.feedback-form textarea {
		width: 100%;
		min-height: 100px;
		margin-bottom: 1rem;
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 5px;
	}

	.feedback-form button {
		background: #007bff;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 5px;
		cursor: pointer;
	}

	.resources-list a {
		display: block;
		padding: 0.5rem 0;
		color: #007bff;
		text-decoration: none;
	}

	details summary {
		cursor: pointer;
		padding: 0.5rem 0;
		font-weight: bold;
	}
</style>
