<script>
	import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-svelte';

	// Datos de ejemplo
	const eventos = [
		{
			fecha: '2024-03-20',
			titulo: 'Reunión de Padres',
			hora: '16:00',
			lugar: 'Auditorio Principal',
			tipo: 'importante'
		},
		{
			fecha: '2024-03-22',
			titulo: 'Examen Parcial - Matemáticas',
			hora: '10:00',
			lugar: 'Aula 301',
			tipo: 'evaluacion'
		},
		{
			fecha: '2024-03-25',
			titulo: 'Feria de Ciencias',
			hora: '09:00',
			lugar: 'Patio Central',
			tipo: 'actividad'
		}
	];
</script>

<section class="py-16" aria-labelledby="calendar-title">
	<h2 id="calendar-title" class="text-center text-3xl font-bold text-neutral-800">
		Calendario Académico
	</h2>

	<div class="mx-auto mt-12 max-w-5xl">
		<!-- Navegación del Calendario -->
		<header class="mb-8 flex items-center justify-between">
			<div class="flex items-center gap-4">
				<h3 class="text-xl font-medium text-neutral-800">Marzo 2024</h3>
				<div class="flex gap-2">
					<button class="rounded-lg p-2 hover:bg-neutral-100">
						<ChevronLeft size={20} class="text-neutral-600" />
					</button>
					<button class="rounded-lg p-2 hover:bg-neutral-100">
						<ChevronRight size={20} class="text-neutral-600" />
					</button>
				</div>
			</div>
			<div class="flex gap-2">
				<button class="rounded-lg bg-neutral-800 px-4 py-2 text-white">Mes</button>
				<button
					class="rounded-lg border border-neutral-200 px-4 py-2 text-neutral-600 hover:border-neutral-300"
					>Semana</button
				>
				<button
					class="rounded-lg border border-neutral-200 px-4 py-2 text-neutral-600 hover:border-neutral-300"
					>Día</button
				>
			</div>
		</header>

		<!-- Grid del Calendario -->
		<div class="grid grid-cols-7 gap-4">
			<!-- Días de la semana -->
			{#each ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] as dia}
				<div class="py-2 text-center font-medium text-neutral-400">{dia}</div>
			{/each}

			<!-- Días del mes (ejemplo simplificado) -->
			{#each Array(35) as _, i}
				<div
					class="aspect-square rounded-lg border border-neutral-100 p-2 hover:border-neutral-200"
				>
					<span class="text-sm text-neutral-600">{i + 1}</span>
				</div>
			{/each}
		</div>

		<!-- Lista de Eventos -->
		<div class="mt-8 space-y-4">
			<h3 class="text-lg font-medium text-neutral-800">Próximos Eventos</h3>

			{#each eventos as evento}
				<article
					class="flex gap-4 rounded-lg border border-neutral-200 p-4 hover:border-neutral-300"
				>
					<Calendar size={24} class="flex-shrink-0 text-neutral-400" />
					<div class="flex-grow">
						<header class="flex items-start justify-between">
							<h4 class="font-medium text-neutral-800">{evento.titulo}</h4>
							<span class="text-sm text-neutral-400">{evento.fecha}</span>
						</header>
						<div class="mt-2 space-y-1">
							<div class="flex items-center gap-2 text-sm text-neutral-600">
								<Clock size={16} />
								<span>{evento.hora}</span>
							</div>
							<div class="flex items-center gap-2 text-sm text-neutral-600">
								<MapPin size={16} />
								<span>{evento.lugar}</span>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>
