<script>
	import { Home, Mail, Newspaper, Users } from 'lucide-svelte';
</script>

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
