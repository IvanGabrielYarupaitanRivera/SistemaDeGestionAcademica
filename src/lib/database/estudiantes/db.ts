import type { SupabaseClient } from '@supabase/supabase-js';
import type { Estudiante } from './type';

export const EstudianteDB = {
	async crearEstudiante(supabase: SupabaseClient, estudiante: Estudiante) {
		const { error } = await supabase.from('Estudiantes').insert([estudiante]);

		if (error) {
			throw new Error('Error al crear el estudiante');
		}
	}
};
