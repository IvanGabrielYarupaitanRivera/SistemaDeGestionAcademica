<script>
	import { Heart, Lightbulb, Target } from 'lucide-svelte';
</script>

<section id="nosotros" class="py-16" aria-labelledby="about-title">
	<h2 id="about-title" class="text-center text-3xl font-bold text-neutral-800">
		Nuestra Institución
	</h2>
	<div class="mt-12 grid gap-8 md:grid-cols-3">
		<article
			class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<Target size={32} className="mb-4 text-neutral-600" />
			<h3 class="text-xl font-semibold text-neutral-800">Misión</h3>
			<p class="mt-4 text-neutral-600">
				Formar estudiantes íntegros y competentes mediante una educación innovadora y personalizada.
			</p>
		</article>

		<article
			class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<Lightbulb size={32} className="mb-4 text-neutral-600" />
			<h3 class="text-xl font-semibold text-neutral-800">Visión</h3>
			<p class="mt-4 text-neutral-600">
				Ser referentes en educación innovadora, formando líderes que impacten positivamente en la
				sociedad.
			</p>
		</article>

		<article
			class="group flex flex-col items-center rounded-lg border border-neutral-200 p-8 text-center shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md"
		>
			<Heart size={32} className="mb-4 text-neutral-600" />
			<h3 class="text-xl font-semibold text-neutral-800">Valores</h3>
			<ul class="mt-4 space-y-2 text-neutral-600">
				<li>• Excelencia académica</li>
				<li>• Innovación educativa</li>
				<li>• Integridad personal</li>
			</ul>
		</article>
	</div>
</section>
