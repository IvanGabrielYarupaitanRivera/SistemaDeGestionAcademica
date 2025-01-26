import type { SupabaseClient } from '@supabase/supabase-js';
import type { Curso } from './type';

export const CursoDB = {
	async crearCurso(supabase: SupabaseClient, curso: Curso) {
		const { error } = await supabase.from('Cursos').insert([curso]);

		if (error) {
			throw new Error('Error al crear el curso');
		}
	}
};
