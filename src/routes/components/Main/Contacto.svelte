<script>
	import { Mail, MapPin, MessageSquare, Phone, Send, User } from 'lucide-svelte';
</script>

<section id="contacto" class="mx-16 py-16" aria-labelledby="contact-title">
	<h2 id="contact-title" class="text-center text-3xl font-bold text-neutral-800">Contacto</h2>
	<div class="mt-12 grid gap-12 md:grid-cols-2">
		<!-- Formulario de contacto con iconos -->
		<form method="POST" action="?/contact" class="space-y-6">
			<fieldset class="space-y-4">
				<legend class="sr-only">Formulario de contacto</legend>

				<div>
					<label class="flex items-center space-x-2 text-sm text-neutral-600" for="nombre">
						<User class="h-5 w-5" /> <span>Nombre</span>
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
