<script>
	import { Mail, MapPin, MessageSquare, Phone, User } from 'lucide-svelte';
</script>

<section id="contacto" class="py-16" aria-labelledby="contact-title">
	<h2 id="contact-title" class="text-center text-3xl font-bold text-neutral-800">Contacto</h2>
	<div class="mt-12 grid gap-8 md:grid-cols-2">
		<!-- Formulario de contacto con iconos -->
		<article
			class="flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<form method="POST" action="?/contact" class="w-full space-y-6">
				<fieldset class="flex flex-col gap-6">
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
					<span> Enviar mensaje </span>
				</button>
			</form>
		</article>

		<!-- Cards de información de contacto con hover effects -->
		<section class="grid content-start gap-6" aria-label="Información de contacto">
			<address
				class="flex items-start gap-4 rounded-xl border border-neutral-200 bg-neutral-100 p-6 not-italic transition duration-300 hover:shadow-md"
			>
				<div class="rounded-full bg-neutral-800 p-3">
					<MapPin class="h-6 w-6 text-neutral-100" aria-hidden="true" />
				</div>
				<div>
					<h4 class="font-medium text-neutral-900">Dirección</h4>
					<p class="text-neutral-600">Av. Educación 123, Huancayo</p>
				</div>
			</address>

			<address
				class="flex items-start gap-4 rounded-xl border border-neutral-200 bg-neutral-100 p-6 not-italic transition duration-300 hover:shadow-md"
			>
				<div class="rounded-full bg-neutral-800 p-3">
					<Phone class="h-6 w-6 text-neutral-100" aria-hidden="true" />
				</div>
				<div>
					<h4 class="font-medium text-neutral-900">Teléfono</h4>
					<p class="text-neutral-600">(01) 123-4567</p>
				</div>
			</address>

			<address
				class="flex items-start gap-4 rounded-xl border border-neutral-200 bg-neutral-100 p-6 not-italic transition duration-300 hover:shadow-md"
			>
				<div class="rounded-full bg-neutral-800 p-3">
					<Mail class="h-6 w-6 text-neutral-100" aria-hidden="true" />
				</div>
				<div>
					<h4 class="font-medium text-neutral-900">Correo</h4>
					<p class="text-neutral-600">contacto@colegio.edu.pe</p>
				</div>
			</address>
		</section>
	</div>
</section>
