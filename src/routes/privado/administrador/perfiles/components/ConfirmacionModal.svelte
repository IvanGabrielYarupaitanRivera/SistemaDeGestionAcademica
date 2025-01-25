<script>
	import { X } from 'lucide-svelte';
	export let showModal = false;
	export let usuario = null;

	const handleClose = () => {
		showModal = false;
	};
</script>

{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
		<div class="w-full max-w-md rounded-lg bg-white p-6">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-xl font-bold">Confirmar eliminación</h2>
				<button class="text-gray-500 hover:text-gray-700" on:click={handleClose}>
					<X size={20} />
				</button>
			</div>

			<p class="mb-4 text-gray-600">
				¿Estás seguro de que deseas eliminar al usuario? Esta acción no se puede deshacer.
			</p>

			<div class="flex justify-end gap-2">
				<button
					type="button"
					class="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-50"
					on:click={handleClose}
				>
					Cancelar
				</button>
				<button type="button" class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
					Eliminar
				</button>
			</div>
		</div>
	</div>
{/if}
