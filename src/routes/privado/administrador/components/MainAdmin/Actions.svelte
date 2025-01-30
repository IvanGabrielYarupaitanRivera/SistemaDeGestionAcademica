<script>
	import { BookOpen, Users, GraduationCap, ClipboardList, UserCog } from 'lucide-svelte';
</script>

<section class="py-16" aria-labelledby="actions-title">
	<h2 id="actions-title" class="text-center text-3xl font-bold text-neutral-800">
		Acciones Administrativas
	</h2>
	<div class="mt-12 grid gap-8 md:grid-cols-3">
		<a
			href="/privado/administrador/perfiles"
			class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<UserCog size={32} className="mb-4 text-neutral-600" />
			<h3 class="text-xl font-semibold text-neutral-800">Perfiles</h3>
			<p class="mt-4 text-neutral-600">Administra los perfiles de usuario y configura sus roles.</p>
		</a>

		<a
			href="/privado/cursos"
			class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<BookOpen size={32} className="mb-4 text-neutral-600" />
			<h3 class="text-xl font-semibold text-neutral-800">Cursos</h3>
			<p class="mt-4 text-neutral-600">Gestiona los cursos académicos y sus descripciones.</p>
		</a>

		<a
			href="/privado/estudiantes"
			class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<Users size={32} className="mb-4 text-neutral-600" />
			<h3 class="text-xl font-semibold text-neutral-800">Estudiantes</h3>
			<p class="mt-4 text-neutral-600">
				Administra la información y registro de estudiantes matriculados.
			</p>
		</a>

		<a
			href="/privado/profesores"
			class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<GraduationCap size={32} className="mb-4 text-neutral-600" />
			<h3 class="text-xl font-semibold text-neutral-800">Profesores</h3>
			<p class="mt-4 text-neutral-600">Gestiona el personal docente y sus cursos académicos.</p>
		</a>
	</div>
</section>
