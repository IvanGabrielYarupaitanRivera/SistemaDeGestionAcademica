<script>
	import { HelpCircle, Book, Search, MessageCircle, FileText, ExternalLink } from 'lucide-svelte';

	const categorias = [
		{
			icono: Book,
			titulo: 'Guías y Tutoriales',
			descripcion: 'Aprende a usar todas las funciones del sistema',
			enlaces: [
				{ titulo: 'Primeros pasos', url: '/guias/inicio' },
				{ titulo: 'Portal del estudiante', url: '/guias/estudiante' },
				{ titulo: 'Calendario académico', url: '/guias/calendario' }
			]
		},
		{
			icono: Search,
			titulo: 'Preguntas Frecuentes',
			descripcion: 'Respuestas a las consultas más comunes',
			enlaces: [
				{ titulo: 'Acceso al sistema', url: '/faq/acceso' },
				{ titulo: 'Calificaciones', url: '/faq/notas' },
				{ titulo: 'Asistencia', url: '/faq/asistencia' }
			]
		},
		{
			icono: MessageCircle,
			titulo: 'Soporte Técnico',
			descripcion: 'Contacta con nuestro equipo de soporte',
			enlaces: [
				{ titulo: 'Reportar problema', url: '/soporte/ticket' },
				{ titulo: 'Chat en vivo', url: '/soporte/chat' },
				{ titulo: 'Contacto', url: '/soporte/contacto' }
			]
		}
	];
</script>

<section class="py-16" aria-labelledby="help-title">
	<h2 id="help-title" class="text-center text-3xl font-bold text-neutral-800">Centro de Ayuda</h2>

	<div class="mx-auto mt-12 max-w-6xl">
		<!-- Buscador -->
		<div class="mx-auto mb-12 max-w-2xl">
			<div class="relative">
				<input
					type="search"
					placeholder="Buscar ayuda..."
					class="w-full rounded-lg border border-neutral-200 px-4 py-3 pl-12 focus:border-neutral-400 focus:outline-none"
				/>
				<Search size={20} class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
			</div>
		</div>

		<!-- Categorías -->
		<div class="grid gap-8 md:grid-cols-3">
			{#each categorias as categoria}
				<article class="rounded-lg border border-neutral-200 p-6 hover:border-neutral-300">
					<header class="flex items-start gap-4">
						<svelte:component this={categoria.icono} size={24} class="text-neutral-600" />
						<div>
							<h3 class="text-lg font-semibold text-neutral-800">{categoria.titulo}</h3>
							<p class="mt-1 text-sm text-neutral-600">{categoria.descripcion}</p>
						</div>
					</header>

					<ul class="mt-4 space-y-2">
						{#each categoria.enlaces as enlace}
							<li>
								<a
									href={enlace.url}
									class="flex items-center gap-2 text-neutral-600 hover:text-neutral-800"
								>
									<ExternalLink size={16} />
									<span>{enlace.titulo}</span>
								</a>
							</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>

		<!-- Contacto Directo -->
		<div class="mt-12 text-center">
			<p class="text-neutral-600">¿No encuentras lo que buscas?</p>
			<a
				href="/contacto"
				class="mt-2 inline-flex items-center gap-2 text-neutral-800 hover:underline"
			>
				<MessageCircle size={20} />
				<span>Contáctanos directamente</span>
			</a>
		</div>
	</div>
</section>
