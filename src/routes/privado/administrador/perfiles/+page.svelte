<script>
	import { Search, UserCog } from 'lucide-svelte';

	const perfiles = [
		{ id: 1, nombre: 'Juan Pérez', email: 'juan@ejemplo.com', rol: 'Profesor', estado: 'Activo' },
		{
			id: 2,
			nombre: 'María González',
			email: 'maria@ejemplo.com',
			rol: 'Estudiante',
			estado: 'Activo'
		},
		{
			id: 3,
			nombre: 'Admin Sistema',
			email: 'admin@ejemplo.com',
			rol: 'Administrador',
			estado: 'Activo'
		}
	];

	const roles = ['Estudiante', 'Profesor', 'Administrador'];
</script>

<div class="p-6">
	<div class="mb-6">
		<h1 class="mb-4 text-2xl font-bold">Gestión de Perfiles</h1>
		<div class="flex gap-4">
			<div class="relative flex-1">
				<Search class="absolute left-3 top-2.5 text-gray-400" size={18} />
				<input
					type="text"
					placeholder="Buscar usuario..."
					class="w-full rounded-lg border py-2 pl-10 pr-4"
				/>
			</div>
		</div>
	</div>

	<div class="rounded-lg bg-white shadow-sm">
		<table class="min-w-full">
			<thead>
				<tr class="border-b">
					<th class="px-6 py-3 text-left">Nombre</th>
					<th class="px-6 py-3 text-left">Email</th>
					<th class="px-6 py-3 text-left">Rol</th>
					<th class="px-6 py-3 text-left">Estado</th>
					<th class="px-6 py-3 text-center">Acciones</th>
				</tr>
			</thead>
			<tbody>
				{#each perfiles as perfil}
					<tr class="border-b hover:bg-gray-50">
						<td class="px-6 py-4">{perfil.nombre}</td>
						<td class="px-6 py-4">{perfil.email}</td>
						<td class="px-6 py-4">
							<select class="rounded border px-2 py-1">
								{#each roles as rol}
									<option selected={rol === perfil.rol}>{rol}</option>
								{/each}
							</select>
						</td>
						<td class="px-6 py-4">
							<span class="rounded-full bg-green-100 px-2 py-1 text-sm text-green-800">
								{perfil.estado}
							</span>
						</td>
						<td class="px-6 py-4 text-center">
							<button class="text-blue-600 hover:text-blue-800">
								<UserCog size={18} />
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
