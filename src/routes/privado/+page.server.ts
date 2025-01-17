import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { PerfilDB } from '$lib/database/perfiles/db';
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
