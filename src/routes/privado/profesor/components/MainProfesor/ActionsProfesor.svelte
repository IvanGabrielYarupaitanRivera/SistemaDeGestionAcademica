<script>
	import { BookOpen, Users, GraduationCap } from 'lucide-svelte';
</script>

<section class="py-16" aria-labelledby="actions-title">
	<h2 id="actions-title" class="text-center text-3xl font-bold text-neutral-800">
		Acciones del Profesor
	</h2>
	<div class="mt-12 grid gap-8 md:grid-cols-3">
		<a
			href="/privado/estudiantes"
			class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<Users size={32} className="mb-4 text-neutral-600" />
			<h3 class="text-xl font-semibold text-neutral-800">Estudiantes</h3>
			<p class="mt-4 text-neutral-600">
				Consulta la lista de estudiantes, edita sus grados, inscríbelos en cursos y revisa sus
				notas.
			</p>
		</a>

		<a
			href="/privado/cursos"
			class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<BookOpen size={32} className="mb-4 text-neutral-600" />
			<h3 class="text-xl font-semibold text-neutral-800">Cursos</h3>
			<p class="mt-4 text-neutral-600">
				Consulta la lista de los cursos, agrega nuevos cursos y edita su información.
			</p>
		</a>

		<a
			href="/privado/profesores"
			class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<GraduationCap size={32} className="mb-4 text-neutral-600" />
			<h3 class="text-xl font-semibold text-neutral-800">Profesores</h3>
			<p class="mt-4 text-neutral-600">Consulta la lista de los profesores.</p>
		</a>
	</div>
</section>
