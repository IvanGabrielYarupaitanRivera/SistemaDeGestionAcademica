import type { SupabaseClient } from '@supabase/supabase-js';
import type { Nota } from './type';

export const NotaDB = {
	async crearNota(supabase: SupabaseClient, nota: Nota) {
		const { error } = await supabase.from('Notas').insert([nota]);

		if (error) {
			throw new Error('Error al crear la nota');
		}
	},

	async obtenerNotasPorInscripcion(supabase: SupabaseClient, inscripcion_id: string) {
		const { data, error } = await supabase
			.from('Notas')
			.select('*')
			.eq('inscripcion_id', inscripcion_id)
			.single();

		if (error) throw new Error('Error al obtener notas' + error.message);

		return data as Nota;
	},

	async editarNota(supabase: SupabaseClient, id: string, nota: Nota) {
		const { error } = await supabase.from('Notas').update(nota).eq('id', id);

		if (error) {
			throw new Error('Error al editar la nota' + error.message);
		}
	}
};
