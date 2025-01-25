<script>
	import { Plus, Pencil, Trash } from 'lucide-svelte';

	// Datos de ejemplo
	const cursos = [
		{
			id: 1,
			codigo: 'MAT101',
			nombre: 'Matemáticas Básicas',
			profesor: 'Juan Pérez',
			estudiantes: 25
		},
		{ id: 2, codigo: 'FIS201', nombre: 'Física I', profesor: 'Ana García', estudiantes: 30 },
		{
			id: 3,
			codigo: 'QUI301',
			nombre: 'Química Orgánica',
			profesor: 'Carlos López',
			estudiantes: 20
		}
	];
</script>

<div class="p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Gestión de Cursos</h1>
		<button class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white">
			<Plus size={18} />
			Nuevo Curso
		</button>
	</div>

	<div class="rounded-lg bg-white shadow-sm">
		<table class="min-w-full">
			<thead>
				<tr class="border-b">
					<th class="px-6 py-3 text-left">Código</th>
					<th class="px-6 py-3 text-left">Nombre</th>
					<th class="px-6 py-3 text-left">Profesor</th>
					<th class="px-6 py-3 text-left">Estudiantes</th>
					<th class="px-6 py-3 text-center">Acciones</th>
				</tr>
			</thead>
			<tbody>
				{#each cursos as curso}
					<tr class="border-b hover:bg-gray-50">
						<td class="px-6 py-4">{curso.codigo}</td>
						<td class="px-6 py-4">{curso.nombre}</td>
						<td class="px-6 py-4">{curso.profesor}</td>
						<td class="px-6 py-4">{curso.estudiantes}</td>
						<td class="px-6 py-4 text-center">
							<button class="mx-2 text-blue-600 hover:text-blue-800">
								<Pencil size={18} />
							</button>
							<button class="mx-2 text-red-600 hover:text-red-800">
								<Trash size={18} />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
