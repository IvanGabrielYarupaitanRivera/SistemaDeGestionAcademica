<script>
	import { Plus, Pencil, Trash } from 'lucide-svelte';

	const profesores = [
		{
			id: 1,
			codigo: 'PROF001',
			nombre: 'Juan Pérez',
			email: 'juan@ejemplo.com',
			departamento: 'Ciencias',
			cursos: ['Matemáticas Básicas']
		},
		{
			id: 2,
			codigo: 'PROF002',
			nombre: 'Ana García',
			email: 'ana@ejemplo.com',
			departamento: 'Física',
			cursos: ['Física I']
		},
		{
			id: 3,
			codigo: 'PROF003',
			nombre: 'Carlos López',
			email: 'carlos@ejemplo.com',
			departamento: 'Química',
			cursos: ['Química Orgánica']
		}
	];
</script>

<div class="p-6">
	<div class="mb-6 flex items-center justify-between">
		<h1 class="text-2xl font-bold">Gestión de Profesores</h1>
		<button class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white">
			<Plus size={18} />
			Nuevo Profesor
		</button>
	</div>

	<div class="rounded-lg bg-white shadow-sm">
		<table class="min-w-full">
			<thead>
				<tr class="border-b">
					<th class="px-6 py-3 text-left">Código</th>
					<th class="px-6 py-3 text-left">Nombre</th>
					<th class="px-6 py-3 text-left">Email</th>
					<th class="px-6 py-3 text-left">Departamento</th>
					<th class="px-6 py-3 text-left">Cursos</th>
					<th class="px-6 py-3 text-center">Acciones</th>
				</tr>
			</thead>
			<tbody>
				{#each profesores as profesor}
					<tr class="border-b hover:bg-gray-50">
						<td class="px-6 py-4">{profesor.codigo}</td>
						<td class="px-6 py-4">{profesor.nombre}</td>
						<td class="px-6 py-4">{profesor.email}</td>
						<td class="px-6 py-4">{profesor.departamento}</td>
						<td class="px-6 py-4">{profesor.cursos.join(', ')}</td>
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
