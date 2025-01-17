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
		console.log('📦 Usando datos de store');
		return { perfil: perfilCached };
	}

	try {
		console.time('⏱️ Consulta Supabase');
		const perfil = await PerfilDB.obtenerPerfilPorID(supabase, user.id);
		console.timeEnd('⏱️ Consulta Supabase');

		// Verifica si el perfil fue encontrado
		if (!perfil) {
			console.warn('⚠️ Perfil no encontrado para el usuario:', user.id);
			throw error(404, 'Perfil no encontrado.');
		}

		console.log('✅ Perfil obtenido correctamente:', perfil);
		perfilStore.set(perfil);
		return { perfil };
	} catch (err) {
		console.error('❌ Error al obtener el perfil:', err);
		throw error(500, 'Error al obtener el perfil.');
	}
};
