<script lang="ts">
	import {
		GraduationCap,
		Mail,
		Phone,
		MapPin,
		Home,
		Newspaper,
		Users,
		Linkedin,
		Instagram,
		Facebook,
		User2,
		MessageSquare,
		Send,
		Users2,
		UserCog,
		Target,
		Lightbulb,
		Heart
	} from 'lucide-svelte';
</script>

<!-- Header: Navegación principal fija -->
<header class="sticky top-0 z-30 bg-white shadow-md">
	<!-- Nav: Contenedor de navegación responsiva -->
	<nav class="mx-auto flex max-w-7xl items-center justify-between p-4">
		<!-- Logo y nombre del colegio -->
		<a href="/" class="flex items-center gap-4">
			<img src="/logo/logo-colegio.webp" alt="Logo Colegio" class="h-12 w-12" />
			<span class="text-lg font-bold text-neutral-800">Colegio</span>
		</a>

		<!-- Lista de navegación - se oculta en móviles -->
		<ul class="hidden items-center gap-8 md:flex">
			<li>
				<a
					href="#inicio"
					class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
				>
					<Home size={18} />
					<span>Inicio</span>
				</a>
			</li>
			<li>
				<a
					href="#nosotros"
					class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
				>
					<Users size={18} />
					<span>Nosotros</span>
				</a>
			</li>
			<li>
				<a
					href="#noticias"
					class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
				>
					<Newspaper size={18} />
					<span>Noticias</span>
				</a>
			</li>
			<li>
				<a
					href="#contacto"
					class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
				>
					<Mail size={18} />
					<span>Contacto</span>
				</a>
			</li>
		</ul>
	</nav>
</header>

<!-- Hero Section: Banner principal con gradiente y CTA -->
<section
	id="inicio"
	class="relative overflow-hidden bg-gradient-to-b from-amber-100 via-neutral-100 to-neutral-100 py-20 text-center md:py-32"
	aria-labelledby="hero-title"
>
	<div class="relative z-10">
		<h1
			id="hero-title"
			class="text-4xl font-bold tracking-tight text-neutral-800 md:text-5xl lg:text-6xl"
		>
			Colegio
		</h1>

		<p class="mx-auto mt-8 max-w-2xl text-lg text-neutral-600 md:text-xl">
			Formando líderes del mañana con excelencia académica e innovación educativa
		</p>

		<a
			href="/ingresar"
			class="group mt-10 inline-flex items-center gap-2 rounded-lg bg-neutral-800 px-6 py-3 text-white transition-all duration-200 hover:bg-neutral-700"
		>
			<span>Acceder al Sistema</span>
		</a>
	</div>
</section>

