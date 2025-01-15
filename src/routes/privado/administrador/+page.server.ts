import type { PageServerLoad } from '../$types';
import { error } from '@sveltejs/kit';
import { PerfilDB } from '$lib/database/perfiles/db';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase, user } = locals;

	if (!user) {
		throw error(500, 'Error al obtener el perfil.');
	}

	try {
		const perfil = await PerfilDB.obtenerPerfilPorID(supabase, user.id);

		if (!perfil) {
			throw error(404, 'Perfil no encontrado.');
		}

		return { perfil };
	} catch (err) {
		console.error('Error al obtener el perfil:', err);
		throw error(500, 'Error al obtener el perfil.');
	}
};
