<script>
	import { Mail, Phone, UserCircle, MapPin, GraduationCap, BookOpen } from 'lucide-svelte';
</script>

<section class="py-16" aria-labelledby="profile-title">
	<h2 id="profile-title" class="text-center text-3xl font-bold text-neutral-800">Mi Perfil</h2>

	<div class="mt-12 grid gap-8 md:grid-cols-2">
		<!-- Información Personal -->
		<article class="space-y-6 rounded-lg border border-neutral-200 p-8 shadow-sm">
			<div class="flex items-center gap-4">
				<UserCircle size={64} class="text-neutral-400" />
				<div>
					<h3 class="text-xl font-semibold text-neutral-800">Juan Pérez García</h3>
					<p class="text-neutral-500">Estudiante - 5to Secundaria</p>
				</div>
			</div>

			<hr class="border-neutral-200" />

			<div class="space-y-4">
				<div class="flex items-center gap-3">
					<Mail size={18} class="text-neutral-500" />
					<span class="text-neutral-600">juan.perez@estudiante.edu.pe</span>
				</div>
				<div class="flex items-center gap-3">
					<Phone size={18} class="text-neutral-500" />
					<span class="text-neutral-600">+51 987 654 321</span>
				</div>
				<div class="flex items-center gap-3">
					<MapPin size={18} class="text-neutral-500" />
					<span class="text-neutral-600">Av. Educación 123, Huancayo</span>
				</div>
			</div>
		</article>

		<!-- Información Académica -->
		<article class="space-y-6 rounded-lg border border-neutral-200 p-8 shadow-sm">
			<h3 class="flex items-center gap-2 text-xl font-semibold text-neutral-800">
				<GraduationCap size={24} />
				Información Académica
			</h3>

			<div class="space-y-4">
				<div class="rounded-lg border border-neutral-200 p-4">
					<h4 class="font-medium text-neutral-800">Grado Actual</h4>
					<p class="text-neutral-600">5to Año de Secundaria - Sección A</p>
				</div>

				<div class="rounded-lg border border-neutral-200 p-4">
					<h4 class="font-medium text-neutral-800">Promedio General</h4>
					<p class="text-neutral-600">16.5</p>
				</div>

				<div class="rounded-lg border border-neutral-200 p-4">
					<h4 class="flex items-center gap-2 font-medium text-neutral-800">
						<BookOpen size={18} />
						Cursos Actuales
					</h4>
					<ul class="mt-2 space-y-1 text-neutral-600">
						<li>• Matemática</li>
						<li>• Comunicación</li>
						<li>• Historia</li>
						<li>• Ciencias</li>
						<li>• Inglés</li>
					</ul>
				</div>
			</div>
		</article>
	</div>
</section>
