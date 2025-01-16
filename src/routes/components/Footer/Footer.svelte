<script>
	import { Facebook, Instagram, Linkedin } from 'lucide-svelte';
</script>

<footer class="border-t border-neutral-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 py-12">
		<nav aria-label="Redes sociales" class="mb-8">
			<ul class="flex justify-center gap-8">
				<li>
					<a
						href="/"
						aria-label="Facebook"
						class="text-neutral-600 transition hover:text-neutral-900"
					>
						<Facebook size={24} />
					</a>
				</li>
				<li>
					<a
						href="/"
						aria-label="Instagram"
						class="text-neutral-600 transition hover:text-neutral-900"
					>
						<Instagram size={24} />
					</a>
				</li>
				<li>
					<a
						href="/"
						aria-label="LinkedIn"
						class="text-neutral-600 transition hover:text-neutral-900"
					>
						<Linkedin size={24} />
					</a>
				</li>
			</ul>
		</nav>
		<p class="text-center text-sm text-neutral-600">
			© {new Date().getFullYear()} Colegio. Todos los derechos reservados.
		</p>
	</div>
</footer>
