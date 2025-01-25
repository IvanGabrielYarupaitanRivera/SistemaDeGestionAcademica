<script>
	import { Plus, Pencil, Trash, Link } from 'lucide-svelte';

	// Datos de ejemplo
	const estudiantes = [
		{
			id: 1,
			matricula: 'EST001',
			nombre: 'María González',
			email: 'maria@ejemplo.com',
			cursos: ['Matemáticas Básicas', 'Física I']
		},
		{
			id: 2,
			matricula: 'EST002',
			nombre: 'Pedro Sánchez',
			email: 'pedro@ejemplo.com',
			cursos: ['Química Orgánica']
		},
		{
			id: 3,
			matricula: 'EST003',
			nombre: 'Laura Martínez',
			email: 'laura@ejemplo.com',
			cursos: ['Matemáticas Básicas']
		}
	];
</script>

<div class="p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Gestión de Estudiantes</h1>
		<button class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white">
			<Plus size={18} />
			Nuevo Estudiante
		</button>
	</div>

	<div class="rounded-lg bg-white shadow-sm">
		<table class="min-w-full">
			<thead>
				<tr class="border-b">
					<th class="px-6 py-3 text-left">Matrícula</th>
					<th class="px-6 py-3 text-left">Nombre</th>
					<th class="px-6 py-3 text-left">Email</th>
					<th class="px-6 py-3 text-left">Cursos</th>
					<th class="px-6 py-3 text-center">Acciones</th>
				</tr>
			</thead>
			<tbody>
				{#each estudiantes as estudiante}
					<tr class="border-b hover:bg-gray-50">
						<td class="px-6 py-4">{estudiante.matricula}</td>
						<td class="px-6 py-4">{estudiante.nombre}</td>
						<td class="px-6 py-4">{estudiante.email}</td>
						<td class="px-6 py-4">{estudiante.cursos.join(', ')}</td>
						<td class="px-6 py-4 text-center">
							<button class="mx-2 text-green-600 hover:text-green-800">
								<Link size={18} />
							</button>
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
