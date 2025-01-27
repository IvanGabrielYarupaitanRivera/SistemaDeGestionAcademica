import type { SupabaseClient } from '@supabase/supabase-js';
import type { Inscripcion } from './type';

export const InscripcionDB = {
	async crearInscripcion(supabase: SupabaseClient, inscripcion: Inscripcion) {
		const { error } = await supabase.from('Inscripciones').insert([inscripcion]);

		if (error) {
			throw new Error('Error al crear la inscripción');
		}
	}
};
