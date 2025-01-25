<script>
	import { Bell, Calendar, HelpCircle, UserCircle } from 'lucide-svelte';
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
			href="/notificaciones"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<Bell size={18} />
			<span>Notificaciones</span>
		</a>
	</li>
	<li>
		<a
			href="/calendario"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<Calendar size={18} />
			<span>Calendario</span>
		</a>
	</li>

	<li>
		<a
			href="/ayuda"
			class="flex items-center gap-2 text-neutral-600 transition hover:text-neutral-900"
		>
			<HelpCircle size={18} />
			<span>Ayuda</span>
		</a>
	</li>
</ul>
