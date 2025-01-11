import type { SupabaseClient } from '@supabase/supabase-js';
import type { Perfil } from './type';

export const PerfilDB = {
	async obtenerPerfil(supabase: SupabaseClient, id: string) {
		const { data, error } = await supabase.from('Perfiles').select().eq('id', id).single();

		if (error) {
			throw new Error('Error al obtener el perfil.');
		}

		return data as Perfil;
	},

	async crearPerfil(supabase: SupabaseClient, perfil: Perfil) {
		const { error } = await supabase.from('Perfiles').insert([perfil]);

		if (error) {
			throw new Error('Error al crear el perfil');
		}
	}
};
