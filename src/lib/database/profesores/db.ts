import type { SupabaseClient } from '@supabase/supabase-js';
import type { Profesor } from './type';

export const ProfesorDB = {
	async crearProfesor(supabase: SupabaseClient, profesor: Profesor) {
		const { error } = await supabase.from('Profesores').insert([profesor]);

		if (error) {
			throw new Error('Error al crear el profesor');
		}
	}
};
