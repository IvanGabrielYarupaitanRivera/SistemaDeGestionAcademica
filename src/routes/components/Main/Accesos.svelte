<script>
	import { GraduationCap, UserCog, Users2 } from 'lucide-svelte';
</script>

<section id="accesos" class="py-16" aria-labelledby="access-title">
	<h2 id="access-title" class="text-center text-3xl font-bold text-neutral-800">Accesos Rápidos</h2>
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
