<script>
	import { Search, FileEdit } from 'lucide-svelte';

	const calificaciones = [
		{
			id: 1,
			estudiante: 'María González',
			curso: 'Matemáticas Básicas',
			parcial1: 85,
			parcial2: 90,
			final: 88
		},
		{
			id: 2,
			estudiante: 'Pedro Sánchez',
			curso: 'Química Orgánica',
			parcial1: 75,
			parcial2: 80,
			final: 82
		},
		{
			id: 3,
			estudiante: 'Laura Martínez',
			curso: 'Física I',
			parcial1: 95,
			parcial2: 88,
			final: 92
		}
	];
</script>

<div class="p-6">
	<div class="mb-6">
		<h1 class="mb-4 text-2xl font-bold">Calificaciones</h1>
		<div class="mb-4 flex gap-4">
			<select class="rounded-lg border px-4 py-2">
				<option value="">Seleccionar Curso</option>
				<option>Matemáticas Básicas</option>
				<option>Física I</option>
				<option>Química Orgánica</option>
			</select>
			<div class="relative flex-1">
				<Search class="absolute left-3 top-2.5 text-gray-400" size={18} />
				<input
					type="text"
					placeholder="Buscar estudiante..."
					class="w-full rounded-lg border py-2 pl-10 pr-4"
				/>
			</div>
		</div>
	</div>

	<div class="rounded-lg bg-white shadow-sm">
		<table class="min-w-full">
			<thead>
				<tr class="border-b">
					<th class="px-6 py-3 text-left">Estudiante</th>
					<th class="px-6 py-3 text-left">Curso</th>
					<th class="px-6 py-3 text-center">Parcial 1</th>
					<th class="px-6 py-3 text-center">Parcial 2</th>
					<th class="px-6 py-3 text-center">Final</th>
					<th class="px-6 py-3 text-center">Acciones</th>
				</tr>
			</thead>
			<tbody>
				{#each calificaciones as calificacion}
					<tr class="border-b hover:bg-gray-50">
						<td class="px-6 py-4">{calificacion.estudiante}</td>
						<td class="px-6 py-4">{calificacion.curso}</td>
						<td class="px-6 py-4 text-center">{calificacion.parcial1}</td>
						<td class="px-6 py-4 text-center">{calificacion.parcial2}</td>
						<td class="px-6 py-4 text-center">{calificacion.final}</td>
						<td class="px-6 py-4 text-center">
							<button class="text-blue-600 hover:text-blue-800">
								<FileEdit size={18} />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
