<script>
	import { Search, UserCog, Plus, Trash, PencilLine } from 'lucide-svelte';
	import UsuarioModal from './components/UsuarioModal.svelte';
	import ConfirmacionModal from './components/ConfirmacionModal.svelte';

	let showModal = false;
	let isEditing = false;
	let searchQuery = '';
	let showConfirmModal = false;
	let usuarioAEliminar = null;

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

	const handleCreate = () => {
		isEditing = false;
		showModal = true;
	};

	const handleEdit = (perfil) => {
		isEditing = true;
		showModal = true;
	};

	const handleDelete = (perfil) => {
		usuarioAEliminar = perfil;
		showConfirmModal = true;
	};

	const handleConfirmDelete = () => {
		showConfirmModal = false;
		usuarioAEliminar = null;
	};
</script>

<div class="p-6">
	<div class="mb-6">
		<div class="flex items-center justify-between">
			<h1 class="text-2xl font-bold">Gestión de Perfiles</h1>
			<button
				on:click={handleCreate}
				class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
			>
				<Plus size={18} />
				<span>Nuevo Usuario</span>
			</button>
		</div>

		<div class="mt-4 flex gap-4">
			<div class="relative flex-1">
				<Search class="absolute left-3 top-2.5 text-gray-400" size={18} />
				<input
					type="text"
					bind:value={searchQuery}
					placeholder="Buscar usuario..."
					class="w-full rounded-lg border py-2 pl-10 pr-4"
				/>
			</div>
			<select class="rounded-lg border px-4 py-2">
				<option value="">Todos los roles</option>
				{#each roles as rol}
					<option value={rol}>{rol}</option>
				{/each}
			</select>
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
							<div class="flex justify-center gap-2">
								<button
									on:click={() => handleEdit(perfil)}
									class="text-blue-600 hover:text-blue-800"
								>
									<PencilLine size={18} />
								</button>
								<button
									on:click={() => handleDelete(perfil)}
									class="text-red-600 hover:text-red-800"
								>
									<Trash size={18} />
								</button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<UsuarioModal bind:showModal bind:isEditing />
<ConfirmacionModal
	bind:showModal={showConfirmModal}
	bind:usuario={usuarioAEliminar}
	on:confirmar={handleConfirmDelete}
/>
