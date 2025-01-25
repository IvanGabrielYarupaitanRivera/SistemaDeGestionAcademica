<script>
	import { BookOpen, ClipboardList, GraduationCap, UserCog, Users } from 'lucide-svelte';
</script>

<ul class="hidden items-center gap-8 md:flex">
	<li>
		<a
			href="/privado/cursos"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<BookOpen size={18} />
			<span>Cursos</span>
		</a>
	</li>
	<li>
		<a
			href="/privado/estudiantes"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<Users size={18} />
			<span>Estudiantes</span>
		</a>
	</li>
	<li>
		<a
			href="/privado/profesores"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<GraduationCap size={18} />
			<span>Profesores</span>
		</a>
	</li>
	<li>
		<a
			href="/privado/calificaciones"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<ClipboardList size={18} />
			<span>Calificaciones</span>
		</a>
	</li>
	<li>
		<a
			href="/privado/administrador/perfiles"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<UserCog size={18} />
			<span>Perfiles</span>
		</a>
	</li>
</ul>
