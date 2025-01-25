<script>
	import { X } from 'lucide-svelte';
	export let showModal = false;
	export let isEditing = false;

	const handleClose = () => {
		showModal = false;
	};
</script>

{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-full max-w-md rounded-lg bg-white p-6">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-xl font-bold">
					{isEditing ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
				</h2>
				<button class="text-gray-500 hover:text-gray-700" on:click={handleClose}>
					<X size={20} />
				</button>
			</div>

			<form class="space-y-4">
				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700">Nombre completo</label>
					<input
						type="text"
						class="w-full rounded-lg border border-gray-300 p-2"
						placeholder="Nombre completo"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
					<input
						type="email"
						class="w-full rounded-lg border border-gray-300 p-2"
						placeholder="correo@ejemplo.com"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700">Contraseña</label>
					<input
						type="password"
						class="w-full rounded-lg border border-gray-300 p-2"
						placeholder="********"
					/>
				</div>

				<div>
					<label class="mb-1 block text-sm font-medium text-gray-700">Rol</label>
					<select class="w-full rounded-lg border border-gray-300 p-2">
						<option value="estudiante">Estudiante</option>
						<option value="profesor">Profesor</option>
						<option value="administrador">Administrador</option>
					</select>
				</div>

				<div class="flex justify-end gap-2">
					<button
						type="button"
						class="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-50"
						on:click={handleClose}
					>
						Cancelar
					</button>
					<button
						type="submit"
						class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						{isEditing ? 'Guardar cambios' : 'Crear usuario'}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
