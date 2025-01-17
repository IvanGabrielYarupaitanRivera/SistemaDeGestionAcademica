<script>
	import { Calendar, FileText, GraduationCap, Home, UserCircle } from 'lucide-svelte';
</script>

<ul class="hidden items-center gap-8 md:flex">
	<li>
		<a
			href="/privado/perfil"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<UserCircle size={18} />
			<span>Mi Perfil</span>
		</a>
	</li>
	<li>
		<a
			href="/dashboard"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<Home size={18} />
			<span>Dashboard</span>
		</a>
	</li>
	<li>
		<a
			href="/horarios"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<Calendar size={18} />
			<span>Horarios</span>
		</a>
	</li>
	<li>
		<a
			href="/cursos"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<GraduationCap size={18} />
			<span>Cursos</span>
		</a>
	</li>
	<li>
		<a
			href="/reportes"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<FileText size={18} />
			<span>Reportes</span>
		</a>
	</li>
</ul>