<!-- Main Section -->
<main class="mx-auto max-w-7xl px-4">
	<!-- Sección Nosotros: Grid de 3 columnas con misión, visión y valores -->
	<section id="nosotros" class="py-16" aria-labelledby="about-title">
		<h2 id="about-title" class="text-center text-3xl font-bold text-neutral-800">
			Nuestra Institución
		</h2>
		<div class="mt-12 grid gap-8 md:grid-cols-3">
			<article
				class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
			>
				<Target size={32} className="mb-4 text-neutral-600" />
				<h3 class="text-xl font-semibold text-neutral-800">Misión</h3>
				<p class="mt-4 text-neutral-600">
					Formar estudiantes íntegros y competentes mediante una educación innovadora y
					personalizada.
				</p>
			</article>

			<article
				class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
			>
				<Lightbulb size={32} className="mb-4 text-neutral-600" />
				<h3 class="text-xl font-semibold text-neutral-800">Visión</h3>
				<p class="mt-4 text-neutral-600">
					Ser referentes en educación innovadora, formando líderes que impacten positivamente en la
					sociedad.
				</p>
			</article>

			<article
				class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
			>
				<Heart size={32} className="mb-4 text-neutral-600" />
				<h3 class="text-xl font-semibold text-neutral-800">Valores</h3>
				<ul class="mt-4 space-y-2 text-neutral-600">
					<li>• Excelencia académica</li>
					<li>• Innovación educativa</li>
					<li>• Integridad personal</li>
				</ul>
			</article>
		</div>
	</section>

	<!-- Sección Noticias: Grid responsivo de cards con imágenes -->
	<section id="noticias" class="py-16" aria-labelledby="news-title">
		<h2 id="news-title" class="text-center text-3xl font-bold text-neutral-800">
			Últimas Noticias
		</h2>
		<!-- Grid de artículos con diferente número de columnas según viewport -->
		<div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<article
				class="group rounded-lg border border-neutral-200 p-6 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
			>
				<img
					src="/logo/logo-colegio.webp"
					alt="Sistema de Gestión"
					class="mb-4 h-48 w-full rounded-lg object-cover"
				/>
				<time datetime="2024-01-20" class="text-sm text-neutral-500">20 de Enero, 2025</time>
				<h3 class="mt-2 text-xl font-semibold text-neutral-800 group-hover:text-neutral-900">
					Implementación Sistema de Gestión
				</h3>
				<p class="mt-4 text-neutral-600">
					Modernizando nuestra gestión académica para mejorar la experiencia educativa.
				</p>
			</article>

			<article
				class="group rounded-lg border border-neutral-200 p-6 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
			>
				<img
					src="/logo/logo-colegio.webp"
					alt="Talleres de Verano"
					class="mb-4 h-48 w-full rounded-lg object-cover"
				/>
				<time datetime="2024-01-15" class="text-sm text-neutral-500">15 de Enero, 2025</time>
				<h3 class="mt-2 text-xl font-semibold text-neutral-800 group-hover:text-neutral-900">
					Talleres de Verano 2025
				</h3>
				<p class="mt-4 text-neutral-600">
					Inicio de inscripciones para nuestros talleres artísticos y deportivos.
				</p>
			</article>

			<article
				class="group rounded-lg border border-neutral-200 p-6 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
			>
				<img
					src="/logo/logo-colegio.webp"
					alt="Certificación Internacional"
					class="mb-4 h-48 w-full rounded-lg object-cover"
				/>
				<time datetime="2024-01-10" class="text-sm text-neutral-500">10 de Enero, 2025</time>
				<h3 class="mt-2 text-xl font-semibold text-neutral-800 group-hover:text-neutral-900">
					Certificación Internacional
				</h3>
				<p class="mt-4 text-neutral-600">
					Obtuvimos la certificación de calidad educativa ISO 21001:2018.
				</p>
			</article>
		</div>
	</section>

	<!-- Sección Accesos: Portales de usuario con iconos y descripciones -->
	<section id="accesos" class="py-16" aria-labelledby="access-title">
		<h2 id="access-title" class="text-center text-3xl font-bold text-neutral-800">
			Accesos Rápidos
		</h2>
		<!-- Grid responsivo de enlaces con hover effects -->
		<nav class="mt-12">
			<ul class="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
				<li>
					<a
						href="/ingresar"
						class="flex flex-col items-center gap-4 rounded-lg border border-neutral-200 p-6 text-neutral-800 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
					>
						<GraduationCap size={32} />
						<div class="text-center">
							<h3 class="font-semibold">Portal Estudiantes</h3>
							<p class="mt-2 text-sm text-neutral-600">Accede a tus cursos y calificaciones</p>
						</div>
					</a>
				</li>
				<li>
					<a
						href="/ingresar"
						class="flex flex-col items-center gap-4 rounded-lg border border-neutral-200 p-6 text-neutral-800 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
					>
						<Users2 size={32} />
						<div class="text-center">
							<h3 class="font-semibold">Portal Docentes</h3>
							<p class="mt-2 text-sm text-neutral-600">Gestiona tus clases y evaluaciones</p>
						</div>
					</a>
				</li>
				<li>
					<a
						href="/ingresar"
						class="flex flex-col items-center gap-4 rounded-lg border border-neutral-200 p-6 text-neutral-800 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
					>
						<UserCog size={32} />
						<div class="text-center">
							<h3 class="font-semibold">Portal Administrativo</h3>
							<p class="mt-2 text-sm text-neutral-600">Administra el sistema académico</p>
						</div>
					</a>
				</li>
			</ul>
		</nav>
	</section>

	<!-- Sección Contacto: Formulario y cards de información -->
	<section id="contacto" class="mx-16 py-16" aria-labelledby="contact-title">
		<h2 id="contact-title" class="text-center text-3xl font-bold text-neutral-800">Contacto</h2>
		<div class="mt-12 grid gap-12 md:grid-cols-2">
			<!-- Formulario de contacto con iconos -->
			<form method="POST" action="?/contact" class="space-y-6">
				<fieldset class="space-y-4">
					<legend class="sr-only">Formulario de contacto</legend>

					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="nombre">
							<User2 class="h-5 w-5" /> <span>Nombre</span>
						</label>
						<input
							placeholder="Juan Pérez"
							id="nombre"
							name="nombre"
							type="text"
							required
							class="mt-1 w-full rounded-md px-4 py-2 shadow-md"
						/>
					</div>

					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="email">
							<Mail class="h-5 w-5" /> <span>Email</span>
						</label>
						<input
							placeholder="correo@ejemplo.com"
							id="email"
							name="email"
							type="email"
							required
							class="mt-1 w-full rounded-md px-4 py-2 shadow-md"
						/>
					</div>

					<div>
						<label class="flex items-center space-x-2 text-sm text-neutral-600" for="mensaje">
							<MessageSquare class="h-5 w-5" /> <span>Mensaje</span>
						</label>
						<textarea
							placeholder="Escribe tu mensaje aquí..."
							id="mensaje"
							name="mensaje"
							required
							rows="4"
							class="mt-1 w-full rounded-md px-4 py-2 shadow-md"
						></textarea>
					</div>
				</fieldset>

				<button
					type="submit"
					class="flex w-full items-center justify-center gap-2 rounded-md bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700"
				>
					<Send class="h-5 w-5" />
					<span> Enviar mensaje </span>
				</button>
			</form>

			<!-- Cards de información de contacto con hover effects -->
			<section class=" grid gap-3" aria-label="Información de contacto">
				<address
					class="flex flex-col items-center gap-3 rounded-lg border border-neutral-200 bg-white p-6 text-neutral-600 shadow-sm transition-shadow duration-200 hover:shadow-md"
					aria-label="Dirección física"
				>
					<MapPin size={24} aria-hidden="true" />
					<p class="text-center">Av. Educación 123, Huancayo</p>
				</address>

				<address
					class="flex flex-col items-center gap-3 rounded-lg border border-neutral-200 bg-white p-6 text-neutral-600 shadow-sm transition-shadow duration-200 hover:shadow-md"
					aria-label="Teléfono de contacto"
				>
					<Phone size={24} aria-hidden="true" />
					<p class="text-center">
						<a href="tel:+5101234567" class="hover:text-neutral-900">(01) 123-4567</a>
					</p>
				</address>

				<address
					class="flex flex-col items-center gap-3 rounded-lg border border-neutral-200 bg-white p-6 text-neutral-600 shadow-sm transition-shadow duration-200 hover:shadow-md"
					aria-label="Correo electrónico"
				>
					<Mail size={24} aria-hidden="true" />
					<p class="text-center">
						<a href="mailto:contacto@colegio.edu.pe" class="hover:text-neutral-900"
							>contacto@colegio.edu.pe</a
						>
					</p>
				</address>
			</section>
		</div>
	</section>
</main>

<!-- Footer: Links sociales y copyright -->
<footer class="border-t border-neutral-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 py-12">
		<nav aria-label="Redes sociales" class="mb-8">
			<ul class="flex justify-center gap-8">
				<li>
					<a
						href="/"
						aria-label="Facebook"
						class="text-neutral-600 transition hover:text-neutral-900"
					>
						<Facebook size={24} />
					</a>
				</li>
				<li>
					<a
						href="/"
						aria-label="Instagram"
						class="text-neutral-600 transition hover:text-neutral-900"
					>
						<Instagram size={24} />
					</a>
				</li>
				<li>
					<a
						href="/"
						aria-label="LinkedIn"
						class="text-neutral-600 transition hover:text-neutral-900"
					>
						<Linkedin size={24} />
					</a>
				</li>
			</ul>
		</nav>
		<p class="text-center text-sm text-neutral-600">
			© {new Date().getFullYear()} Colegio. Todos los derechos reservados.
		</p>
	</div>
</footer>
