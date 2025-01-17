import type { PageServerLoad } from '../$types';
import type { Actions } from './$types';
import { error, fail } from '@sveltejs/kit';
import { PerfilDB } from '$lib/database/perfiles/db';
import type { Perfil } from '$lib/database/perfiles/type';
import { UsuarioDB } from '$lib/database/usuarios/db';
import { perfilStore } from '$lib/stores/perfil';
import { get } from 'svelte/store';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase, user } = locals;

	if (!user) {
		throw error(500, 'Error al obtener el perfil.');
	}

	const perfilCached = get(perfilStore);
	if (perfilCached) {
		return { perfil: perfilCached };
	}

	try {
		const perfil = await PerfilDB.obtenerPerfilPorID(supabase, user.id);

		if (!perfil) {
			throw error(404, 'Perfil no encontrado.');
		}

		perfilStore.set(perfil);
		return { perfil };
	} catch (err) {
		console.error('❌ Error al obtener el perfil:', err);
		throw error(500, 'Error al obtener el perfil.');
	}
};

export const actions = {
	editarPerfil: async ({ request, locals: { supabase, user } }) => {
		const formData = await request.formData();

		if (!user) {
			return fail(401, { error: 'No autorizado' });
		}

		const perfil: Perfil = {
			id: user.id as string,
			nombres: formData.get('nombres') as string,
			apellido_paterno: formData.get('apellido_paterno') as string,
			apellido_materno: formData.get('apellido_materno') as string,
			dni: formData.get('dni') as string,
			fecha_actualizacion: new Date().toISOString()
		};

		try {
			await PerfilDB.editarPerfil(supabase, perfil.id, perfil);
			perfilStore.set(null);
			return { success: 'Perfil actualizado correctamente' };
		} catch (err) {
			return fail(500, {
				error: err instanceof Error ? err.message : 'Error en el servidor'
			});
		}
	},

	cambiarContrasena: async ({ request, locals: { supabase, user } }) => {
		const formData = await request.formData();
		const currentPassword = formData.get('current_password') as string;
		const newPassword = formData.get('new_password') as string;
		const confirmPassword = formData.get('confirm_password') as string;

		try {
			if (!user?.email) {
				throw new Error('No autorizado');
			}

			const result = await UsuarioDB.cambiarContrasena(
				supabase,
				user.email,
				currentPassword,
				newPassword,
				confirmPassword
			);
			return result;
		} catch (err) {
			return fail(500, {
				error: err instanceof Error ? err.message : 'Error en el servidor'
			});
		}
	}
} satisfies Actions;
