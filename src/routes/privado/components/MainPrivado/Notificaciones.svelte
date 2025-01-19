<script>
	import { Bell, Calendar, Check, Info, AlertCircle } from 'lucide-svelte';
</script>

<section class="py-16" aria-labelledby="notifications-title">
	<h2 id="notifications-title" class="text-center text-3xl font-bold text-neutral-800">
		Notificaciones
	</h2>

	<div class="mx-auto mt-12 max-w-3xl space-y-6">
		<!-- Filtros -->
		<div class="flex items-center justify-between">
			<div class="flex gap-2">
				<button class="rounded-lg bg-neutral-800 px-4 py-2 text-white">Todas</button>
				<button
					class="rounded-lg border border-neutral-200 px-4 py-2 text-neutral-600 hover:border-neutral-300"
					>No leídas</button
				>
			</div>
			<button class="text-neutral-600 hover:text-neutral-800">Marcar todas como leídas</button>
		</div>

		<!-- Lista de Notificaciones -->
		<div class="space-y-4">
			<!-- Notificación Urgente -->
			<article class="flex gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
				<AlertCircle size={24} class="flex-shrink-0 text-red-500" />
				<div class="flex-grow space-y-2">
					<header class="flex items-start justify-between">
						<h3 class="font-medium text-neutral-800">Reunión de Padres</h3>
						<time datetime="2024-03-20" class="text-sm text-neutral-400">Hace 2 horas</time>
					</header>
					<p class="text-neutral-600">
						Recordatorio: Reunión de padres este viernes a las 4:00 PM.
					</p>
				</div>
			</article>

			<!-- Notificación Académica -->
			<article class="flex gap-4 rounded-lg border border-neutral-200 p-4">
				<Info size={24} class="flex-shrink-0 text-blue-500" />
				<div class="flex-grow space-y-2">
					<header class="flex items-start justify-between">
						<h3 class="font-medium text-neutral-800">Calificación Publicada</h3>
						<time datetime="2024-03-19" class="text-sm text-neutral-400">Ayer</time>
					</header>
					<p class="text-neutral-600">Nueva calificación en Matemáticas: Examen Parcial.</p>
				</div>
			</article>

			<!-- Notificación Calendario -->
			<article class="flex gap-4 rounded-lg border border-neutral-200 p-4">
				<Calendar size={24} class="flex-shrink-0 text-green-500" />
				<div class="flex-grow space-y-2">
					<header class="flex items-start justify-between">
						<h3 class="font-medium text-neutral-800">Evento Próximo</h3>
						<time datetime="2024-03-18" class="text-sm text-neutral-400">Hace 2 días</time>
					</header>
					<p class="text-neutral-600">Feria de Ciencias: 25 de marzo, 2024.</p>
				</div>
			</article>

			<!-- Notificación Completada -->
			<article class="flex gap-4 rounded-lg border border-neutral-200 p-4 opacity-75">
				<Check size={24} class="flex-shrink-0 text-neutral-400" />
				<div class="flex-grow space-y-2">
					<header class="flex items-start justify-between">
						<h3 class="font-medium text-neutral-600">Tarea Entregada</h3>
						<time datetime="2024-03-15" class="text-sm text-neutral-400">15/03/2024</time>
					</header>
					<p class="text-neutral-500">Trabajo de Historia enviado correctamente.</p>
				</div>
			</article>
		</div>
	</div>
</section>
